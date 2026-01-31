import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './AmenitiesPage.css';

function AmenitiesPage() {
  const { t } = useTranslation();
  
  const categories = [
    { key: 'comforts', img: '/images/amenties/room-comforts.jpg' },
    { key: 'wellness', img: '/images/amenties/wellness-spa.jpg' },
    { key: 'dining', img: '/images/offer/bining-bars.jpg' },
    { key: 'outdoor', img: '/images/amenties/outdoor-leisure.jpg' },
    { key: 'business', img: '/images/amenties/business-events.jpg' },
    { key: 'family', img: '/images/offer/family-friendly.jpg' },
  ];
  return (
    <div>
      <section className="amenities-page__hero">
        <div className="amenities-page__hero-overlay" />
        <div className="amenities-page__hero-content">
          <h1 className="amenities-page__hero-title">{t('amenities.heroTitle')}</h1>
          <p className="amenities-page__hero-subtitle">{t('amenities.heroSubtitle')}</p>
        </div>
      </section>

      <section className="amenities-page__content">
        <div className="amenities-page__grid">
          {categories.map((c) => (
            <div key={c.key} className="amenities-page__card">
              <div className="amenities-page__card-image" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="amenities-page__card-body">
                <h3 className="amenities-page__card-title">{t(`amenities.categories.${c.key}.title`)}</h3>
                <ul className="amenities-page__card-list">
                  {t(`amenities.categories.${c.key}.items`, { returnObjects: true }).map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="amenities-page__cta">
        <Link to="/rooms" className="amenities-page__cta-link">{t('amenities.exploreRooms')}</Link>
      </section>
    </div>
  );
}

export default AmenitiesPage


