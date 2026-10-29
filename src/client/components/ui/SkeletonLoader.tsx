import type { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

interface ISkeletonLoader {
  count?: number
  style?: CSSProperties
  className?: string
}

export function SkeletonLoader({
  count = 1,
  style,
  className
}: ISkeletonLoader) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={twMerge(
            'bg-gray/50 mb-[0.65rem] h-10 animate-pulse rounded-lg last:mb-0 border border-white/25',
            className
          )}
          style={style}
        />
      ))}
    </>
  )
}
