import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OfferCard from '../components/Offers/OfferCard'
import './OffersPage.css'

const offers = [
  { title: 'Romantic Escape', description: 'Champagne, dinner, and late checkout.', badge: 'Save 20%', image: '/images/offer/romantic-escape.jpg', code: 'LOVE20' },
  { title: 'Early Bird Special', description: 'Save 15% when booking 30+ days ahead.', badge: '15% Off', image: '/images/offer/bird-special.jpg', code: 'EARLY15' },
  { title: 'Gourmet Experience', description: 'Dinner for two with wine pairing.', badge: 'Dinner Included', image: '/images/offer/gourmet-experience.jpg', code: 'FOODIE' },
  { title: 'Spa Indulgence', description: 'Massage and breakfast included.', badge: 'Spa + Breakfast', image: '/images/amenties/spa-indulgence.jpg', code: 'RELAX' },
]

function OffersPage() {
  const navigate = useNavigate()
  return (
    <div>
      <section className="offers-page__hero">
        <div className="offers-page__hero-overlay" />
        <div className="offers-page__hero-content">
          <h1 className="offers-page__hero-title">Exclusive Offers & Packages</h1>
          <p className="offers-page__hero-subtitle">Make your next stay unforgettable — at an exclusive rate.</p>
        </div>
      </section>

      <section className="offers-page__content">
        <div className="offers-page__grid">
          {offers.map((o) => (
            <OfferCard
              key={o.title}
              {...o}
              onPrimary={() => navigate(`/book?promo=${encodeURIComponent(o.code)}`)}
              onSecondary={() => alert(o.title + ' details')}
            />
          ))}
        </div>
      </section>

      <section className="offers-page__cta">
        <Link to="/book" className="offers-page__cta-link">Claim Your Offer</Link>
      </section>
    </div>
  )
}

export default OffersPage


