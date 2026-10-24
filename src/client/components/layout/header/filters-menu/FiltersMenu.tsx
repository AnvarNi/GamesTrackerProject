import { GENRES } from './filters-menu.data'
import cn from 'clsx'

const ACTIVE_ID = 'action'

export function FiltersMenu() {
  return (
    <nav className='max-w-5xl mx-auto'>
      <ul className='flex items-center gap-12 justify-center'>
        {GENRES.map(genre => (
          <li key={genre.id}>
            <button
              className={cn(
                'font-sans text-2xl font-medium transition-colors hover:text-accent hover:underline hover:underline-offset-5',
                {
                  'text-accent underline underline-offset-5':
                    genre.id === ACTIVE_ID
                }
              )}
            >
              {genre.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
