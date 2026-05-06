import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import { Bot, Link2, MessagesSquare, Send, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const SUGGESTED_PROMPTS = [
  'Why should a technical recruiter hire Pritish?',
  'Summarize his production MERN systems.',
  'What backend architecture does he use?',
  'How does he handle real-time features?',
]

const INITIAL_MESSAGE = {
  id: 'assistant-welcome',
  role: 'assistant',
  text: 'This chatbot is trained on Pritish Kumar Panda’s portfolio, projects, and career context — ask anything recruiter-facing.',
  source: 'rag',
  citations: [
    { id: 'projects', label: 'Projects', href: '/#projects' },
    { id: 'skills', label: 'Skills', href: '/#skills' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ],
}

const sourceLabels = {
  rag: 'Portfolio RAG',
  'rag-fallback': 'Local RAG',
  'openai-rag': 'AI + RAG',
}

const createMessageId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function TypingDots() {
  return (
    <div className="ai-typing" aria-label="Assistant is typing">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="ai-typing__dot"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.12 }}
        />
      ))}
    </div>
  )
}

function MessageBubble({ message, onSourceClick }) {
  return (
    <div className={`ai-message ai-message--${message.role}`}>
      <div className="ai-message__bubble">
        <div className="ai-message__meta">
          <span className="ai-message__role">{message.role === 'assistant' ? 'Assistant' : 'You'}</span>
          {message.role === 'assistant' && message.source ? (
            <span className="ai-message__source">{sourceLabels[message.source] || 'Portfolio RAG'}</span>
          ) : null}
        </div>

        <p className="ai-message__text">{message.text}</p>

        {message.role === 'assistant' && message.citations?.length ? (
          <div className="ai-message__sources">
            {message.citations.slice(0, 3).map((citation) => (
              <Link key={citation.id} to={citation.href} className="ai-source-chip" onClick={onSourceClick}>
                <Link2 size={12} />
                {citation.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function AIAssistant({ embedded = false }) {
  const [isOpen, setIsOpen] = useState(embedded)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const lastAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === 'assistant') ?? INITIAL_MESSAGE,
    [messages],
  )

  useEffect(() => {
    if (!isOpen && !embedded) return undefined

    const frame = window.requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [embedded, isOpen, loading, messages])

  useEffect(() => {
    if (!isOpen && !embedded) return undefined

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 120)

    return () => window.clearTimeout(timeout)
  }, [embedded, isOpen])

  useEffect(() => {
    if (embedded || !isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [embedded, isOpen])

  const sendMessage = async (text) => {
    const nextMessage = (text || input).trim().slice(0, 500)
    if (!nextMessage || loading) return

    const history = messages.map((message) => ({ role: message.role, content: message.text }))

    setInput('')
    setLoading(true)
    setMessages((current) => [...current, { id: createMessageId(), role: 'user', text: nextMessage }])

    try {
      const { data } = await axios.post('/api/ai/chat', {
        message: nextMessage,
        history,
      })

      const payload = data?.data ?? data
      const reply = payload?.reply?.trim() || 'I’m ready to explain Pritish’s projects, tech, and delivery approach.'

      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: 'assistant',
          text: reply,
          source: payload?.source || 'rag',
          citations: Array.isArray(payload?.citations) ? payload?.citations : [],
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: 'assistant',
          text:
            'The assistant is temporarily unavailable. You can still ask key recruiter questions about Pritish’s stack, projects, and availability.',
          source: 'rag',
          citations: INITIAL_MESSAGE.citations,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  const panel = (
    <motion.div
      key="portfolio-ai-panel"
      id="portfolio-ai-panel"
      initial={embedded ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 22, scale: 0.96 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={`ai-assistant-card surface-panel${embedded ? ' ai-assistant-card--embedded' : ''}`}
      role={embedded ? 'region' : 'dialog'}
      aria-label="Portfolio AI assistant"
      aria-modal={embedded ? undefined : false}
    >
      <div className="ai-assistant-card__header">
        <div className="ai-assistant-card__brand">
          <span className="ai-assistant-card__mark" aria-hidden="true">
            <Bot size={18} />
          </span>
          <div>
            <p className="ai-assistant-card__eyebrow">Recruiter assistant</p>
            <h2 className="ai-assistant-card__title">Ask about Pritish Kumar Panda</h2>
            <p className="ai-assistant-card__subtitle">
              Get concise recruiter-ready answers on MERN systems, real-time features, auth, and hiring fit.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="icon-button ai-assistant-card__close"
          onClick={() => setIsOpen(false)}
          aria-label="Close assistant"
        >
          <X size={16} />
        </button>
      </div>

      <div className="ai-assistant-card__suggestions" aria-label="Suggested questions">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button key={prompt} type="button" className="ai-suggestion-chip" onClick={() => sendMessage(prompt)}>
            <Sparkles size={12} />
            {prompt}
          </button>
        ))}
      </div>

      <div className="ai-assistant-card__messages" aria-live="polite" aria-atomic="false">
        {messages.map((message) => (
          <motion.div key={message.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
            <MessageBubble
              message={message}
              onSourceClick={() => {
                if (!embedded) {
                  setIsOpen(false)
                }
              }}
            />
          </motion.div>
        ))}

        {loading ? (
          <div className="ai-message ai-message--assistant">
            <div className="ai-message__bubble">
              <TypingDots />
            </div>
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      <form className="ai-assistant-card__composer" onSubmit={handleSubmit}>
        <label htmlFor="portfolio-ai-input" className="sr-only">
          Ask the portfolio AI assistant about Pritish
        </label>
        <input
          id="portfolio-ai-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, 500))}
          placeholder="Ask about Pritish’s stack, projects, or availability"
          className="ai-assistant-card__input"
          maxLength={500}
          disabled={loading}
          aria-disabled={loading}
        />
        <button type="submit" className="primary-button ai-assistant-card__send" disabled={!input.trim() || loading}>
          <Send size={15} />
          Send
        </button>
      </form>
    </motion.div>
  )

  if (embedded) {
    return panel
  }

  return (
    <div className="ai-assistant-shell">
      <AnimatePresence>{isOpen ? panel : null}</AnimatePresence>

      <motion.button
        type="button"
        className="ai-launcher"
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-controls="portfolio-ai-panel"
      >
        <span className="ai-launcher__icon" aria-hidden="true">
          <MessagesSquare size={18} />
        </span>
        <span className="ai-launcher__text">
          <strong>Ask portfolio AI</strong>
          <span>Recruiter-ready answers</span>
        </span>
      </motion.button>
    </div>
  )
}
