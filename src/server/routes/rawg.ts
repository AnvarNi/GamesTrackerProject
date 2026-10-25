import jwt from '@elysiajs/jwt'
import { authGuard } from '@server/middleware/auth'
import Elysia, { t } from 'elysia'

const RAWG_URL = 'https://api.rawg.io/api'
const RAWG_KEY = process.env.RAWG_API_KEY!

export const rawgRoutes = new Elysia({ prefix: '/api/rawg' })
  .use(jwt({ name: 'jwt', secret: process.env.RAWG_API_KEY! }))
  .guard(authGuard, app =>
    app.get(
      '/search',
      async ({ query }) => {
        const res = await fetch(
          `${RAWG_URL}/games?key=${RAWG_KEY}&search=${query.q}&page_size=10`
        )
        return res.json()
      },
      {
        query: t.Object({
          q: t.String()
        })
      }
    )
  )
  .get('/game/:id', async ({ params }) => {
    const res = await fetch(`${RAWG_URL}/games/${params.id}?key=${RAWG_KEY}`)
    return res.json()
  })
