import { useState, useEffect, useRef } from 'react'
import '../styles/custom-cursor.css'

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false)
  const cursorRef = useRef(null)
  const trailRef = useRef([])
  const trailContainerRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const lastTrailTimeRef = useRef(0)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile)
    }

    // Show default cursor alongside custom trail
    document.body.style.cursor = 'auto'

    let animationFrameId

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    // Smooth animation loop with requestAnimationFrame
    const animate = () => {
      // Smooth interpolation for cursor
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 6}px, ${posRef.current.y - 6}px)`
      }

      // Add paw trail particles
      const now = Date.now()
      if (now - lastTrailTimeRef.current > 80) {
        trailRef.current.push({
          id: Math.random(),
          x: posRef.current.x,
          y: posRef.current.y,
          opacity: 0.7,
          scale: 1,
        })
        lastTrailTimeRef.current = now
      }

      // Update and remove faded trail particles
      trailRef.current = trailRef.current.filter((particle) => {
        particle.opacity *= 0.92
        particle.scale *= 0.96
        return particle.opacity > 0.05
      })

      // Update trail DOM
      if (trailContainerRef.current) {
        trailContainerRef.current.innerHTML = trailRef.current
          .map(
            (p) => `
            <div
              class="paw-print"
              style="
                left: ${p.x - 16}px;
                top: ${p.y - 16}px;
                opacity: ${p.opacity};
                transform: scale(${p.scale});
              "
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <!-- Main pad -->
                <circle cx="12" cy="16" r="4" />
                <!-- Top left toe -->
                <circle cx="4" cy="6" r="2.5" />
                <!-- Top center-left toe -->
                <circle cx="8" cy="2" r="2.5" />
                <!-- Top center-right toe -->
                <circle cx="16" cy="2" r="2.5" />
                <!-- Top right toe -->
                <circle cx="20" cy="6" r="2.5" />
              </svg>
            </div>
          `
          )
          .join('')
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Paw trail container */}
      <div
        ref={trailContainerRef}
        className="paw-trail-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="cursor-dot"
        style={{
          width: '12px',
          height: '12px',
        }}
      />
    </>
  )
}
