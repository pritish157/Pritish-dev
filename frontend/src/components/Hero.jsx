import { ArrowRight, Code2, Download, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { heroMetrics, heroSignals, projects, siteConfig } from '../content/siteContent'
import Reveal from './ui/Reveal'

const spotlightProjects = projects.slice(0, 2)

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="section-shell">
        <div className="hero-grid">
          <Reveal className="min-w-0">
            <span className="hero-kicker">Available for remote product engineering teams</span>

            <h1 id="hero-title" className="hero-title max-w-4xl">
              <span className="text-gradient">Production-grade full-stack systems.</span>
              <span className="mt-3 block text-[var(--color-text-primary)]">Auth. Realtime. AI-ready.</span>
            </h1>

            <p className="hero-copy">
              {siteConfig.role} for teams that need clean UI and reliable backend workflow.
            </p>

            <div className="hero-proof">
              {heroSignals.map((signal) => (
                <div key={signal} className="signal-chip">
                  {signal}
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <a href={siteConfig.resumePath} download className="primary-button" rel="noreferrer">
                <Download size={16} />
                Resume
              </a>
              <a href={siteConfig.socialLinks[0].href} target="_blank" rel="noreferrer" className="secondary-button">
                <Code2 size={16} />
                GitHub
              </a>
              <Link to="/projects" className="secondary-button">
                Projects
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="secondary-button">
                <Mail size={16} />
                Contact
              </Link>
            </div>

            <div className="stats-grid">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="hero-frame" delay={0.04}>
            <div className="hero-frame__glow" />

            <div className="surface-panel h-full">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-eyebrow">Engineering snapshot</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                    Scan in 20 seconds.
                  </h2>
                </div>
                <span className="status-chip">Full-stack focus</span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="surface-tile">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Backend</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Auth, RBAC, workflows.</p>
                </div>
                <div className="surface-tile">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Frontend</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Responsive, compact, polished.</p>
                </div>
                <div className="surface-tile">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Product</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Trust, ops, delivery clarity.</p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-[rgba(140,200,255,0.12)] bg-[rgba(255,255,255,0.025)] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Featured systems</p>
                <div className="mt-4 grid gap-3">
                  {spotlightProjects.map((project) => (
                    <article key={project.id} className="rounded-[18px] border border-[rgba(140,200,255,0.1)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{project.name}</h3>
                          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{project.heroTag}</p>
                        </div>
                        <span className="status-chip">{project.heroTag}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
