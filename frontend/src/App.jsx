import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const ProjectsScreen = lazy(() => import('./screens/ProjectsScreen'))
const SkillsScreen = lazy(() => import('./screens/SkillsScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen'))
const ContactScreen = lazy(() => import('./screens/ContactScreen'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function ScreenFallback() {
  return (
    <div className="page-shell">
      <div className="section-shell">
        <div className="loading-state" role="status" aria-label="Loading page">
          <span className="loading-state__spinner" aria-hidden="true" />
          <span>Loading experience...</span>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="site-chrome" aria-hidden="true">
        <div className="site-chrome__grid" />
        <div className="site-chrome__glow site-chrome__glow--one" />
        <div className="site-chrome__glow site-chrome__glow--two" />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1728',
            color: '#eff6ff',
            border: '1px solid rgba(140, 200, 255, 0.22)',
            borderRadius: '18px',
            fontSize: '0.92rem',
            boxShadow: '0 18px 48px rgba(4, 10, 20, 0.45)',
          },
        }}
      />

      <ScrollToTop />
      <Navbar />

      <main id="main-content" className="site-main" role="main">
        <AnimatePresence mode="wait">
          <Suspense fallback={<ScreenFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/projects" element={<ProjectsScreen />} />
              <Route path="/skills" element={<SkillsScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
