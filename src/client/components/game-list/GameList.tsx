import type { TGame } from '@shared/types/game.types'
import { SkeletonLoader } from '../ui/SkeletonLoader'

interface Props {
  games: TGame[]
  isLoading: boolean
}

export function GameList({ games, isLoading }: Props) {
  return (
    <div className='grid grid-cols-4 gap-5 mt-12'>
      {isLoading ? (
        <SkeletonLoader count={8} />
      ) : (
        <>
          {games.map(game => (
            <div
              key={game.id}
              className='bg-dark/50 border-white/10 rounded-lg p-4'
            >
              <img src={game.posterUrl || ''} alt={game.title} />
              <h2 className='text-lg font-semibold mg-2'>{game.title}</h2>
              <p className='text-sm text-gray'>{game?.genre?.name}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
