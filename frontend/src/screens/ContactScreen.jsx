import { motion } from 'framer-motion'
import Contact from '../components/Contact'

const screenVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

export default function ContactScreen() {
  return (
    <motion.div className="screen section-glow-cyan" variants={screenVariants} initial="initial" animate="animate" exit="exit">
      {/* Subtle section background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 30% at 70% 20%, rgba(6,182,212,0.04) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <section className="screen-content" aria-label="Contact section">
        <header className="screen-header">
          <div className="tag tag-cyan mb-4">contact.init()</div>
          <h1 className="screen-title">
            Let's <span className="gradient-text">Build Something</span> Together
          </h1>
          <p className="screen-subtitle">
            Open to full-time roles, internships, or collaboration. Reach out and let's build something impactful.
          </p>
        </header>

        {/* Recruiter CTA */}
        <div className="glass p-5 sm:p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-accent-cyan/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="text-sm font-semibold text-text-primary">Looking for a MERN Stack Developer?</div>
              <div className="text-xs text-text-muted mt-0.5">I respond to all messages within 24 hours.</div>
            </div>
          </div>
          <a href="/resume.pdf" download className="btn-primary !text-xs sm:ml-auto shrink-0" rel="noopener noreferrer">
            📄 Download Resume
          </a>
        </div>

        <Contact />
      </section>
    </motion.div>
  )
}
