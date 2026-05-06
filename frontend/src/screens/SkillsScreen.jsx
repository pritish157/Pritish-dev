import { motion } from 'framer-motion'
import Skills from '../components/Skills'

const screenVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

export default function SkillsScreen() {
  return (
    <motion.div className="screen section-glow-cyan" variants={screenVariants} initial="initial" animate="animate" exit="exit">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 30% at 60% 25%, rgba(6,182,212,0.04) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <section className="screen-content" aria-label="Skills and tech stack">
        <header className="screen-header">
          <div className="tag tag-cyan mb-4">skill.matrix</div>
          <h1 className="screen-title">
            <span className="gradient-text">Tech Stack</span> & Proficiency
          </h1>
          <p className="screen-subtitle">
            Honest self-assessment of skills and tools I use daily to build production systems.
          </p>
        </header>

        <Skills />
      </section>
    </motion.div>
  )
}
