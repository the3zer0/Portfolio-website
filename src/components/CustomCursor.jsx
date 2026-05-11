import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 })
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Don't initialize cursor effects on mobile
    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile)
    }

    let mx = 0, my = 0, rx = 0, ry = 0

    const handleMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      setPosition({ x: mx - 6, y: my - 6 })
    }

    const updateRing = setInterval(() => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      setRingPosition({ x: rx - 18, y: ry - 18 })
    }, 16)

    document.addEventListener('mousemove', handleMouseMove)

    document.querySelectorAll('a,button,.portfolio-item,.service-card,.tag').forEach(el => {
      el.addEventListener('mouseenter', () => setIsExpanded(true))
      el.addEventListener('mouseleave', () => setIsExpanded(false))
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearInterval(updateRing)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  // Hide cursor effect on mobile
  if (isMobile) {
    return null
  }

  return (
    <>
      <div
        className={`cursor ${isExpanded ? 'expand' : ''}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div
        className={`cursor-ring ${isExpanded ? 'expand' : ''}`}
        style={{ transform: `translate(${ringPosition.x}px, ${ringPosition.y}px)` }}
      />
    </>
  )
}
