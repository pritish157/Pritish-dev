import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const BOOT_LINES = [
  { text: '> Initializing Developer Profile...', delay: 0, color: '#64748B' },
  { text: '> Loading: Pritish Kumar Panda', delay: 500, color: '#8B5CF6' },
  { text: '> Role: MERN Stack Developer [Full Stack]', delay: 1000, color: '#06B6D4' },
  { text: '> Status: Open to Opportunities ✓', delay: 1500, color: '#22C55E' },
  { text: '> Stack: React · Node.js · MongoDB · Express', delay: 2000, color: '#F1F5F9' },
  { text: '> Production Apps Shipped: 3', delay: 2500, color: '#F1F5F9' },
  { text: '> Real-time · Auth · AI Integration ✓', delay: 3000, color: '#06B6D4' },
  { text: '> Profile Ready. Welcome.', delay: 3500, color: '#8B5CF6' },
]

/* ── Particle Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 30 : 70

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: Math.random() > 0.5 ? '#8B5CF6' : '#06B6D4',
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      if (!isMobile) {
        particles.forEach((p, i) => {
          particles.slice(i + 1).forEach(q => {
            const dist = Math.hypot(p.x - q.x, p.y - q.y)
            if (dist < 110) {
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
              ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 110)})`
              ctx.lineWidth = 0.5; ctx.stroke()
            }
          })
        })
      }
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill(); ctx.globalAlpha = 1
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-35" aria-hidden="true" />
}

function TerminalLine({ text, color, visible }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!visible) return
    let i = 0
    const timer = setInterval(() => { setDisplayed(text.slice(0, i + 1)); i++; if (i >= text.length) clearInterval(timer) }, 18)
    return () => clearInterval(timer)
  }, [visible, text])

  return (
    <div className="font-mono text-xs sm:text-sm leading-7" style={{ color, minHeight: '1.75rem' }}>
      {displayed}
      {displayed.length < text.length && visible && (
        <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-purple-400 animate-pulse rounded-sm" />
      )}
    </div>
  )
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } }

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(new Set())
  const [showMain, setShowMain] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach(line => { setTimeout(() => setVisibleLines(prev => new Set([...prev, line.text])), line.delay) })
    setTimeout(() => setShowMain(true), 4000)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Backgrounds */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(139,92,246,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 85%, rgba(6,182,212,0.1) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 15% 70%, rgba(139,92,246,0.06) 0%, transparent 50%), #050510',
      }} />
      <ParticleCanvas />
      <div className="absolute inset-x-0 h-px opacity-8 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)', animation: 'scan-line 4s linear infinite', top: 0 }} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Terminal */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="order-2 lg:order-1">
            <div className="glass-elevated rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 bg-white/3 border-b border-accent-purple/15">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 text-xs text-text-muted font-mono">developer-profile.sh</span>
                <span className="ml-auto text-[10px] text-text-dim font-mono">bash</span>
              </div>
              <div className="p-5 sm:p-7 space-y-0.5 min-h-[240px] sm:min-h-[300px]">
                {BOOT_LINES.map(line => (
                  <TerminalLine key={line.text} text={line.text} color={line.color} visible={visibleLines.has(line.text)} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <motion.div
            variants={stagger} initial="hidden" animate={showMain ? 'visible' : 'hidden'}
            className="order-1 lg:order-2"
          >
            <div className="flex flex-col gap-6">
              {/* Status */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono w-fit border border-green-500/20 bg-green-500/8" style={{ color: '#86EFAC' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                Open to Full-Time & Internships
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight">
                I'm <span className="gradient-text">Pritish</span>
                <br />
                <span className="text-text-secondary">Kumar Panda</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg">
                <span className="text-text-primary font-semibold">MERN Stack Developer</span> who engineers{' '}
                <span className="text-purple-300">production systems</span> — not prototypes. From real-time chat to admin dashboards and AI-integrated apps.
              </motion.p>

              {/* Credibility metrics */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: '3', label: 'Systems Shipped', icon: '🚀' },
                  { value: '40+', label: 'API Endpoints', icon: '⚡' },
                  { value: 'AI', label: 'Integrated', icon: '🤖' },
                ].map(stat => (
                  <div key={stat.label} className="glass rounded-xl p-3 sm:p-4 text-center group hover:border-accent-purple/30 transition-all duration-300">
                    <div className="text-base sm:text-lg mb-0.5">{stat.icon}</div>
                    <div className="text-lg sm:text-xl font-black gradient-text">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-text-muted mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4 pt-1">
                <Link to="/projects" className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  View Projects
                </Link>
                <Link to="/contact" className="btn-ghost">
                  Let's Talk →
                </Link>
              </motion.div>

              {/* Social links */}
              <motion.div variants={fadeUp} className="flex items-center gap-5 pt-1">
                <a href="https://github.com/pritish157" target="_blank" rel="noopener noreferrer"
                  className="text-text-muted hover:text-purple-400 transition-colors text-sm font-mono flex items-center gap-1.5">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/pritish-kumar-panda-dev/" target="_blank" rel="noopener noreferrer"
                  className="text-text-muted hover:text-cyan-400 transition-colors text-sm font-mono flex items-center gap-1.5">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="mailto:pritishpanda157@gmail.com"
                  className="text-text-muted hover:text-blue-400 transition-colors text-sm font-mono flex items-center gap-1.5">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Email
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}
          className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-xs text-text-dim font-mono">scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #8B5CF6, transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}
