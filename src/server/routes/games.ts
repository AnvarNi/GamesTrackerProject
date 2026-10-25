import jwt from '@elysiajs/jwt'
import { db } from '@server/db/client'
import { games, genres } from '@server/db/schema'
import { authGuard } from '@server/middleware/auth'
import { and, desc, eq, ilike } from 'drizzle-orm'
import Elysia, { t } from 'elysia'

export const gameRoutes = new Elysia({ prefix: '/api/games' })
  .get(
    '/',
    async ({ query }) => {
      const conditions = []

      if (query.genreSlug) {
        const genre = await db.query.genres.findFirst({
          where: eq(genres.slug, query.genreSlug)
        })
        if (genre?.id) {
          conditions.push(eq(games.genreId, genre.id))
        }
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
        genreSlug: t.Optional(t.String()),
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

  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!
    })
  )

  .guard(authGuard, app =>
    app.post(
      '/',
      async ({ body, set }) => {
        const { genreSlug, ...game } = body
        const genre = await db.query.genres.findFirst({
          where: eq(genres.slug, genreSlug)
        })

        if (!genre) {
          set.status = 400
          return { message: 'Genre not found' }
        }

        const [created] = await db
          .insert(games)
          .values({
            ...game,
            genreId: genre.id,
            completedAt: new Date(game.completedAt)
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
          platform: t.Union(
            [
              t.Literal('PC'),
              t.Literal('PlayStation'),
              t.Literal('XBOX'),
              t.Literal('Mobile')
            ],
            { default: 'PC' }
          ),
          genreSlug: t.String(),
          completedAt: t.String({ format: 'date-time' })
        })
      }
    )
  )

  .post(
    '/',
    async ({ body, set }) => {
      const { genreSlug, ...game } = body
      const genre = await db.query.genres.findFirst({
        where: eq(genres.slug, genreSlug)
      })

      if (!genre) {
        set.status = 400
        return { message: 'Genre not found' }
      }

      const [created] = await db
        .insert(games)
        .values({
          ...game,
          genreId: genre.id,
          completedAt: new Date(game.completedAt)
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
        platform: t.Union(
          [
            t.Literal('PC'),
            t.Literal('PlayStation'),
            t.Literal('XBOX'),
            t.Literal('Mobile')
          ],
          { default: 'PC' }
        ),
        genreSlug: t.String(),
        completedAt: t.String({ format: 'date-time' })
      })
    }
  )
  .delete('/:id', async ({ params, set }) => {
    const id = Number(params.id)

    if (Number.isNaN(id)) {
      set.status = 400
      return { message: 'Invalid id' }
    }

    await db.delete(games).where(eq(games.id, id))

    return { success: true }
  })
