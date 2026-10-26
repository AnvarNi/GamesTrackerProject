import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp
} from 'drizzle-orm/pg-core'

export const platformEnum = pgEnum('platform', [
  'PC',
  'PlayStation',
  'XBOX',
  'Mobile'
])

export const genres = pgTable('genres', {
  id: text('id').primaryKey().$defaultFn(() => createId()),

  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const games = pgTable('games', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  externalId: text('external_id').notNull().unique(),

  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  posterUrl: text('poster_url'),
  platform: platformEnum('platform').notNull(),

  metaScore: integer('meta_score'),
  myScore: integer('my_score'),
  review: text('review'),

  completedAt: timestamp('completed_at').notNull(),

  genreId: text('genre_id')
    .notNull()
    .references(() => genres.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const gamesRelations = relations(games, ({ one }) => ({
  genre: one(genres, {
    fields: [games.genreId],
    references: [genres.id]
  })
}))

export const admins = pgTable('admins', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})
