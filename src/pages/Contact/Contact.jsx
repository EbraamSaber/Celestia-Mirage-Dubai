import { useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import {
  FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck
} from 'react-icons/fi'
import { FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { GiCrown } from 'react-icons/gi'
import './Contact.css'

const CONTACT_CARDS = [
  {
    icon: <FiPhone />,
    title: 'Phone & WhatsApp',
    lines: ['+971 4 200 0000', '+971 50 000 0000'],
    sub: '24/7 Concierge Line',
    color: '#D4AF37',
  },
  {
    icon: <FiMail />,
    title: 'Email',
    lines: ['concierge@celestiamirage.ae', 'reservations@celestiamirage.ae'],
    sub: 'We respond within 1 hour',
    color: '#D4AF37',
  },
  {
    icon: <FiMapPin />,
    title: 'Location',
    lines: ['Jumeirah Beach Road', 'Dubai, UAE — PO Box 77777'],
    sub: '20 min from DXB Airport',
    color: '#D4AF37',
  },
  {
    icon: <FiClock />,
    title: 'Reception Hours',
    lines: ['Front Desk: 24/7', 'Spa: 08:00 – 22:00'],
    sub: 'Dining reservations from 7AM',
    color: '#D4AF37',
  },
]

const SUBJECTS = [
  'Room Reservation',
  'Desert Safari Booking',
  'Spa & Wellness',
  'Restaurant Reservation',
  'Private Events & Weddings',
  'Luxury Car Rental',
  'VIP Enquiry',
  'Feedback & Complaints',
  'Other',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    console.log('Contact form data:', data)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      reset()
    }, 5000)
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contact Us — Celestia Royal Dubai</title>
        <meta name="description" content="Contact Celestia Royal Dubai — 24/7 concierge, reservations, WhatsApp support, and our address in Jumeirah Beach Road, Dubai." />
      </Helmet>

      <main className="contact-page page-enter">
        {/* Hero */}
        <section className="contact-hero">
          <div className="contact-hero-bg" />
          <div className="container contact-hero-content">
            <span className="label">Get In Touch</span>
            <h1 className="headline gold-gradient">We Are Always Here For You</h1>
            <p className="muted body-lg" style={{ maxWidth: 540 }}>
              Our concierge team is at your service around the clock. Reach us by phone, WhatsApp, email, or visit us in person.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="section-sm">
          <div className="container">
            <div className="contact-cards">
              {CONTACT_CARDS.map((card) => (
                <div key={card.title} className="contact-card card-glass">
                  <div className="contact-card-icon">{card.icon}</div>
                  <div>
                    <h3 className="contact-card-title">{card.title}</h3>
                    {card.lines.map(line => (
                      <p key={line} className="contact-card-line">{line}</p>
                    ))}
                    <p className="contact-card-sub">{card.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content: Form + Map */}
        <section className="section">
          <div className="container">
            <div className="contact-main-grid">
              {/* Contact Form */}
              <div className="contact-form-wrap">
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                  <span className="label">Send A Message</span>
                  <h2 className="subheadline">How Can We Help?</h2>
                </div>

                {submitted ? (
                  <div className="contact-success">
                    <div className="success-icon"><FiCheck /></div>
                    <h3>Message Sent Successfully</h3>
                    <p>Our concierge team will respond within 60 minutes. Thank you for reaching out to Celestia Mirage Dubai.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid-2" style={{ gap: '1.2rem' }}>
                      <div className="input-group">
                        <label htmlFor="contact-name">Full Name *</label>
                        <input
                          id="contact-name"
                          className={`luxury-input ${errors.name ? 'input-error' : ''}`}
                          placeholder="Your full name"
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <span className="error-msg">{errors.name.message}</span>}
                      </div>
                      <div className="input-group">
                        <label htmlFor="contact-email">Email Address *</label>
                        <input
                          id="contact-email"
                          type="email"
                          className={`luxury-input ${errors.email ? 'input-error' : ''}`}
                          placeholder="your@email.com"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                          })}
                        />
                        {errors.email && <span className="error-msg">{errors.email.message}</span>}
                      </div>
                    </div>

                    <div className="grid-2" style={{ gap: '1.2rem' }}>
                      <div className="input-group">
                        <label htmlFor="contact-phone">Phone / WhatsApp</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          className="luxury-input"
                          placeholder="+971 50 000 0000"
                          {...register('phone')}
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="contact-subject">Subject *</label>
                        <select
                          id="contact-subject"
                          className={`luxury-input ${errors.subject ? 'input-error' : ''}`}
                          {...register('subject', { required: 'Please select a subject' })}
                        >
                          <option value="">Select subject…</option>
                          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.subject && <span className="error-msg">{errors.subject.message}</span>}
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="contact-dates">Preferred Dates (if applicable)</label>
                      <input
                        id="contact-dates"
                        type="text"
                        className="luxury-input"
                        placeholder="e.g. June 15 – June 20, 2026"
                        {...register('dates')}
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="contact-message">Message *</label>
                      <textarea
                        id="contact-message"
                        className={`luxury-input contact-textarea ${errors.message ? 'input-error' : ''}`}
                        placeholder="Tell us how we can help you…"
                        rows={5}
                        {...register('message', { required: 'Please write a message', minLength: { value: 20, message: 'Message too short' } })}
                      />
                      {errors.message && <span className="error-msg">{errors.message.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-gold btn-lg contact-submit">
                      <FiSend />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Sidebar: Map + Quick Contact */}
              <div className="contact-sidebar">
                {/* Map Embed */}
                <div className="contact-map">
                  <iframe
                    title="Celestia Mirage Dubai Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178476967064!2d55.17502607538847!3d25.096415077774516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402628b41%3A0xb4dc13c67b7cc58b!2sJumeirah%20Beach%20Road%2C%20Dubai!5e0!3m2!1sen!2sae!4v1748484400000!5m2!1sen!2sae"
                    width="100%"
                    height="280"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Quick Actions */}
                <div className="quick-contact-cards">
                  <a
                    href="https://wa.me/971500000000?text=Hello%2C%20I%20am%20interested%20in%20Celestia%20Mirage%20Dubai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-contact-btn whatsapp"
                    id="whatsapp-contact"
                  >
                    <FaWhatsapp className="quick-icon" />
                    <div>
                      <div className="quick-title">Chat on WhatsApp</div>
                      <div className="quick-sub">Instant response</div>
                    </div>
                  </a>
                  <a
                    href="https://t.me/celestiamirage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-contact-btn telegram"
                    id="telegram-contact"
                  >
                    <FaTelegram className="quick-icon" />
                    <div>
                      <div className="quick-title">Message on Telegram</div>
                      <div className="quick-sub">@celestiamirage</div>
                    </div>
                  </a>
                  <a
                    href="tel:+97142000000"
                    className="quick-contact-btn phone"
                    id="phone-contact"
                  >
                    <FiPhone className="quick-icon" />
                    <div>
                      <div className="quick-title">Call Concierge</div>
                      <div className="quick-sub">+971 4 200 0000</div>
                    </div>
                  </a>
                </div>

                {/* Emergency Line */}
                <div className="emergency-card card-dark">
                  <GiCrown className="emergency-crown" />
                  <h4>Royal Guest Emergency Line</h4>
                  <p className="muted body-sm">
                    For Platinum & Royal members, our dedicated VIP line is available 24/7.
                  </p>
                  <a href="tel:+97142000001" className="btn btn-outline btn-sm" style={{ marginTop: '1rem' }}>
                    +971 4 200 0001
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section className="section-sm departments-section">
          <div className="container">
            <div className="section-header">
              <span className="label">Departments</span>
              <h2 className="subheadline">Direct Lines</h2>
            </div>
            <div className="departments-grid">
              {[
                { dept: 'Reservations', email: 'reservations@celestiamirage.ae', phone: '+971 4 200 0002' },
                { dept: 'Spa & Wellness', email: 'spa@celestiamirage.ae', phone: '+971 4 200 0003' },
                { dept: 'Events & Weddings', email: 'events@celestiamirage.ae', phone: '+971 4 200 0004' },
                { dept: 'Restaurant Bookings', email: 'dining@celestiamirage.ae', phone: '+971 4 200 0005' },
                { dept: 'Car Rentals', email: 'transport@celestiamirage.ae', phone: '+971 4 200 0006' },
                { dept: 'Loyalty Program', email: 'loyalty@celestiamirage.ae', phone: '+971 4 200 0007' },
              ].map(d => (
                <div key={d.dept} className="dept-card card-dark">
                  <GiCrown className="dept-icon" />
                  <h4 className="dept-title">{d.dept}</h4>
                  <a href={`mailto:${d.email}`} className="dept-contact">{d.email}</a>
                  <a href={`tel:${d.phone}`} className="dept-contact">{d.phone}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  )
}
