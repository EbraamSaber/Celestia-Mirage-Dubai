import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiCrown } from 'react-icons/gi'
import { FiCalendar, FiStar, FiDownload, FiHeart, FiClock } from 'react-icons/fi'
import './Dashboard.css'

const USER = { name:'Alexander Hartwell', email:'a.hartwell@email.com', tier:'Royal', points:48250, avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', memberSince:'2022', stays:14, nextTier:'N/A (Top Tier)' }

const BOOKINGS = [
  { id:'CMB-2024-001', room:'Presidential Penthouse', checkin:'2024-03-15', checkout:'2024-03-22', nights:7, status:'Completed', total:126000, img:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=400&q=80' },
  { id:'CMB-2024-002', room:'Royal Suite', checkin:'2024-06-10', checkout:'2024-06-17', nights:7, status:'Upcoming', total:87500, img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80' },
  { id:'CMB-2024-003', room:'Sky Villa', checkin:'2024-08-20', checkout:'2024-08-25', nights:5, status:'Confirmed', total:44500, img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80' },
]

const EXPERIENCES = [
  { name:'Private Desert Safari', date:'2024-03-18', status:'Completed', price:850, icon:'🏜️' },
  { name:'Helicopter City Tour', date:'2024-03-19', status:'Completed', price:2200, icon:'🚁' },
  { name:'Sunset Yacht Charter', date:'2024-06-12', status:'Upcoming', price:4500, icon:'⛵' },
]

const CARS = [
  { car:'Rolls-Royce Phantom VIII', date:'2024-03-15', duration:'7 days', price:31500, img:'https://images.unsplash.com/photo-1563720223185-11003d516935?w=200&q=80' },
]

const MEMBERSHIP_PERKS = [
  '✦ Guaranteed room upgrade', '✦ 4pm late checkout', '✦ Daily breakfast for 2',
  '✦ VIP airport transfer', '✦ Personal butler 24/7', '✦ Complimentary spa credit',
  '✦ Exclusive Royal lounge access', '✦ Private dining reservation priority',
]

const STATUS_COLORS = { Completed:'var(--success)', Upcoming:'var(--gold)', Confirmed:'#4FC3F7', Cancelled:'var(--error)' }

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings')

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        {/* Profile Header */}
        <div className="dash-profile card-glass">
          <div className="dash-profile-left">
            <div className="dash-avatar-wrap">
              <img src={USER.avatar} alt={USER.name} className="dash-avatar" />
              <div className="dash-tier-badge"><GiCrown />{USER.tier}</div>
            </div>
            <div className="dash-profile-info">
              <h2>{USER.name}</h2>
              <p>{USER.email}</p>
              <div className="dash-stats">
                <div className="dash-stat"><span>{USER.stays}</span><small>Total Stays</small></div>
                <div className="dash-stat"><span>{USER.memberSince}</span><small>Member Since</small></div>
                <div className="dash-stat gold-gradient" style={{fontSize:'1.1rem'}}><span>{USER.points.toLocaleString()}</span><small>Royal Points</small></div>
              </div>
            </div>
          </div>
          <div className="dash-profile-right">
            <div className="points-circle">
              <div className="points-val gold-gradient">{USER.points.toLocaleString()}</div>
              <div className="points-label">Royal Points</div>
              <div className="points-tier"><GiCrown /> {USER.tier} Member</div>
            </div>
            <Link to="/loyalty" className="btn btn-outline btn-sm">View Loyalty Program</Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="dash-tabs">
          {['bookings','experiences','cars','membership'].map(t => (
            <button key={t} className={`dash-tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>
              {t==='bookings'&&'🏨'} {t==='experiences'&&'🌟'} {t==='cars'&&'🚗'} {t==='membership'&&<GiCrown/>}
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {/* BOOKINGS */}
        {activeTab==='bookings' && (
          <div className="dash-section">
            <h3 className="dash-section-title">My Reservations</h3>
            <div className="booking-list">
              {BOOKINGS.map(b => (
                <div key={b.id} className="booking-item card-dark">
                  <img src={b.img} alt={b.room} className="booking-item-img" />
                  <div className="booking-item-body">
                    <div className="booking-item-top">
                      <div>
                        <span className="label">{b.id}</span>
                        <h4>{b.room}</h4>
                      </div>
                      <span className="booking-status" style={{color:STATUS_COLORS[b.status]||'var(--text-muted)'}}>● {b.status}</span>
                    </div>
                    <div className="booking-item-dates">
                      <span><FiCalendar /> {b.checkin} → {b.checkout}</span>
                      <span><FiClock /> {b.nights} nights</span>
                    </div>
                    <div className="booking-item-footer">
                      <div style={{fontFamily:'var(--font-head)',fontSize:'1.2rem',color:'var(--gold)',fontWeight:700}}>${b.total.toLocaleString()}</div>
                      <div style={{display:'flex',gap:'0.6rem'}}>
                        <button className="btn btn-glass btn-sm"><FiDownload /> Invoice</button>
                        {b.status==='Upcoming'&&<button className="btn btn-outline btn-sm">Modify</button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCES */}
        {activeTab==='experiences' && (
          <div className="dash-section">
            <h3 className="dash-section-title">My Experiences</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              {EXPERIENCES.map(e => (
                <div key={e.name} className="exp-item card-dark">
                  <span className="exp-item-icon">{e.icon}</span>
                  <div className="exp-item-body">
                    <h4>{e.name}</h4>
                    <span><FiCalendar /> {e.date}</span>
                  </div>
                  <span className="booking-status" style={{color:STATUS_COLORS[e.status]||'var(--text-muted)'}}>● {e.status}</span>
                  <div style={{fontFamily:'var(--font-head)',fontSize:'1.1rem',color:'var(--gold)',fontWeight:700}}>${e.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CARS */}
        {activeTab==='cars' && (
          <div className="dash-section">
            <h3 className="dash-section-title">My Car Rentals</h3>
            {CARS.map(c => (
              <div key={c.car} className="car-item card-dark">
                <img src={c.img} alt={c.car} className="car-item-img" />
                <div className="exp-item-body">
                  <h4>{c.car}</h4>
                  <span><FiCalendar /> {c.date} · {c.duration}</span>
                </div>
                <div style={{fontFamily:'var(--font-head)',fontSize:'1.2rem',color:'var(--gold)',fontWeight:700}}>${c.price.toLocaleString()}</div>
              </div>
            ))}
            <Link to="/cars" className="btn btn-gold" style={{marginTop:'1.5rem'}}>Book Another Car</Link>
          </div>
        )}

        {/* MEMBERSHIP */}
        {activeTab==='membership' && (
          <div className="dash-section">
            <h3 className="dash-section-title">Royal Membership</h3>
            <div className="membership-card card-glass">
              <div className="membership-card-top">
                <div>
                  <GiCrown style={{fontSize:'3rem',color:'var(--gold)'}} />
                  <h2 style={{fontFamily:'var(--font-head)',fontSize:'2rem',marginTop:'0.5rem'}}>Royal Member</h2>
                  <p style={{color:'var(--text-muted)'}}>Our most exclusive tier — reserved for those who seek nothing but perfection.</p>
                </div>
                <div className="membership-card-points">
                  <div className="points-val gold-gradient" style={{fontSize:'2.5rem'}}>{USER.points.toLocaleString()}</div>
                  <div style={{color:'var(--text-muted)',fontSize:'0.85rem'}}>Points Balance</div>
                </div>
              </div>
              <div className="membership-perks">
                {MEMBERSHIP_PERKS.map(p => <div key={p} className="perk-item">{p}</div>)}
              </div>
            </div>
            <Link to="/loyalty" className="btn btn-gold" style={{marginTop:'1.5rem'}}>View Full Loyalty Program</Link>
          </div>
        )}
      </div>
    </div>
  )
}
