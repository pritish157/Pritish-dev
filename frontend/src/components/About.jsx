import { engineeringPrinciples, quickFacts, siteConfig } from '../content/siteContent'
import Reveal from './ui/Reveal'

export default function About() {
  return (
    <div className="space-y-5">
      <Reveal className="surface-panel">
        <p className="section-eyebrow">Profile</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          {siteConfig.name} builds systems where the backend rules make the UI feel simpler.
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
          The strongest fit is product engineering work where auth, workflows, operational clarity, and responsive UI
          all matter at the same time.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="surface-tile">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{fact.label}</p>
              <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{fact.value}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="surface-panel" delay={0.04}>
        <p className="section-eyebrow">Principles</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {engineeringPrinciples.map((principle) => (
            <article key={principle.title} className="surface-tile">
              <h3 className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">{principle.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{principle.description}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
