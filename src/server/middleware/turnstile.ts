import Elysia from "elysia";
import 'dotenv/config'
import { getClientIp } from "@server/lib/utils";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const turnstile = new Elysia({name: "turnstile"}).derive(async ({request}) => {
  const token = request.headers.get('cf-turnstile-token')

  if(!token) {
    throw new Error('Captcha token is missing')
  }

  const response = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      secret: process.env.CLOUDFLARE_TURNSTILE_SECRET!,
      response: token,
      remoteip: getClientIp(request)
    })
  })

  const data = await response.json()

  if (!data.success) {
    throw new Error('Captcha verification failed')
  }

  return {}
});