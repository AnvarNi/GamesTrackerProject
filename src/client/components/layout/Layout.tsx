import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'
import { useParallax } from './useParallax'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  const bgRef = useParallax()

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div ref={bgRef} className='absolute inset-0 will-change-transform'>
        <img
          src='/images/ds-bg.webp'
          alt=''
          className='absolute inset-0 w-full h-full object-cover contrast-160 saturate-120'
          draggable='false'
        />
      </div>

      <div className='absolute inset-0 bg-linear-to-b from-dark/60 via-transparent to-transparent' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_48%_100%,rgba(255,140,40,0.45),rgba(255,100,20,0.15)_25%,transparent_35%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.8)_100%)]' />

      <div className='relative z-10'>
        <div className='container mx-auto max-w-450'>
          <Header />
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
