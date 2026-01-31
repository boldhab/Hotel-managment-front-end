import React from 'react'
import { useNavigate } from 'react-router-dom'
import OfferCard from './OfferCard'
import './Offers.css'

const offers = [
  { title: 'Romantic Escape', description: 'Champagne, dinner, and late checkout.', badge: 'Save 20%', image: '/images/offer/romantic-escape.jpg', code: 'LOVE20' },
  { title: 'Early Bird Special', description: 'Save 15% when booking 30+ days ahead.', badge: '15% Off', image: '/images/offer/bird-special.jpg', code: 'EARLY15' },
  { title: 'Gourmet Experience', description: 'Dinner for two with wine pairing.', badge: 'Dinner Included', image: '/images/offer/gourmet-experience.jpg', code: 'FOODIE' },
  { title: 'Spa Indulgence', description: 'Massage and breakfast included.', badge: 'Spa + Breakfast', image: '/images/amenties/spa-indulgence.jpg', code: 'RELAX' },
]

function Offers() {
  const navigate = useNavigate()
  return (
    <section className="offers">
      <div className="offers__grid">
        {offers.map(o => (
          <OfferCard
            key={o.title}
            {...o}
            onPrimary={() => navigate(`/book?promo=${encodeURIComponent(o.code)}`)}
            onSecondary={() => alert(o.title + ' details')}
          />
        ))}
      </div>
    </section>
  )
}

export default Offers

