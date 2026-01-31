import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './BookNowPage.css';

function BookNowPage() {
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const initialPromo = urlParams.get('promo') || ''
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [roomType, setRoomType] = useState('standard')
  const [promo, setPromo] = useState(initialPromo)
  const [currency, setCurrency] = useState('USD')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const a = new Date(checkIn)
    const b = new Date(checkOut)
    const diff = (b - a) / (1000 * 60 * 60 * 24)
    return diff > 0 ? diff : 0
  }, [checkIn, checkOut])

  const basePrice = roomType === 'suite' ? 240 : roomType === 'deluxe' ? 180 : 120
  const subtotal = nights * basePrice
  const discount = promo ? Math.round(subtotal * 0.15) : 0
  const taxes = Math.round((subtotal - discount) * 0.1)
  const total = subtotal - discount + taxes

  const today = new Date().toISOString().split('T')[0]

  const onSubmit = (e) => {
    e.preventDefault()
    if (!checkIn || !checkOut) return alert(t('bookNow.validDatesError'));
    if (new Date(checkOut) <= new Date(checkIn)) return alert(t('bookNow.checkoutAfterError'));
    if (!name || !email) return alert(t('bookNow.nameEmailError'));
    const bookingId = Math.random().toString(36).slice(2, 10).toUpperCase();
    alert(`${t('bookNow.confirmedMsg')} ${t('bookNow.bookingId')}: ${bookingId}`);
  }

  return (
    <div>
      <section className="book-page__hero">
        <div className="book-page__hero-overlay" />
        <div className="book-page__hero-content">
          <h1 className="book-page__hero-title">{t('bookNow.heroTitle')}</h1>
          <p className="book-page__hero-subtitle">{t('bookNow.heroSubtitle')}</p>
        </div>
      </section>

      <section className="book-page__content">
        <form onSubmit={onSubmit} className="book-page__form">
          <div className="book-page__form-grid">
            <div className="book-page__form-row book-page__form-row--2">
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('booking.checkIn')}</label>
                <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className="book-page__form-input" />
              </div>
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('booking.checkOut')}</label>
                <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className="book-page__form-input" />
              </div>
            </div>

            <div className="book-page__form-row book-page__form-row--4">
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('booking.adults')}</label>
                <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="book-page__form-select">
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('booking.children')}</label>
                <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="book-page__form-select">
                  {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('booking.room')}</label>
                <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="book-page__form-select">
                  <option value="standard">{t('rooms.standard')}</option>
                  <option value="deluxe">{t('rooms.deluxe')}</option>
                  <option value="suite">{t('rooms.suite')}</option>
                </select>
              </div>
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('bookNow.currency')}</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="book-page__form-select">
                  {['USD','EUR','GBP'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="book-page__form-row book-page__form-row--2">
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('bookNow.promoCode')}</label>
                <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder={t('bookNow.optional')} className="book-page__form-input" />
              </div>
              <div />
            </div>

            <div className="book-page__form-row book-page__form-row--2">
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('contact.fullName')}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="book-page__form-input" />
              </div>
              <div className="book-page__form-group">
                <label className="book-page__form-label">{t('contact.emailAddr')}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="book-page__form-input" />
              </div>
            </div>

            <button type="submit" className="book-page__form-submit">{t('bookNow.confirmBooking')}</button>
          </div>
        </form>

        <aside className="book-page__summary">
          <h3 className="book-page__summary-title">{t('bookNow.summary')}</h3>
          <div className="book-page__summary-grid">
            <div>{t('bookNow.nights')}: <strong>{nights}</strong></div>
            <div>{t('bookNow.baseNight')}: <strong>{currency} {basePrice}</strong></div>
            <div>{t('bookNow.subtotal')}: <strong>{currency} {subtotal}</strong></div>
            {discount > 0 && <div>{t('bookNow.discount')}: <strong>-{currency} {discount}</strong></div>}
            <div>{t('bookNow.taxes')}: <strong>{currency} {taxes}</strong></div>
            <div className="book-page__summary-total">{t('bookNow.total')}: <strong>{currency} {total}</strong></div>
          </div>
          <div className="book-page__summary-security">
            <i className="fa-solid fa-shield-halved" />
            <span>{t('bookNow.securePayment')}</span>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default BookNowPage


