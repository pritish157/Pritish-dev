import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const SUGGESTED = [
  "What is the Matrimonial App?",
  "What tech does Pritish use?",
  "Can Pritish build real-time apps?",
  "Tell me about the Event Management system",
  "What is Pritish's career goal?",
  "Does Pritish know authentication?",
]

// Sanitize user input before sending
const sanitize = (str) => str.replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]))

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-accent-purple"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

/**
 * AIAssistant — works in two modes:
 *   embedded={true}  → stripped-down chat panel (used inside HomeScreen modal)
 *   embedded={false} → standalone full section (legacy, not used in current routing)
 */
export default function AIAssistant({ embedded = false }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hey! I'm Pritish's AI assistant. Ask me anything about his projects, skills, or experience. Try one of the suggestions below ↓",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const msg = (text || input.trim()).slice(0, 500)
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)

    try {
      const { data } = await axios.post('/api/ai/chat', { message: sanitize(msg) })
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Sorry, the AI service isn't connected right now. But feel free to explore the rest of the portfolio!",
      }])
    } finally {
      setLoading(false)
    }
  }

  const chatPanel = (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 -webkit-overflow-scrolling-touch"
        style={{ maxHeight: embedded ? '260px' : '320px' }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'rounded-2xl rounded-br-sm bg-gradient-to-br from-accent-purple to-accent-blue text-white'
                : 'rounded-2xl rounded-bl-sm bg-white/5 border border-accent-purple/15 text-slate-300'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-white/5 border border-accent-purple/15">
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 border-t border-accent-purple/10 overflow-x-auto shrink-0"
        style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex gap-1.5">
          {SUGGESTED.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="shrink-0 text-[11px] py-1 px-2.5 rounded-full whitespace-nowrap bg-accent-purple/8 border border-accent-purple/20 text-slate-400 cursor-pointer transition-colors hover:border-accent-purple/50 hover:text-purple-300"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-accent-purple/10 shrink-0">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value.slice(0, 500))}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about projects, skills, or experience..."
          className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-dim"
          maxLength={500}
          aria-label="Ask the AI assistant"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-xl border-none bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center cursor-pointer shrink-0 transition-opacity disabled:opacity-40"
          aria-label="Send message"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </motion.button>
      </div>
    </div>
  )

  if (embedded) {
    return chatPanel
  }

  // Standalone full-section mode (kept for backward compatibility)
  return (
    <div className="py-12 px-4 sm:px-6 max-w-[var(--content-max)] mx-auto">
      <div className="screen-header">
        <div className="tag tag-purple mb-3">ai.assistant</div>
        <h2 className="screen-title">Ask the <span className="gradient-text">AI Assistant</span></h2>
        <p className="screen-subtitle">A RAG-powered bot trained on Pritish's projects, skills, and experience.</p>
      </div>

      <div className="max-w-[680px] mx-auto">
        <div className="glass border border-accent-purple/25 rounded-3xl overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center gap-2.5 px-5 py-3 bg-accent-purple/8 border-b border-accent-purple/15">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold text-sm">AI</div>
            <div>
              <div className="text-sm font-semibold text-text-primary">Portfolio Assistant</div>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse-dot" />
                RAG-powered · Knowledge base: Pritish's projects
              </div>
            </div>
          </div>
          {chatPanel}
        </div>
      </div>
    </div>
  )
}
