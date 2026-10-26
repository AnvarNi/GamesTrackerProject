import { useEffect, useRef } from 'react'

const DEAD_ZONE = 0.3

const AMPLITUDE = 15

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    
    const applyDeadZone = (value: number) => {
      const abs = Math.abs(value)

      if (abs < DEAD_ZONE) return 0

      const sign = Math.sign(value)
      const normalized = (abs - DEAD_ZONE) / (1 - DEAD_ZONE)

      return sign * normalized
    }

    const handleMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1

      mouseX = applyDeadZone(normalizedX) * AMPLITUDE
      mouseY = applyDeadZone(normalizedY) * AMPLITUDE
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.03
      currentY += (mouseY - currentY) * 0.03

      element.style.transform = `
      translate3d(${currentX}px, ${currentY}px, 0)
      scale(1.03)
      rotateX(${currentY * -0.05}deg)
      rotateY(${currentX * 0.05}deg)
      `

      requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove', handleMove)
    requestAnimationFrame(animate)

    return () => window.removeEventListener('mousemove', handleMove)
  }, [])
  return ref
}
