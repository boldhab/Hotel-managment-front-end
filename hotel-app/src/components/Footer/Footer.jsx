import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">
            <img src="/images/Logo.webp" alt="Hotel" className="footer__logo" />
            <strong>Hotel</strong>
          </div>
          <p className="footer__tagline">Luxury stays crafted with care.</p>
        </div>
        <div>
          <div className="footer__section-title">Explore</div>
          <nav className="footer__nav">
            <Link to="/rooms">Rooms</Link>
            <Link to="/amenities">Amenities</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/experiences">Experiences</Link>
            <Link to="/testimonials">Testimonials</Link>
          </nav>
        </div>
        <div>
          <div className="footer__section-title">Contact</div>
          <Link to="/contact" className="footer__nav">Contact Us</Link>
          <div className="footer__contact">+1 (555) 123-4567</div>
          <div className="footer__contact">hello@hotel.example</div>
        </div>
        <div>
          <div className="footer__section-title">Book</div>
          <Link to="/book" className="footer__cta">Book Now</Link>
        </div>
      </div>
      <div className="footer__copyright">
        © {new Date().getFullYear()} Hotel. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

