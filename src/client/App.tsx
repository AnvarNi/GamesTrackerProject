import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useGames } from './hooks/useGames'
import { GameList } from './components/game-list/GameList'
import { useGenres } from './hooks/useGenres'
import { SkeletonLoader } from './components/ui/SkeletonLoader'

export default function App() {
  const [genreSlug, setGenreSlug] = useQueryState('genre')
  const [searchTerm, setSearchTerm] = useQueryState('search')
  const { data: games = [], isLoading: isGamesLoading } = useGames({ genreSlug, searchTerm })

  return (
    <div className='mt-6'>
      <input
        type='text'
        placeholder='Search games I have completed...'
        value={searchTerm ?? ''}
        onChange={e => setSearchTerm(e.target.value || null)}
        className='w-full max-w-md mx-auto block px-4 py-2 bg-dark/50 border border-white/10 
        rounded-lg text-white placeholder:text-gray focus:outline-none focus:border-accent/50'
      />
      <GameList games={games} isLoading={isGamesLoading} />
    </div>
  )
}
