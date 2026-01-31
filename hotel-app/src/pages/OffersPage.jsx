import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import OfferCard from '../components/Offers/OfferCard';
import './OffersPage.css';

const offers = [
  { title: 'Romantic Escape', description: 'Champagne, dinner, and late checkout.', badge: 'Save 20%', image: '/images/offer/romantic-escape.jpg', code: 'LOVE20' },
  { title: 'Early Bird Special', description: 'Save 15% when booking 30+ days ahead.', badge: '15% Off', image: '/images/offer/bird-special.jpg', code: 'EARLY15' },
  { title: 'Gourmet Experience', description: 'Dinner for two with wine pairing.', badge: 'Dinner Included', image: '/images/offer/gourmet-experience.jpg', code: 'FOODIE' },
  { title: 'Spa Indulgence', description: 'Massage and breakfast included.', badge: 'Spa + Breakfast', image: '/images/amenties/spa-indulgence.jpg', code: 'RELAX' },
]

function OffersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const offerList = [
    { key: 'romantic', image: '/images/offer/romantic-escape.jpg', code: 'LOVE20' },
    { key: 'earlyBird', image: '/images/offer/bird-special.jpg', code: 'EARLY15' },
    { key: 'gourmet', image: '/images/offer/gourmet-experience.jpg', code: 'FOODIE' },
    { key: 'spa', image: '/images/amenties/spa-indulgence.jpg', code: 'RELAX' },
  ];
    <div>
      <section className="offers-page__hero">
        <div className="offers-page__hero-overlay" />
        <div className="offers-page__hero-content">
          <h1 className="offers-page__hero-title">{t('offers.heroTitle')}</h1>
          <p className="offers-page__hero-subtitle">{t('offers.heroSubtitle')}</p>
        </div>
      </section>

      <section className="offers-page__content">
        <div className="offers-page__grid">
          {offerList.map((o) => (
            <OfferCard
              key={o.key}
              title={t(`offers.list.${o.key}.title`)}
              description={t(`offers.list.${o.key}.description`)}
              badge={t(`offers.list.${o.key}.badge`)}
              image={o.image}
              code={o.code}
              onPrimary={() => navigate('/rooms')}
              onSecondary={() => alert(t(`offers.list.${o.key}.title`) + ' ' + t('offers.detailsNotice'))}
            />
          ))}
        </div>
      </section>

      <section className="offers-page__cta">
        <Link to="/rooms" className="offers-page__cta-link">{t('offers.claimOffer')}</Link>
      </section>
    </div>
  )
}

export default OffersPage


