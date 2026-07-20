import { Link } from 'react-router-dom'
import { GiCrown } from 'react-icons/gi'
import { FiClock } from 'react-icons/fi'
import './Spa.css'

const TREATMENTS = [
  { cat:'Massages', items:[
    { name:'Royal Arabian Massage', duration:'120 min', price:850, desc:'A fusion of traditional Arabian and deep tissue techniques using warm argan oil.' },
    { name:'Hot Stone Therapy', duration:'90 min', price:680, desc:'Heated volcanic stones melt away tension and restore energy flow.' },
    { name:'Couples Harmony', duration:'120 min', price:1400, desc:'A synchronized ritual for two in a private couples suite with champagne.' },
    { name:'Prenatal Bliss', duration:'75 min', price:580, desc:'Gentle relief designed for expecting mothers, approved by our medical team.' },
  ]},
  { cat:'Body Therapies', items:[
    { name:'Gold Leaf Body Wrap', duration:'90 min', price:1200, desc:'24-carat gold leaf applied to nourish and illuminate the skin.' },
    { name:'Desert Salt Scrub', duration:'60 min', price:550, desc:'Arabian sea salt and oud oil exfoliation for silky smooth skin.' },
    { name:'Mud & Mineral Detox', duration:'75 min', price:680, desc:'Dead Sea mud therapy to deeply cleanse and re-energize.' },
  ]},
  { cat:'Facial Treatments', items:[
    { name:'Diamond Radiance Facial', duration:'90 min', price:950, desc:'Diamond microdermabrasion with hyaluronic serum for luminous skin.' },
    { name:'Royal Anti-Aging Ritual', duration:'75 min', price:1100, desc:'Caviar extracts and collagen matrix for visibly youthful skin.' },
    { name:'Arabian Rose Glow', duration:'60 min', price:680, desc:'Pure Damask rose hydration ritual, leaving skin dewy and renewed.' },
  ]},
  { cat:'Packages', items:[
    { name:'Royal Day Package', duration:'Full Day', price:3500, desc:'Complete spa journey: massage, body scrub, facial, lunch, and thermal suite.' },
    { name:'Bridal Beauty Ritual', duration:'6 hours', price:2800, desc:'The ultimate pre-wedding preparation for brides-to-be.' },
    { name:'Gentleman\'s Retreat', duration:'3 hours', price:1800, desc:'Tailored treatments for men: sports massage, grooming, and relaxation.' },
  ]},
]

export default function Spa() {
  return (
    <div className="spa-page">
      <div className="spa-page-hero">
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=90" alt="Spa" className="page-hero-img" />
        <div className="overlay-dark" style={{background:'rgba(0,0,0,0.6)'}} />
        <div className="page-hero-content">
          <span className="label"><GiCrown /> Award-Winning Wellness</span>
          <h1 className="headline">Spa & Wellness</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>7,000 sqm of pure serenity</p>
        </div>
      </div>

      {/* Features Banner */}
      <div className="spa-features">
        <div className="container">
          <div className="spa-features-grid">
            {['🌿 Organic Products','💧 Thermal Pools','🕯️ 12 Treatment Rooms','👫 Couples Suites','🧘 Yoga & Meditation','🥗 Wellness Cuisine'].map(f=>(
              <div key={f} className="spa-feature-item">{f}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{paddingTop:'4rem',paddingBottom:'5rem'}}>
        {TREATMENTS.map(section => (
          <div key={section.cat} className="spa-section">
            <h2 className="spa-cat-title">{section.cat}</h2>
            <div className="treatments-grid">
              {section.items.map(t => (
                <div key={t.name} className="treatment-card card-dark">
                  <div className="treatment-header">
                    <div>
                      <h3>{t.name}</h3>
                      <div style={{display:'flex',gap:'0.6rem',marginTop:'0.4rem'}}>
                        <span className="treat-meta"><FiClock /> {t.duration}</span>
                      </div>
                    </div>
                    <div style={{fontFamily:'var(--font-head)',fontSize:'1.3rem',color:'var(--gold)',fontWeight:700,flexShrink:0}}>
                      ${t.price.toLocaleString()}
                    </div>
                  </div>
                  <p>{t.desc}</p>
                  <Link to="/booking" className="btn btn-outline btn-sm" style={{alignSelf:'flex-start',marginTop:'auto'}}>Book Treatment</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
