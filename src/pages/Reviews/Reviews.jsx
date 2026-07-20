import { useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { FiStar, FiFilter, FiThumbsUp, FiFlag, FiChevronDown } from 'react-icons/fi'
import { GiCrown } from 'react-icons/gi'
import './Reviews.css'

const REVIEWS = [
  {
    id: 1,
    name: 'Sheikh Khalid Al-Mansouri',
    country: '🇦🇪 UAE',
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=khalid&backgroundColor=D4AF37',
    rating: 5,
    tier: 'Royal Member',
    date: 'April 2026',
    title: 'An Experience Beyond Words',
    text: 'Celestia Mirage transcends the concept of luxury. Every detail — from the scent in the corridor to the way staff remembers your preference for cardamom coffee — speaks of obsessive excellence. The Royal Suite view at sunrise over the Gulf is something I will carry in my memory forever.',
    stay: 'Royal Suite — 7 nights',
    helpful: 142,
    tags: ['Service', 'View', 'Suites'],
    verified: true,
  },
  {
    id: 2,
    name: 'Anastasia Volkov',
    country: '🇷🇺 Russia',
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=anastasia&backgroundColor=C0A030',
    rating: 5,
    tier: 'Platinum Member',
    date: 'March 2026',
    title: 'The Spa Is Absolute Heaven',
    text: 'I have visited over 40 luxury hotels worldwide, and the Celestia Spa stands among the very best. My therapist, Meena, was extraordinary — intuitive and deeply skilled. The couples package with rose petals and champagne was pure magic. We will return for our anniversary every year.',
    stay: 'Sky Villa — 4 nights',
    helpful: 98,
    tags: ['Spa', 'Romance', 'Value'],
    verified: true,
  },
  {
    id: 3,
    name: 'Li Wei Chen',
    country: '🇨🇳 China',
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=liwei&backgroundColor=B8941F',
    rating: 5,
    tier: 'Gold Member',
    date: 'February 2026',
    title: 'Desert Safari Was Unforgettable',
    text: 'The private desert safari arranged by the concierge team exceeded every expectation. Our own personal guide, private glamping tent, chef-prepared dinner under the stars — this is not tourism, this is a lifestyle. Layla from the AI concierge helped plan everything seamlessly.',
    stay: 'Ocean View Suite — 5 nights',
    helpful: 76,
    tags: ['Experiences', 'Concierge', 'Safari'],
    verified: true,
  },
  {
    id: 4,
    name: 'Élise Beaumont',
    country: '🇫🇷 France',
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=elise&backgroundColor=D4AF37',
    rating: 5,
    tier: 'Platinum Member',
    date: 'January 2026',
    title: 'La Maison Restaurant — Michelin Worthy',
    text: "En tant que Française, j'ai des standards très élevés pour la gastronomie. Le chef at La Maison has created something truly special — the duck confit with truffle risotto was poetry on a plate. Combined with the sommelier's perfect wine pairing, this was a dining experience I will dream about. Magnifique!",
    stay: 'Presidential Penthouse — 3 nights',
    helpful: 89,
    tags: ['Dining', 'Fine Dining', 'Wine'],
    verified: true,
  },
  {
    id: 5,
    name: 'James Hartwell',
    country: '🇬🇧 United Kingdom',
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=james&backgroundColor=C0A030',
    rating: 5,
    tier: 'Royal Member',
    date: 'December 2025',
    title: 'Helicopter Tour — Breathtaking',
    text: 'The private helicopter tour over Dubai was the highlight of our trip. Banking over the Burj Khalifa as the sun set behind it — extraordinary. The Celestia team arranged everything including a champagne toast upon landing. Our Rolls Royce transfers were always on time, impeccably presented.',
    stay: 'Private Pool Villa — 6 nights',
    helpful: 134,
    tags: ['Experiences', 'Transport', 'Luxury'],
    verified: true,
  },
  {
    id: 6,
    name: 'Priya Sharma',
    country: '🇮🇳 India',
    avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=priya&backgroundColor=B8941F',
    rating: 4,
    tier: 'Gold Member',
    date: 'November 2025',
    title: 'Wedding of Our Dreams',
    text: 'We hosted our wedding reception in the Celestia Grand Ballroom and it was truly spectacular. The event team coordinated every detail with precision — florals, lighting, catering, entertainment. Our 200 guests were left speechless. The only small note was a slight delay in the catering setup, but they more than made up for it.',
    stay: 'Royal Suite — 5 nights',
    helpful: 67,
    tags: ['Events', 'Wedding', 'Ballroom'],
    verified: true,
  },
]

const CATEGORIES = ['All Reviews', 'Suites', 'Dining', 'Spa', 'Experiences', 'Events', 'Service']
const SORT_OPTIONS = ['Most Recent', 'Highest Rated', 'Most Helpful']

const STATS = {
  overall: 4.97,
  total: 3842,
  breakdown: [
    { stars: 5, pct: 94 },
    { stars: 4, pct: 4 },
    { stars: 3, pct: 1.5 },
    { stars: 2, pct: 0.3 },
    { stars: 1, pct: 0.2 },
  ],
  categories: [
    { label: 'Service', score: 5.0 },
    { label: 'Rooms', score: 4.9 },
    { label: 'Dining', score: 4.8 },
    { label: 'Spa', score: 4.9 },
    { label: 'Location', score: 5.0 },
    { label: 'Value', score: 4.7 },
  ]
}

function StarRow({ rating, size = 14 }) {
  return (
    <div className="stars-row" style={{ fontSize: size }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= rating ? '#D4AF37' : 'rgba(212,175,55,0.2)' }}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [activeCategory, setActiveCategory] = useState('All Reviews')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [helpfulIds, setHelpfulIds] = useState([])

  const toggleHelpful = (id) => {
    setHelpfulIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const filteredReviews = REVIEWS.filter(r =>
    activeCategory === 'All Reviews' ||
    r.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))
  )

  return (
    <HelmetProvider>
      <Helmet>
        <title>Guest Reviews — Celestia Royal Dubai</title>
        <meta name="description" content="Read authentic reviews from our distinguished guests. Over 3,800 five-star experiences at Celestia Mirage Dubai." />
      </Helmet>

      <main className="reviews-page page-enter">
        {/* Hero */}
        <section className="reviews-hero">
          <div className="reviews-hero-bg" />
          <div className="container reviews-hero-content">
            <span className="label">Guest Voices</span>
            <h1 className="headline gold-gradient">Stories of Perfection</h1>
            <p className="accent-text" style={{ color: 'rgba(248,245,240,0.7)' }}>
              Curated testimonials from our most distinguished guests
            </p>
          </div>
        </section>

        {/* Rating Overview */}
        <section className="section-sm">
          <div className="container">
            <div className="reviews-overview">
              {/* Score */}
              <div className="overview-score">
                <div className="score-number gold-gradient">{STATS.overall}</div>
                <StarRow rating={5} size={24} />
                <p className="score-label">out of 5.0</p>
                <p className="score-total muted">{STATS.total.toLocaleString()} verified reviews</p>
                <div className="score-badges">
                  <span className="badge">🏆 World Luxury Award</span>
                  <span className="badge">⭐ Forbes Five Star</span>
                </div>
              </div>

              {/* Bar Breakdown */}
              <div className="overview-bars">
                <h3 className="overview-bars-title">Rating Distribution</h3>
                {STATS.breakdown.map(b => (
                  <div key={b.stars} className="rating-bar-row">
                    <span className="bar-label">{b.stars} ★</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${b.pct}%` }} />
                    </div>
                    <span className="bar-pct">{b.pct}%</span>
                  </div>
                ))}
              </div>

              {/* Category Scores */}
              <div className="overview-cats">
                <h3 className="overview-bars-title">Category Scores</h3>
                {STATS.categories.map(cat => (
                  <div key={cat.label} className="cat-score-row">
                    <span className="cat-label">{cat.label}</span>
                    <div className="cat-bar-track">
                      <div className="cat-bar-fill" style={{ width: `${(cat.score / 5) * 100}%` }} />
                    </div>
                    <span className="cat-score-val">{cat.score.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="reviews-filters-bar">
          <div className="container reviews-filters-inner">
            <div className="category-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="sort-select-wrap">
              <FiFilter size={14} />
              <select
                className="sort-select luxury-input"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
              <FiChevronDown size={14} />
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="section">
          <div className="container">
            <div className="reviews-grid">
              {filteredReviews.map(review => (
                <article key={review.id} className="review-card card-dark">
                  {/* Header */}
                  <div className="review-card-header">
                    <div className="reviewer-avatar">
                      <img src={review.avatar} alt={review.name} loading="lazy" />
                    </div>
                    <div className="reviewer-info">
                      <div className="reviewer-name-row">
                        <span className="reviewer-name">{review.name}</span>
                        {review.verified && (
                          <span className="verified-badge">✓ Verified</span>
                        )}
                      </div>
                      <div className="reviewer-meta">
                        <span>{review.country}</span>
                        <span className="meta-dot">·</span>
                        <span>{review.date}</span>
                      </div>
                      <span className="tier-pill">
                        <GiCrown size={10} />
                        {review.tier}
                      </span>
                    </div>
                    <StarRow rating={review.rating} size={14} />
                  </div>

                  {/* Body */}
                  <div className="review-card-body">
                    <h3 className="review-title">"{review.title}"</h3>
                    <p className="review-text">{review.text}</p>
                    <div className="review-stay">
                      <GiCrown size={11} style={{ color: '#D4AF37' }} />
                      <span>{review.stay}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="review-tags">
                    {review.tags.map(tag => (
                      <span key={tag} className="review-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="review-card-footer">
                    <button
                      className={`helpful-btn ${helpfulIds.includes(review.id) ? 'active' : ''}`}
                      onClick={() => toggleHelpful(review.id)}
                    >
                      <FiThumbsUp size={13} />
                      <span>Helpful ({review.helpful + (helpfulIds.includes(review.id) ? 1 : 0)})</span>
                    </button>
                    <button className="flag-btn">
                      <FiFlag size={13} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="reviews-load-more">
              <button className="btn btn-outline btn-lg">
                Load More Reviews
              </button>
              <p className="muted body-sm" style={{ marginTop: '1rem' }}>
                Showing {filteredReviews.length} of {STATS.total.toLocaleString()} reviews
              </p>
            </div>
          </div>
        </section>

        {/* Write a Review CTA */}
        <section className="section-sm review-cta-section">
          <div className="container">
            <div className="review-cta card-glass">
              <GiCrown className="review-cta-crown" />
              <h2 className="subheadline">Share Your Celestia Experience</h2>
              <p className="muted body-lg" style={{ maxWidth: 500, margin: '1rem auto' }}>
                Your story inspires future guests. Share your journey with us.
              </p>
              <button className="btn btn-gold btn-lg">Write a Review</button>
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  )
}
