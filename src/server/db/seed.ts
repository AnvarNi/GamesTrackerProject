import { db } from './client'
import { admins, genres } from './schema'

const GENRES = [
  { name: 'Action', slug: 'action' },
  { name: 'Adventure', slug: 'adventure' },
  { name: 'RPG', slug: 'rpg' },
  { name: 'Shooter', slug: 'shooter' },
  { name: 'Strategy', slug: 'strategy' },
  { name: 'Horror', slug: 'horror' },
  { name: 'Puzzle', slug: 'puzzle' },
  { name: 'Souls-like', slug: 'soulslike' }
]

async function seed() {
  console.log('Seeding genres...')

  await db.insert(genres).values(GENRES).onConflictDoNothing()

  await db
    .insert(admins)
    .values({
      username: 'admin',
      passwordHash: await Bun.password.hash('123456')
    })
    .onConflictDoNothing()

  console.log('Done!')
  process.exit(0)
}

seed()
