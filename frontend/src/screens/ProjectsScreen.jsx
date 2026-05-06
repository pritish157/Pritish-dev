import { useState } from 'react'
import { motion } from 'framer-motion'
import Projects from '../components/Projects'
import GitHub from '../components/GitHub'

const screenVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

const TABS = [
  { id: 'projects', label: '🚀 Projects' },
  { id: 'github',   label: '📊 GitHub Activity' },
]

export default function ProjectsScreen() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <motion.div className="screen section-glow-purple" variants={screenVariants} initial="initial" animate="animate" exit="exit">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 30% at 30% 20%, rgba(139,92,246,0.04) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <section className="screen-content" aria-label="Projects and work">
        <header className="screen-header">
          <div className="tag tag-purple mb-4">system.modules</div>
          <h1 className="screen-title">
            <span className="gradient-text">Projects</span> & Engineering Work
          </h1>
          <p className="screen-subtitle">
            Production-grade systems with real users, documented with problem → solution → architecture → outcomes.
          </p>
        </header>

        <div className="tab-group" role="tablist" aria-label="Project views">
          {TABS.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tab-item${activeTab === tab.id ? ' tab-item--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" aria-label={activeTab === 'projects' ? 'Project list' : 'GitHub activity'}>
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'github'   && <GitHub />}
        </div>
      </section>
    </motion.div>
  )
}
