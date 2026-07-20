import { Link } from 'react-router-dom'
import { GiCrown } from 'react-icons/gi'
import { FiCheck } from 'react-icons/fi'
import './Loyalty.css'

const TIERS = [
  { name:'Silver', icon:'🥈', color:'#C0C0C0', points:'0 – 9,999', perks:['Early check-in','Welcome gift','Member rates','Birthday bonus points','Digital concierge access'] },
  { name:'Gold', icon:'🥇', color:'#D4AF37', points:'10,000 – 24,999', perks:['All Silver perks','Room upgrade','Daily breakfast','Late checkout 2pm','Spa credit $100','Priority reservations'] },
  { name:'Platinum', icon:'💎', color:'#E5E4E2', points:'25,000 – 49,999', perks:['All Gold perks','Suite upgrade','Airport transfer','Personal butler','Spa credit $300','4pm late checkout','Exclusive lounge access'] },
  { name:'Royal', icon:'👑', color:'#D4AF37', points:'50,000+', perks:['All Platinum perks','Guaranteed suite','Rolls-Royce transfer','24/7 Royal butler','Unlimited spa','Full hotel privileges','Celebrity chef dinner','Private jet discount'] },
]

const HOW_TO_EARN = [
  { icon:'🏨', action:'Hotel Stay', points:'10 pts per $1 spent' },
  { icon:'🍽️', action:'Dining', points:'5 pts per $1 spent' },
  { icon:'💆', action:'Spa Services', points:'5 pts per $1 spent' },
  { icon:'🏜️', action:'Experiences', points:'8 pts per $1 spent' },
  { icon:'🚗', action:'Car Rental', points:'6 pts per $1 spent' },
  { icon:'🎉', action:'Events', points:'4 pts per $1 spent' },
  { icon:'👥', action:'Referral', points:'2,000 pts per friend' },
  { icon:'⭐', action:'Review', points:'500 pts per review' },
]

const REDEMPTIONS = [
  { icon:'🌙', title:'Free Night Stay', pts:'25,000 pts', value:'Worth $2,000+' },
  { icon:'✈️', title:'Airport Transfer', pts:'5,000 pts', value:'Worth $350' },
  { icon:'💆', title:'Spa Treatment', pts:'8,000 pts', value:'Worth $600' },
  { icon:'🍾', title:'Champagne & Flowers', pts:'3,000 pts', value:'Worth $250' },
  { icon:'⛵', title:'Sunset Cruise', pts:'15,000 pts', value:'Worth $1,200' },
  { icon:'🚁', title:'Helicopter Tour', pts:'30,000 pts', value:'Worth $2,200' },
]

export default function Loyalty() {
  return (
    <div className="loyalty-page">
      <div className="page-hero">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=90" alt="Loyalty" className="page-hero-img" />
        <div className="overlay-dark" />
        <div className="page-hero-content">
          <span className="label"><GiCrown /> Royal Rewards Program</span>
          <h1 className="headline">Loyalty That Rewards Royally</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>Every moment earns. Every point opens a world.</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'5rem',paddingBottom:'5rem'}}>

        {/* Tiers */}
        <div className="section-header">
          <span className="label">Membership Tiers</span>
          <h2 className="headline">Four Tiers of Excellence</h2>
          <div className="gold-divider"><span>◆</span></div>
        </div>
        <div className="tiers-grid">
          {TIERS.map((tier, i) => (
            <div key={tier.name} className={`tier-card card-glass ${i===3?'tier-card--royal':''}`} style={{'--tier-color':tier.color}}>
              {i===3 && <div className="tier-best-badge badge"><GiCrown /> Top Tier</div>}
              <div className="tier-icon">{tier.icon}</div>
              <div className="tier-name" style={{color:tier.color}}>{tier.name}</div>
              <div className="tier-points">{tier.points} pts</div>
              <ul className="tier-perks">
                {tier.perks.map(p => <li key={p}><FiCheck className="perk-check" />{p}</li>)}
              </ul>
              <Link to="/booking" className={`btn ${i===3?'btn-gold':'btn-outline'} btn-sm`} style={{marginTop:'auto'}}>
                {i===3?<><GiCrown /> Join Royal</>:'Get Started'}
              </Link>
            </div>
          ))}
        </div>

        {/* How to Earn */}
        <div className="section-header" style={{marginTop:'5rem'}}>
          <span className="label">Earning Points</span>
          <h2 className="headline">Every Experience Earns</h2>
          <div className="gold-divider"><span>◆</span></div>
        </div>
        <div className="earn-grid">
          {HOW_TO_EARN.map(e => (
            <div key={e.action} className="earn-card card-dark">
              <span className="earn-icon">{e.icon}</span>
              <div className="earn-action">{e.action}</div>
              <div className="earn-rate">{e.points}</div>
            </div>
          ))}
        </div>

        {/* Redemptions */}
        <div className="section-header" style={{marginTop:'5rem'}}>
          <span className="label">Redeem Points</span>
          <h2 className="headline">Turn Points Into Memories</h2>
          <div className="gold-divider"><span>◆</span></div>
        </div>
        <div className="redeem-grid">
          {REDEMPTIONS.map(r => (
            <div key={r.title} className="redeem-card card-glass">
              <span className="redeem-icon">{r.icon}</span>
              <h4>{r.title}</h4>
              <div className="redeem-pts gold-gradient">{r.pts}</div>
              <div className="redeem-val">{r.value}</div>
              <button className="btn btn-outline btn-sm">Redeem</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
