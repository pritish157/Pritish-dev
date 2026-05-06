import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
}

export default function PageLayout({
  eyebrow,
  title,
  description,
  actions,
  children,
  headingAlign = 'left',
}) {
  return (
    <motion.div className="page-shell" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="section-shell">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
          align={headingAlign}
        />
        {children}
      </div>
    </motion.div>
  )
}
