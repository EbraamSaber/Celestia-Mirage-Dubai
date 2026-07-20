import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiWifi, FiDroplet, FiSun, FiMaximize } from 'react-icons/fi'
import { GiCrown, GiWaterDrop, GiChefToque } from 'react-icons/gi'
import { MdSpa, MdPool, MdBalcony } from 'react-icons/md'
import './Suites.css'

const SUITES = [
  {
    id:1, name:'Royal Suite', tag:'Most Exclusive', price:12500,
    size:'340', floor:'52nd',
    img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85',
    gallery:[
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
    ],
    desc:'A masterpiece of design spanning 340 sqm. The Royal Suite offers a private infinity pool, a dedicated butler, a cinema room, and sweeping views of the Dubai skyline and Arabian Gulf.',
    amenities:['Private Infinity Pool','24/7 Royal Butler','Cinema Room','Walk-in Wardrobe','Marble Bathroom','Private Terrace','In-Suite Dining','Rolls Royce Transfer'],
    icons:[<MdPool/>,<GiCrown/>,<MdSpa/>,<FiMaximize/>,<FiDroplet/>,<MdBalcony/>,<GiChefToque/>,<FiArrowRight/>],
  },
  {
    id:2, name:'Sky Villa', tag:'Panoramic Views', price:8900,
    size:'220', floor:'45th',
    img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85',
    gallery:[
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
    ],
    desc:'Floating high above the city, the Sky Villa offers 220 sqm of refined living with floor-to-ceiling windows, a wraparound balcony, and the finest curated art collection.',
    amenities:['Floor-to-Ceiling Windows','Wraparound Balcony','Art Collection','Bose Sound System','Private Bar','Rainfall Shower','Lounge Area','Daily Champagne'],
    icons:[<FiSun/>,<MdBalcony/>,<FiMaximize/>,<FiWifi/>,<FiDroplet/>,<FiDroplet/>,<MdPool/>,<GiCrown/>],
  },
  {
    id:3, name:'Presidential Penthouse', tag:'VIP Choice', price:18000,
    size:'520', floor:'Entire 58th',
    img:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&q=85',
    gallery:[
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    ],
    desc:'Occupying the entire 58th floor, the Presidential Penthouse is the crown jewel of Celestia Mirage. With 520 sqm of pure opulence, it includes a private helipad, rooftop pool, and security detail.',
    amenities:['Private Helipad Access','Rooftop Pool & Jacuzzi','Security Detail','Grand Piano','Private Gym','2 Master Bedrooms','Chef\'s Kitchen','Rolls Royce Fleet'],
    icons:[<BsAirplanePlaceholder/>,<MdPool/>,<GiCrown/>,<FiMaximize/>,<GiWaterDrop/>,<FiMaximize/>,<GiChefToque/>,<FiArrowRight/>],
  },
  {
    id:4, name:'Ocean View Suite', tag:'Sea Breeze', price:5500,
    size:'180', floor:'38th',
    img:'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&q=85',
    gallery:[
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    desc:'Wake up to the gentle sound of the Arabian Gulf lapping against the shoreline. This 180 sqm suite features a private balcony with unobstructed ocean views and direct beach access.',
    amenities:['Ocean Panorama','Private Beach Access','Oversized Soaking Tub','King Feather Bed','Pillow Menu','Mood Lighting','Mini Bar','Turndown Service'],
    icons:[<FiSun/>,<GiWaterDrop/>,<FiDroplet/>,<MdPool/>,<FiMaximize/>,<FiSun/>,<FiDroplet/>,<GiCrown/>],
  },
  {
    id:5, name:'Private Pool Villa', tag:'Ultimate Privacy', price:22000,
    size:'650', floor:'Ground & 1st',
    img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85',
    gallery:[
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
    ],
    desc:'A world within a world. The Private Pool Villa spans 650 sqm across two floors with a 25m private infinity pool, lush private garden, outdoor cinema, and a dedicated villa team.',
    amenities:['25m Infinity Pool','Private Garden','Outdoor Cinema','Villa Concierge Team','Golf Buggy','3 Bedrooms','Full Spa Suite','Gourmet Kitchen'],
    icons:[<MdPool/>,<FiSun/>,<FiMaximize/>,<GiCrown/>,<FiArrowRight/>,<FiMaximize/>,<MdSpa/>,<GiChefToque/>],
  },
]

// Placeholder since BsAirplane import might vary
function BsAirplanePlaceholder() { return <span>✈️</span> }

export default function Suites() {
  const [selected, setSelected] = useState(null)
  const [imgIdx, setImgIdx] = useState(0)

  const openSuite = (suite) => { setSelected(suite); setImgIdx(0) }
  const close = () => setSelected(null)

  return (
    <div className="suites-page">
      {/* Hero */}
      <div className="page-hero">
        <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=90" alt="Suites" className="page-hero-img" />
        <div className="overlay-dark" />
        <div className="page-hero-content">
          <span className="label"><GiCrown /> Legendary Accommodations</span>
          <h1 className="headline">Our Suites</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>Where every night is a masterpiece</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'5rem', paddingBottom:'5rem'}}>
        <div className="section-header">
          <span className="label">Exclusively Yours</span>
          <h2 className="headline">Choose Your Private World</h2>
          <div className="gold-divider"><span>◆</span></div>
          <p>Five iconic suites — each a statement of architectural brilliance and uncompromising luxury.</p>
        </div>

        <div className="suites-page-grid">
          {SUITES.map((suite, i) => (
            <div key={suite.id} className={`suite-full-card ${i===0?'suite-full-card--wide':''}`}>
              <div className="suite-full-img" onClick={()=>openSuite(suite)}>
                <img src={suite.img} alt={suite.name} loading="lazy" />
                <div className="overlay-dark" />
                <div className="suite-full-badge badge">{suite.tag}</div>
                <div className="suite-full-hover">
                  <span>View Suite Details</span>
                </div>
              </div>
              <div className="suite-full-body">
                <div className="suite-full-meta">
                  <span className="suite-meta-item">📐 {suite.size} sqm</span>
                  <span className="suite-meta-item">🏢 Floor {suite.floor}</span>
                </div>
                <h3>{suite.name}</h3>
                <p>{suite.desc.substring(0,120)}...</p>
                <div className="suite-amenities-preview">
                  {suite.amenities.slice(0,4).map(a => (
                    <span key={a} className="amenity-tag">✓ {a}</span>
                  ))}
                </div>
                <div className="suite-full-footer">
                  <div>
                    <div className="label">From</div>
                    <div style={{fontFamily:'var(--font-head)',fontSize:'1.8rem',color:'var(--gold)',fontWeight:700}}>
                      ${suite.price.toLocaleString()}
                      <span style={{fontSize:'0.85rem',color:'var(--text-muted)',fontFamily:'var(--font-body)',fontWeight:400}}> / night</span>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'0.7rem'}}>
                    <button className="btn btn-glass btn-sm" onClick={()=>openSuite(suite)}>Details</button>
                    <Link to="/booking" className="btn btn-gold btn-sm"><GiCrown /> Reserve</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suite Modal */}
      {selected && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-box suite-modal" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={close}>✕</button>
            <div className="suite-modal-gallery">
              <img src={selected.gallery[imgIdx]} alt={selected.name} className="suite-modal-main-img" />
              <div className="suite-modal-thumbs">
                {selected.gallery.map((g,i) => (
                  <img key={i} src={g} alt="" className={`suite-modal-thumb ${i===imgIdx?'active':''}`} onClick={()=>setImgIdx(i)} />
                ))}
              </div>
            </div>
            <div className="suite-modal-body">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'1rem'}}>
                <div>
                  <span className="badge" style={{marginBottom:'0.5rem',display:'inline-flex'}}>{selected.tag}</span>
                  <h2 style={{fontFamily:'var(--font-head)',fontSize:'1.8rem',color:'var(--ivory)'}}>{selected.name}</h2>
                  <div className="suite-full-meta" style={{marginTop:'0.5rem'}}>
                    <span className="suite-meta-item">📐 {selected.size} sqm</span>
                    <span className="suite-meta-item">🏢 {selected.floor}</span>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="label">Nightly Rate From</div>
                  <div style={{fontFamily:'var(--font-head)',fontSize:'2rem',color:'var(--gold)',fontWeight:700}}>${selected.price.toLocaleString()}</div>
                </div>
              </div>
              <p style={{color:'var(--text-muted)',lineHeight:1.8,margin:'1.2rem 0'}}>{selected.desc}</p>
              <div className="amenities-grid">
                {selected.amenities.map((a,i) => (
                  <div key={a} className="amenity-item">
                    <span className="amenity-icon">{selected.icons[i]}</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:'1rem',marginTop:'2rem',justifyContent:'flex-end'}}>
                <Link to="/booking" className="btn btn-gold btn-lg" onClick={close}><GiCrown /> Reserve This Suite</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
