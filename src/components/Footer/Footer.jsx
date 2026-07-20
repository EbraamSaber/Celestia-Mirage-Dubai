import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GiCrown } from 'react-icons/gi'
import { FiInstagram, FiTwitter, FiYoutube, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp, FaTelegram, FaTripadvisor } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* Gold divider */}
      <div className="footer-divider">
        <span className="divider-line" />
        <GiCrown className="divider-crown" />
        <span className="divider-line" />
      </div>

      <div className="footer-main container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <GiCrown className="footer-crown" />
            <div>
              <div className="footer-logo-name">Celestia Royal</div>
              <div className="footer-logo-sub">DUBAI</div>
            </div>
          </div>
          <p className="footer-tagline accent-text">
            Where hospitality meets exclusivity.
          </p>
          <p className="footer-desc">
            An ultra-luxury resort experience in the heart of Dubai, crafted for those who expect nothing but perfection.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" className="social-btn" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" className="social-btn" aria-label="YouTube"><FiYoutube /></a>
            <a href="https://wa.me/971500000000" className="social-btn whatsapp" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="#" className="social-btn" aria-label="Telegram"><FaTelegram /></a>
            <a href="#" className="social-btn" aria-label="TripAdvisor"><FaTripadvisor /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Experiences</h4>
          <ul>
            <li><Link to="/suites">Luxury Suites</Link></li>
            <li><Link to="/experiences">Desert Safari</Link></li>
            <li><Link to="/experiences">Yacht Charter</Link></li>
            <li><Link to="/experiences">Helicopter Tours</Link></li>
            <li><Link to="/experiences">Private Jet</Link></li>
            <li><Link to="/cars">Luxury Cars</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Services</h4>
          <ul>
            <li><Link to="/restaurants">Fine Dining</Link></li>
            <li><Link to="/spa">Spa & Wellness</Link></li>
            <li><Link to="/events">Private Events</Link></li>
            <li><Link to="/events">Weddings</Link></li>
            <li><Link to="/concierge">AI Concierge</Link></li>
            <li><Link to="/loyalty">Loyalty Program</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact-list">
            <li><FiMapPin /><span>Jumeirah Beach Road, Dubai, UAE</span></li>
            <li><FiPhone /><a href="tel:+97142000000">+971 4 200 0000</a></li>
            <li><FiMail /><a href="mailto:concierge@celestiamirage.ae">concierge@celestiamirage.ae</a></li>
            <li><FaWhatsapp /><a href="https://wa.me/971500000000">+971 50 000 0000</a></li>
          </ul>
          <div className="footer-awards">
            <span className="award-badge">⭐ Forbes Five Star</span>
            <span className="award-badge">🏆 World Luxury Hotel</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Celestia Royal Dubai. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="footer-payments">
            <span>💳</span><span>Visa</span><span>Mastercard</span>
            <span>Amex</span><span>PayPal</span><span>Crypto</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
