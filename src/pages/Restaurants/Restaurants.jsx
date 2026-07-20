import { Link } from 'react-router-dom'
import { GiCrown } from 'react-icons/gi'
import './Restaurants.css'

const RESTAURANTS = [
  { id:1, name:'Aurum', cuisine:'Contemporary French', chef:'Chef Jean-Luc Moreau', stars:3, price:'$$$$', img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85', desc:'Three-Michelin-star French haute cuisine on the 55th floor with sweeping Gulf views. Chef Jean-Luc\'s signature tasting menu features 12 avant-garde courses.', hours:'7pm – 11pm', dress:'Black Tie' },
  { id:2, name:'Al Diwan', cuisine:'Emirati & Arabic Heritage', chef:'Chef Fatima Al-Rashidi', stars:2, price:'$$$', img:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85', desc:'A journey through Emirati culinary heritage in a regal majlis setting adorned with handcrafted Islamic art and a live oud ensemble.', hours:'1pm – 11pm', dress:'Smart Casual' },
  { id:3, name:'Sakura Sky', cuisine:'Japanese Omakase', chef:'Chef Hiroshi Tanaka', stars:2, price:'$$$$', img:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=85', desc:'Elevated omakase featuring rare seasonal ingredients flown daily from Tsukiji Market. A 9-seat counter experience at 48 floors.', hours:'6:30pm – 10:30pm', dress:'Smart Formal' },
  { id:4, name:'Azur', cuisine:'Mediterranean & Seafood', chef:'Chef Sofia Papadopoulos', stars:1, price:'$$$', img:'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85', desc:'Sunlit Mediterranean flavors with the finest Gulf seafood, wood-fired dishes and a 500-label wine cellar.', hours:'12pm – 11pm', dress:'Smart Casual' },
  { id:5, name:'Spice Route', cuisine:'Pan-Asian Fusion', chef:'Chef Wei Zhang', stars:1, price:'$$$', img:'https://images.unsplash.com/photo-1535400255456-984e7f9bed18?w=800&q=85', desc:'A culinary voyage from Shanghai to Bangkok. The dim sum brunch and wagyu teppanyaki are legendary among Dubai\'s elite.', hours:'12pm – 11:30pm', dress:'Business Casual' },
  { id:6, name:'The Terrace', cuisine:'Global Brasserie & Pool', chef:'Chef Marco Rossi', stars:1, price:'$$$', img:'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=85', desc:'An alfresco dining oasis by the infinity pool. All-day dining with artisan brunch, afternoon tea and sunset cocktails.', hours:'8am – 12am', dress:'Resort Casual' },
]

export default function Restaurants() {
  return (
    <div className="restaurants-page">
      <div className="page-hero">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90" alt="Restaurants" className="page-hero-img" />
        <div className="overlay-dark" />
        <div className="page-hero-content">
          <span className="label"><GiCrown /> 18 Culinary Destinations</span>
          <h1 className="headline">Fine Dining</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>Where every meal is a masterpiece</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'4rem',paddingBottom:'5rem'}}>
        <div className="section-header">
          <span className="label">Michelin Excellence</span>
          <h2 className="headline">Our Signature Restaurants</h2>
          <div className="gold-divider"><span>◆</span></div>
          <p>Six signature restaurants, eighteen culinary worlds — each helmed by a world-renowned chef.</p>
        </div>

        <div className="restaurants-page-grid">
          {RESTAURANTS.map((r, i) => (
            <div key={r.id} className={`rest-card ${i===0?'rest-card--wide':''}`}>
              <div className="rest-img">
                <img src={r.img} alt={r.name} loading="lazy" />
                <div className="overlay-dark" />
                <div className="rest-overlay-content">
                  <div className="rest-stars">{'★'.repeat(r.stars)}<span className="rest-michelin">{'⭐'.repeat(r.stars)} Michelin</span></div>
                  <h3>{r.name}</h3>
                  <span className="rest-cuisine-tag">{r.cuisine}</span>
                </div>
              </div>
              <div className="rest-body">
                <div className="rest-meta">
                  <span>👨‍🍳 {r.chef}</span>
                  <span>🕐 {r.hours}</span>
                  <span>👔 {r.dress}</span>
                  <span>💰 {r.price}</span>
                </div>
                <p>{r.desc}</p>
                <Link to="/booking" className="btn btn-gold btn-sm">Reserve a Table</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
