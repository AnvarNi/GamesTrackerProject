import jwt from '@elysiajs/jwt'
import { authGuard } from '@server/middleware/auth'
import Elysia, { t } from 'elysia'

const RAWG_URL = 'https://api.rawg.io/api'
const RAWG_KEY = process.env.RAWG_API_KEY!
const PC_ID = 4

export const rawgRoutes = new Elysia({ prefix: '/api/rawg' })
  .use(jwt({ name: 'jwt', secret: process.env.RAWG_API_KEY! }))
  .guard(authGuard, app =>
    app.get(
      '/search',
      async ({ query }) => {
        const url = new URL(`${RAWG_URL}/games`)

        url.searchParams.set('key', RAWG_KEY)
        url.searchParams.set('search', query.q)
        url.searchParams.set('page_size', '10')
        url.searchParams.set('platforms', `${PC_ID}`)

        const res = await fetch(url.toString())

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
