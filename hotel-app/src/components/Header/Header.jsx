import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);
  const [theme, setTheme] = useState("light");

  //this is chech the scrollll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside for language menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check for saved theme in local storage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.classList.toggle("theme-dark", saved === "dark");
      return;
    }

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("theme-dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("theme-dark", next === "dark");
  };

  //language

  function changeLanguage(lng) {
    i18n.changeLanguage(lng);
  };

  //It finds that section on the page by its id. It scrolls smoothly to that section.
  const closeMenu = () => setIsMenuOpen(false);

  const currentLng = (i18n.language || "en").slice(0, 2).toUpperCase();

  return (
    <header
      className={`header ${isScrolled ? "header--scrolled" : "header--top"}`}
    >
      <div className="header__inner">
        <Link
          className="header__brand"
          to="/"
          onClick={closeMenu}
        >
          <img className="header__logo" src="/images/Logo.webp" alt="Hotel" />
          <span className="header__title">Hotel</span>
        </Link>

        <button
          className="header__menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`} />
        </button>
{/* t used for language translation */}
        <nav className={`header__nav ${isMenuOpen ? "is-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            {t("header.home")}
          </Link>
          <Link to="/rooms" onClick={closeMenu}>
            {t("header.rooms")}
          </Link>
          <Link to="/amenities" onClick={closeMenu}>
            {t("header.amenities")}
          </Link>
          <Link to="/offers" onClick={closeMenu}>
            {t("header.offers")}
          </Link>
          <Link to="/experiences" onClick={closeMenu}>
            {t("header.experiences")}
          </Link>
          <Link to="/testimonials" onClick={closeMenu}>
            {t("header.testimonials")}
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            {t("header.contact")}
          </Link>
        </nav>

        <div className="header__actions">
          <Link
            className="header__cta"
            to="/rooms"
            onClick={closeMenu}
          >
            {t("header.bookNow")}
          </Link>

          <button
            className="header__theme-toggle"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
          </button>

          <div className="header__lang" ref={langRef}>
            <button
              className="header__lang-trigger"
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen((v) => !v)}
            >
              {currentLng}
              <i className={`fa-solid fa-chevron-down header__chev ${isLangOpen ? 'is-open' : ''}`} />
            </button>
            <ul
              className={`header__lang-menu ${isLangOpen ? "is-open" : ""}`}
              role="listbox"
            >
              <li
                className="header__lang-item"
                role="option"
                aria-selected={currentLng === "EN"}
              >
                <button
                  onClick={() => {
                    changeLanguage("en");
                    setIsLangOpen(false);
                  }}
                >
                  EN
                </button>
              </li>
              <li
                className="header__lang-item"
                role="option"
                aria-selected={currentLng === "ES"}
              >
                <button
                  onClick={() => {
                    changeLanguage("es");
                    setIsLangOpen(false);
                  }}
                >
                  ES
                </button>
              </li>
              <li
                className="header__lang-item"
                role="option"
                aria-selected={currentLng === "FR"}
              >
                <button
                  onClick={() => {
                    changeLanguage("fr");
                    setIsLangOpen(false);
                  }}
                >
                  FR
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
