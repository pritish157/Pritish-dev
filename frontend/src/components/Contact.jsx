import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/pritish157', color: '#F1F5F9',
    icon: (<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>) },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pritish-kumar-panda-dev/', color: '#0A66C2',
    icon: (<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>) },
  { label: 'Email', href: 'mailto:pritishpanda157@gmail.com', color: '#8B5CF6',
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>) },
]

const sanitize = (str) => str.replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]))

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    const maxLens = { name: 100, email: 254, subject: 200, message: 2000 }
    if (value.length <= (maxLens[name] || 2000)) setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { toast.error('Please fill in all required fields.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error('Please enter a valid email address.'); return }
    setSending(true)
    try {
      await axios.post('/api/contact', { name: sanitize(form.name.trim()), email: form.email.trim(), subject: sanitize(form.subject.trim()), message: sanitize(form.message.trim()) })
      toast.success('Message sent! I\'ll reply within 24 hours.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to send. Try emailing directly.')
    } finally { setSending(false) }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Left: Info */}
      <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        className="flex flex-col gap-5">
        <div className="glass p-5 sm:p-7 rounded-3xl flex flex-col gap-4">
          <div className="font-mono text-[11px] text-text-muted">// contact_details</div>
          {[
            { label: 'Email', value: 'pritishpanda157@gmail.com', href: 'mailto:pritishpanda157@gmail.com' },
            { label: 'Location', value: 'India 🇮🇳' },
            { label: 'Open For', value: 'Full-time, Internships, Freelance' },
            { label: 'Response', value: '< 24 hours' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="text-xs text-text-muted w-20 sm:w-24 shrink-0 pt-0.5">{item.label}</div>
              {item.href ? (
                <a href={item.href} className="text-sm text-purple-300 no-underline hover:underline break-all">{item.value}</a>
              ) : (
                <span className="text-sm text-slate-300">{item.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {SOCIALS.map(s => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="glass flex-1 p-4 flex flex-col items-center gap-2 no-underline rounded-2xl transition-all min-h-[72px] hover:shadow-lg hover:shadow-purple-500/5"
              title={s.label} aria-label={`Visit ${s.label}`}>
              <span style={{ color: s.color }}>{s.icon}</span>
              <span className="text-xs text-text-muted font-medium">{s.label}</span>
            </motion.a>
          ))}
        </div>

        <motion.a href="/resume.pdf" download whileHover={{ y: -3 }} rel="noopener noreferrer"
          className="glass p-5 flex items-center gap-4 no-underline rounded-3xl transition-all hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-cyan-500/5">
          <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/25 flex items-center justify-center shrink-0">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#06B6D4" strokeWidth="2"><path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">Download Resume</div>
            <div className="text-xs text-text-muted mt-0.5">PDF · Updated 2025</div>
          </div>
          <span className="ml-auto text-accent-cyan text-xl">↓</span>
        </motion.a>
      </motion.div>

      {/* Right: Form */}
      <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <form onSubmit={handleSubmit} className="glass-elevated p-5 sm:p-8 rounded-3xl flex flex-col gap-5" autoComplete="off" noValidate aria-label="Contact form">
          <div className="font-mono text-[11px] text-text-muted">// send_message.post</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="text-xs text-text-muted font-medium mb-1.5 block">Name *</label>
              <input id="contact-name" name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required className="input-field" maxLength={100} />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-xs text-text-muted font-medium mb-1.5 block">Email *</label>
              <input id="contact-email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required className="input-field" maxLength={254} />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="text-xs text-text-muted font-medium mb-1.5 block">Subject</label>
            <input id="contact-subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} className="input-field" maxLength={200} />
          </div>

          <div>
            <label htmlFor="contact-message" className="text-xs text-text-muted font-medium mb-1.5 block">Message *</label>
            <textarea id="contact-message" name="message" placeholder="Tell me about the opportunity or project..." value={form.message} onChange={handleChange} required rows={5} className="input-field" maxLength={2000} />
          </div>

          <motion.button type="submit" disabled={sending} whileTap={{ scale: 0.97 }}
            className="btn-primary justify-center text-base" style={{ opacity: sending ? 0.7 : 1 }}>
            {sending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : '📨 Send Message'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
