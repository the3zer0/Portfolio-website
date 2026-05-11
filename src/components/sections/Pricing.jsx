import '../../styles/sections/pricing.css'

const packages = [
  {
    tier: 'Basic',
    price: 19,
    title: 'BASIC (STARTER EDIT)',
    description: 'Clean, high-retention short-form edits optimized for Reels, TikTok, and YouTube Shorts.',
    motion: 'Basic',
    thumbnail: true,
    runtime: 1,
    revisions: 1,
    delivery: '3 days',
    fastDelivery: '24 hour Priority (+$10)',
    badge: null
  },
  {
    tier: 'Standard',
    price: 49,
    title: 'STANDARD (CONTENT BOOST)',
    description: 'Enhanced editing with motion graphics, cinematic pacing, and audience-focused storytelling.',
    motion: 'Medium',
    thumbnail: true,
    runtime: 5,
    revisions: 3,
    delivery: '4 days',
    fastDelivery: '2 Days Priority (+$20)',
    badge: 'Most Popular'
  },
  {
    tier: 'Premium',
    price: 109,
    title: 'PREMIUM (BRAND GROWTH)',
    description: 'Premium cinematic editing with advanced motion design, branding, and high-end visual polish.',
    motion: 'Advanced',
    thumbnail: true,
    runtime: 10,
    revisions: 5,
    delivery: '5 days',
    fastDelivery: '48 Hour Priority (+$40)',
    badge: null
  }
]

const featureRows = [
  { label: 'Color grading', values: ['✓', '✓', '✓'] },
  { label: 'Sound design & mixing', values: ['✓', '✓', '✓'] },
  { label: 'Motion graphics', values: ['Basic', 'Medium', 'Advanced'] },
  { label: 'Thumbnail included', values: ['✓', '✓', '✓'] },
  { label: 'Captions/Subtitles', values: ['✓', '✓', '✓'] },
  { label: 'Running time (in minutes)', values: ['1', '5', '10'] },
  { label: 'Revisions', values: ['1', '3', '5'] },
  { label: 'Delivery Time', values: ['3 days', '4 days', '5 days'] },
  { label: 'Fast Delivery', values: ['24 hour Priority (+$10)', '48 hour Priority (+$20)', '48 Hour Priority (+$40)'] }
]

export default function Pricing() {
  const whatsappNumber = '8801744641685'

  const packageButtonLabels = {
    Basic: 'GET STARTED',
    Standard: 'LET\'S CREATE',
    Premium: 'WORK WITH ME',
  }

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header fade-up">
          <div>
            <p className="pricing-kicker">PACKAGE COMPARISON</p>
            <h2 className="pricing-title">
              TRANSPARENT
              <span className="pricing-highlight"> PRICING</span>
            </h2>
            <p className="pricing-subtitle">
              Flexible pricing options designed for creators and brands, with custom plans available for projects that need a more tailored creative approach.
            </p>
          </div>
        </div>

        <div className="pricing-grid fade-up">
          {packages.map((pkg, index) => (
            <article key={pkg.tier} className={`pricing-card ${pkg.badge ? 'popular' : ''}`} style={{ animationDelay: `${index * 0.15}s` }}>
              {pkg.badge && (
                <div className="pricing-badge">
                  <span>{pkg.badge.toUpperCase()}</span>
                </div>
              )}

              <div className="pricing-card-top">
                <div className="pricing-amount">
                  <span className="pricing-currency">$</span>
                  <span className="pricing-value">{pkg.price}</span>
                  <span className="pricing-period">/video</span>
                </div>
                <h3 className="pricing-card-title">{pkg.tier}</h3>
                <p className="pricing-card-description">{pkg.title}</p>
                <p className="pricing-card-copy">{pkg.description}</p>
              </div>

              <div className="pricing-features">
                {featureRows.map((row) => {
                  const value = row.values[index]
                  const valueClassName = value === '✓' ? 'is-check' : value === '×' ? 'is-cross' : ''

                  return (
                  <div key={row.label} className="pricing-feature">
                    <span className="pricing-feature-label">{row.label}</span>
                    <span className={`pricing-feature-value ${valueClassName}`}>
                      {value}
                    </span>
                  </div>
                  )
                })}
              </div>

              <div className="pricing-card-bottom">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi 👋 I’m interested in the ${pkg.tier.toUpperCase()} package for video editing.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-button"
                >
                  {packageButtonLabels[pkg.tier] || 'GET STARTED'}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="custom-plan fade-up" style={{ animationDelay: '0.45s' }}>
          <div className="custom-plan-content">
            <div className="custom-plan-text">
              <h3 className="custom-plan-title">Need a Custom Plan?</h3>
              <p className="custom-plan-description">
                Have a unique project that doesn't fit our standard packages? Let's create a personalized solution tailored to your specific needs.
              </p>
            </div>
            <a href="#contact" className="custom-plan-button">
              Let's Discuss Your Project
              <span className="custom-plan-arrow">→</span>
            </a>
          </div>
          <div className="custom-plan-decoration"></div>
        </div>
      </div>
    </section>
  )
}
