import { db } from '@server/db/client'
import Elysia from 'elysia'

export const genresRoutes = new Elysia({ prefix: '/api/genres' }).get('/', () =>
  db.query.genres.findMany()
)
