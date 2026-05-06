import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from '../components/Hero'
import AIAssistant from '../components/AIAssistant'

const screenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

export default function HomeScreen() {
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <motion.div
      className="screen-full relative"
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />

      {/* Floating AI Button */}
      <motion.button
        className="ai-fab"
        onClick={() => setAiOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        title="Ask the AI Assistant"
        aria-label="Open AI assistant"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" opacity="0.2" fill="white" />
          <path d="M8 12h.01M12 12h.01M16 12h.01" strokeLinecap="round" strokeWidth="2.5" />
        </svg>
      </motion.button>

      {/* AI Modal Overlay */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            className="ai-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setAiOpen(false)}
          >
            <motion.div
              className="ai-modal"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-accent-purple/15 bg-accent-purple/6 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">Portfolio Assistant</div>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse-dot" />
                      RAG-powered
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setAiOpen(false)}
                  className="text-text-muted hover:text-text-primary text-xl leading-none p-1 rounded-md transition-colors bg-transparent border-none cursor-pointer"
                  aria-label="Close AI assistant"
                >
                  ×
                </button>
              </div>

              {/* Inline AI chat */}
              <AIAssistant embedded />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
