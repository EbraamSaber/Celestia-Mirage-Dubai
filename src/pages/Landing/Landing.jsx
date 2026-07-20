import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { GiCrown, GiDiamondRing, GiSailboat } from 'react-icons/gi'
import { MdSpa, MdRestaurant } from 'react-icons/md'
import { BsAirplane } from 'react-icons/bs'
import './Landing.css'

const STATS = [
  { value: '5★', label: 'Forbes Rating' },
  { value: '247', label: 'Luxury Suites' },
  { value: '18', label: 'Restaurants' },
  { value: '∞', label: 'Experiences' },
]

const SUITES = [
  { id:1, name:'Royal Suite', tag:'Most Exclusive', price:12500, img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', desc:'340 sqm of pure opulence with a private pool and butler service.' },
  { id:2, name:'Sky Villa', tag:'Sky High', price:8900, img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', desc:'Panoramic views of the Dubai skyline from your private terrace.' },
  { id:3, name:'Presidential Penthouse', tag:'VIP Choice', price:18000, img:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80', desc:'The pinnacle of luxury — a full-floor private haven above the clouds.' },
]

const EXPERIENCES = [
  { icon:'🏜️', title:'Desert Safari', desc:'Bedouin nights, camel rides & stargazing', link:'/experiences' },
  { icon:'⛵', title:'Luxury Yacht', desc:'Private charter on the Arabian Gulf', link:'/experiences' },
  { icon:'🚁', title:'Helicopter Tour', desc:'Aerial views of the Burj Khalifa', link:'/experiences' },
  { icon:'🤿', title:'Scuba Diving', desc:'Explore vibrant Arabian coral reefs', link:'/experiences' },
  { icon:'🎈', title:'Hot Air Balloon', desc:'Sunrise flight over golden desert', link:'/experiences' },
  { icon:'✈️', title:'Private Jet', desc:'Full-service air travel on demand', link:'/experiences' },
]

const RESTAURANTS = [
  { name:'Aurum', cuisine:'French Fine Dining', img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', stars:5, desc:'Michelin-inspired French cuisine with panoramic Gulf views.' },
  { name:'Al Diwan', cuisine:'Arabic Heritage', img:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', stars:5, desc:'Authentic Emirati cuisine in a regal majlis setting.' },
  { name:'Sakura Sky', cuisine:'Japanese Omakase', img:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', stars:5, desc:'Elevated omakase with rare ingredients from Japan.' },
]

const REVIEWS = [
  { name:'Prince Abdullah Al-Rashid', country:'🇸🇦 Saudi Arabia', text:'Beyond imagination. Every detail was crafted to perfection.', rating:5, img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name:'Anastasia Volkov', country:'🇷🇺 Russia', text:'Я никогда не испытывала такой роскоши. Персонал угадывает каждое желание.', rating:5, img:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80' },
  { name:'James & Victoria Hartwell', country:'🇬🇧 United Kingdom', text:'Our anniversary here was the most extraordinary experience of our lives.', rating:5, img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
]

const VIP = [
  { icon:<GiCrown/>, title:'Royal Butler', desc:'24/7 personal butler anticipating your every need.' },
  { icon:<BsAirplane/>, title:'Private Jet Transfer', desc:'Seamless private aviation from any airport worldwide.' },
  { icon:<GiDiamondRing/>, title:'VIP Celebrations', desc:'Bespoke anniversary, proposal & birthday experiences.' },
  { icon:<GiSailboat/>, title:'Yacht Charter', desc:'Private mega-yacht charter on the Arabian Gulf.' },
  { icon:<MdSpa/>, title:'In-Suite Spa', desc:'Full spa menu delivered to your suite around the clock.' },
  { icon:<MdRestaurant/>, title:'Private Chef', desc:'World-class chef prepares bespoke menus in your suite.' },
]

export default function Landing() {
  const { t } = useTranslation()
  const [activeReview, setActiveReview] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 4500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onScroll = () => { hero.style.transform = `translateY(${window.scrollY * 0.35}px)` }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroRef}>
          <img className="hero-img" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90" alt="Dubai luxury skyline" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-particles">
          {[...Array(18)].map((_,i) => (
            <div key={i} className="particle" style={{ left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, animationDelay:`${Math.random()*5}s`, animationDuration:`${3+Math.random()*4}s`, width:`${2+Math.random()*3}px`, height:`${2+Math.random()*3}px` }} />
          ))}
        </div>
        <div className="hero-content">
          <div className="badge" style={{animationDelay:'0.2s'}}><GiCrown /> Ultra Luxury Dubai Resort</div>
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-sub accent-text">{t('hero.sub')}</p>
          <div className="hero-btns">
            <Link to="/booking" className="btn btn-gold btn-lg"><GiCrown /> {t('hero.cta1')}</Link>
            <Link to="/experiences" className="btn btn-outline btn-lg">{t('hero.cta2')} <FiArrowRight /></Link>
          </div>
          <div className="hero-stats">
            {STATS.map(s => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-val gold-gradient">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <a href="#suites-section" className="hero-scroll"><FiChevronDown /><span>Scroll</span></a>
      </section>

      {/* SUITES */}
      <section className="section" id="suites-section">
        <div className="container">
          <div className="section-header">
            <span className="label">Accommodations</span>
            <h2 className="headline">Legendary Suites</h2>
            <div className="gold-divider"><span>◆</span></div>
            <p>Each suite is a private world — designed for those who have experienced everything and still seek more.</p>
          </div>
          <div className="suites-grid">
            {SUITES.map((suite, i) => (
              <div key={suite.id} className={`suite-card ${i===1?'suite-card--featured':''}`}>
                <div className="suite-img-wrap">
                  <img src={suite.img} alt={suite.name} loading="lazy" />
                  <div className="suite-tag badge">{suite.tag}</div>
                </div>
                <div className="suite-info">
                  <h3>{suite.name}</h3>
                  <p>{suite.desc}</p>
                  <div className="suite-footer">
                    <div>
                      <span className="label">From</span>
                      <div className="price price-sm" style={{marginTop:'0.2rem'}}>
                        <span style={{fontFamily:'var(--font-head)',fontSize:'1.6rem',color:'var(--gold)',fontWeight:700}}>${suite.price.toLocaleString()}</span>
                        <span style={{color:'var(--text-muted)',fontSize:'0.8rem'}}> / night</span>
                      </div>
                    </div>
                    <Link to="/booking" className="btn btn-gold btn-sm">Reserve</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta"><Link to="/suites" className="btn btn-outline">View All Suites <FiArrowRight /></Link></div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="section experiences-section">
        <div className="experiences-bg" />
        <div className="container">
          <div className="section-header">
            <span className="label">Dubai Lifestyle</span>
            <h2 className="headline" style={{color:'var(--gold)'}}>Extraordinary Experiences</h2>
            <div className="gold-divider"><span>◆</span></div>
            <p style={{color:'rgba(248,245,240,0.7)'}}>Curated adventures designed to elevate your Dubai journey beyond imagination.</p>
          </div>
          <div className="exp-grid">
            {EXPERIENCES.map(exp => (
              <Link to={exp.link} key={exp.title} className="exp-card card-glass">
                <span className="exp-icon">{exp.icon}</span>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
                <span className="exp-arrow"><FiArrowRight /></span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/experiences" className="btn btn-gold btn-lg">Explore All Experiences <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Fine Dining</span>
            <h2 className="headline">World-Class Cuisine</h2>
            <div className="gold-divider"><span>◆</span></div>
            <p>Eighteen restaurants. Eighteen unique worlds. All under one extraordinary roof.</p>
          </div>
          <div className="restaurants-grid">
            {RESTAURANTS.map(r => (
              <div key={r.name} className="restaurant-card">
                <div className="restaurant-img">
                  <img src={r.img} alt={r.name} loading="lazy" />
                  <div className="overlay-dark" />
                  <div className="restaurant-overlay-info">
                    <div className="stars">{'★'.repeat(r.stars)}</div>
                    <h3>{r.name}</h3>
                    <span className="restaurant-cuisine">{r.cuisine}</span>
                  </div>
                </div>
                <div className="restaurant-body">
                  <p>{r.desc}</p>
                  <Link to="/restaurants" className="btn btn-outline btn-sm">Reserve a Table</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPA BANNER */}
      <section className="spa-banner">
        <div className="spa-bg">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80" alt="Luxury Spa" />
          <div className="overlay-dark" />
        </div>
        <div className="spa-content container">
          <span className="label">Spa & Wellness</span>
          <h2 className="headline">A Sanctuary of Serenity</h2>
          <div className="gold-divider"><span>◆</span></div>
          <p className="body-lg" style={{maxWidth:'500px',color:'rgba(248,245,240,0.85)'}}>7,000 sqm of pure tranquility. Ancient rituals meet modern science in our award-winning spa.</p>
          <Link to="/spa" className="btn btn-gold btn-lg" style={{marginTop:'2rem'}}>Book Spa Treatment</Link>
        </div>
      </section>

      {/* VIP */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">VIP Services</span>
            <h2 className="headline">The Royal Treatment</h2>
            <div className="gold-divider"><span>◆</span></div>
          </div>
          <div className="vip-grid">
            {VIP.map(s => (
              <div key={s.title} className="vip-card card-glass">
                <div className="vip-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Guest Voices</span>
            <h2 className="headline">What Our Guests Say</h2>
            <div className="gold-divider"><span>◆</span></div>
          </div>
          <div className="review-showcase">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`review-card card-glass ${i===activeReview?'active':''}`} onClick={() => setActiveReview(i)}>
                <div className="review-header">
                  <img src={r.img} alt={r.name} className="review-avatar" />
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-country">{r.country}</div>
                    <div className="stars">{'★'.repeat(r.rating)}</div>
                  </div>
                </div>
                <p className="review-text">"{r.text}"</p>
              </div>
            ))}
          </div>
          <div className="review-dots">
            {REVIEWS.map((_,i) => <button key={i} className={`dot ${i===activeReview?'active':''}`} onClick={()=>setActiveReview(i)} />)}
          </div>
          <div className="section-cta"><Link to="/reviews" className="btn btn-outline">Read All Reviews <FiArrowRight /></Link></div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="booking-cta">
        <div className="booking-cta-bg">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="Dubai" />
          <div className="booking-cta-overlay" />
        </div>
        <div className="container booking-cta-content">
          <GiCrown className="cta-crown" />
          <h2 className="headline">Begin Your Legend</h2>
          <p className="accent-text" style={{color:'var(--gold)',fontSize:'1.3rem'}}>Reserve your extraordinary stay today</p>
          <div className="hero-btns">
            <Link to="/booking" className="btn btn-gold btn-lg">Reserve Now <FiArrowRight /></Link>
            <Link to="/concierge" className="btn btn-glass btn-lg">Contact Concierge</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
