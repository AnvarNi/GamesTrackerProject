import { useEffect, useRef } from 'react'

const DEAD_ZONE = 0.3
const AMPLITUDE = 15
const LERP_FACTOR = 0.015
const STOP_THRESHOLD = 0.05 
const ROTATION_SCALE = 0.05
const SCALE_VALUE = 1.03

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let rafId: number | null = null
    let isAnimating = false

    const applyDeadZone = (value: number): number => {
      const abs = Math.abs(value)
      if (abs < DEAD_ZONE) return 0
      const sign = Math.sign(value)
      return sign * ((abs - DEAD_ZONE) / (1 - DEAD_ZONE))
    }

    const updateTransform = () => {
      element.style.transform =
        `translate3d(${currentX}px,${currentY}px,0) scale(${SCALE_VALUE}) rotateX(${-currentY * ROTATION_SCALE}deg) rotateY(${currentX * ROTATION_SCALE}deg)`
    }

    const animate = () => {
      const dx = mouseX - currentX
      const dy = mouseY - currentY

      // Останавливаем цикл, когда движение практически прекратилось
      if (Math.abs(dx) < STOP_THRESHOLD && Math.abs(dy) < STOP_THRESHOLD) {
        currentX = mouseX
        currentY = mouseY
        updateTransform()
        isAnimating = false
        rafId = null
        return
      }

      currentX += dx * LERP_FACTOR
      currentY += dy * LERP_FACTOR
      updateTransform()

      rafId = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true
        rafId = requestAnimationFrame(animate)
      }
    }

    const handleMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1

      mouseX = applyDeadZone(normalizedX) * AMPLITUDE
      mouseY = applyDeadZone(normalizedY) * AMPLITUDE

      startAnimation()
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }, [])

  return ref
}