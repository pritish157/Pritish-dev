import { engineeringPrinciples, journeyTimeline, quickFacts, siteConfig } from '../content/siteContent'
import Reveal from './ui/Reveal'

export default function About({ compact = false }) {
  const visiblePrinciples = compact ? engineeringPrinciples.slice(0, 3) : engineeringPrinciples
  const visibleTimeline = compact ? journeyTimeline.slice(0, 2) : journeyTimeline

  return (
    <div className="space-y-5">
      <div className="about-grid items-start">
        <Reveal className="surface-panel">
          <p className="section-eyebrow">Story</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            I like products where the interface is clean because the system behind it is clean too.
          </h3>
          <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
            <p>
              I am {siteConfig.name}, a {siteConfig.role} focused on building systems that feel intentional from API
              design to the final interaction state. My best work comes from products where the backend architecture,
              trust model, and UI behavior all support the same outcome.
            </p>
            <p>
              That is why my portfolio centers on real workflows: event operations, moderation and realtime messaging
              in a matrimonial platform, and browser-based algorithmic tooling. I want recruiters to see evidence of
              judgment, not just screen polish.
            </p>
            <p>
              I am especially motivated by backend-heavy full-stack roles where I can design data flows, own product
              slices end-to-end, and still deliver a premium user experience on desktop and mobile.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="surface-tile">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{fact.label}</p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{fact.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="surface-panel" delay={0.05}>
          <p className="section-eyebrow">Engineering mindset</p>
          <div className="mt-5 grid gap-4">
            {visiblePrinciples.map((principle) => (
              <article key={principle.title} className="surface-tile">
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">{principle.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{principle.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="surface-panel">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-eyebrow">Backend emphasis</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              Stronger when the product needs auth, workflows, moderation, or system clarity.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
              I naturally gravitate to roles where the backend matters: role-based permissions, realtime flows,
              admin controls, integrations, and the operational edge cases that shape real products.
            </p>
          </div>

          <div className="space-y-5">
            {visibleTimeline.map((item) => (
              <article key={item.period} className="timeline-item">
                <div className="surface-card">
                  <p className="section-eyebrow">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
