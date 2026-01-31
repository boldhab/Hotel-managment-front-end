import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Hero.css";

function Hero({ onStartBooking, topRoomImageUrls = [] }) {
  const { t } = useTranslation();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  // Predictive prefetch for top rooms images
  const prefetchUrls = useMemo(() => Array.from(new Set(topRoomImageUrls)).slice(0, 6), [topRoomImageUrls]);
  useEffect(() => {
    prefetchUrls.forEach((url) => {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = url;
    });
  }, [prefetchUrls]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onStartBooking) {
      onStartBooking({ checkIn, checkOut, guests: Number(guests) });
    } else {
      // Fallback: jump to booking section
      const el = document.getElementById("booking");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero__bg" role="img" aria-label="Hotel background" />
      
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--1">{t("hero.welcome", "Welcome to")}</span>
          <span className="hero__title-line hero__title-line--2">{t("hero.brand", "Your Perfect Getaway")}</span>
        </h1>
        <p className="hero__subtitle">{t("hero.tagline", "Luxury, comfort, and unforgettable experiences.")}</p>

        <form className="hero__search" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="checkin">{t("hero.checkIn", "Check-in")}</label>
          <input
            id="checkin"
            type="date"
            className="hero__input"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder={t("hero.checkIn", "Check-in")}
            title={t("hero.checkIn", "Check-in")}
            required
          />

          <label className="sr-only" htmlFor="checkout">{t("hero.checkOut", "Check-out")}</label>
          <input
            id="checkout"
            type="date"
            className="hero__input"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
            min={checkIn || undefined}
            placeholder={t("hero.checkOut", "Check-out")}
            title={t("hero.checkOut", "Check-out")}
          />

          <label className="sr-only" htmlFor="guests">{t("hero.guests", "Guests")}</label>
          <select
            id="guests"
            className="hero__input"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            {[1,2,3,4,5,6].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? t("hero.guest", "Guest") : t("hero.guests", "Guests")}</option>
            ))}
          </select>

          <button type="submit" className="hero__submit">
            <i className="fa-solid fa-magnifying-glass" /> {t("hero.search", "Search")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;


