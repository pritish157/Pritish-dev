import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Download, Menu, X } from 'lucide-react'
import { primaryNav, siteConfig } from '../content/siteContent'

function navLinkClass({ isActive }) {
  return `nav-link${isActive ? ' nav-link--active' : ''}`
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let frame = 0

    const updateScrollState = () => {
      frame = 0
      setIsScrolled(window.scrollY > 12)
    }

    const handleScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(updateScrollState)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }

      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="nav-shell">
      <div className="nav-shell__inner">
        <div className={`nav-bar ${isScrolled ? 'nav-bar--scrolled' : ''} ${isOpen ? 'nav-bar--open' : ''}`}>
          <NavLink to="/" className="nav-brand" aria-label={`${siteConfig.name} home page`}>
            <span className="nav-brand__mark" aria-hidden="true">
              P
            </span>
            <span className="nav-brand__text">
              <strong>{siteConfig.name}</strong>
              <span>{siteConfig.role} / {siteConfig.secondaryRole}</span>
            </span>
          </NavLink>

          <nav className="nav-links" aria-label="Primary navigation">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-cta">
            <span className="nav-badge nav-badge--desktop">{siteConfig.availability}</span>
            <a href={siteConfig.resumePath} download className="secondary-button nav-cta__resume" rel="noreferrer">
              <Download size={16} />
              Resume
            </a>
            <NavLink to="/contact" className="primary-button nav-cta__hire">
              Contact
              <ArrowRight size={16} />
            </NavLink>
          </div>

          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <>
              <motion.button
                type="button"
                className="nav-backdrop"
                aria-label="Close menu overlay"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                id="mobile-navigation"
                className="nav-drawer"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <nav className="nav-drawer__links" aria-label="Mobile navigation">
                  {primaryNav.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `nav-drawer__link${isActive ? ' nav-drawer__link--active' : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-4 grid gap-3">
                  <a href={siteConfig.resumePath} download className="secondary-button justify-center" rel="noreferrer">
                    <Download size={16} />
                    Download Resume
                  </a>
                  <NavLink to="/contact" className="primary-button justify-center" onClick={() => setIsOpen(false)}>
                    Start a Conversation
                    <ArrowRight size={16} />
                  </NavLink>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
