import { useMemo, useState, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Database, Radio, Rocket, ShieldCheck, Waypoints } from 'lucide-react'
import { projects, systemMapNodes } from '../content/siteContent'
import SpotlightPanel from './ui/SpotlightPanel'

const iconMap = {
  auth: ShieldCheck,
  api: Waypoints,
  database: Database,
  realtime: Radio,
  deployment: Rocket,
  ai: Bot,
}

export default function SystemMap() {
  const [activeNodeId, setActiveNodeId] = useState(systemMapNodes[0].id)
  const [, startTransition] = useTransition()

  const activeNode = useMemo(
    () => systemMapNodes.find((node) => node.id === activeNodeId) ?? systemMapNodes[0],
    [activeNodeId],
  )

  const relatedProjects = useMemo(
    () => projects.filter((project) => activeNode.projectIds.includes(project.id)),
    [activeNode],
  )

  return (
    <div className="system-map-shell">
      <SpotlightPanel className="system-map-canvas">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-eyebrow">Interactive system map</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
              Click a layer.
            </h3>
          </div>
          <span className="status-chip">Architecture view</span>
        </div>

        <div className="system-map-grid">
          {systemMapNodes.map((node) => {
            const Icon = iconMap[node.id] ?? Waypoints
            const isActive = activeNode.id === node.id

            return (
              <motion.button
                key={node.id}
                type="button"
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startTransition(() => setActiveNodeId(node.id))}
                className={`system-map-node${isActive ? ' system-map-node--active' : ''}`}
              >
                <span className="system-map-node__icon">
                  <Icon size={18} />
                </span>
                <span className="system-map-node__label">{node.label}</span>
              </motion.button>
            )
          })}
        </div>
      </SpotlightPanel>

      <div className="surface-tile system-map-detail">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="section-eyebrow">{activeNode.label}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                  {activeNode.summary}
                </h3>
              </div>
              <span className="status-chip">Live proof</span>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <section>
                <p className="copilot-label">Proof</p>
                <ul className="mt-3 space-y-3">
                  {activeNode.evidence.slice(0, 2).map((item) => (
                    <li key={item} className="feature-row">
                      <span className="feature-dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="copilot-label">Projects</p>
                <div className="mt-3 grid gap-3">
                  {relatedProjects.map((project) => (
                    <article key={project.id} className="rounded-[18px] border border-[rgba(140,200,255,0.1)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">{project.name}</p>
                        <span className="status-chip">{project.heroTag}</span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{project.heroTag}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
