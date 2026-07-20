import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiClock, FiUsers, FiStar } from 'react-icons/fi'
import { GiCrown } from 'react-icons/gi'
import './Experiences.css'

const CATEGORIES = ['All','Desert','Marine','Sky','Cultural','Shopping']

const EXPERIENCES = [
  // DESERT
  { id:1, cat:'Desert', icon:'🏜️', title:'Exclusive Desert Safari', price:850, duration:'8h', group:'2-12', rating:5, reviews:284, tag:'Most Popular',
    img:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    desc:'ATV riding, camel journey, Bedouin dinner, fire show, traditional dance & stargazing in the golden desert.',
    includes:['ATV Riding','Camel Riding','Sunset View','BBQ Dinner','Bedouin Night','Fire Show','Traditional Dance','Stargazing'],
  },
  { id:2, cat:'Desert', icon:'🐪', title:'Sunrise Camel Trek', price:420, duration:'4h', group:'2-8', rating:5, reviews:142, tag:'Serene',
    img:'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    desc:'A peaceful sunrise camel journey through the undulating dunes of the Arabian desert.',
    includes:['Camel Trek','Sunrise View','Arabic Coffee','Traditional Breakfast','Photography Guide'],
  },
  // MARINE
  { id:3, cat:'Marine', icon:'⛵', title:'Private Luxury Yacht', price:4500, duration:'Full Day', group:'2-14', rating:5, reviews:198, tag:'VIP',
    img:'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    desc:'Charter an exclusive mega-yacht on the Arabian Gulf with personal crew, gourmet dining, and water sports.',
    includes:['Private Yacht','Personal Crew','Gourmet Chef','Water Sports','Jet Ski','Snorkeling','Sunset Cruise'],
  },
  { id:4, cat:'Marine', icon:'🤿', title:'Scuba Diving', price:650, duration:'5h', group:'2-6', rating:5, reviews:96, tag:'Adventure',
    img:'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    desc:'Explore vibrant coral reefs and marine life in the crystal-clear waters of the Arabian Gulf.',
    includes:['PADI Certified Dive','Equipment','Dive Master','Marine Life Guide','Underwater Photography'],
  },
  { id:5, cat:'Marine', icon:'🌅', title:'Sunset Cruise', price:1200, duration:'3h', group:'2-20', rating:5, reviews:321, tag:'Romantic',
    img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    desc:'A breathtaking sunset cruise with fine dining, live music, and a champagne toast over the golden horizon.',
    includes:['Luxury Cruise Ship','5-Course Dinner','Live Music','Champagne','Photographer'],
  },
  { id:6, cat:'Marine', icon:'🎣', title:'Deep Sea Fishing', price:950, duration:'6h', group:'2-6', rating:4, reviews:78, tag:'Exclusive',
    img:'https://images.unsplash.com/photo-1504966981333-1ac8809be1ca?w=800&q=80',
    desc:'Premium deep-sea fishing expedition with expert guides, top equipment, and a chef to prepare your catch.',
    includes:['Fishing Boat','Expert Guide','Premium Equipment','Catch Preparation','Refreshments'],
  },
  // SKY
  { id:7, cat:'Sky', icon:'🚁', title:'Helicopter City Tour', price:2200, duration:'45min', group:'1-4', rating:5, reviews:412, tag:'Iconic',
    img:'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
    desc:'Soar above the Burj Khalifa, Palm Jumeirah, and the Dubai skyline in a private helicopter.',
    includes:['Private Helicopter','Certified Pilot','Aerial Photography','Hotel Pickup','Champagne'],
  },
  { id:8, cat:'Sky', icon:'🎈', title:'Hot Air Balloon at Dawn', price:1500, duration:'4h', group:'2-8', rating:5, reviews:267, tag:'Magical',
    img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    desc:'Drift silently over the golden desert at sunrise in a luxury hot air balloon with champagne breakfast.',
    includes:['Private Balloon','Champagne Breakfast','Certified Pilot','Ground Transport','Certificate'],
  },
  { id:9, cat:'Sky', icon:'✈️', title:'Private Jet Charter', price:18000, duration:'Custom', group:'1-12', rating:5, reviews:54, tag:'Ultra VIP',
    img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    desc:'Travel in absolute style on a private jet with bespoke routes, personal cabin crew, and gourmet service.',
    includes:['Private Jet','Personal Crew','Gourmet Catering','Ground Transfer','Custom Itinerary'],
  },
  { id:10, cat:'Sky', icon:'🪂', title:'Skydiving Over Palm', price:3200, duration:'3h', group:'1-4', rating:5, reviews:189, tag:'Extreme',
    img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    desc:'Freefall from 13,000 feet above the iconic Palm Jumeirah — the most thrilling Dubai experience.',
    includes:['Tandem Skydive','Professional Instructor','Video & Photos','Certificate','Hotel Transfer'],
  },
  // CULTURAL
  { id:11, cat:'Cultural', icon:'🕌', title:'Old Dubai Discovery', price:380, duration:'5h', group:'2-10', rating:4, reviews:156, tag:'Heritage',
    img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    desc:'Explore Old Dubai via Abra boat, visit the Gold & Spice Souks and Dubai Museum with a private guide.',
    includes:['Abra Boat Ride','Gold Souk Visit','Spice Souk','Dubai Museum','Traditional Lunch','Expert Guide'],
  },
  { id:12, cat:'Cultural', icon:'🍽️', title:'Arabic Dinner Night', price:680, duration:'4h', group:'2-20', rating:5, reviews:203, tag:'Authentic',
    img:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    desc:'An immersive Arabic dining experience with live oud music, belly dancing, and authentic cuisine.',
    includes:['5-Course Arabic Menu','Live Oud Music','Belly Dancing','Shisha Lounge','Traditional Decor'],
  },
  // SHOPPING
  { id:13, cat:'Shopping', icon:'💎', title:'VIP Shopping Experience', price:1200, duration:'6h', group:'1-4', rating:5, reviews:87, tag:'Exclusive',
    img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    desc:'Private access to Dubai\'s finest boutiques with a personal shopper, styling consultation, and VIP lounge access.',
    includes:['Personal Shopper','VIP Lounge Access','Styling Consultation','Private Transport','Concierge Service'],
  },
  { id:14, cat:'Shopping', icon:'🛍️', title:'Dubai Mall Luxury Tour', price:650, duration:'4h', group:'1-6', rating:4, reviews:134, tag:'Premium',
    img:'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    desc:'Guided luxury shopping through Dubai Mall\'s finest fashion houses with exclusive after-hours access.',
    includes:['After-Hours Access','Fashion Advisor','Refreshments','Gift Wrapping','Valet Parking'],
  },
]

export default function Experiences() {
  const [activeCat, setActiveCat] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = activeCat === 'All' ? EXPERIENCES : EXPERIENCES.filter(e => e.cat === activeCat)

  return (
    <div className="exp-page">
      {/* Hero */}
      <div className="exp-hero">
        <img src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1920&q=90" alt="Experiences" className="page-hero-img" />
        <div className="exp-hero-overlay" />
        <div className="exp-hero-content">
          <span className="label"><GiCrown /> Curated for the Extraordinary</span>
          <h1 className="display">Luxury Experiences</h1>
          <p className="accent-text" style={{color:'var(--gold)',fontSize:'1.3rem'}}>14 iconic experiences. Infinite memories.</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'4rem',paddingBottom:'5rem'}}>
        {/* Filter Tabs */}
        <div className="exp-filter-bar">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`exp-filter-btn ${activeCat===cat?'active':''}`} onClick={()=>setActiveCat(cat)}>
              {cat === 'All' && '🌟 '}
              {cat === 'Desert' && '🏜️ '}
              {cat === 'Marine' && '⛵ '}
              {cat === 'Sky' && '🚁 '}
              {cat === 'Cultural' && '🕌 '}
              {cat === 'Shopping' && '💎 '}
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="exp-page-grid">
          {filtered.map(exp => (
            <div key={exp.id} className="exp-full-card" onClick={()=>setSelected(exp)}>
              <div className="exp-full-img">
                <img src={exp.img} alt={exp.title} loading="lazy" />
                <div className="overlay-dark" />
                {exp.tag && <div className="exp-tag badge">{exp.tag}</div>}
                <div className="exp-cat-icon">{exp.icon}</div>
              </div>
              <div className="exp-full-body">
                <h3>{exp.title}</h3>
                <p>{exp.desc.substring(0,100)}...</p>
                <div className="exp-meta">
                  <span><FiClock /> {exp.duration}</span>
                  <span><FiUsers /> {exp.group}</span>
                  <span><FiStar /> {exp.rating}.0 ({exp.reviews})</span>
                </div>
                <div className="exp-full-footer">
                  <div>
                    <span className="label">From</span>
                    <div style={{fontFamily:'var(--font-head)',fontSize:'1.5rem',color:'var(--gold)',fontWeight:700}}>${exp.price.toLocaleString()}<span style={{fontSize:'0.8rem',color:'var(--text-muted)',fontFamily:'var(--font-body)',fontWeight:400}}> /person</span></div>
                  </div>
                  <Link to="/booking" className="btn btn-gold btn-sm" onClick={e=>e.stopPropagation()}>Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal-box exp-modal" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
            <img src={selected.img} alt={selected.title} style={{width:'100%',height:'280px',objectFit:'cover'}} />
            <div style={{padding:'2rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'1rem',marginBottom:'1.2rem'}}>
                <div>
                  {selected.tag && <span className="badge" style={{marginBottom:'0.5rem',display:'inline-flex'}}>{selected.tag}</span>}
                  <h2 style={{fontFamily:'var(--font-head)',fontSize:'1.6rem',color:'var(--ivory)'}}>{selected.title}</h2>
                  <div className="exp-meta" style={{marginTop:'0.5rem'}}>
                    <span><FiClock /> {selected.duration}</span>
                    <span><FiUsers /> {selected.group} guests</span>
                    <span><FiStar style={{color:'var(--gold)'}} /> {selected.rating}.0 ({selected.reviews} reviews)</span>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="label">From</div>
                  <div style={{fontFamily:'var(--font-head)',fontSize:'2rem',color:'var(--gold)',fontWeight:700}}>${selected.price.toLocaleString()}<span style={{fontSize:'0.9rem',color:'var(--text-muted)',fontFamily:'var(--font-body)',fontWeight:400}}>/person</span></div>
                </div>
              </div>
              <p style={{color:'var(--text-muted)',lineHeight:1.8,marginBottom:'1.5rem'}}>{selected.desc}</p>
              <div className="label" style={{marginBottom:'1rem'}}>What's Included</div>
              <div className="includes-grid">
                {selected.includes.map(inc => (
                  <div key={inc} className="include-item">✓ {inc}</div>
                ))}
              </div>
              <div style={{display:'flex',gap:'1rem',marginTop:'2rem',justifyContent:'flex-end'}}>
                <Link to="/booking" className="btn btn-gold btn-lg" onClick={()=>setSelected(null)}><GiCrown /> Book This Experience</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
