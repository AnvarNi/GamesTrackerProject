import { relations } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  serial,
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
  id: serial('id').primaryKey(),

  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  externalId: text('external_id').notNull().unique(),

  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  posterUrl: text('poster_url'),
  platform: platformEnum('platform').notNull(),

  metaScore: integer('meta_score'),
  myScore: integer('my_score'),
  review: text('review'),

  completedAt: timestamp('completed_at').notNull(),

  genreId: integer('genre_id')
    .notNull()
    .references(() => genres.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})
