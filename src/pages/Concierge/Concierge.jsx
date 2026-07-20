import { useState, useRef, useEffect } from 'react'
import { GiCrown } from 'react-icons/gi'
import { FiSend, FiPaperclip, FiMic, FiVideo, FiX, FiChevronDown } from 'react-icons/fi'
import { MdTranslate } from 'react-icons/md'
import './Concierge.css'

const QUICK_ACTIONS = [
  { icon:'🚗', label:'Book Transport' },
  { icon:'🍽️', label:'Reserve Table' },
  { icon:'🏜️', label:'Safari Booking' },
  { icon:'🧖', label:'Spa Appointment' },
  { icon:'⛵', label:'Yacht Charter' },
  { icon:'🛎️', label:'Room Service' },
  { icon:'🛁', label:'Housekeeping' },
  { icon:'✈️', label:'Airport Pickup' },
]

const AI_RESPONSES = {
  transport: "I'd be delighted to arrange your transportation. We have Rolls-Royce Phantom, Bentley Flying Spur, and Mercedes S-Class available. Would you prefer a chauffeur-driven service or self-drive?",
  reservation: "Excellent choice! Which of our 18 restaurants would you like to reserve? I'd recommend Aurum for a special occasion — Chef Jean-Luc's tasting menu is extraordinary.",
  safari: "A desert safari is a magnificent choice. Our exclusive Private Desert Experience includes ATV riding, camel trek, Bedouin dinner, and stargazing. Shall I check availability for your preferred date?",
  spa: "Our award-winning spa offers over 30 bespoke treatments. The Royal Arabian Massage and Gold Leaf Body Wrap are guest favorites. Would you like to book for today or a specific date?",
  default: "Welcome to Celestia Mirage Concierge. I'm here to ensure every moment of your stay is extraordinary. How may I assist you?",
}

const NOTIFICATIONS = [
  { id:1, icon:'🚗', title:'Your car has arrived', msg:'Your Rolls-Royce Phantom is waiting at the main entrance.', time:'2 min ago', type:'transport' },
  { id:2, icon:'🛎️', title:'Room Service on the way', msg:'Your order will arrive in approximately 15 minutes.', time:'8 min ago', type:'service' },
  { id:3, icon:'🏜️', title:'Safari Confirmed', msg:'Your Desert Safari is confirmed for tomorrow at 4:00 PM.', time:'1h ago', type:'booking' },
  { id:4, icon:'💆', title:'Spa Reservation', msg:'Your Couples Harmony Massage is booked for today at 6:00 PM.', time:'2h ago', type:'spa' },
]

const LANGS = ['English','العربية','Русский','中文','Français','Deutsch']

let msgIdCounter = 10
const INIT_MSGS = [
  { id:1, from:'ai', text:"Welcome to Celestia Mirage. I'm your personal AI Concierge — available 24/7 to make every moment of your stay extraordinary. How may I assist you today?", time:'Now' },
]

export default function Concierge() {
  const [messages, setMessages] = useState(INIT_MSGS)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [activeLang, setActiveLang] = useState('English')
  const [activeTab, setActiveTab] = useState('chat')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { id: ++msgIdCounter, from:'user', text, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) }
    setMessages(p => [...p, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const lower = text.toLowerCase()
      let reply = AI_RESPONSES.default
      if (lower.includes('car') || lower.includes('transport') || lower.includes('pickup')) reply = AI_RESPONSES.transport
      else if (lower.includes('restaurant') || lower.includes('dinner') || lower.includes('table') || lower.includes('reserv')) reply = AI_RESPONSES.reservation
      else if (lower.includes('safari') || lower.includes('desert')) reply = AI_RESPONSES.safari
      else if (lower.includes('spa') || lower.includes('massage')) reply = AI_RESPONSES.spa
      setTyping(false)
      setMessages(p => [...p, { id: ++msgIdCounter, from:'ai', text: reply, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) }])
    }, 1800)
  }

  return (
    <div className="concierge-page">
      {/* Hero */}
      <div className="page-hero" style={{height:'340px'}}>
        <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1920&q=90" alt="Concierge" className="page-hero-img" />
        <div className="overlay-dark" />
        <div className="page-hero-content">
          <span className="label"><GiCrown /> 24/7 Royal Service</span>
          <h1 className="headline">AI Concierge & Live Chat</h1>
          <p className="accent-text" style={{color:'var(--gold)'}}>Your personal luxury assistant, always at your service</p>
        </div>
      </div>

      <div className="container concierge-container">
        {/* Tabs */}
        <div className="concierge-tabs">
          <button className={`conc-tab ${activeTab==='chat'?'active':''}`} onClick={()=>setActiveTab('chat')}>💬 AI Concierge</button>
          <button className={`conc-tab ${activeTab==='reception'?'active':''}`} onClick={()=>setActiveTab('reception')}>🛎️ Live Reception</button>
          <button className={`conc-tab ${activeTab==='notifications'?'active':''}`} onClick={()=>setActiveTab('notifications')}>🔔 Notifications <span className="notif-dot">4</span></button>
        </div>

        {/* CHAT TAB */}
        {(activeTab==='chat' || activeTab==='reception') && (
          <div className="chat-layout">
            {/* Sidebar */}
            <div className="chat-sidebar">
              <div className="chat-sidebar-title">{activeTab==='chat'?'Quick Actions':'Request Type'}</div>
              <div className="quick-actions">
                {QUICK_ACTIONS.map(a => (
                  <button key={a.label} className="quick-action-btn" onClick={()=>sendMessage(a.label)}>
                    <span>{a.icon}</span><span>{a.label}</span>
                  </button>
                ))}
              </div>
              <div className="chat-sidebar-title" style={{marginTop:'1.5rem'}}>Translate To</div>
              <div className="lang-list">
                {LANGS.map(l => (
                  <button key={l} className={`lang-list-btn ${activeLang===l?'active':''}`} onClick={()=>setActiveLang(l)}>
                    <MdTranslate />{l}
                  </button>
                ))}
              </div>
              {activeTab==='reception' && (
                <button className="btn btn-outline btn-sm" style={{marginTop:'1.5rem',width:'100%'}}>
                  <FiVideo /> Video Call Reception
                </button>
              )}
            </div>

            {/* Chat Window */}
            <div className="chat-window">
              <div className="chat-header">
                <div className="chat-agent">
                  <div className="agent-avatar">
                    {activeTab==='chat' ? '🤖' : '👤'}
                    <span className="agent-status online" />
                  </div>
                  <div>
                    <div className="agent-name">{activeTab==='chat' ? 'Celestia AI Concierge' : 'Reception & Concierge Team'}</div>
                    <div className="agent-status-text">Online • Responds instantly</div>
                  </div>
                </div>
                <div className="chat-lang-badge"><MdTranslate /> {activeLang}</div>
              </div>

              <div className="chat-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`chat-bubble-wrap ${msg.from==='user'?'user':''}`}>
                    {msg.from==='ai' && <div className="bubble-avatar">✨</div>}
                    <div className={`chat-bubble ${msg.from==='user'?'user-bubble':'ai-bubble'}`}>
                      <p>{msg.text}</p>
                      <span className="bubble-time">{msg.time} {msg.from==='user'&&'✓✓'}</span>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="chat-bubble-wrap">
                    <div className="bubble-avatar">✨</div>
                    <div className="ai-bubble chat-bubble typing-bubble">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="chat-input-bar">
                <button className="chat-icon-btn"><FiPaperclip /></button>
                <button className="chat-icon-btn"><FiMic /></button>
                <input
                  className="chat-input"
                  placeholder={`Ask anything... (${activeLang})`}
                  value={input}
                  onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&sendMessage(input)}
                />
                <button className="btn btn-gold btn-sm chat-send-btn" onClick={()=>sendMessage(input)}>
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab==='notifications' && (
          <div className="notifications-panel">
            <h3 className="notif-panel-title">Your Notifications</h3>
            <div className="notif-list">
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className="notif-item card-glass">
                  <div className="notif-icon">{n.icon}</div>
                  <div className="notif-body">
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-msg">{n.msg}</div>
                  </div>
                  <div className="notif-time">{n.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
