import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiUsers } from 'react-icons/fi'
import { GiCrown } from 'react-icons/gi'
import './Cars.css'

const CARS = [
  { id:1, brand:'Rolls-Royce', model:'Phantom VIII', price:2800, daily:4500, img:'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80', color:'Starlight Black', seats:4, tag:'Most Iconic' },
  { id:2, brand:'Lamborghini', model:'Huracán Evo', price:1800, daily:3200, img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80', color:'Giallo Orion', seats:2, tag:'Pure Thrill' },
  { id:3, brand:'Ferrari', model:'SF90 Stradale', price:2200, daily:3800, img:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80', color:'Rosso Corsa', seats:2, tag:'Legend' },
  { id:4, brand:'Bentley', model:'Continental GT', price:1600, daily:2800, img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', color:'Midnight Emerald', seats:4, tag:'Grand Tourer' },
  { id:5, brand:'Mercedes-Benz', model:'G63 AMG', price:1200, daily:2000, img:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80', color:'Obsidian Black', seats:5, tag:'Power & Luxury' },
  { id:6, brand:'Porsche', model:'Cayenne Turbo GT', price:900, daily:1600, img:'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80', color:'Carrara White', seats:5, tag:'Precision' },
]

export default function Cars() {
  const [withDriver, setWithDriver] = useState(true)
  const [selectedDuration, setDuration] = useState('daily')
  const [selected, setSelected] = useState(null)

  return (
    <div className="cars-page">
      <div className="page-hero">
        <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90" alt="Luxury Cars" className="page-hero-img" />
        <div className="overlay-dark" />
        <div className="page-hero-content">
          <span className="label"><GiCrown /> The Finest Fleet in Dubai</span>
          <h1 className="headline">Luxury Cars</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>Drive the extraordinary</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'4rem',paddingBottom:'5rem'}}>
        <div className="cars-controls">
          <div className="tabs" style={{maxWidth:'380px'}}>
            <button className={`tab ${selectedDuration==='hourly'?'active':''}`} onClick={()=>setDuration('hourly')}>Hourly Rate</button>
            <button className={`tab ${selectedDuration==='daily'?'active':''}`} onClick={()=>setDuration('daily')}>Daily Rate</button>
          </div>
          <label className="driver-toggle">
            <input type="checkbox" checked={withDriver} onChange={e=>setWithDriver(e.target.checked)} />
            <span className="toggle-track"><span className="toggle-thumb" /></span>
            <span>Include Chauffeur</span>
          </label>
        </div>

        <div className="cars-grid">
          {CARS.map(car => (
            <div key={car.id} className="car-card" onClick={()=>setSelected(car)}>
              <div className="car-img">
                <img src={car.img} alt={`${car.brand} ${car.model}`} loading="lazy" />
                <div className="overlay-dark" />
                {car.tag && <div className="car-tag badge">{car.tag}</div>}
              </div>
              <div className="car-body">
                <div className="car-brand">{car.brand}</div>
                <h3 className="car-model">{car.model}</h3>
                <div className="car-specs">
                  <span>🎨 {car.color}</span>
                  <span><FiUsers /> {car.seats} seats</span>
                  {withDriver && <span>👤 With Chauffeur</span>}
                </div>
                <div className="car-footer">
                  <div>
                    <span className="label">{selectedDuration === 'hourly' ? 'Per Hour' : 'Per Day'}</span>
                    <div style={{fontFamily:'var(--font-head)',fontSize:'1.6rem',color:'var(--gold)',fontWeight:700}}>
                      ${(selectedDuration==='hourly'?car.price:car.daily).toLocaleString()}
                    </div>
                  </div>
                  <Link to="/booking" className="btn btn-gold btn-sm" onClick={e=>e.stopPropagation()}>Reserve</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal-box" style={{maxWidth:'600px'}} onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
            <img src={selected.img} alt={selected.model} style={{width:'100%',height:'260px',objectFit:'cover',borderRadius:'var(--radius-md)'}} />
            <div style={{padding:'1.5rem 0'}}>
              <div className="car-brand">{selected.brand}</div>
              <h2 style={{fontFamily:'var(--font-head)',fontSize:'1.8rem',color:'var(--ivory)',marginBottom:'1rem'}}>{selected.model}</h2>
              <div className="car-specs" style={{marginBottom:'1.5rem'}}>
                <span>🎨 {selected.color}</span>
                <span><FiUsers /> {selected.seats} seats</span>
                <span><FiClock /> Available 24/7</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1.5rem'}}>
                <div style={{padding:'1rem',background:'var(--glass)',border:'1px solid var(--glass-border)',borderRadius:'var(--radius-md)',textAlign:'center'}}>
                  <div className="label">Hourly Rate</div>
                  <div style={{fontFamily:'var(--font-head)',fontSize:'1.4rem',color:'var(--gold)',fontWeight:700}}>${selected.price.toLocaleString()}</div>
                </div>
                <div style={{padding:'1rem',background:'var(--glass)',border:'1px solid var(--glass-border)',borderRadius:'var(--radius-md)',textAlign:'center'}}>
                  <div className="label">Daily Rate</div>
                  <div style={{fontFamily:'var(--font-head)',fontSize:'1.4rem',color:'var(--gold)',fontWeight:700}}>${selected.daily.toLocaleString()}</div>
                </div>
              </div>
              <div style={{display:'flex',gap:'1rem',justifyContent:'flex-end'}}>
                <Link to="/booking" className="btn btn-gold btn-lg" onClick={()=>setSelected(null)}><GiCrown /> Book This Car</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
