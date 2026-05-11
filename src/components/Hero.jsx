import { Fragment } from 'react'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <span className="hero-tag fade-up">Video Editor · Content Strategist · 1.5+ Years</span>
      <h1 className="hero-name fade-up">
        MAOWA'S<br />
        <span className="yellow hero-emphasis">EDITS.</span>
      </h1>
      <p className="hero-sub fade-up">
        Crafting <span>high-retention YouTube videos</span> and <span>viral short-form content</span> that turn attention into audiences — and audience into revenue.
      </p>
      <div className="hero-actions fade-up">
        <a href="#portfolio" className="btn-primary">View Portfolio</a>
        <a href="#contact" className="btn-outline">Start a Project</a>
      </div>
      {/* Floating tool logos (decorative) */}
      <div className="hero-floating" aria-hidden="true">
        <div className="logo logo--ae">
          <img src="/after-effects.png" alt="" />
        </div>

        <div className="logo logo--ps">
          <img src="/photoshop.png" alt="" />
        </div>

        <div className="logo logo--ai">
          <img src="/illustrator.png" alt="" />
        </div>

        <div className="logo logo--pr">
          <img src="/premiere-pro.png" alt="" />
        </div>

        <span className="hero-spark hero-spark--1"></span>
        <span className="hero-spark hero-spark--2"></span>
        <span className="hero-spark hero-spark--3"></span>
        <span className="hero-spark hero-spark--4"></span>
      </div>
      <div className="hero-stats fade-up">
        <div>
          <div className="stat-num">10M+</div>
          <div className="stat-label">CONTENT VIEWS</div>
        </div>
        <div>
          <div className="stat-num">1.5+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div>
          <div className="stat-num">10+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div>
          <div className="stat-num">3K+</div>
          <div className="stat-label">Hours in Premiere</div>
        </div>
      </div>      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  )
}
