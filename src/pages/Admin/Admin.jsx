import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { GiCrown } from 'react-icons/gi'
import {
  FiUsers, FiCalendar, FiDollarSign, FiTrendingUp,
  FiStar, FiMapPin, FiKey, FiGrid, FiActivity,
  FiShoppingBag, FiAlertCircle, FiChevronDown, FiSearch, FiBell
} from 'react-icons/fi'
import './Admin.css'

// ── MOCK DATA ──────────────────────────────────────────────────
const REVENUE_DATA = [
  { month: 'Jan', revenue: 1240000, bookings: 284 },
  { month: 'Feb', revenue: 1580000, bookings: 342 },
  { month: 'Mar', revenue: 1920000, bookings: 419 },
  { month: 'Apr', revenue: 1700000, bookings: 368 },
  { month: 'May', revenue: 2340000, bookings: 512 },
  { month: 'Jun', revenue: 2180000, bookings: 475 },
  { month: 'Jul', revenue: 2650000, bookings: 578 },
  { month: 'Aug', revenue: 2420000, bookings: 530 },
  { month: 'Sep', revenue: 2100000, bookings: 458 },
  { month: 'Oct', revenue: 2780000, bookings: 607 },
  { month: 'Nov', revenue: 3020000, bookings: 659 },
  { month: 'Dec', revenue: 3450000, bookings: 751 },
]

const ROOM_DATA = [
  { name: 'Royal Suite', booked: 94, available: 6 },
  { name: 'Sky Villa', booked: 87, available: 13 },
  { name: 'Presidential', booked: 78, available: 22 },
  { name: 'Ocean View', booked: 91, available: 9 },
  { name: 'Pool Villa', booked: 82, available: 18 },
]

const GUEST_NATIONALITY = [
  { name: 'UAE & GCC', value: 28 },
  { name: 'Russia', value: 19 },
  { name: 'Europe', value: 17 },
  { name: 'China', value: 14 },
  { name: 'UK', value: 10 },
  { name: 'Other', value: 12 },
]

const EXPERIENCE_REVENUE = [
  { name: 'Desert Safari', revenue: 420000, bookings: 834 },
  { name: 'Yacht Charter', revenue: 680000, bookings: 312 },
  { name: 'Helicopter', revenue: 540000, bookings: 218 },
  { name: 'Luxury Cars', revenue: 390000, bookings: 476 },
  { name: 'Spa', revenue: 290000, bookings: 1248 },
]

const RECENT_BOOKINGS = [
  { id: 'CM-2026-7842', guest: 'Sheikh Khalid Al-Mansouri', room: 'Royal Suite', checkin: '2026-06-12', checkout: '2026-06-19', total: 'AED 59,500', status: 'Confirmed', tier: 'Royal' },
  { id: 'CM-2026-7841', guest: 'Anastasia Volkov', room: 'Sky Villa', checkin: '2026-06-10', checkout: '2026-06-14', total: 'AED 48,000', status: 'Confirmed', tier: 'Platinum' },
  { id: 'CM-2026-7840', guest: 'Li Wei Chen', room: 'Ocean View Suite', checkin: '2026-06-08', checkout: '2026-06-13', total: 'AED 31,000', status: 'Checked In', tier: 'Gold' },
  { id: 'CM-2026-7839', guest: 'James Hartwell', room: 'Private Pool Villa', checkin: '2026-06-05', checkout: '2026-06-11', total: 'AED 144,000', status: 'Checked In', tier: 'Royal' },
  { id: 'CM-2026-7838', guest: 'Élise Beaumont', room: 'Presidential Penthouse', checkin: '2026-06-03', checkout: '2026-06-06', total: 'AED 55,500', status: 'Checked Out', tier: 'Platinum' },
  { id: 'CM-2026-7837', guest: 'Priya Sharma', room: 'Royal Suite', checkin: '2026-06-01', checkout: '2026-06-06', total: 'AED 42,500', status: 'Checked Out', tier: 'Gold' },
]

const ALERTS = [
  { type: 'warning', msg: 'Room 412 maintenance required — reported by housekeeping' },
  { type: 'info', msg: 'Sheikh Khalid Al-Mansouri arriving tomorrow — VIP arrangements confirmed' },
  { type: 'success', msg: 'Monthly revenue target exceeded by 23%' },
  { type: 'warning', msg: 'Spa therapist Sofia scheduled for 3 sessions — overtime approval needed' },
]

const GOLD = '#D4AF37'
const PIE_COLORS = ['#D4AF37', '#B8941F', '#F5D87A', '#8a6d0f', '#c0901a', '#6b5210']

const SIDEBAR_ITEMS = [
  { icon: <FiGrid />, label: 'Overview', id: 'overview' },
  { icon: <FiDollarSign />, label: 'Revenue', id: 'revenue' },
  { icon: <FiCalendar />, label: 'Bookings', id: 'bookings' },
  { icon: <FiKey />, label: 'Rooms', id: 'rooms' },
  { icon: <FiMapPin />, label: 'Experiences', id: 'experiences' },
  { icon: <FiUsers />, label: 'Guests', id: 'guests' },
  { icon: <FiStar />, label: 'Reviews', id: 'reviews' },
  { icon: <FiActivity />, label: 'Analytics', id: 'analytics' },
]

const KPIS = [
  { label: 'Total Revenue (YTD)', value: 'AED 27.4M', delta: '+18.2%', icon: <FiDollarSign />, color: '#D4AF37' },
  { label: 'Active Bookings', value: '1,847', delta: '+12.4%', icon: <FiCalendar />, color: '#34C759' },
  { label: 'Avg. Occupancy', value: '87.3%', delta: '+4.1%', icon: <FiKey />, color: '#D4AF37' },
  { label: 'Guest Satisfaction', value: '4.97 / 5', delta: '+0.03', icon: <FiStar />, color: '#F5D87A' },
  { label: 'Royal Members', value: '284', delta: '+22 this month', icon: <GiCrown />, color: '#D4AF37' },
  { label: 'New Registrations', value: '1,294', delta: '+8.7%', icon: <FiUsers />, color: '#0088CC' },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-row" style={{ color: p.color || GOLD }}>
          <span>{p.name}:</span>
          <span>{typeof p.value === 'number' && p.value > 10000
            ? `AED ${(p.value / 1000000).toFixed(2)}M`
            : p.value.toLocaleString()
          }</span>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    'Confirmed': 'status-confirmed',
    'Checked In': 'status-checked-in',
    'Checked Out': 'status-checked-out',
    'Cancelled': 'status-cancelled',
  }
  return <span className={`status-badge ${map[status] || ''}`}>{status}</span>
}

function TierBadge({ tier }) {
  return <span className={`tier-badge tier-${tier.toLowerCase()}`}><GiCrown size={10} /> {tier}</span>
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQ, setSearchQ] = useState('')

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <GiCrown className="admin-crown" />
          <div>
            <div className="admin-brand">Celestia Mirage</div>
            <div className="admin-brand-sub">ADMIN PANEL</div>
          </div>
        </div>

        <nav className="admin-nav">
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.id}
              className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              id={`admin-nav-${item.id}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-pill">
            <div className="admin-user-avatar">A</div>
            <div>
              <div className="admin-user-name">Admin</div>
              <div className="admin-user-role">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="topbar-search">
            <FiSearch className="search-icon" />
            <input
              className="topbar-search-input"
              placeholder="Search guests, bookings, rooms…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              id="admin-search"
            />
          </div>
          <div className="topbar-right">
            <span className="topbar-date">{new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <button className="topbar-icon-btn" id="admin-notifications">
              <FiBell />
              <span className="notif-dot" />
            </button>
            <div className="topbar-avatar">SA</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          {/* Alerts Strip */}
          <div className="alerts-strip">
            {ALERTS.map((a, i) => (
              <div key={i} className={`alert-chip alert-${a.type}`}>
                <FiAlertCircle size={13} />
                <span>{a.msg}</span>
              </div>
            ))}
          </div>

          {/* KPI Grid */}
          <div className="kpi-grid">
            {KPIS.map(kpi => (
              <div key={kpi.label} className="kpi-card">
                <div className="kpi-icon" style={{ color: kpi.color }}>{kpi.icon}</div>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
                <div className={`kpi-delta ${kpi.delta.startsWith('+') ? 'positive' : 'negative'}`}>
                  <FiTrendingUp size={11} />
                  {kpi.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row 1: Revenue + Occupancy */}
          <div className="charts-row">
            {/* Revenue Area Chart */}
            <div className="chart-card chart-card-wide">
              <div className="chart-card-header">
                <h3 className="chart-title">Monthly Revenue 2026</h3>
                <div className="chart-badge">AED 27.4M YTD</div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(248,245,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(248,245,240,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue (AED)" stroke={GOLD} strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: GOLD }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Guest Nationality Pie */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h3 className="chart-title">Guest Nationalities</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={GUEST_NATIONALITY}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {GUEST_NATIONALITY.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 8, fontSize: 12 }} />
                  <Legend formatter={(v) => <span style={{ color: 'rgba(248,245,240,0.6)', fontSize: 11 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2: Room Occupancy + Experience Revenue */}
          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-card-header">
                <h3 className="chart-title">Suite Occupancy %</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={ROOM_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: 'rgba(248,245,240,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0,100]} tick={{ fill: 'rgba(248,245,240,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="booked" name="Occupied" fill={GOLD} radius={[4,4,0,0]} />
                  <Bar dataKey="available" name="Available" fill="rgba(212,175,55,0.15)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card chart-card-wide">
              <div className="chart-card-header">
                <h3 className="chart-title">Experience Revenue (AED)</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={EXPERIENCE_REVENUE} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }} barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'rgba(248,245,240,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(248,245,240,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="revenue" name="Revenue (AED)" fill={GOLD} radius={[0,4,4,0]}>
                    {EXPERIENCE_REVENUE.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? '#D4AF37' : '#B8941F'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="table-card">
            <div className="table-card-header">
              <h3 className="chart-title">Recent Bookings</h3>
              <div className="table-actions">
                <button className="btn btn-outline btn-sm">Export CSV</button>
                <button className="btn btn-gold btn-sm">+ New Booking</button>
              </div>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Guest</th>
                    <th>Tier</th>
                    <th>Suite / Room</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_BOOKINGS
                    .filter(b => !searchQ || b.guest.toLowerCase().includes(searchQ.toLowerCase()) || b.id.includes(searchQ))
                    .map(b => (
                    <tr key={b.id}>
                      <td className="booking-id">{b.id}</td>
                      <td className="guest-name">{b.guest}</td>
                      <td><TierBadge tier={b.tier} /></td>
                      <td>{b.room}</td>
                      <td>{b.checkin}</td>
                      <td>{b.checkout}</td>
                      <td className="total-cell">{b.total}</td>
                      <td><StatusBadge status={b.status} /></td>
                      <td>
                        <button className="table-action-btn">
                          <FiChevronDown size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
