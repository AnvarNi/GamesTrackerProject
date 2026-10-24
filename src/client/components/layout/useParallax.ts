import { useEffect, useRef } from 'react'

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 25
      mouseY = (e.clientY / window.innerHeight - 0.5) * 25
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
