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
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
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
      <div className="hero-stats fade-up">
        {stats.map(stat => (
          <div key={stat.label}>
            <div className="stat-num">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  )
}
