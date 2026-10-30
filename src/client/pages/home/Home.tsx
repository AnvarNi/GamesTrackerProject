import { useQueryState } from 'nuqs'
import { useGames } from '../../hooks/useGames'
import { GameList } from '../../components/game-list/GameList'
import { useDebounce } from '../../hooks/useDebounce'
import { FiltersMenu } from '@client/components/layout/header/filters-menu/FiltersMenu'
import { GameSortDropdown } from '@client/components/layout/header/filters-menu/GameSortDropdown'
import { useGameSort } from '@client/hooks/useGameSort'

export default function Home() {
  const [genreSlug] = useQueryState('genre')
  const [searchTerm, setSearchTerm] = useQueryState('search')
  const debounceSearch = useDebounce(searchTerm, 500)
  const { data: games = [], isLoading: isGamesLoading } = useGames({
    genreSlug,
    searchTerm: debounceSearch
  })
  const { sortOption, setSortOption, sortedGames } = useGameSort(games)

  return (
    <div>
      <FiltersMenu />
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4'>
        <div className='sm:col-start-2'>
          <input
            type='text'
            placeholder='Search games I have completed...'
            value={searchTerm ?? ''}
            onChange={e => setSearchTerm(e.target.value || null)}
            className='w-full max-w-md mx-auto block px-4 py-2 bg-gray/20 border border-white/10
        rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-accent/50 font-serif text-2xl'
          />
        </div>
        <div className='sm:col-start-3 sm:justify-self-end'>
          <GameSortDropdown value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      <GameList games={sortedGames} isLoading={isGamesLoading} />
    </div>
  )
}
