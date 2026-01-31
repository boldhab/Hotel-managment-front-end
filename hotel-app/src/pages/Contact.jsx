import React, { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields (Name, Email, and Message).')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1000)
  }

  return (
    <div>
      <section className="contact-page__hero">
        <div className="contact-page__hero-overlay" />
        <div className="contact-page__hero-content">
          <h1 className="contact-page__hero-title">Get In Touch</h1>
          <p className="contact-page__hero-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      <section className="contact-page__content">
        <div className="contact-page__container">
          <div className="contact-page__info">
            <h2>Contact Information</h2>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-location-dot" />
              <div>
                <strong>Address</strong>
                <p>123 Luxury Hotel Street<br />City, State 12345</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-phone" />
              <div>
                <strong>Phone</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-envelope" />
              <div>
                <strong>Email</strong>
                <p>hello@hotel.example</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-clock" />
              <div>
                <strong>Hours</strong>
                <p>24/7 Front Desk<br />Reception Available</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-page__form">
            <h2>Send Us a Message</h2>
            
            {isSubmitted && (
              <div className="contact-page__success">
                <i className="fa-solid fa-check-circle" />
                <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            )}

            <div className="contact-page__form-row">
              <div className="contact-page__form-group">
                <label className="contact-page__form-label">
                  Full Name <span className="contact-page__required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-page__form-input"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="contact-page__form-group">
                <label className="contact-page__form-label">
                  Email Address <span className="contact-page__required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-page__form-input"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="contact-page__form-row">
              <div className="contact-page__form-group">
                <label className="contact-page__form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contact-page__form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="contact-page__form-group">
                <label className="contact-page__form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-page__form-input"
                  placeholder="General Inquiry"
                />
              </div>
            </div>

            <div className="contact-page__form-group contact-page__form-group--full">
              <label className="contact-page__form-label">
                Message <span className="contact-page__required">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="contact-page__form-textarea"
                placeholder="Tell us how we can help you..."
                rows="6"
                required
              />
            </div>

            <button
              type="submit"
              className="contact-page__form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" /> Sending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact





