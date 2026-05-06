import { motion } from 'framer-motion'
import { currentlyLearning, domainCoverage, skillCategories, toolEcosystem } from '../content/siteContent'
import Reveal from './ui/Reveal'

function RadarChart({ items, size = 320 }) {
  const center = size / 2
  const radius = size * 0.33
  const angleStep = (Math.PI * 2) / items.length

  const pointFor = (index, factor) => {
    const angle = angleStep * index - Math.PI / 2

    return {
      x: center + Math.cos(angle) * radius * factor,
      y: center + Math.sin(angle) * radius * factor,
    }
  }

  const valuePath = items
    .map((item, index) => {
      const point = pointFor(index, item.value / 100)
      return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)},${point.y.toFixed(2)}`
    })
    .join(' ') + ' Z'

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto w-full max-w-[340px]"
      role="img"
      aria-label="Skill domain coverage radar chart"
    >
      {[0.25, 0.5, 0.75, 1].map((step) => {
        const path = items
          .map((_, index) => {
            const point = pointFor(index, step)
            return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)},${point.y.toFixed(2)}`
          })
          .join(' ') + ' Z'

        return <path key={step} d={path} fill="none" stroke="rgba(140, 200, 255, 0.12)" strokeWidth="1" />
      })}

      {items.map((_, index) => {
        const outerPoint = pointFor(index, 1)

        return (
          <line
            key={`line-${index}`}
            x1={center}
            y1={center}
            x2={outerPoint.x}
            y2={outerPoint.y}
            stroke="rgba(140, 200, 255, 0.12)"
            strokeWidth="1"
          />
        )
      })}

      <path d={valuePath} fill="rgba(98, 224, 193, 0.14)" stroke="url(#skill-radar)" strokeWidth="2" />

      {items.map((item, index) => {
        const point = pointFor(index, item.value / 100)
        return <circle key={item.label} cx={point.x} cy={point.y} r="4" fill="#62E0C1" stroke="#07111f" strokeWidth="3" />
      })}

      {items.map((item, index) => {
        const point = pointFor(index, 1.18)

        return (
          <text
            key={`${item.label}-label`}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#c3d1e6"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="12"
          >
            {item.label}
          </text>
        )
      })}

      <defs>
        <linearGradient id="skill-radar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#62E0C1" />
          <stop offset="100%" stopColor="#8CC8FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function SkillCard({ category, index }) {
  return (
    <Reveal className="surface-card skill-card" delay={index * 0.05}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">{category.title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{category.summary}</p>
        </div>
        <span
          className="h-3 w-3 rounded-full shadow-[0_0_0_8px_rgba(255,255,255,0.03)]"
          style={{ backgroundColor: category.accent }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 grid gap-4">
        {category.items.map((item) => (
          <div key={item.name} className="skill-bar">
            <div className="skill-bar__row">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.name}</p>
                <p className="text-xs text-[var(--color-text-soft)]">{item.detail}</p>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.level}%</span>
            </div>
            <div className="skill-bar__track">
              <motion.div
                className="skill-bar__fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.level}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

export default function Skills({ compact = false }) {
  const visibleCategories = compact ? skillCategories.slice(0, 2) : skillCategories

  return (
    <div className="space-y-5">
      <div className="skill-grid items-start">
        <Reveal className="surface-panel">
          <p className="section-eyebrow">Domain strength</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Balanced across product UI, backend systems, and real-world integrations.
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            The strongest areas are API design, responsive React interfaces, authentication, and full-stack product
            flows that need both polish and structure.
          </p>

          <div className="mt-6">
            <RadarChart items={domainCoverage} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {domainCoverage.map((item) => (
              <div key={item.label} className="surface-tile">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{item.label}</p>
                <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">{item.value}%</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5">
          {visibleCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>

      <div className={`grid gap-5 ${compact ? 'md:grid-cols-2' : 'lg:grid-cols-2'}`}>
        <Reveal className="surface-card">
          <h3 className="subsection-title">Tool ecosystem</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            Tools I use to move from local build to deployment and presentation-quality delivery.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(compact ? toolEcosystem.slice(0, 6) : toolEcosystem).map((tool) => (
              <span key={tool} className="soft-chip">
                {tool}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="surface-card" delay={0.05}>
          <h3 className="subsection-title">Currently learning</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            Expanding the stack toward stronger contracts, deployment maturity, and practical AI system design.
          </p>
          <ul className="mt-5 space-y-3">
            {(compact ? currentlyLearning.slice(0, 3) : currentlyLearning).map((item) => (
              <li key={item} className="feature-row">
                <span className="feature-dot" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}
