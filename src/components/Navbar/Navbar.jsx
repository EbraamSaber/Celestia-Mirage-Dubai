import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMenu, FiX, FiGlobe, FiUser, FiHeart } from 'react-icons/fi'
import { GiCrown } from 'react-icons/gi'
import './Navbar.css'

const LANGS = [
  { code:'en', label:'English', flag:'🇬🇧' },
  { code:'ar', label:'عربي',    flag:'🇦🇪' },
  { code:'ru', label:'Русский', flag:'🇷🇺' },
  { code:'zh', label:'中文',    flag:'🇨🇳' },
  { code:'fr', label:'Français',flag:'🇫🇷' },
  { code:'de', label:'Deutsch', flag:'🇩🇪' },
]

const NAV_LINKS = [
  { key:'suites',      path:'/suites' },
  { key:'experiences', path:'/experiences' },
  { key:'restaurants', path:'/restaurants' },
  { key:'spa',         path:'/spa' },
  { key:'cars',        path:'/cars' },
  { key:'events',      path:'/events' },
  { key:'concierge',   path:'/concierge' },
  { key:'loyalty',     path:'/loyalty' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location  = useLocation()
  const navigate  = useNavigate()
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)
  const [langOpen, setLangOpen]   = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const switchLang = (code) => {
    i18n.changeLanguage(code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
    setLangOpen(false)
  }

  const currentLang = LANGS.find(l => l.code === i18n.language) || LANGS[0]

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <GiCrown className="logo-crown" />
          <div className="logo-text">
            <span className="logo-main">Celestia Royal</span>
            <span className="logo-sub">DUBAI</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-links">
          {NAV_LINKS.map(link => (
            <Link
              key={link.key}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="navbar-controls">
          {/* Language Switcher */}
          <div className="lang-switcher" ref={langRef}>
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
              <FiGlobe />
              <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    className={`lang-option ${i18n.language === l.code ? 'active' : ''}`}
                    onClick={() => switchLang(l.code)}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="icon-btn" onClick={() => navigate('/dashboard')} title="My Account">
            <FiUser />
          </button>
          <button className="icon-btn" title="Wishlist">
            <FiHeart />
          </button>

          <Link to="/booking" className="btn btn-gold btn-sm navbar-reserve">
            {t('nav.reserve')}
          </Link>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <Link
            key={link.key}
            to={link.path}
            className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {t(`nav.${link.key}`)}
          </Link>
        ))}
        <Link to="/booking" className="btn btn-gold mobile-reserve">
          {t('nav.reserve')}
        </Link>
        <div className="mobile-langs">
          {LANGS.map(l => (
            <button key={l.code} className={`mobile-lang-btn ${i18n.language === l.code ? 'active' : ''}`} onClick={() => switchLang(l.code)}>
              {l.flag} {l.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
