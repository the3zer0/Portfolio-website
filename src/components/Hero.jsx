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

export default function Hero() {
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
            {stats.map(stat => (
              <div key={stat.label} className="hero-stat">
                <div className="stat-num">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-floating" aria-hidden="true">
          {tools.map(tool => (
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
            <h2>MAOWA'S FOCUS</h2>
            <p className="featured-subtitle">Cinematic storytelling designed to capture attention, increase retention, and create lasting impact.</p>
          </div>

          <div className="featured-card fade-up">
            <div className="featured-video-wrapper">
              <div className="featured-video-art">
                <div className="featured-video-glow"></div>
                <div className="featured-video-vignette"></div>
                <div className="featured-city featured-city--left"></div>
                <div className="featured-city featured-city--right"></div>
                <div className="featured-smoke"></div>
                <div className="featured-figure"></div>
                <div className="featured-overlay-text">
                  <div className="featured-title-main">FOCUS</div>
                  <div className="featured-title-sub">THE SILENT WEAPON</div>
                </div>
                <button className="featured-play-btn" type="button" aria-label="Play video">
                  <span></span>
                </button>
              </div>

              <div className="featured-controls">
                <div className="featured-progress">
                  <span></span>
                </div>
                <div className="featured-toolbar">
                  <div className="featured-buttons">
                    <span className="featured-icon">▶</span>
                    <span className="featured-icon">⏭</span>
                    <span className="featured-icon">🔊</span>
                  </div>
                  <span className="featured-time">0:00 / 0:45</span>
                  <div className="featured-actions">
                    <span className="featured-icon">⚙</span>
                    <span className="featured-icon">⛶</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-meta">
              <span>High-retention</span> edits. 
  <span> Strong storytelling.</span> 
  <span> Real impact.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
