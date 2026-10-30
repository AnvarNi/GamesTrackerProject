import type { GameSortOption } from '@client/hooks/useGameSort'

const SORT_OPTIONS: { value: GameSortOption; label: string }[] = [
  { value: 'completedAt-desc', label: 'Recently completed' },
  { value: 'completedAt-asc', label: 'First completed' },
  { value: 'myScore-desc', label: 'My score: highest first' },
  { value: 'myScore-asc', label: 'My score: lowest first' },
  { value: 'metaScore-desc', label: 'Metacritic: highest first' },
  { value: 'metaScore-asc', label: 'Metacritic: lowest first' }
]

interface Props {
  value: GameSortOption
  onChange: (value: GameSortOption) => void
}

export function GameSortDropdown({ value, onChange }: Props) {
  return (
    <select
      aria-label='Sort games'
      value={value}
      onChange={event => {
        const selectedOption = SORT_OPTIONS.find(
          option => option.value === event.currentTarget.value
        )

        if (selectedOption) {
          onChange(selectedOption.value)
        }
      }}
      className='w-full sm:w-auto px-4 py-2 bg-dark border border-white/10 rounded-lg text-white
        focus:outline-none focus:border-accent/50 font-serif text-lg'
    >
      {SORT_OPTIONS.map(option => (
        <option key={option.value} value={option.value} className='bg-dark'>
          {option.label}
        </option>
      ))}
    </select>
  )
}
