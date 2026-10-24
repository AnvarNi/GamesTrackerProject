import { db } from '@server/db/client'
import { games } from '@server/db/schema'
import { auth } from '@server/middleware/auth'
import { and, desc, eq, ilike } from 'drizzle-orm'
import Elysia, { t } from 'elysia'

export const gamesRoutes = new Elysia({ prefix: '/api/games' })
  .get(
    '/',
    async ({ query }) => {
      const conditions = []

      if (query.genreId) {
        conditions.push(eq(games.genreId, Number(query.genreId)))
      }
      if (query.search) {
        conditions.push(ilike(games.title, `%${query.search}%`))
      }

      return db.query.games.findMany({
        with: { genre: true },
        where: conditions.length ? and(...conditions) : undefined,
        orderBy: desc(games.completedAt)
      })
    },
    {
      query: t.Object({
        genreId: t.Optional(t.String()),
        search: t.Optional(t.String())
      })
    }
  )
  .get('/:slug', async ({ params, set }) => {
    const game = await db.query.games.findFirst({
      with: { genre: true },
      where: eq(games.slug, params.slug)
    })

    if (!game) {
      set.status = 404
      return { message: 'Game not found' }
    }

    return game
  })

  .use(auth)

  .post(
    '/',
    async ({ body }) => {
      const [created] = await db
        .insert(games)
        .values({
          ...body,
          completedAt: new Date(body.completedAt)
        })
        .returning()
      return created
    },
    {
      body: t.Object({
        externalId: t.String(),
        title: t.String(),
        slug: t.String(),
        posterUrl: t.Optional(t.String()),
        metaScore: t.Optional(t.Number()),
        myScore: t.Number(),
        review: t.Optional(t.String()),
        platform: t.Union([
          t.Literal('PC'),
          t.Literal('PlayStation'),
          t.Literal('XBOX'),
          t.Literal('Mobile')
        ], { default: 'PC' }),
        genreId: t.Number(),
        completedAt: t.String({ format: 'date-time' })
      })
    }
  )
