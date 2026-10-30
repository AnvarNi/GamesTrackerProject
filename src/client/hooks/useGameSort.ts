import type { TGame } from '@shared/types/game.types'
import { useMemo, useState } from 'react'

export type GameSortOption =
  | 'completedAt-desc'
  | 'completedAt-asc'
  | 'myScore-desc'
  | 'myScore-asc'
  | 'metaScore-desc'
  | 'metaScore-asc'

function getCompletedAtTimestamp(value: TGame['completedAt']): number {
  return value instanceof Date ? value.getTime() : Date.parse(String(value))
}

function sortGames(games: TGame[], sortOption: GameSortOption): TGame[] {
  const [sortBy, direction] = sortOption.split('-') as [
    'completedAt' | 'myScore' | 'metaScore',
    'asc' | 'desc'
  ]
  const directionMultiplier = direction === 'asc' ? 1 : -1

  return [...games].sort((first, second) => {
    if (sortBy === 'completedAt') {
      return (
        (getCompletedAtTimestamp(first.completedAt) -
          getCompletedAtTimestamp(second.completedAt)) *
        directionMultiplier
      )
    }

    const firstValue = first[sortBy]
    const secondValue = second[sortBy]

    if (firstValue === null) return secondValue === null ? 0 : 1
    if (secondValue === null) return -1

    return (firstValue - secondValue) * directionMultiplier
  })
}

export function useGameSort(games: TGame[]) {
  const [sortOption, setSortOption] =
    useState<GameSortOption>('completedAt-desc')
  const sortedGames = useMemo(
    () => sortGames(games, sortOption),
    [games, sortOption]
  )

  return { sortOption, setSortOption, sortedGames }
}
