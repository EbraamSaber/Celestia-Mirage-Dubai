import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiCrown } from 'react-icons/gi'
import { FiUsers, FiCalendar, FiArrowRight } from 'react-icons/fi'
import './Events.css'

const EVENT_TYPES = [
  { id:'wedding', icon:'💍', title:'Royal Weddings', img:'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85', desc:'Fairy-tale weddings crafted with breathtaking floral installations, Michelin chefs, and a dedicated team of 50+ professionals.', capacity:'Up to 800 guests', spaces:['Grand Ballroom','Sky Terrace','Private Beach','Garden Pavilion'] },
  { id:'conference', icon:'🏛️', title:'Conferences & Summits', img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85', desc:'State-of-the-art conference facilities with simultaneous translation, LED walls, and seamless AV technology for world-class summits.', capacity:'Up to 1,200 delegates', spaces:['Innovation Hall','Boardroom Suite','Media Centre','Breakout Rooms'] },
  { id:'business', icon:'💼', title:'Business Meetings', img:'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&q=85', desc:'Intimate boardroom settings with private butler service, premium catering, and the most advanced connectivity infrastructure in Dubai.', capacity:'6–50 executives', spaces:['Royal Boardroom','Sky Lounge','Private Dining Room','VIP Terrace'] },
  { id:'vip', icon:'👑', title:'VIP Private Events', img:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85', desc:'Exclusive private events designed around you — from intimate birthday celebrations to landmark anniversaries and product launches.', capacity:'Fully bespoke', spaces:['Entire Hotel Buyout','Private Island','Royal Suite','Penthouse'] },
]

const PACKAGES = [
  { name:'Sapphire', price:'From $15,000', guests:'Up to 50', includes:['8h venue hire','Gourmet canapés','Open bar','Floral centerpieces','AV setup','Event coordinator'] },
  { name:'Gold', price:'From $45,000', guests:'Up to 200', includes:['12h venue hire','5-course dinner','Premium beverages','Full floral décor','Live entertainment','Dedicated team of 10'] },
  { name:'Royal', price:'Bespoke', guests:'Unlimited', includes:['Full hotel buyout option','Celebrity chef','Bespoke entertainment','International flowers','Film crew','24/7 concierge team'] },
]

export default function Events() {
  const [active, setActive] = useState('wedding')
  const current = EVENT_TYPES.find(e=>e.id===active)

  return (
    <div className="events-page">
      <div className="page-hero">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90" alt="Events" className="page-hero-img" />
        <div className="overlay-dark" />
        <div className="page-hero-content">
          <span className="label"><GiCrown /> World-Class Events</span>
          <h1 className="headline">Unforgettable Events</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>From intimate gatherings to grand celebrations</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'4rem',paddingBottom:'5rem'}}>
        {/* Type Selector */}
        <div className="event-tabs">
          {EVENT_TYPES.map(e => (
            <button key={e.id} className={`event-tab ${active===e.id?'active':''}`} onClick={()=>setActive(e.id)}>
              <span>{e.icon}</span><span>{e.title}</span>
            </button>
          ))}
        </div>

        {/* Active Event Display */}
        {current && (
          <div className="event-showcase">
            <div className="event-showcase-img">
              <img src={current.img} alt={current.title} />
              <div className="overlay-dark" />
              <div className="event-showcase-overlay">
                <span className="event-icon-big">{current.icon}</span>
                <div className="badge" style={{fontSize:'0.9rem'}}><FiUsers /> {current.capacity}</div>
              </div>
            </div>
            <div className="event-showcase-body">
              <h2>{current.title}</h2>
              <p>{current.desc}</p>
              <div className="label" style={{marginTop:'1.5rem',marginBottom:'0.8rem'}}>Available Spaces</div>
              <div className="event-spaces">
                {current.spaces.map(s => <span key={s} className="space-tag">✦ {s}</span>)}
              </div>
              <div style={{display:'flex',gap:'1rem',marginTop:'2rem',flexWrap:'wrap'}}>
                <Link to="/contact" className="btn btn-gold btn-lg"><GiCrown /> Request a Proposal</Link>
                <Link to="/concierge" className="btn btn-glass">Speak to Events Team</Link>
              </div>
            </div>
          </div>
        )}

        {/* Packages */}
        <div className="section-header" style={{marginTop:'5rem'}}>
          <span className="label">Event Packages</span>
          <h2 className="headline">Choose Your Package</h2>
          <div className="gold-divider"><span>◆</span></div>
        </div>
        <div className="packages-grid">
          {PACKAGES.map((pkg, i) => (
            <div key={pkg.name} className={`package-card card-glass ${i===1?'package-card--featured':''}`}>
              {i===1 && <div className="package-popular badge">Most Popular</div>}
              <div className="package-name">{pkg.name}</div>
              <div className="package-price gold-gradient">{pkg.price}</div>
              <div className="package-guests"><FiUsers /> {pkg.guests}</div>
              <ul className="package-includes">
                {pkg.includes.map(inc=><li key={inc}>✓ {inc}</li>)}
              </ul>
              <Link to="/contact" className={`btn ${i===1?'btn-gold':'btn-outline'} btn-sm`} style={{marginTop:'auto'}}>Get Quote <FiArrowRight /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
