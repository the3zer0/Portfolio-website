import { useState, useEffect } from 'react'
import '../styles/navbar.css'

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (    <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
      <a href="#home" className="nav-logo">
        MAO<span>WA</span>.ME
      </a>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a href="#story" onClick={() => setMenuOpen(false)}>Story</a>
        <a href="#portfolio" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Let's Work Together
        </a>
      </div>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}