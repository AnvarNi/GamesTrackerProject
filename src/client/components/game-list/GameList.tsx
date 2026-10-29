import type { TGame } from '@shared/types/game.types'
import { SkeletonLoader } from '../ui/SkeletonLoader'
import { GameCard } from './GameCard'

interface Props {
  games: TGame[]
  isLoading: boolean
}

export function GameList({ games, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className='grid grid-cols-5 gap-5 mt-12'>
        <SkeletonLoader count={5} className='w-76.75 h-102.25'/>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-5 gap-8 py-12'>
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
