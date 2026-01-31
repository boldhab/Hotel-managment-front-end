import React from 'react'
import { Link } from 'react-router-dom'
import './TestimonialsPage.css'

const testimonials = [
  { name: 'Sophia M.', country: 'USA', date: 'Sep 2025', rating: 5, comment: 'An unforgettable stay! The staff went above and beyond to make our anniversary special.', tag: 'Stayed in Deluxe Suite' },
  { name: 'Liam O.', country: 'Ireland', date: 'Aug 2025', rating: 5, comment: 'Beautiful rooms and the infinity pool views are stunning. Highly recommended!', tag: 'Family Vacation' },
  { name: 'Aisha K.', country: 'UAE', date: 'Jul 2025', rating: 4.5, comment: 'Loved the spa and breakfast buffet. Will definitely return.', tag: 'Wellness Escape' },
]

function Star({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div className="testimonials-page__rating">
      {Array.from({ length: full }).map((_, i) => (<i key={`f-${i}`} className="fa-solid fa-star" />))}
      {half && <i className="fa-solid fa-star-half-stroke" />}
    </div>
  )
}

function TestimonialsPage() {
  return (
    <div>
      <section className="testimonials-page__hero">
        <div className="testimonials-page__hero-overlay" />
        <div className="testimonials-page__hero-content">
          <h1 className="testimonials-page__hero-title">What Our Guests Say</h1>
          <p className="testimonials-page__hero-subtitle">Rated 4.9/5 from travelers around the world.</p>
        </div>
      </section>

      <section className="testimonials-page__content">
        <div className="testimonials-page__grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonials-page__card">
              <div className="testimonials-page__header">
                <div className="testimonials-page__avatar">
                  {t.name.split(' ').map(p => p[0]).join('')}
                </div>
                <div>
                  <div className="testimonials-page__name">{t.name}</div>
                  <div className="testimonials-page__meta">{t.country} • {t.date}</div>
                </div>
              </div>
              <Star value={t.rating} />
              <p className="testimonials-page__comment">{t.comment}</p>
              <div className="testimonials-page__tag">{t.tag}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-page__stats">
        <div className="testimonials-page__stats-text">Average 4.9 / 5 across 450+ reviews.</div>
        <div className="testimonials-page__stats-icons">
          <i className="fa-brands fa-google" />
          <i className="fa-solid fa-b" />
          <i className="fa-brands fa-tripadvisor" />
        </div>
      </section>

      <section className="testimonials-page__cta">
        <Link to="/book" className="testimonials-page__cta-link">Experience It Yourself — Book Now</Link>
      </section>
    </div>
  )
}

export default TestimonialsPage


