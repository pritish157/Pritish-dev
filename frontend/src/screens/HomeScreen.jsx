import { ArrowRight, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { homeQuickInfo, homeStackStrip, homeValueCards, siteConfig } from '../content/siteContent'

export default function HomeScreen() {
  return (
    <>
      <Seo pageKey="home" />
      <Hero />

      <section className="page-shell pt-0">
        <div className="section-shell space-y-16">
          <section aria-labelledby="home-value-title">
            <SectionHeading
              level={2}
              headingId="home-value-title"
              eyebrow="Quick overview"
              title="Compact, product-focused, and easier to scan."
              description="A lighter portfolio view with less copy, stronger mobile behavior, and actual project links."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {homeValueCards.map((card, index) => (
                <Reveal key={card.title} className="surface-card" delay={index * 0.05}>
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{card.description}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-labelledby="featured-projects-title">
            <SectionHeading
              level={2}
              headingId="featured-projects-title"
              eyebrow="Projects"
              title="Real builds with visible stack and project links."
              description="The project cards now focus on the essentials first: what it is, what stack it uses, and where to view it."
              actions={
                <Link to="/projects" className="text-button">
                  Open all projects
                  <ArrowRight size={16} />
                </Link>
              }
            />
            <Projects limit={3} />
          </section>

          <section aria-labelledby="stack-strip-title">
            <SectionHeading
              level={2}
              headingId="stack-strip-title"
              eyebrow="Stack"
              title="Core technologies I use most."
              description="Focused on React, backend APIs, database workflows, auth, and realtime features."
            />

            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <Reveal className="surface-panel">
                <h3 className="subsection-title">What recruiters should know</h3>
                <ul className="mt-4 space-y-3">
                  {homeQuickInfo.map((item) => (
                    <li key={item} className="feature-row">
                      <span className="feature-dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="surface-panel" delay={0.05}>
                <h3 className="subsection-title">Tech stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {homeStackStrip.map((item) => (
                    <span key={item} className="soft-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <Reveal as="section" className="surface-panel" aria-labelledby="recruiter-cta-title">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="section-eyebrow">Contact</p>
                <h2
                  id="recruiter-cta-title"
                  className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
                >
                  Need a MERN developer for a real product team?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                  Open to full-time roles, internships, and teams that value clean systems with strong frontend and
                  backend execution.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/contact" className="primary-button">
                    Contact me
                    <ArrowRight size={16} />
                  </Link>
                  <a href={siteConfig.resumePath} download className="secondary-button" rel="noreferrer">
                    <Download size={16} />
                    Resume
                  </a>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="surface-tile">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Availability</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{siteConfig.availability}</p>
                </div>
                <div className="surface-tile">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Response</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{siteConfig.responseTime}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
