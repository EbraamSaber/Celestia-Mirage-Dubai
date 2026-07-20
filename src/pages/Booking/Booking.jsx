import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiCalendar, FiUsers, FiHome, FiCheck, FiArrowRight } from 'react-icons/fi'
import { GiCrown } from 'react-icons/gi'
import './Booking.css'

const ROOM_TYPES = [
  { id:'deluxe', name:'Deluxe Room', price:1200 },
  { id:'suite', name:'Luxury Suite', price:3500 },
  { id:'royal', name:'Royal Suite', price:12500 },
  { id:'sky', name:'Sky Villa', price:8900 },
  { id:'penthouse', name:'Presidential Penthouse', price:18000 },
  { id:'pool-villa', name:'Private Pool Villa', price:22000 },
]
const EXTRAS = [
  { id:'breakfast', label:'Gourmet Breakfast', price:180, icon:'🍳' },
  { id:'spa', label:'Spa Treatment', price:450, icon:'💆' },
  { id:'romantic', label:'Romantic Setup', price:800, icon:'🌹' },
  { id:'airport', label:'Airport Transfer', price:350, icon:'🚗' },
  { id:'yacht', label:'Sunset Yacht', price:2500, icon:'⛵' },
  { id:'chef', label:'Private Chef Dinner', price:3200, icon:'👨‍🍳' },
]
const CURRENCIES = ['USD','AED','EUR','GBP','SAR','RUB']
const STEPS = ['Stay Details', 'Room & Extras', 'Guest Info', 'Confirm']

export default function Booking() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    checkin:'', checkout:'', guests:2, rooms:1,
    roomType:'suite', currency:'USD',
    extras:[], specialReq:'',
    firstName:'', lastName:'', email:'', phone:'', nationality:'',
    withDriver: false,
  })

  const selectedRoom = ROOM_TYPES.find(r => r.id === form.roomType)
  const nights = form.checkin && form.checkout
    ? Math.max(0, Math.round((new Date(form.checkout) - new Date(form.checkin)) / 86400000))
    : 1
  const extrasTotal = form.extras.reduce((s, id) => s + (EXTRAS.find(e=>e.id===id)?.price||0), 0)
  const roomTotal = (selectedRoom?.price||0) * nights
  const total = roomTotal + extrasTotal

  const toggleExtra = (id) => {
    setForm(f => ({...f, extras: f.extras.includes(id) ? f.extras.filter(e=>e!==id) : [...f.extras, id]}))
  }
  const update = (k, v) => setForm(f => ({...f, [k]: v}))

  return (
    <div className="booking-page">
      {/* Hero */}
      <div className="booking-hero">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80" alt="Booking" className="booking-hero-img" />
        <div className="overlay-dark" />
        <div className="booking-hero-content">
          <span className="label"><GiCrown /> Premium Reservation</span>
          <h1 className="headline">{t('booking.title')}</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>Crafted exclusively for you</p>
        </div>
      </div>

      <div className="container booking-container">
        {/* Steps */}
        <div className="steps-bar">
          {STEPS.map((s, i) => (
            <div key={s} className={`step-item ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="step-num">{i < step ? <FiCheck /> : i+1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="booking-layout">
          {/* Form */}
          <div className="booking-form-wrap">

            {/* Step 0 */}
            {step === 0 && (
              <div className="form-step">
                <h2 className="form-step-title">Your Stay Dates</h2>
                <div className="grid-2">
                  <div className="input-group">
                    <label><FiCalendar /> {t('booking.checkin')}</label>
                    <input type="date" className="luxury-input" value={form.checkin} onChange={e=>update('checkin',e.target.value)} min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="input-group">
                    <label><FiCalendar /> {t('booking.checkout')}</label>
                    <input type="date" className="luxury-input" value={form.checkout} onChange={e=>update('checkout',e.target.value)} min={form.checkin||new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="input-group">
                    <label><FiUsers /> {t('booking.guests')}</label>
                    <select className="luxury-input" value={form.guests} onChange={e=>update('guests',+e.target.value)}>
                      {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label><FiHome /> Rooms</label>
                    <select className="luxury-input" value={form.rooms} onChange={e=>update('rooms',+e.target.value)}>
                      {[1,2,3,4].map(n=><option key={n} value={n}>{n} Room{n>1?'s':''}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Currency</label>
                    <select className="luxury-input" value={form.currency} onChange={e=>update('currency',e.target.value)}>
                      {CURRENCIES.map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Special Requests</label>
                    <textarea className="luxury-input" rows={3} placeholder="Any special requirements..." value={form.specialReq} onChange={e=>update('specialReq',e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="form-step">
                <h2 className="form-step-title">Choose Your Suite</h2>
                <div className="room-list">
                  {ROOM_TYPES.map(r => (
                    <div key={r.id} className={`room-option ${form.roomType===r.id?'selected':''}`} onClick={()=>update('roomType',r.id)}>
                      <div className="room-radio">{form.roomType===r.id && <FiCheck />}</div>
                      <div className="room-option-info">
                        <span className="room-option-name">{r.name}</span>
                        <span className="room-option-price">{form.currency} {r.price.toLocaleString()} / night</span>
                      </div>
                    </div>
                  ))}
                </div>
                <h2 className="form-step-title" style={{marginTop:'2rem'}}>Luxury Extras</h2>
                <div className="extras-grid">
                  {EXTRAS.map(ex => (
                    <div key={ex.id} className={`extra-card ${form.extras.includes(ex.id)?'selected':''}`} onClick={()=>toggleExtra(ex.id)}>
                      <span className="extra-icon">{ex.icon}</span>
                      <span className="extra-label">{ex.label}</span>
                      <span className="extra-price">+{form.currency} {ex.price}</span>
                      {form.extras.includes(ex.id) && <div className="extra-check"><FiCheck /></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="form-step">
                <h2 className="form-step-title">Guest Information</h2>
                <div className="grid-2">
                  <div className="input-group">
                    <label>First Name</label>
                    <input className="luxury-input" placeholder="Your first name" value={form.firstName} onChange={e=>update('firstName',e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <input className="luxury-input" placeholder="Your last name" value={form.lastName} onChange={e=>update('lastName',e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input className="luxury-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>update('email',e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input className="luxury-input" placeholder="+971 50 000 0000" value={form.phone} onChange={e=>update('phone',e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Nationality</label>
                    <input className="luxury-input" placeholder="Your nationality" value={form.nationality} onChange={e=>update('nationality',e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="form-step">
                <h2 className="form-step-title">Confirm Your Reservation</h2>
                <div className="confirm-summary">
                  <div className="confirm-row"><span>Room</span><strong>{selectedRoom?.name}</strong></div>
                  <div className="confirm-row"><span>Check-in</span><strong>{form.checkin || '—'}</strong></div>
                  <div className="confirm-row"><span>Check-out</span><strong>{form.checkout || '—'}</strong></div>
                  <div className="confirm-row"><span>Nights</span><strong>{nights}</strong></div>
                  <div className="confirm-row"><span>Guests</span><strong>{form.guests}</strong></div>
                  {form.extras.length > 0 && (
                    <div className="confirm-row">
                      <span>Extras</span>
                      <strong>{form.extras.map(id=>EXTRAS.find(e=>e.id===id)?.label).join(', ')}</strong>
                    </div>
                  )}
                  <div className="confirm-divider" />
                  <div className="confirm-row confirm-total">
                    <span>Total</span>
                    <strong className="gold-gradient">{form.currency} {total.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="loyalty-note">
                  <GiCrown /> You'll earn <strong>5,000 Royal Points</strong> with this booking
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="form-nav">
              {step > 0 && <button className="btn btn-glass" onClick={()=>setStep(s=>s-1)}>← Back</button>}
              {step < 3
                ? <button className="btn btn-gold" onClick={()=>setStep(s=>s+1)}>Continue <FiArrowRight /></button>
                : <button className="btn btn-gold btn-lg"><GiCrown /> Confirm & Reserve</button>
              }
            </div>
          </div>

          {/* Price Panel */}
          <div className="price-panel card-glass">
            <h3>Reservation Summary</h3>
            <div className="price-panel-room">
              <span className="label">{selectedRoom?.name}</span>
            </div>
            <div className="price-rows">
              <div className="price-row">
                <span>{form.currency} {selectedRoom?.price?.toLocaleString()} × {nights} night{nights!==1?'s':''}</span>
                <span>{form.currency} {roomTotal.toLocaleString()}</span>
              </div>
              {form.extras.map(id => {
                const ex = EXTRAS.find(e=>e.id===id)
                return ex ? (
                  <div key={id} className="price-row">
                    <span>{ex.label}</span>
                    <span>+{form.currency} {ex.price}</span>
                  </div>
                ) : null
              })}
            </div>
            <div className="price-total">
              <span>Total</span>
              <span className="gold-gradient">{form.currency} {total.toLocaleString()}</span>
            </div>
            <div className="price-note">Taxes & fees included. Free cancellation up to 48 hours.</div>
            <div className="price-secure">🔒 Secure & Encrypted Payment</div>
          </div>
        </div>
      </div>
    </div>
  )
}
