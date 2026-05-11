export default function About() {
  const tags = [
    'Alex Hormozi Style',
    'Ali Abdaal Style',
    'Devin Jatho Reels',
    'Viral Typography',
    'YouTube Long-form',
    'Short-form Shorts',
    'Color Grading',
    'Motion Graphics'
  ]

  const styles = [
    {
      icon: '▶',
      name: 'Alex Hormozi Style',
      desc: 'Bold captions · High-energy cuts · Business-focused · Authority-building visuals'
    },
    {
      icon: '✦',
      name: 'Ali Abdaal Style',
      desc: 'Clean aesthetic · B-roll heavy · Educational flow · Cinematic color grade'
    },
    {
      icon: '⚡',
      name: 'Devin Jatho Reels',
      desc: 'Fast-paced · Hook-first · Viral transitions · Scroll-stopping openers'
    },
    {
      icon: 'T',
      name: 'Viral Typography',
      desc: 'Trending text styles · Kinetic type · Market-dominating caption formats'
    }
  ]

  return (
    <section className="about" id="about">
      <span className="section-tag fade-up">// About Me</span>
      <h2 className="section-title fade-up">
        THE EDITOR <span className="outline">BEHIND</span><br />
        YOUR GROWTH
      </h2>
      <div className="about-grid">
        <div className="about-text fade-up">
          <p>I'm <span>Jannatul Maowa Runa</span>, a video editor obsessed with one thing — <strong>making your content impossible to skip.</strong></p>
          <p>Over 4 years, I've developed a deep understanding of what keeps viewers watching — from the first second of a YouTube video to the very last frame of a reel. I've produced <strong>300+ viral short-form pieces</strong> and helped dozens of creators and business owners grow their audiences from scratch.</p>
          <p>My editing isn't just technical — it's strategic. Every cut, every caption, every sound effect is chosen to <span>increase watch time, drive engagement,</span> and ultimately grow your business.</p>
          <div className="specialty-tags">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="about-visual fade-up stagger-2">
          <div className="about-card">
            {styles.map(style => (
              <div key={style.name} className="editor-style-item">
                <div className="style-icon">{style.icon}</div>
                <div>
                  <div className="style-name">{style.name}</div>
                  <div className="style-desc">{style.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
