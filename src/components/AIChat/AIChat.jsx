import { useState, useRef, useEffect } from 'react'
import { FiX, FiSend, FiMessageCircle, FiMic, FiPaperclip } from 'react-icons/fi'
import { GiCrown } from 'react-icons/gi'
import { BsRobot } from 'react-icons/bs'
import './AIChat.css'

const QUICK_REPLIES = [
  'Book a suite',
  'Desert Safari info',
  'Spa treatments',
  'Airport transfer',
  'Restaurant reservations',
]

const AI_RESPONSES = {
  default: "I'm your personal concierge at Celestia Mirage Dubai. How may I assist you today?",
  suite: "We offer 5 exclusive suite categories: Royal Suite from AED 8,500/night, Sky Villa from AED 12,000/night, Presidential Penthouse from AED 18,500/night, Ocean View Suite from AED 6,200/night, and our Private Pool Villa from AED 24,000/night. Shall I check availability?",
  safari: "Our Desert Safari packages start at AED 450/person and include ATV rides, camel rides, Bedouin dinner, fire show, and stargazing. Premium packages with private guides are available from AED 1,200. Would you like to book?",
  spa: "Our Celestia Spa offers over 40 treatments. Signature massages from AED 680, couples packages from AED 1,400, and full-day retreats from AED 2,800. Shall I check therapist availability?",
  airport: "We offer luxury airport transfers in Rolls Royce, Mercedes S-Class, or our signature Celestia fleet. One-way transfer from AED 450. Shall I arrange a pickup?",
  restaurant: "Celestia has 4 award-winning restaurants: Zafran (Arabic Cuisine), La Maison (French Fine Dining), Sakura Sky (Asian Fusion), and Azure (Mediterranean). Which would you like to reserve?",
}

function getAIResponse(text) {
  const lower = text.toLowerCase()
  if (lower.includes('suite') || lower.includes('room') || lower.includes('book')) return AI_RESPONSES.suite
  if (lower.includes('safari') || lower.includes('desert')) return AI_RESPONSES.safari
  if (lower.includes('spa') || lower.includes('massage') || lower.includes('wellness')) return AI_RESPONSES.spa
  if (lower.includes('airport') || lower.includes('transfer') || lower.includes('pickup')) return AI_RESPONSES.airport
  if (lower.includes('restaurant') || lower.includes('dining') || lower.includes('food')) return AI_RESPONSES.restaurant
  return AI_RESPONSES.default
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, from: 'ai', text: "Welcome to Celestia Royal Dubai 👑 I'm Layla, your personal AI concierge. How may I assist you today?", time: new Date() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    if (open) {
      setUnread(0)
      scrollToBottom()
    }
  }, [open, messages])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const aiReply = { id: Date.now() + 1, from: 'ai', text: getAIResponse(text), time: new Date() }
      setMessages(prev => [...prev, aiReply])
      setTyping(false)
      if (!open) setUnread(prev => prev + 1)
    }, 1200 + Math.random() * 800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* Floating Button */}
      <button
        id="ai-chat-toggle"
        className={`ai-chat-fab ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open AI Concierge"
      >
        <GiCrown className="fab-crown" />
        <span className="fab-label">AI Concierge</span>
        {unread > 0 && <span className="fab-badge">{unread}</span>}
        <span className="fab-pulse" />
      </button>

      {/* Chat Window */}
      <div className={`ai-chat-window ${open ? 'open' : ''}`} id="ai-chat-window">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-avatar">
            <BsRobot className="avatar-icon" />
            <span className="avatar-online" />
          </div>
          <div className="chat-header-info">
            <div className="chat-name">Layla — AI Concierge</div>
            <div className="chat-status">
              <span className="status-dot" />
              Always available
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <FiX />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" id="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.from}`}>
              {msg.from === 'ai' && (
                <div className="msg-avatar">
                  <GiCrown size={14} />
                </div>
              )}
              <div className="msg-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">{formatTime(msg.time)}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg ai">
              <div className="msg-avatar"><GiCrown size={14} /></div>
              <div className="msg-bubble typing-bubble">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="quick-replies">
          {QUICK_REPLIES.map(qr => (
            <button key={qr} className="quick-reply-btn" onClick={() => sendMessage(qr)}>
              {qr}
            </button>
          ))}
        </div>

        {/* Input */}
        <form className="chat-input-row" onSubmit={handleSubmit}>
          <button type="button" className="chat-action-btn" aria-label="Attach file">
            <FiPaperclip />
          </button>
          <input
            id="ai-chat-input"
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything…"
            autoComplete="off"
          />
          <button type="button" className="chat-action-btn" aria-label="Voice message">
            <FiMic />
          </button>
          <button type="submit" className="chat-send-btn" disabled={!input.trim()} aria-label="Send message">
            <FiSend />
          </button>
        </form>
      </div>
    </>
  )
}
