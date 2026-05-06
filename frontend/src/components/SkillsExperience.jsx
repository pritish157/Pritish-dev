import { useMemo, useState, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Cpu, FolderKanban, Sparkles } from 'lucide-react'
import { engineeringPrinciples, quickFacts, skillExperienceTabs } from '../content/siteContent'
import RecruiterCopilot from './RecruiterCopilot'
import SystemMap from './SystemMap'
import Reveal from './ui/Reveal'

const workspaceTabs = [
  { id: 'copilot', label: 'Copilot', icon: Bot },
  { id: 'map', label: 'System map', icon: Cpu },
  { id: 'stack', label: 'Stack', icon: Sparkles },
  { id: 'experience', label: 'Experience', icon: FolderKanban },
]

function FactStrip() {
  return (
    <div className="fact-strip">
      {quickFacts.slice(0, 3).map((fact) => (
        <div key={fact.label} className="surface-tile">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{fact.label}</p>
          <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{fact.value}</p>
        </div>
      ))}
    </div>
  )
}

function StackSnapshot() {
  const stackTab = skillExperienceTabs.find((tab) => tab.id === 'stack')
  const strengthsTab = skillExperienceTabs.find((tab) => tab.id === 'strengths')
  const growthTab = skillExperienceTabs.find((tab) => tab.id === 'growth')

  return (
    <div className="stack-snapshot space-y-5">
      <div className="grid gap-4 xl:grid-cols-3">
        {stackTab?.cards?.map((card) => (
          <article key={card.title} className="surface-tile h-full">
            <h3 className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">{card.title}</h3>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">{card.meta}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <section className="surface-tile">
          <p className="copilot-label">Engineering strengths</p>
          <ul className="mt-4 space-y-3">
            {strengthsTab?.bullets?.map((bullet) => (
              <li key={bullet} className="feature-row">
                <span className="feature-dot" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-tile">
          <p className="copilot-label">Current growth path</p>
          <ul className="mt-4 space-y-3">
            {growthTab?.bullets?.map((bullet) => (
              <li key={bullet} className="feature-row">
                <span className="feature-dot" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {growthTab?.chips?.map((chip) => (
              <span key={chip} className="soft-chip">
                {chip}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ExperienceSnapshot() {
  const experienceTab = skillExperienceTabs.find((tab) => tab.id === 'experience')

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
        <section className="space-y-4">
          {experienceTab?.timeline?.slice(0, 2).map((item) => (
            <article key={item.period} className="timeline-item">
              <div className="surface-card">
                <p className="section-eyebrow">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{item.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="surface-tile">
          <p className="copilot-label">Operating principles</p>
          <div className="mt-4 grid gap-3">
            {engineeringPrinciples.map((principle) => (
              <article key={principle.title} className="rounded-[16px] border border-[rgba(140,200,255,0.1)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{principle.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{principle.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function SkillsExperience() {
  const [activeTab, setActiveTab] = useState('copilot')
  const [, startTransition] = useTransition()

  const activeView = useMemo(() => {
    switch (activeTab) {
      case 'copilot':
        return <RecruiterCopilot />
      case 'map':
        return <SystemMap />
      case 'stack':
        return <StackSnapshot />
      case 'experience':
        return <ExperienceSnapshot />
      default:
        return <RecruiterCopilot />
    }
  }, [activeTab])

  return (
    <div className="space-y-5">
      <FactStrip />

      <Reveal className="surface-panel workspace-shell">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-eyebrow">Interactive fit lab</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              Premium, compact, useful.
            </h3>
          </div>
        </div>

        <div className="workspace-tabs" role="tablist" aria-label="Interactive fit lab views">
          {workspaceTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => startTransition(() => setActiveTab(tab.id))}
                className={`workspace-tab${isActive ? ' workspace-tab--active' : ''}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="workspace-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeView}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </div>
  )
}
