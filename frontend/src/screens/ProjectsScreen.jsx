import { useMemo, useState } from 'react'
import { ArrowRight, Code2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Projects from '../components/Projects'
import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import {
  featuredProjectId,
  projectDeliverySignals,
  projectFilters,
  projects,
} from '../content/siteContent'

export default function ProjectsScreen() {
  const [activeFilter, setActiveFilter] = useState('all')

  const featuredProject = useMemo(
    () => projects.find((project) => project.id === featuredProjectId) ?? projects[0],
    [],
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects
    }

    return projects.filter((project) => project.categories?.includes(activeFilter))
  }, [activeFilter])

  return (
    <>
      <Seo pageKey="projects" />
      <PageLayout
        eyebrow="Projects"
        title="Smaller, clearer project cards with real links."
        description="This page is now focused on the builds themselves instead of long explanations."
      >
        <div className="space-y-8">
          <Reveal className="surface-panel">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="section-eyebrow">Featured</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                  {featuredProject.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                  {featuredProject.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredProject.stack.slice(0, 6).map((item) => (
                    <span key={item} className="soft-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {featuredProject.repoUrl ? (
                    <a href={featuredProject.repoUrl} target="_blank" rel="noreferrer" className="secondary-button">
                      <Code2 size={16} />
                      GitHub
                    </a>
                  ) : null}
                  {featuredProject.liveUrl ? (
                    <a href={featuredProject.liveUrl} target="_blank" rel="noreferrer" className="primary-button">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : (
                    <Link to="/contact#contact-form" className="primary-button">
                      <ArrowRight size={16} />
                      Request Demo
                    </Link>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {featuredProject.metrics.map((metric) => (
                  <div key={metric.label} className="surface-tile">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{metric.label}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)] sm:text-base">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <section aria-labelledby="project-catalog-title">
            <SectionHeading
              level={2}
              headingId="project-catalog-title"
              eyebrow="Catalog"
              title="Browse by capability."
              description="Use a filter if you want to focus on auth, realtime features, dashboards, or trust flows."
            />

            <div className="mb-5 flex flex-wrap gap-3" role="tablist" aria-label="Project filters">
              {projectFilters.map((filter) => {
                const isActive = activeFilter === filter.id

                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(filter.id)}
                    className={
                      isActive
                        ? 'primary-button !min-h-0 !px-4 !py-3 !text-sm'
                        : 'secondary-button !min-h-0 !px-4 !py-3 !text-sm'
                    }
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>

            <Projects items={filteredProjects} />
          </section>

          <section aria-labelledby="project-signals-title">
            <SectionHeading
              level={2}
              headingId="project-signals-title"
              eyebrow="Common signals"
              title="What appears across the project set."
              description="These are the engineering patterns that repeat through my work."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projectDeliverySignals.map((signal, index) => (
                <Reveal key={signal} className="surface-card" delay={index * 0.04}>
                  <div className="feature-row">
                    <span className="feature-dot" aria-hidden="true" />
                    <span>{signal}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  )
}
