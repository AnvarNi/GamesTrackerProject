import { useQueryState } from 'nuqs'
import { GENRES } from './filters-menu.data'
import cn from 'clsx'
import { useGenres } from '@client/hooks/useGenres'
import { SkeletonLoader } from '@client/components/ui/SkeletonLoader'

export function FiltersMenu() {
  const [genreSlug, setGenreSlug] = useQueryState('genre')
  const { data: genres = [], isLoading: isGenresLoading } = useGenres()

  return (
    <nav className='max-w-5xl mx-auto'>
      <ul className='flex items-center gap-12 justify-center'>
        {isGenresLoading ? <SkeletonLoader count={5}/> : genres?.map(genre => (
          <li key={genre.slug}>
            <button
              className={cn(
                'font-sans text-2xl font-medium transition-colors hover:text-accent hover:underline hover:underline-offset-5',
                {
                  'text-accent underline underline-offset-5':
                    genre.slug.toString() === genreSlug
                }
              )}
              onClick={() => {
                if(genre.slug.toString() === genreSlug) {
                  setGenreSlug(null)
                  return
                }
                setGenreSlug(genre.slug.toString())}}
            >
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
