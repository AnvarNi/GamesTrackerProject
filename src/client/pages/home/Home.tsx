import { useQueryState } from 'nuqs'
import { useGames } from '../../hooks/useGames'
import { GameList } from '../../components/game-list/GameList'
import { useDebounce } from '../../hooks/useDebounce'
import { FiltersMenu } from '@client/components/layout/header/filters-menu/FiltersMenu'

export default function Home() {
  const [genreSlug, setGenreSlug] = useQueryState('genre')
  const [searchTerm, setSearchTerm] = useQueryState('search')
  const debounceSearch = useDebounce(searchTerm)
  const { data: games = [], isLoading: isGamesLoading } = useGames({
    genreSlug,
    searchTerm: debounceSearch
  })

  return (
    <div>
      <FiltersMenu />
      <div className='mt-6'>
        <input
          type='text'
          placeholder='Search games I have completed...'
          value={searchTerm ?? ''}
          onChange={e => setSearchTerm(e.target.value || null)}
          className='w-full max-w-md mx-auto block px-4 py-2 bg-gray/20 border border-white/10 
        rounded-lg text-white/50 placeholder:text-white/60 focus:outline-none focus:border-accent/50 font-serif text-2xl'
        />
      </div>

      <GameList games={games} isLoading={isGamesLoading} />
    </div>
  )
}
