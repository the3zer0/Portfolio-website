import { useState } from 'react'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')

  const portfolioItems = [
    { id: 1, cat: 'youtube', p: 'p1', title: 'Business Growth Breakdown', meta: 'YouTube · Alex Hormozi Style · 23 min', label: '▶ YOUTUBE LONG-FORM\nHORMOZI STYLE EDIT' },
    { id: 2, cat: 'reels', p: 'p2', title: 'Mindset Reel — 2.1M Views', meta: 'Reels · Devin Jatho Style · 45 sec', label: '⚡ VIRAL REEL\nHOOK EDIT' },
    { id: 3, cat: 'typography', p: 'p3', title: 'Typography Showcase', meta: 'Short · Kinetic Type · 30 sec', label: '✦ VIRAL\nTYPOGRAPHY EDIT' },
    { id: 4, cat: 'youtube', p: 'p4', title: 'Productivity System Deep Dive', meta: 'YouTube · Ali Abdaal Style · 18 min', label: '▶ SIT-DOWN VIDEO\nALI ABDAAL STYLE' },
    { id: 5, cat: 'reels', p: 'p5', title: 'Fitness Brand Shorts Series', meta: 'Shorts · Viral Style · 60 sec', label: '⚡ SHORT FORM\nVIRAL SERIES' },
    { id: 6, cat: 'typography', p: 'p6', title: 'Caption Motion Pack', meta: 'Typography · Brand Kit · Multi', label: 'T ANIMATED\nCAPTIONS PACK' }
  ]

  const filters = ['all', 'youtube', 'reels', 'typography']

  return (
    <section className="portfolio" id="portfolio">
      <span className="section-tag fade-up">// My Work</span>
      <h2 className="section-title fade-up">
        PORTFOLIO <span className="outline">THAT</span><br />
        SPEAKS NUMBERS
      </h2>
      <div className="portfolio-filter fade-up">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Work' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="portfolio-grid" id="portfolioGrid">
        {portfolioItems.map((item, i) => {
          const show = filter === 'all' || item.cat === filter
          return (
            <div
              key={item.id}
              className={`portfolio-item ${item.p} fade-up ${i > 0 ? `stagger-${Math.min(i, 3)}` : ''}`}
              data-cat={item.cat}
              style={{ opacity: show ? 1 : 0.2, pointerEvents: show ? 'auto' : 'none' }}
            >
              <div className="portfolio-thumb">
                <div className="thumb-label">{item.label}</div>
              </div>
              <div className="portfolio-play">▶</div>
              <div className="portfolio-overlay">
                <div className="portfolio-title">{item.title}</div>
                <div className="portfolio-meta">{item.meta}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
