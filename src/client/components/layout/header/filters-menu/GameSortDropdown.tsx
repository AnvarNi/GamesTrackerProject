import type { GameSortOption } from '@client/hooks/useGameSort'
import { useEffect, useRef, useState } from 'react';

const SORT_OPTIONS: { value: GameSortOption; label: string }[] = [
  { value: 'completedAt-desc', label: 'Recently completed' },
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
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Закрытие по Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const selectedLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? 'Sort'

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          w-full sm:w-auto px-4 py-2 bg-dark border rounded-lg text-white
          font-serif text-lg flex items-center justify-between gap-3
          focus:outline-none transition-colors
          ${isOpen ? 'border-accent/50' : 'border-white/10 hover:border-white/20'}
        `}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`w-4 h-4 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Sort games"
          className="absolute z-50 mt-2 w-full sm:w-64 bg-dark border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`
                  px-4 py-2.5 cursor-pointer font-serif text-lg transition-colors
                  ${
                    isSelected
                      ? 'bg-accent/20 text-accent font-medium'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                {option.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
