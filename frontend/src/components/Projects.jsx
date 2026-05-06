import { useMemo, useState } from 'react'
import { ArrowRight, Code2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects as projectData } from '../content/siteContent'
import ProjectModal from './ui/ProjectModal'
import Reveal from './ui/Reveal'

function ProjectActions({ project, onDetails }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" className="primary-button" onClick={onDetails}>
        View engineering details
        <ArrowRight size={16} />
      </button>
      {project.repoUrl ? (
        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="secondary-button">
          <Code2 size={16} />
          GitHub
        </a>
      ) : null}
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="secondary-button">
          <ExternalLink size={16} />
          Live demo
        </a>
      ) : (
        <Link to="/contact#contact-form" className="secondary-button">
          <ExternalLink size={16} />
          Request demo
        </Link>
      )}
    </div>
  )
}

export default function Projects({ items = projectData, limit = items.length }) {
  const [activeProject, setActiveProject] = useState(null)
  const visibleProjects = useMemo(() => items.slice(0, limit), [items, limit])

  return (
    <>
      {visibleProjects.length ? (
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04} as="article" className="surface-card project-card h-full">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full shadow-[0_0_0_6px_rgba(255,255,255,0.03)]"
                      style={{ backgroundColor: project.accent }}
                      aria-hidden="true"
                    />
                    <p className="section-eyebrow">{project.heroTag}</p>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
                    {project.name}
                  </h3>
                </div>
                <span className="status-chip">{project.status}</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">{project.summary}</p>

              <div className="mt-5 rounded-[22px] border border-[rgba(98,224,193,0.16)] bg-[rgba(98,224,193,0.06)] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Impact metric</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{project.impactMetric}</p>
              </div>

              <div className="project-card__metrics mt-5 sm:grid-cols-2">
                {project.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="project-card__metric">
                    <p>{metric.label}</p>
                    <p>{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Architecture</p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {project.architecture.slice(0, 3).map((layer) => layer.layer).join(' · ')}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className="soft-chip">
                    {item}
                  </span>
                ))}
              </div>

              <ProjectActions project={project} onDetails={() => setActiveProject(project)} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="surface-panel">
          <h3 className="subsection-title">No projects in this filter yet</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            Try another capability filter to review the broader project set.
          </p>
        </Reveal>
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
