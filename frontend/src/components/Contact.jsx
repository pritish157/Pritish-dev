import { useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BriefcaseBusiness, Code2, Mail, MapPin, TimerReset } from 'lucide-react'
import { contactReasons, siteConfig } from '../content/siteContent'
import Reveal from './ui/Reveal'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const sanitize = (value) =>
  value.replace(/[<>"'&]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
  }[character]))

function validateField(name, value) {
  const trimmed = value.trim()

  if ((name === 'name' || name === 'email' || name === 'message') && !trimmed) {
    return 'This field is required.'
  }

  if (name === 'email' && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return 'Enter a valid email address.'
  }

  if (name === 'message' && trimmed.length > 0 && trimmed.length < 30) {
    return 'Please share a bit more context so I can respond well.'
  }

  return ''
}

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/pritish157',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pritish-kumar-panda-dev/',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Email',
    href: 'mailto:pritishpanda157@gmail.com',
    icon: Mail,
  },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const fieldCount = useMemo(
    () => ({
      message: `${form.message.length}/2000`,
      subject: `${form.subject.length}/200`,
    }),
    [form.message.length, form.subject.length],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    const maxLengthByField = { name: 100, email: 254, subject: 200, message: 2000 }

    if (value.length > (maxLengthByField[name] ?? 2000)) {
      return
    }

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }))
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = Object.fromEntries(
      Object.entries(form).map(([name, value]) => [name, validateField(name, value)]),
    )

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      toast.error('Please fix the highlighted fields before sending.')
      return
    }

    setSending(true)

    try {
      await axios.post('/api/contact', {
        name: sanitize(form.name.trim()),
        email: form.email.trim(),
        subject: sanitize(form.subject.trim()),
        message: sanitize(form.message.trim()),
      })

      toast.success("Message sent. I'll get back to you within 24 hours.")
      setForm(initialForm)
      setErrors({})
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Unable to send right now. Please try email directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact-grid items-start" id="contact-form">
      <Reveal className="space-y-5">
        <div className="surface-panel">
          <p className="section-eyebrow">Recruiter fit</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Best for teams that need product polish and backend reliability in the same hire.
          </h3>

          <ul className="mt-5 space-y-3">
            {contactReasons.map((reason) => (
              <li key={reason} className="feature-row">
                <span className="feature-dot" aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card">
          <h3 className="subsection-title">Direct contact</h3>
          <div className="mt-5 grid gap-4">
            <div className="surface-tile flex items-start gap-3">
              <Mail size={18} className="mt-1 text-[var(--color-accent)]" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-2 block text-sm font-semibold text-[var(--color-text-primary)]">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="surface-tile flex items-start gap-3">
              <MapPin size={18} className="mt-1 text-[var(--color-accent)]" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Location</p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{siteConfig.location}</p>
              </div>
            </div>

            <div className="surface-tile flex items-start gap-3">
              <TimerReset size={18} className="mt-1 text-[var(--color-accent)]" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Response time</p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{siteConfig.responseTime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card">
          <h3 className="subsection-title">Social proof</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            Active across GitHub, LinkedIn, and direct email. Resume download is available for faster screening.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon

              return (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="soft-chip">
                  <Icon size={15} />
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      </Reveal>

      <Reveal className="surface-panel" delay={0.06}>
        <p className="section-eyebrow">Message</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Tell me about the role, team, or product problem.
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
          A little context helps me reply with relevant examples, timelines, and project fit.
        </p>

        <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className="form-field"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                placeholder="Your full name"
              />
              {errors.name ? <p id="contact-name-error" className="field-error">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className="form-field"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                placeholder="you@company.com"
              />
              {errors.email ? <p id="contact-email-error" className="field-error">{errors.email}</p> : null}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="contact-subject" className="block text-sm font-medium text-[var(--color-text-primary)]">
                Subject
              </label>
              <span className="text-xs text-[var(--color-text-dim)]">{fieldCount.subject}</span>
            </div>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              autoComplete="off"
              className="form-field"
              value={form.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Role, collaboration, freelance project..."
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--color-text-primary)]">
                Message
              </label>
              <span className="text-xs text-[var(--color-text-dim)]">{fieldCount.message}</span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              rows={7}
              className="form-field"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              placeholder="Share the role, what you're building, timeline, and what kind of developer you're looking for."
            />
            {errors.message ? <p id="contact-message-error" className="field-error">{errors.message}</p> : null}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-7 text-[var(--color-text-soft)]">
              Resume, GitHub, and project walkthroughs are available during the conversation.
            </p>
            <button type="submit" className="primary-button min-w-[12rem]" disabled={sending}>
              {sending ? 'Sending...' : 'Send message'}
            </button>
          </div>
        </form>
      </Reveal>
    </div>
  )
}
