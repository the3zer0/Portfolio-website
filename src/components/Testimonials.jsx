export default function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      text: 'Maowa completely transformed our YouTube channel. Our average view duration went from 3 minutes to over 9 minutes after switching to his editing style. He genuinely understands retention.',
      avatar: 'MK',
      name: 'Mehdi Karim',
      role: 'Business Coach · YouTube Creator'
    },
    {
      stars: '★★★★★',
      text: 'Our reels went from 2K to 800K views after Maowa took over. The typography style he uses is on another level — clients message us asking who does our editing every single day.',
      avatar: 'SA',
      name: 'Sarah Alsaid',
      role: 'Brand Founder · Instagram Creator'
    },
    {
      stars: '★★★★★',
      text: 'Best investment I made for my content. He thinks like a strategist, not just an editor. The way he structures the pacing in my sit-down videos is exactly the Hormozi energy I wanted.',
      avatar: 'RF',
      name: 'Rafiq Farhan',
      role: 'Entrepreneur · Content Creator'
    }
  ]

  return (
    <section className="testimonials" id="testimonials">
      <span className="section-tag fade-up">// Client Words</span>
      <h2 className="section-title fade-up">
        WHAT CLIENTS <span className="outline">SAY</span>
      </h2>
      <div className="testimonials-grid">
        {testimonials.map((testi, i) => (
          <div key={testi.name} className={`testimonial-card fade-up ${i > 0 ? `stagger-${i}` : ''}`}>
            <div className="testimonial-stars">{testi.stars}</div>
            <p className="testimonial-text">{testi.text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">{testi.avatar}</div>
              <div>
                <div className="author-name">{testi.name}</div>
                <div className="author-role">{testi.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
