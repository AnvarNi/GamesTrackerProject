import { cn } from '@client/utils/cn'
import type { TGame } from '@shared/types/game.types'
import { MessageSquareText, X } from 'lucide-react'
import { useState } from 'react'

interface Props {
  game: TGame
}

export function GameCard({ game }: Props) {
  const [isShowReview, setIsShowReview] = useState(false)

  return (
    <div className='group relative aspect-3/4 rounded-xl overflow-hidden border border-accent/30'>
      <img
        src={game.posterUrl || '/images/placeholder.jpg'}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
      />

      <div className='absolute inset-0 bg-linear-to-t from-dark via-dark/40 to-transparent' />

      {game.review && (
        <button
          onClick={() => setIsShowReview(true)}
          className='absolute top-3 right-3 mt-12 p-1.5 bg-dark/60 backdrop-blur-sm rounded-lg border border-accent/30 opacity-50 hover:opacity-100
        hover:border-accent transition-all group/btn'
          title='My Review'
        >
          <MessageSquareText className='w-4 h-4 text-white group-hover/btn:accent-accent group-hover/btn:text-accent' />
        </button>
      )}

      {game.metaScore && (
        <div
          className='absolute top-3 left-3 bg-dark/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-accent/30'
          title={`Metacritic: ${game.metaScore} of 100`}
        >
          <span className='text-white/50 font-serif text-lg'>Mc: </span>
          <span
            className={cn(
              'text-accent font-bold font-serif text-xl',
              game.metaScore >= 61
                ? 'text-green-500'
                : game.metaScore >= 40
                  ? 'text-yellow-500'
                  : 'text-red-500'
            )}
          >
            {game.metaScore || '—'}
          </span>
        </div>
      )}

      <div
        className='absolute top-3 right-3 bg-dark/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-accent/30'
        title={`My Score: ${game.myScore} of 10`}
      >
        <span className='text-accent font-bold font-serif text-2xl'>
          {game.myScore}
        </span>
        <span className='text-white/50 font-serif text-2xl'>/10</span>
      </div>

      <div className='absolute bottom-0 left-0 right-0 p-4'>
        <span className='text-accent/80 text=xs uppercase tracking-wider'>
          {game.genre?.name}
        </span>
        <h3 className='font-sans text-xl font-semibold mt-1 transition-colors'>
          {game.title}
        </h3>

        <div className='flex items-center gap-3 mt-2 text-sm text-white/50'>
          <span>{game.platform}</span>
          {game.completedAt && (
            <span>
              Completed:{' '}
              {new Date(game.completedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      </div>

      {isShowReview && (
        <div
          className='absolute inset-0 bg-dark/95 backdrop-blur-sm p-4 flex flex-col animate-in fade-in duration-200'
          onClick={() => setIsShowReview(false)}
        >
          <button
            onClick={() => setIsShowReview(false)}
            className='absolute top-3 right-3 p-1 hover:bg-white/10 rounded-lg transition-colors'
          >
            <X className='w-5 h-5 text-gray hover:text-white' />
          </button>

          <h4 className='font-serif text-accent text-2xl mb-3'>My Review</h4>
          <p className='text-white text-lg leading-relaxed overflow-y-auto font-serif'>
            {game.review}
          </p>
        </div>
      )}
    </div>
  )
}
