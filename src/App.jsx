import { useEffect } from 'react'
import './styles/global.css'
import './index.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TheStory from './components/sections/TheStory'
import PortfolioEcosystem from './components/sections/PortfolioEcosystem'
import BehindTheEdits from './components/sections/BehindTheEdits'
import ClientImpact from './components/sections/ClientImpact'
import NextChapter from './components/sections/NextChapter'
import Pricing from './components/sections/Pricing'
import FAQ from './components/sections/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero />
      <TheStory />
      <PortfolioEcosystem />
      <BehindTheEdits />
      <ClientImpact />
      <NextChapter />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
