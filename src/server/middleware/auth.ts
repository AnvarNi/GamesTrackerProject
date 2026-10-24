import jwt from '@elysiajs/jwt'
import Elysia from 'elysia'

export const auth = new Elysia({ name: 'auth' }).use(
  jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!
  }).derive(async ({ jwt, cookie }) => {
    if (!cookie.token) {
      throw new Error('Not authenticated')
    }

    const token = cookie.token.value as string | undefined

    if (!token) {
      throw new Error('Token is empty or invalid format')
    }

    const payload = await jwt.verify(token)

    if (!payload) {
      throw new Error('Invalid token')
    }

    return { adminId: payload.id }
  })
)
