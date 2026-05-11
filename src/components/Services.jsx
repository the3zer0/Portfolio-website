export default function Services() {
  const services = [
    {
      num: '01',
      icon: '📺',
      title: 'YouTube Long-Form',
      desc: 'High-retention editing for sit-down and talking-head videos. Every edit engineered to maximize watch time and subscriber growth.',
      features: ['Hormozi & Abdaal style', 'Custom intros & outros', 'Color grading & sound design', 'Animated captions']
    },
    {
      num: '02',
      icon: '🎬',
      title: 'Reels & Shorts',
      desc: '300+ viral reels crafted. I know what stops the scroll — and I\'ll apply that knowledge to every short-form piece for your brand.',
      features: ['Devin Jatho viral style', 'Hook engineering', 'Trending music & SFX', 'Platform-native formats']
    },
    {
      num: '03',
      icon: '✍️',
      title: 'Viral Typography',
      desc: 'The hottest trend in content right now — kinetic captions and text animations that make your message impossible to ignore.',
      features: ['Market-leading caption styles', 'Animated word highlights', 'Brand-aligned typography', 'Trending text formats']
    },
    {
      num: '04',
      icon: '🎨',
      title: 'Brand Video Package',
      desc: 'Complete content system for businesses — from long YouTube videos to a full month of shorts, all with consistent brand identity.',
      features: ['Dedicated brand style guide', 'Monthly retainer available', 'Priority turnaround', 'Revision rounds included']
    }
  ]

  return (
    <section id="services">
      <span className="section-tag fade-up">// What I Do</span>
      <h2 className="section-title fade-up">
        SERVICES BUILT <span className="outline">FOR</span><br />
        RESULTS
      </h2>
      <div className="services-grid">
        {services.map((service, i) => (
          <div key={service.num} className={`service-card fade-up ${i > 0 ? `stagger-${Math.min(i, 3)}` : ''}`}>
            <div className="service-num">{service.num}</div>
            <div className="service-icon">{service.icon}</div>
            <div className="service-title">{service.title}</div>
            <p className="service-desc">{service.desc}</p>
            <div className="service-features">
              {service.features.map(feature => (
                <span key={feature} className="service-feature">{feature}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
