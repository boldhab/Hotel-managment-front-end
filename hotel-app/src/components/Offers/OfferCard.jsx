import React from 'react';
import { useTranslation } from 'react-i18next';
import './OfferCard.css';

function OfferCard({ image, title, description, badge, code, onPrimary, onSecondary }) {
  const { t } = useTranslation();
  return (
    <div className="offer-card">
      <div className="offer-card__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="offer-card__body">
        <div className="offer-card__header">
          <h3 className="offer-card__title">{title}</h3>
          {badge && <span className="offer-card__badge">{badge}</span>}
        </div>
        {description && <p className="offer-card__description">{description}</p>}
        <div className="offer-card__actions">
          <button onClick={onPrimary} className="offer-card__btn-primary">{t('offers.bookNow')}</button>
          <button onClick={onSecondary} className="offer-card__btn-secondary">{t('offers.learnMore')}</button>
        </div>
      </div>
      {code && <div className="offer-card__code">{t('offers.useCode')}: {code}</div>}
    </div>
  )
}

export default OfferCard

