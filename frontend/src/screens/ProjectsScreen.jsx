import { useMemo, useState } from 'react'
import PageLayout from '../components/PageLayout'
import Projects from '../components/Projects'
import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'
import { featuredProjectId, projectFilters, projects } from '../content/siteContent'

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
        title="Engineering catalog with compact cards and deeper modal breakdowns."
        description="Use the filters to scan for auth systems, realtime flows, dashboards, and trust-sensitive product work."
      >
        <div className="space-y-8">
          <Reveal className="surface-panel">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <p className="section-eyebrow">Featured system</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                  {featuredProject.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                  {featuredProject.impactMetric}
                </p>
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

          <div className="flex flex-wrap gap-3" role="tablist" aria-label="Project filters">
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
        </div>
      </PageLayout>
    </>
  )
}
