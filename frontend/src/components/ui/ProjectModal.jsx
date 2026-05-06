import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function EngineeringSection({ title, items }) {
  if (!items?.length) {
    return null
  }

  return (
    <section>
      <h3 className="subsection-title">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="feature-row">
            <span className="feature-dot" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
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
          Live demo
        </a>
      ) : (
        <Link to="/contact#contact-form" className="primary-button" onClick={onClose}>
          Request demo
        </Link>
      )}
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, project])

  if (!project) {
    return null
  }

  const detailGrid = [
    { title: 'Auth and access', items: project.engineeringDetails?.auth },
    { title: 'API structure', items: project.engineeringDetails?.api },
    { title: 'Database design', items: project.engineeringDetails?.data },
    { title: 'Security', items: project.engineeringDetails?.security },
    { title: 'Performance', items: project.engineeringDetails?.performance },
    { title: 'Deployment', items: project.engineeringDetails?.deployment },
    { title: 'Caching strategy', items: project.engineeringDetails?.caching },
    { title: 'Scaling path', items: project.engineeringDetails?.scale },
  ]

  return createPortal(
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
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="section-eyebrow">{project.heroTag}</p>
              <span className="status-chip">{project.status}</span>
            </div>
            <h2
              id={`${project.id}-title`}
              className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
            >
              {project.name}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
              {project.summary}
            </p>
          </div>

          <button type="button" className="icon-button" onClick={onClose} aria-label="Close project details" autoFocus>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="mt-6 rounded-[24px] border border-[rgba(98,224,193,0.16)] bg-[rgba(98,224,193,0.06)] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Impact metric</p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{project.impactMetric}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.badges.map((badge) => (
            <span key={badge} className="soft-chip">
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <section>
              <h3 className="subsection-title">Architecture overview</h3>
              <div className="mt-4 grid gap-3">
                {project.architecture.map((item) => (
                  <article key={item.layer} className="surface-tile">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">{item.layer}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h3 className="subsection-title">Key engineering decisions</h3>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="feature-row">
                    <span className="feature-dot" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="subsection-title">Delivery outcomes</h3>
              <ul className="mt-4 space-y-3">
                {project.impact.map((item) => (
                  <li key={item} className="feature-row">
                    <span className="feature-dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-8">
            <section>
              <h3 className="subsection-title">Delivery metrics</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="surface-tile">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{metric.label}</p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">{metric.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              {detailGrid.map((section) => (
                <EngineeringSection key={section.title} title={section.title} items={section.items} />
              ))}
            </section>

            <ProjectActions project={project} onClose={onClose} />
          </aside>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
