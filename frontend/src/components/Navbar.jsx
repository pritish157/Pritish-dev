import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/about',    label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--navbar-h)] transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/95 backdrop-blur-2xl border-b border-accent-purple/12 shadow-lg shadow-black/10'
            : 'bg-transparent border-b border-transparent'
        }`}
        role="banner"
      >
        <nav className="max-w-[1280px] mx-auto px-5 sm:px-8 h-full flex items-center justify-between" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 no-underline group" aria-label="Home — Pritish Kumar Panda">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              P
            </div>
            <span className="gradient-text font-mono font-bold text-sm tracking-[0.2em]">
              PRITISH.DEV
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 text-sm font-medium rounded-xl no-underline transition-all duration-250 ${
                    isActive
                      ? 'text-purple-300 bg-accent-purple/10 border border-accent-purple/25 shadow-sm shadow-purple-500/5'
                      : 'text-text-muted border border-transparent hover:text-text-primary hover:bg-white/3'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/resume.pdf" download className="btn-ghost !py-2.5 !px-5 !text-xs" rel="noopener noreferrer">
              📄 Resume
            </a>
            <NavLink to="/contact" className="btn-primary !py-2.5 !px-5 !text-xs">
              Hire Me →
            </NavLink>
          </div>

          {/* Mobile: Resume + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <a href="/resume.pdf" download className="btn-ghost !py-2 !px-3 !text-xs" rel="noopener noreferrer">
              📄
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-base bg-bg-surface text-text-muted transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                ) : (
                  <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="16" y2="12" /><line x1="4" y1="17" x2="12" y2="17" /></>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-2xl md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="pt-[calc(var(--navbar-h)+24px)] px-6 flex flex-col gap-2"
              onClick={e => e.stopPropagation()}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-5 py-4 text-lg font-semibold rounded-2xl no-underline transition-all ${
                        isActive
                          ? 'text-purple-300 bg-accent-purple/10 border border-accent-purple/25'
                          : 'text-text-secondary border border-transparent hover:bg-white/3'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="border-t border-border-base mt-4 pt-4 flex flex-col gap-3">
                <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="btn-primary justify-center text-base">
                  Hire Me →
                </NavLink>
                <a href="/resume.pdf" download className="btn-ghost justify-center text-base" rel="noopener noreferrer">
                  📄 Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
