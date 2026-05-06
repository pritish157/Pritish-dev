import { ArrowRight, Download, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import CaseStudies from '../components/CaseStudies'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import SkillsExperience from '../components/SkillsExperience'
import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { siteConfig } from '../content/siteContent'

export default function HomeScreen() {
  return (
    <>
      <Seo pageKey="home" />
      <Hero />

      <section className="page-shell pt-0">
        <div className="section-shell space-y-14">
          <section id="projects" aria-labelledby="featured-projects-title">
            <SectionHeading
              level={2}
              headingId="featured-projects-title"
              eyebrow="Projects"
              title="Built systems."
              actions={
                <Link to="/projects" className="text-button">
                  All projects
                  <ArrowRight size={16} />
                </Link>
              }
            />

            <Projects limit={3} />
          </section>

          <section id="skills" aria-labelledby="skills-experience-title">
            <SectionHeading
              level={2}
              headingId="skills-experience-title"
              eyebrow="Interactive fit lab"
              title="Copilot. Map. Proof."
            />

            <SkillsExperience />
          </section>

          <section id="case-studies" aria-labelledby="case-studies-title">
            <SectionHeading
              level={2}
              headingId="case-studies-title"
              eyebrow="Case studies"
              title="Two deeper breakdowns."
            />

            <CaseStudies />
          </section>

          <section id="contact" aria-labelledby="contact-cta-title">
            <Reveal className="surface-panel">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <p className="section-eyebrow">Contact</p>
                  <h2
                    id="contact-cta-title"
                    className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
                  >
                    Need a full-stack engineer who can ship?
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-secondary)] sm:text-base">
                    Open to remote product engineering roles.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/contact" className="primary-button">
                      Start a conversation
                      <ArrowRight size={16} />
                    </Link>
                    <a href={siteConfig.resumePath} download className="secondary-button" rel="noreferrer">
                      <Download size={16} />
                      Resume
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className="secondary-button">
                      <Mail size={16} />
                      Email
                    </a>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="surface-tile">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Availability</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{siteConfig.availability}</p>
                  </div>
                  <div className="surface-tile">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Response time</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{siteConfig.responseTime}</p>
                  </div>
                  <div className="surface-tile">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Best use of this site</p>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      Start with Copilot or System Map.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </section>
    </>
  )
}
