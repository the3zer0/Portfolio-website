import '../styles/whatsapp-float.css'

export default function FloatingWhatsApp() {
  const phone = '8801744641685'
  const message = 'Hi Maowa, I\'m interested in your video editing services.'
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <span className="wa-float-ring" aria-hidden="true" />
      <img src="/whatsapp.svg" alt="" aria-hidden="true" className="wa-float-icon" />
    </a>
  )
}
