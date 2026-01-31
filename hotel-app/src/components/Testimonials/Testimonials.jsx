import React from 'react'
import './Testimonials.css'

const testimonials = [
  { name: 'Sophia M.', country: 'USA', date: 'Sep 2025', rating: 5, comment: 'An unforgettable stay! The staff went above and beyond to make our anniversary special.', tag: 'Stayed in Deluxe Suite' },
  { name: 'Liam O.', country: 'Ireland', date: 'Aug 2025', rating: 5, comment: 'Beautiful rooms and the infinity pool views are stunning. Highly recommended!', tag: 'Family Vacation' },
  { name: 'Aisha K.', country: 'UAE', date: 'Jul 2025', rating: 4.5, comment: 'Loved the spa and breakfast buffet. Will definitely return.', tag: 'Wellness Escape' },
]

function Star({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div className="testimonials__rating">
      {Array.from({ length: full }).map((_, i) => (<i key={`f-${i}`} className="fa-solid fa-star" />))}
      {half && <i className="fa-solid fa-star-half-stroke" />}
    </div>
  )
}

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonials__card">
            <div className="testimonials__header">
              <div className="testimonials__avatar">
                {t.name.split(' ').map(p => p[0]).join('')}
              </div>
              <div>
                <div className="testimonials__name">{t.name}</div>
                <div className="testimonials__meta">{t.country} • {t.date}</div>
              </div>
            </div>
            <Star value={t.rating} />
            <p className="testimonials__comment">{t.comment}</p>
            <div className="testimonials__tag">{t.tag}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials

