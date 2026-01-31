import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './ExperiencesPage.css';

function ExperiencesPage() {
  const { t } = useTranslation();
  
  const categoryList = [
    { key: 'outdoor', img: '/images/experience/outdoor_adventure.jpg' },
    { key: 'culinary', img: '/images/experience/culinary-delights.jpg' },
    { key: 'wellness', img: '/images/experience/Yoga retreats.jpg' },
    { key: 'culture', img: '/images/experience/local-culture.jpg' },
  ];
  return (
    <div>
      <section className="experiences-page__hero">
        <div className="experiences-page__hero-overlay" />
        <div className="experiences-page__hero-content">
          <h1 className="experiences-page__hero-title">{t('experiences.heroTitle')}</h1>
          <p className="experiences-page__hero-subtitle">{t('experiences.heroSubtitle')}</p>
        </div>
      </section>

      <section className="experiences-page__content">
        <div className="experiences-page__grid">
          {categoryList.map((c) => (
            <div key={c.key} className="experiences-page__card">
              <div className="experiences-page__card-image" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="experiences-page__card-body">
                <h3 className="experiences-page__card-title">{t(`experiences.categories.${c.key}.title`)}</h3>
                <ul className="experiences-page__card-list">
                  {t(`experiences.categories.${c.key}.items`, { returnObjects: true }).map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </ul>
                <button className="experiences-page__card-btn">{t('experiences.bookExperience')}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="experiences-page__cta">
        <Link to="/rooms" className="experiences-page__cta-link">{t('experiences.addStay')}</Link>
      </section>
    </div>
  )
}

export default ExperiencesPage


