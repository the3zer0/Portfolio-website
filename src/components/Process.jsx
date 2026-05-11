export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discovery Call',
      desc: 'We discuss your goals, audience, brand tone, and the specific style you want. I align my editing vision with your content strategy.'
    },
    {
      num: '02',
      title: 'Raw Footage',
      desc: 'You send me your raw footage, assets, and any reference videos. I analyse everything before making a single cut.'
    },
    {
      num: '03',
      title: 'Edit & Polish',
      desc: 'I craft the edit — pacing, captions, colour grade, sound design, B-roll, and effects — all optimised for maximum retention.'
    },
    {
      num: '04',
      title: 'Revise & Deliver',
      desc: 'You review and share feedback. I revise until it\'s perfect, then deliver the final file in your preferred format — ready to publish.'
    }
  ]

  return (
    <section id="process">
      <span className="section-tag fade-up">// How It Works</span>
      <h2 className="section-title fade-up">
        MY EDITING <span className="outline">PROCESS</span>
      </h2>
      <div className="process-steps">
        {steps.map((step, i) => (
          <div key={step.num} className={`process-step fade-up ${i > 0 ? `stagger-${i}` : ''}`}>
            <div className="step-num">{step.num}</div>
            <div className="step-title">{step.title}</div>
            <p className="step-desc">{step.desc}</p>
            {i < steps.length - 1 && <div className="step-arrow">→</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
