import { useEffect, useRef } from 'react'
import { asset } from '../utils/asset'

const tools = [
  { name: 'After Effects', logo: 'after-effects.png', className: 'logo--ae' },
  { name: 'Photoshop', logo: 'photoshop.png', className: 'logo--ps' },
  { name: 'Illustrator', logo: 'illustrator.png', className: 'logo--ai' },
  { name: 'Premiere Pro', logo: 'premiere-pro.png', className: 'logo--pr' },
]

const stats = [
  { value: '10M+', label: 'Content Views' },
  { value: '1.5+', label: 'Years Experience' },
  { value: '10+', label: 'Happy Clients' },
  { value: '3K+', label: 'Hours in Premiere' },
]

const YOUTUBE_VIDEO_ID = 'HnvYalV-BOU'
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`

export default function Hero() {
  const playerContainerRef = useRef(null)
  const ytPlayerRef = useRef(null)
  const savedTimeRef = useRef(0)
  const playerReadyRef = useRef(false)

  useEffect(() => {
    let mounted = true

    function createPlayer() {
      if (!mounted || !playerContainerRef.current || !window.YT) return
      ytPlayerRef.current = new window.YT.Player(playerContainerRef.current, {
        width: '100%',
        height: '100%',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            playerReadyRef.current = true
            try { e.target.mute(); e.target.playVideo(); } catch (err) {}
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
      window.onYouTubeIframeAPIReady = () => {
        if (mounted) createPlayer()
      }
    }

    const node = playerContainerRef.current?.closest('.featured-video-art') || playerContainerRef.current
    let observer = null
    if (node) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!ytPlayerRef.current || !playerReadyRef.current) return
          try {
            if (entry.intersectionRatio < 0.5) {
              savedTimeRef.current = ytPlayerRef.current.getCurrentTime() || 0
              ytPlayerRef.current.pauseVideo()
            } else {
              ytPlayerRef.current.seekTo(savedTimeRef.current || 0, true)
              ytPlayerRef.current.playVideo()
            }
          } catch (err) {}
        })
      }, { threshold: [0.5] })
      observer.observe(node)
    }

    return () => {
      mounted = false
      if (observer) observer.disconnect()
      if (window.onYouTubeIframeAPIReady) window.onYouTubeIframeAPIReady = null
      try { if (ytPlayerRef.current && ytPlayerRef.current.destroy) ytPlayerRef.current.destroy() } catch (err) {}
    }
  }, [])

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <span className="hero-tag fade-up">Video Editor · Content Strategist · 1.5+ Years</span>
          <h1 className="hero-name fade-up">
            MAOWA'S<br />
            <span className="yellow hero-emphasis">EDITS.</span>
          </h1>
          <p className="hero-sub fade-up">
            Crafting <span>high-retention YouTube videos</span> and <span>viral short-form content</span> that turn attention into audiences, and audiences into revenue.
          </p>
          <div className="hero-actions fade-up">
            <a href="#portfolio" className="btn-primary">View Portfolio</a>
            <a href="#contact" className="btn-outline">Start a Project</a>
          </div>
          <div className="hero-stats fade-up">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <div className="stat-num">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-floating" aria-hidden="true">
          {tools.map((tool) => (
            <div key={tool.name} className={`logo ${tool.className}`}>
              <img src={asset(tool.logo)} alt="" />
            </div>
          ))}
          <span className="hero-spark hero-spark--1"></span>
          <span className="hero-spark hero-spark--2"></span>
          <span className="hero-spark hero-spark--3"></span>
          <span className="hero-spark hero-spark--4"></span>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      <section className="featured-video" id="featured-work">
        <div className="featured-video-bg"></div>
        <div className="featured-container">
          <div className="featured-header fade-up">
            <span className="featured-label">Featured Work</span>
            <h2>MAOWA'S Best Work</h2>
            <p className="featured-subtitle">Cinematic storytelling designed to capture attention, increase retention, and create lasting impact.</p>
          </div>

          <div className="featured-card fade-up">
            <div className="featured-video-wrapper">
              <div className="featured-video-art">
                <div
                  ref={playerContainerRef}
                  className="featured-video-iframe is-ready"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>

            <div className="featured-meta">
              <span>High-retention</span> edits. <span>Strong storytelling.</span> <span>Real impact.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
