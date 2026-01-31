import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './TestimonialsPage.css';

function Star({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="testimonials-page__rating">
      {Array.from({ length: full }).map((_, i) => (<i key={`f-${i}`} className="fa-solid fa-star" />))}
      {half && <i className="fa-solid fa-star-half-stroke" />}
    </div>
  );
}

function TestimonialsPage() {
  const { t } = useTranslation();
  
  const guestList = [
    { key: 'sophia', rating: 5, avatar: 'SM' },
    { key: 'liam', rating: 5, avatar: 'LO' },
    { key: 'aisha', rating: 4.5, avatar: 'AK' },
  ];
  return (
    <div>
      <section className="testimonials-page__hero">
        <div className="testimonials-page__hero-overlay" />
        <div className="testimonials-page__hero-content">
          <h1 className="testimonials-page__hero-title">{t('testimonials.heroTitle')}</h1>
          <p className="testimonials-page__hero-subtitle">{t('testimonials.heroSubtitle')}</p>
        </div>
      </section>

      <section className="testimonials-page__content">
        <div className="testimonials-page__grid">
          {guestList.map((g) => (
            <div key={g.key} className="testimonials-page__card">
              <div className="testimonials-page__header">
                <div className="testimonials-page__avatar">{g.avatar}</div>
                <div>
                  <div className="testimonials-page__name">{t(`testimonials.list.${g.key}.name`)}</div>
                  <div className="testimonials-page__meta">
                    {t(`testimonials.list.${g.key}.country`)} • {t(`testimonials.list.${g.key}.date`)}
                  </div>
                </div>
              </div>
              <Star value={g.rating} />
              <p className="testimonials-page__comment">{t(`testimonials.list.${g.key}.comment`)}</p>
              <div className="testimonials-page__tag">{t(`testimonials.list.${g.key}.tag`)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-page__stats">
        <div className="testimonials-page__stats-text">{t('testimonials.statsText')}</div>
        <div className="testimonials-page__stats-icons">
          <i className="fa-brands fa-google" />
          <i className="fa-solid fa-b" />
          <i className="fa-brands fa-tripadvisor" />
        </div>
      </section>

      <section className="testimonials-page__cta">
        <Link to="/rooms" className="testimonials-page__cta-link">{t('testimonials.bookCta')}</Link>
      </section>
    </div>
  )
}

export default TestimonialsPage


