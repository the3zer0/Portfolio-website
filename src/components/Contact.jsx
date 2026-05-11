import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    user_email: '',
    service: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null) // null | 'sending' | 'sent' | 'failed'
  const form = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitStatus === 'sending') return

    const { name, user_email, message } = formData
    const emailRegex = /\S+@\S+\.\S+/

    if (!name.trim() || !user_email.trim() || !message.trim() || !emailRegex.test(user_email)) {
      setSubmitStatus('failed')
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }

    setSubmitStatus('sending')

    emailjs.sendForm(
      'service_7lnpz6s',
      'template_s151ndh',
      form.current,
      'wCh7FXXSwtdAl1S_l'
    ).then(() => {
      setSubmitStatus('sent')
      setFormData({ name: '', user_email: '', service: '', message: '' })
      if (form.current) form.current.reset()
      setTimeout(() => setSubmitStatus(null), 3000)
    }).catch(() => {
      setSubmitStatus('failed')
      setTimeout(() => setSubmitStatus(null), 3000)
    })
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-header">
        <h2 className="contact-title">
          READY TO CREATE <span className="contact-highlight">SOMETHING UNFORGETTABLE </span>?
        </h2>
        <p className="contact-subtitle">Let's collaborate and turn your ideas into  cinematic content designed to capture attention, tell meaningful stories, and leave lasting impact.</p>
        <div className="contact-divider"></div>
      </div>

      <div className="contact-wrapper">
      

        <form ref={form} className="contact-form fade-up stagger-1" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                name="user_email"
                value={formData.user_email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="WhatsApp"
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Subject"
              name="service"
              value={formData.service}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-textarea"
              placeholder="Message"
              name="message"
              value={formData.message}
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="contact-submit" disabled={submitStatus === 'sending'}>
            {submitStatus === 'sending' ? 'SENDING…' : submitStatus === 'sent' ? 'SENT ✓' : submitStatus === 'failed' ? 'FAILED ✕' : 'SEND'}
          </button>
        </form>
      </div>

      <div className="contact-info-grid fade-up stagger-2">
        <div className="contact-item">
          <div className="contact-icon">✉</div>
          <div>
            <div className="contact-label">Email</div>
            <div className="contact-value">jannatulmaowa.me@gmail.com</div>
          </div>
        </div>        <div className="contact-item">
          <div className="contact-icon">
            <img src="/instagram.png" alt="Instagram" />
          </div>
          <div>
            <div className="contact-label">Instagram</div>
            <div className="contact-value">@meaw_maowa</div>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-icon">
            <img src="/response.png" alt="Response Time" />
          </div>
          <div>
            <div className="contact-label">Response Time</div>
            <div className="contact-value">Within 24 Hours</div>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-icon">
            <img src="/location.png" alt="Location" />
          </div>
          <div>
            <div className="contact-label">Location</div>
            <div className="contact-value">Dhaka, Bangladesh · Remote Worldwide</div>
          </div>
        </div>
      </div>
    </section>
  )
}
