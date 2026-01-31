import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();
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
      alert(t('contact.validationError'));
      return;
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
          <h1 className="contact-page__hero-title">{t('contact.heroTitle')}</h1>
          <p className="contact-page__hero-subtitle">{t('contact.heroSubtitle')}</p>
        </div>
      </section>

      <section className="contact-page__content">
        <div className="contact-page__container">
          <div className="contact-page__info">
            <h2>{t('contact.infoTitle')}</h2>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-location-dot" />
              <div>
                <strong>{t('contact.addressLabel')}</strong>
                <p>{t('contact.address')}</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-phone" />
              <div>
                <strong>{t('contact.phone')}</strong>
                <p>{t('contact.phoneValue')}</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-envelope" />
              <div>
                <strong>{t('contact.email')}</strong>
                <p>{t('contact.emailValue')}</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <i className="fa-solid fa-clock" />
              <div>
                <strong>{t('contact.hours')}</strong>
                <p>{t('contact.hours24')}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-page__form">
            <h2>{t('contact.formTitle')}</h2>
            
            {isSubmitted && (
              <div className="contact-page__success">
                <i className="fa-solid fa-check-circle" />
                <p>{t('contact.successMsg')}</p>
              </div>
            )}

            <div className="contact-page__form-row">
              <div className="contact-page__form-group">
                <label className="contact-page__form-label">
                  {t('contact.fullName')} <span className="contact-page__required">*</span>
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
                  {t('contact.emailAddr')} <span className="contact-page__required">*</span>
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
                <label className="contact-page__form-label">{t('contact.phoneNum')}</label>
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
                <label className="contact-page__form-label">{t('contact.subject')}</label>
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
                {t('contact.messageLabel')} <span className="contact-page__required">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="contact-page__form-textarea"
                placeholder={t('contact.messagePlaceholder')}
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
                  <i className="fa-solid fa-spinner fa-spin" /> {t('contact.sending')}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" /> {t('contact.sendBtn')}
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





