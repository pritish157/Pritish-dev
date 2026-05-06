import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react'
import { caseStudies, projects } from '../content/siteContent'
import Reveal from './ui/Reveal'

function ProjectLinks({ project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.repoUrl ? (
        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="secondary-button">
          <Code2 size={16} />
          GitHub
        </a>
      ) : null}
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="primary-button">
          <ExternalLink size={16} />
          Live demo
        </a>
      ) : null}
    </div>
  )
}

export default function CaseStudies() {
  const [activeCaseId, setActiveCaseId] = useState(caseStudies[0].id)

  const items = useMemo(
    () =>
      caseStudies.map((caseStudy) => ({
        ...caseStudy,
        project: projects.find((project) => project.id === caseStudy.projectId),
      })),
    [],
  )

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = item.id === activeCaseId

        return (
          <Reveal key={item.id} className={`surface-panel case-study-card${isOpen ? ' case-study-card--active' : ''}`} delay={index * 0.04}>
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <p className="section-eyebrow">{item.eyebrow}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                    {item.title}
                  </h3>
                  {item.project ? <span className="status-chip">{item.project.status}</span> : null}
                </div>
                {!isOpen ? (
                  <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{item.project?.heroTag}</p>
                ) : (
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
                    {item.summary}
                  </p>
                )}
              </div>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCaseId(isOpen ? '' : item.id)}
                className="secondary-button shrink-0"
                aria-expanded={isOpen}
              >
                {isOpen ? 'Close' : 'Open'}
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowUpRight size={16} />
                </motion.span>
              </motion.button>
            </div>

            {item.project ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.project.stack.slice(0, 6).map((tech) => (
                  <span key={tech} className="soft-chip">
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key={`${item.id}-details`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-6">
                      <section>
                        <h4 className="subsection-title">Problem framing</h4>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{item.challenge}</p>
                      </section>

                      <section>
                        <h4 className="subsection-title">System view</h4>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {item.diagram.map((step) => (
                            <article key={step.label} className="surface-tile">
                              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">{step.label}</p>
                              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{step.detail}</p>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="subsection-title">Key decisions</h4>
                        <div className="mt-4 grid gap-3">
                          {item.decisions.map((decision) => (
                            <article
                              key={decision.title}
                              className="rounded-[18px] border border-[rgba(140,200,255,0.1)] bg-[rgba(255,255,255,0.025)] px-4 py-4"
                            >
                              <h5 className="text-sm font-semibold text-[var(--color-text-primary)]">{decision.title}</h5>
                              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{decision.detail}</p>
                            </article>
                          ))}
                        </div>
                      </section>
                    </div>

                    <aside className="space-y-6">
                      {item.project ? (
                        <section className="surface-tile">
                          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Impact metric</p>
                          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{item.project.impactMetric}</p>
                        </section>
                      ) : null}

                      <section>
                        <h4 className="subsection-title">Why it matters</h4>
                        <ul className="mt-4 space-y-3">
                          {item.wins.map((win) => (
                            <li key={win} className="feature-row">
                              <span className="feature-dot" aria-hidden="true" />
                              <span>{win}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      {item.project ? <ProjectLinks project={item.project} /> : null}
                    </aside>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Reveal>
        )
      })}
    </div>
  )
}
