import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

function MetricList({ metrics }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="surface-tile">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-soft)]">{metric.label}</p>
          <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">{metric.value}</p>
        </div>
      ))}
    </div>
  )
}

function ProjectActions({ project, onClose }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.repoUrl ? (
        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="secondary-button">
          GitHub
        </a>
      ) : null}
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="primary-button">
          Live Demo
        </a>
      ) : (
        <Link to="/contact#contact-form" className="primary-button" onClick={onClose}>
          Request Demo
        </Link>
      )}
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="modal-shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${project.id}-title`}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="section-eyebrow">{project.heroTag}</p>
                <h2 id={`${project.id}-title`} className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                  {project.name}
                </h2>
                <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                  {project.summary}
                </p>
              </div>
              <button type="button" className="icon-button" onClick={onClose} aria-label="Close project details">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.badges.map((badge) => (
                <span key={badge} className="soft-chip">
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-8">
                <section>
                  <h3 className="subsection-title">Architecture highlights</h3>
                  <div className="mt-4 space-y-4">
                    {project.architecture.map((item) => (
                      <article key={item.layer} className="surface-tile">
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-soft)]">{item.layer}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{item.detail}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="subsection-title">Implementation notes</h3>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="feature-row">
                        <span className="feature-dot" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="space-y-8">
                <section>
                  <h3 className="subsection-title">Delivery metrics</h3>
                  <div className="mt-4">
                    <MetricList metrics={project.metrics} />
                  </div>
                </section>

                <section className="surface-panel">
                  <h3 className="subsection-title">Recruiter signal</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{project.recruiterSignal}</p>
                </section>

                <section>
                  <h3 className="subsection-title">Impact</h3>
                  <ul className="mt-4 space-y-3">
                    {project.impact.map((item) => (
                      <li key={item} className="feature-row">
                        <span className="feature-dot" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <ProjectActions project={project} onClose={onClose} />
              </aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
