import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { db } from '@server/db/client'
import { admins } from '@server/db/schema'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'

export const authRoutes = new Elysia({ prefix: '/api/auth' })
  .use(cookie())
  .use(jwt({ name: 'jwt', secret: process.env.JWT_SECRET! }))
  .post('/register', async ({body}) => {
    await db.insert(admins).values({
      username: body.username,
      passwordHash: await Bun.password.hash(body.password)
    })
    return {success: true}
  }, {
    body: t.Object({
      username: t.String(),
      password: t.String()
    })
  })
  .post(
    '/login',
    async ({ body, jwt, setCookie }) => {
      const admin = await db.query.admins.findFirst({
        where: eq(admins?.username, body.username)
      })

      if (
        !admin ||
        !(await Bun.password.verify(body.password, admin.passwordHash))
      ) {
        throw new Error('Invalid username or password')
      }

      const token = await jwt.sign({ id: admin.id })

      setCookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 3,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      return { success: true }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String()
      })
    }
  )
  .post('/logout', async ({ removeCookie }) => {
    removeCookie('token')
    return { success: true }
  })
