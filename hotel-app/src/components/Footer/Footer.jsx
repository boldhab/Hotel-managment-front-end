import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">
            <img src="/images/Logo.webp" alt={t("hero.brand")} className="footer__logo" />
            <strong>{t("hero.brand")}</strong>
          </div>
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>
        <div>
          <div className="footer__section-title">{t('footer.explore')}</div>
          <nav className="footer__nav">
            <Link to="/rooms">{t('header.rooms')}</Link>
            <Link to="/amenities">{t('header.amenities')}</Link>
            <Link to="/offers">{t('header.offers')}</Link>
            <Link to="/experiences">{t('header.experiences')}</Link>
            <Link to="/testimonials">{t('header.testimonials')}</Link>
          </nav>
        </div>
        <div>
          <div className="footer__section-title">{t('footer.contact')}</div>
          <Link to="/contact" className="footer__nav">{t('header.contact')}</Link>
          <div className="footer__contact">{t('contact.phoneValue')}</div>
          <div className="footer__contact">{t('contact.emailValue')}</div>
        </div>
        <div>
          <div className="footer__section-title">{t('footer.book')}</div>
          <Link to="/rooms" className="footer__cta">{t('header.bookNow')}</Link>
        </div>
      </div>
      <div className="footer__copyright">
        © {new Date().getFullYear()} {t("hero.brand")}. {t('footer.rights')}
      </div>
    </footer>
  )
}

export default Footer

