import { useEffect, useRef, useState } from 'react'
import { asset } from '../utils/asset'
import { registerYouTubeIframeAPIReady } from '../utils/youtubeApi'

const tools = [
  { name: 'After Effects', logo: 'after-effects.png', className: 'logo--ae' },
  { name: 'Photoshop', logo: 'photoshop.png', className: 'logo--ps' },
  { name: 'Illustrator', logo: 'illustrator.png', className: 'logo--ai' },
  { name: 'Premiere Pro', logo: 'premiere-pro.png', className: 'logo--pr' },
]

const stats = [
  { value: '22k+', label: 'Content Views' },
  { value: '1.5+', label: 'Years Experience' },
  { value: '55+', label: 'Creative Projects' },
  { value: '3K+', label: 'Hours in Premiere' },
]

const YOUTUBE_VIDEO_ID = 'HnvYalV-BOU'
export default function Hero() {
  const featuredSectionRef = useRef(null)
  const playerContainerRef = useRef(null)
  const ytPlayerRef = useRef(null)
  const savedTimeRef = useRef(0)
  const playerReadyRef = useRef(false)
  const observerRef = useRef(null)
  const apiLoadingRef = useRef(false)

  const [playerCreated, setPlayerCreated] = useState(false)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)

  useEffect(() => {
    let mounted = true

    const ensurePlayer = () => {
      if (ytPlayerRef.current || !playerContainerRef.current || !window.YT || !window.YT.Player) return

      try {
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
            iv_load_policy: 3,
          },
          events: {
            onReady: (e) => {
              if (!mounted) return
              playerReadyRef.current = true
              setPlayerCreated(true)
              try { e.target.mute() } catch (err) {}
              try {
                e.target.seekTo(savedTimeRef.current || 0, true)
                e.target.playVideo()
              } catch (err) {}
            },
            onError: () => {
              // Keep poster visible if the player fails to initialize.
              ytPlayerRef.current = null
            },
          },
        })
      } catch (err) {
        ytPlayerRef.current = null
      }
    }

    const playFromSavedTime = () => {
      if (!ytPlayerRef.current || !playerReadyRef.current) return
      try {
        ytPlayerRef.current.seekTo(savedTimeRef.current || 0, true)
        ytPlayerRef.current.playVideo()
      } catch (err) {}
    }

    const pauseAndStoreTime = () => {
      if (!ytPlayerRef.current || !playerReadyRef.current) return
      try {
        savedTimeRef.current = ytPlayerRef.current.getCurrentTime() || 0
        ytPlayerRef.current.pauseVideo()
      } catch (err) {}
    }

    const handleVisibility = (entries) => {
      entries.forEach((entry) => {
        if (!mounted) return

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          setIsPlayerVisible(true)
          if (!ytPlayerRef.current) {
            if (!apiLoadingRef.current) {
              apiLoadingRef.current = true
              const tag = document.createElement('script')
              tag.src = 'https://www.youtube.com/iframe_api'
              document.body.appendChild(tag)
              registerYouTubeIframeAPIReady(() => {
                apiLoadingRef.current = false
                ensurePlayer()
              })
            }
          } else {
            playFromSavedTime()
          }
        } else {
          setIsPlayerVisible(false)
          pauseAndStoreTime()
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleVisibility, {
      threshold: [0, 0.55, 1],
      rootMargin: '0px 0px -10% 0px',
    })

    if (featuredSectionRef.current) {
      observerRef.current.observe(featuredSectionRef.current)
    }

    return () => {
      mounted = false
      try { observerRef.current?.disconnect() } catch (err) {}
      try { if (ytPlayerRef.current && ytPlayerRef.current.destroy) ytPlayerRef.current.destroy() } catch (err) {}
    }
  }, [])

  const handlePlayClick = () => {
    if (ytPlayerRef.current && playerReadyRef.current) {
      try {
        ytPlayerRef.current.seekTo(savedTimeRef.current || 0, true)
        ytPlayerRef.current.playVideo()
      } catch (err) {}
      return
    }

    if (!apiLoadingRef.current) {
      apiLoadingRef.current = true
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
      registerYouTubeIframeAPIReady(() => {
        apiLoadingRef.current = false
        if (!ytPlayerRef.current) {
          const node = playerContainerRef.current
          if (!node || !window.YT || !window.YT.Player) return
          try {
            ytPlayerRef.current = new window.YT.Player(node, {
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
                iv_load_policy: 3,
              },
              events: {
                onReady: (e) => {
                  playerReadyRef.current = true
                  setPlayerCreated(true)
                  try { e.target.mute() } catch (err) {}
                  try {
                    e.target.seekTo(savedTimeRef.current || 0, true)
                    e.target.playVideo()
                  } catch (err) {}
                },
              },
            })
          } catch (err) {}
        }
      })
    }
  }



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

      <section className="featured-video" id="featured-work" ref={featuredSectionRef}>
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
                {/* Poster + play overlay as a fallback until the player is ready */}
                {!playerCreated && (
                  <>
                    <button
                      type="button"
                      className="featured-play-btn"
                      onClick={handlePlayClick}
                      aria-label="Play featured video"
                    >
                      <span />
                    </button>

                    <button
                      type="button"
                      className="featured-video-poster"
                      onClick={handlePlayClick}
                      aria-label="Play featured video"
                    >
                      <img
                        className="featured-thumb"
                        src={`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                        alt="Featured video thumbnail"
                      />
                    </button>
                  </>
                )}

                <div
                  ref={playerContainerRef}
                  className={`featured-video-iframe ${playerCreated ? 'is-ready' : ''}`}
                  style={{ width: '100%', height: '100%', opacity: isPlayerVisible || playerCreated ? 1 : 0 }}
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
