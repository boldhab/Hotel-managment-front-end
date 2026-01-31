import React from 'react'
import { Link } from 'react-router-dom'
import './AmenitiesPage.css'

function AmenitiesPage() {
  return (
    <div>
      <section className="amenities-page__hero">
        <div className="amenities-page__hero-overlay" />
        <div className="amenities-page__hero-content">
          <h1 className="amenities-page__hero-title">Unwind in Comfort</h1>
          <p className="amenities-page__hero-subtitle">Every detail crafted for your perfect stay.</p>
        </div>
      </section>

      <section className="amenities-page__content">
        <div className="amenities-page__grid">
          {[
            { title: 'Room Comforts', items: ['King beds', 'Smart climate control', 'Luxury linens'], img: '/images/amenties/room-comforts.jpg' },
            { title: 'Wellness & Spa', items: ['Massages', 'Sauna', 'Gym & Yoga'], img: '/images/amenties/wellness-spa.jpg' },
            { title: 'Dining & Bars', items: ['On-site restaurant', 'Rooftop lounge', 'Breakfast buffet'], img: '/images/offer/bining-bars.jpg' },
            { title: 'Outdoor & Leisure', items: ['Pool', 'Garden', 'Bike rentals'], img: '/images/amenties/outdoor-leisure.jpg' },
            { title: 'Business & Events', items: ['Meeting rooms', 'Conference hall', 'Coworking'], img: '/images/amenties/business-events.jpg' },
            { title: 'Family-Friendly', items: ["Kids' pool", 'Babysitting', 'Family suites'], img: '/images/offer/family-friendly.jpg' },
          ].map((c) => (
            <div key={c.title} className="amenities-page__card">
              <div className="amenities-page__card-image" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="amenities-page__card-body">
                <h3 className="amenities-page__card-title">{c.title}</h3>
                <ul className="amenities-page__card-list">
                  {c.items.map((i) => (<li key={i}>{i}</li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="amenities-page__cta">
        <Link to="/rooms" className="amenities-page__cta-link">Explore Our Rooms</Link>
      </section>
    </div>
  )
}

export default AmenitiesPage


