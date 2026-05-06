import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, Code2, Download, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { heroMetrics, homeQuickInfo, projects, siteConfig } from '../content/siteContent'
import Reveal from './ui/Reveal'

const socialIconMap = {
  GitHub: Code2,
  LinkedIn: BriefcaseBusiness,
  Email: Mail,
}

export default function Hero() {
  const [activeWord, setActiveWord] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveWord((index) => (index + 1) % siteConfig.heroRotations.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="section-shell">
        <div className="hero-grid">
          <Reveal className="min-w-0">
            <span className="hero-kicker">Available for product engineering teams</span>

            <h1 id="hero-title" className="hero-title">
              Pritish Kumar Panda
              <span className="mt-4 block text-[var(--color-text-secondary)]">
                builds{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={siteConfig.heroRotations[activeWord]}
                    className="text-gradient inline-block"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {siteConfig.heroRotations[activeWord]}
                  </motion.span>
                </AnimatePresence>{' '}
                with full-stack discipline.
              </span>
            </h1>

            <p className="hero-copy">
              I am a <strong className="text-[var(--color-text-primary)]">{siteConfig.role}</strong> from India
              focused on clean React UI, reliable Node.js APIs, and product systems that are easy to understand.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="primary-button">
                View projects
                <ArrowRight size={16} />
              </Link>
              <a href={siteConfig.resumePath} download className="secondary-button" rel="noreferrer">
                <Download size={16} />
                Resume
              </a>
              <Link to="/contact" className="secondary-button">
                <BriefcaseBusiness size={16} />
                Contact
              </Link>
            </div>

            <div className="hero-proof">
              {homeQuickInfo.map((signal, index) => (
                <Reveal key={signal} className="hero-proof__item" delay={index * 0.05}>
                  <span>{signal}</span>
                </Reveal>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {siteConfig.socialLinks.map((link) => {
                const Icon = socialIconMap[link.label]

                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="soft-chip">
                    {Icon ? <Icon size={15} /> : null}
                    {link.shortLabel}
                  </a>
                )
              })}
            </div>

            <div className="stats-grid">
              {heroMetrics.map((metric, index) => (
                <Reveal key={metric.label} className="metric-card" delay={0.08 + index * 0.05}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="hero-frame" delay={0.08}>
            <div className="hero-frame__glow" />
            <div className="surface-panel hero-terminal">
              <div className="hero-terminal__top">
                <div className="hero-terminal__dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hero-terminal__meta">portfolio.system/overview</div>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="hero-command">
                  <div className="hero-command__label">$ whoami</div>
                  <div className="hero-command__text">
                    {siteConfig.role} with stronger backend ownership and mobile-friendly UI focus.
                  </div>
                </div>

                <div className="hero-command">
                  <div className="hero-command__label">$ stack</div>
                  <div className="hero-command__text">
                    React.js · Node.js · Express.js · MongoDB · REST APIs · Socket.IO · JWT Auth
                  </div>
                </div>

                <div className="hero-command">
                  <div className="hero-command__label">$ projects</div>
                  <div className="grid gap-3 pt-1">
                    {projects.slice(0, 2).map((project) => (
                      <div
                        key={project.id}
                        className="rounded-[16px] border border-[rgba(140,200,255,0.1)] bg-[rgba(255,255,255,0.025)] p-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-text-primary)]">{project.name}</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--color-text-soft)]">{project.heroTag}</p>
                          </div>
                          <span className="status-chip">{project.status}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.stack.slice(0, 3).map((item) => (
                            <span key={item} className="soft-chip">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
