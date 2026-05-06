import { useState } from 'react'
import { motion } from 'framer-motion'
import About from '../components/About'
import WhatIBuild from '../components/WhatIBuild'

const screenVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

const TABS = [
  { id: 'about',        label: '👤 About Me' },
  { id: 'capabilities', label: '⚡ Capabilities' },
]

export default function AboutScreen() {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <motion.div className="screen section-glow-purple" variants={screenVariants} initial="initial" animate="animate" exit="exit">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 30% at 40% 25%, rgba(139,92,246,0.04) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <section className="screen-content" aria-label="About me">
        <header className="screen-header">
          <div className="tag tag-purple mb-4">about.me</div>
          <h1 className="screen-title gradient-text">
            Not Just a Developer.
          </h1>
          <p className="screen-subtitle">
            A final-year CSE student who ships complete, working production systems — not just code snippets or tutorials.
          </p>
        </header>

        <div className="tab-group" role="tablist" aria-label="About sections">
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

        <div role="tabpanel">
          {activeTab === 'about'        && <About />}
          {activeTab === 'capabilities' && <WhatIBuild />}
        </div>
      </section>
    </motion.div>
  )
}
