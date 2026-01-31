import React from 'react';
import { useTranslation } from 'react-i18next';
import './Experiences.css';

function ExperienceCard({ image, title, text, duration, price, onBook }) {
  const { t } = useTranslation();
  return (
    <div className="exp-card">
      <div className="exp-card__media" style={{ backgroundImage: `url(${image})` }} />
      <div className="exp-card__body">
        <h3 className="exp-card__title">{title}</h3>
        {text && <p className="exp-card__text">{text}</p>}
        <div className="exp-card__meta">
          {duration && <span><i className="fa-regular fa-clock" /> {duration}</span>}
          {price && <span><i className="fa-solid fa-tag" /> {price}</span>}
        </div>
        <button className="exp-card__btn" onClick={onBook}>{t('experiences.bookExperience')}</button>
      </div>
    </div>
  )
}

export default ExperienceCard

