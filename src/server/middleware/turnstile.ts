import { t, type Context } from 'elysia'
import 'dotenv/config'

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export const turnstileGuard = {
  header: t.Object({
    'cf-turnstile-token': t.String()
  }),

  async beforeHandle(ctx: Context) {
    const token = ctx.headers['cf-turnstile-token']

    if (!token) {
      throw new Error('Captcha token is missing')
    }

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET!,
        response: token
      })
    })

    const data = (await res.json()) as { success: boolean }

    if (!data.success) {
      return ctx.status(403)
    }
  }
}
