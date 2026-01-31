import React from 'react'
import { Link } from 'react-router-dom'
import './ExperiencesPage.css'

const categories = [
  { title: 'Outdoor Adventures', items: ['Guided hikes', 'Boat tours', 'Beach excursions'], img: '/images/experience/outdoor_adventure.jpg' },
  { title: 'Culinary Delights', items: ['Cooking classes', 'Wine tastings'], img: '/images/experience/culinary-delights.jpg' },
  { title: 'Relaxation & Wellness', items: ['Spa rituals', 'Yoga retreats'], img: '/images/experience/Yoga retreats.jpg' },
  { title: 'Local Culture', items: ['Festivals', 'Art galleries', 'Music nights'], img: '/images/experience/local-culture.jpg' },
]

function ExperiencesPage() {
  return (
    <div>
      <section className="experiences-page__hero">
        <div className="experiences-page__hero-overlay" />
        <div className="experiences-page__hero-content">
          <h1 className="experiences-page__hero-title">Discover Experiences Beyond Your Stay</h1>
          <p className="experiences-page__hero-subtitle">Live the story, not just the stay.</p>
        </div>
      </section>

      <section className="experiences-page__content">
        <div className="experiences-page__grid">
          {categories.map((c) => (
            <div key={c.title} className="experiences-page__card">
              <div className="experiences-page__card-image" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="experiences-page__card-body">
                <h3 className="experiences-page__card-title">{c.title}</h3>
                <ul className="experiences-page__card-list">
                  {c.items.map((i) => (<li key={i}>{i}</li>))}
                </ul>
                <button className="experiences-page__card-btn">Book Experience</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="experiences-page__cta">
        <Link to="/book" className="experiences-page__cta-link">Add to Your Stay</Link>
      </section>
    </div>
  )
}

export default ExperiencesPage


