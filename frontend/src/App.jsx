import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const AIAssistant = lazy(() => import('./components/AIAssistant'))
const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const ProjectsScreen = lazy(() => import('./screens/ProjectsScreen'))
const SkillsScreen = lazy(() => import('./screens/SkillsScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen'))
const ContactScreen = lazy(() => import('./screens/ContactScreen'))

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1))

        if (target) {
          const offset = 96
          const top = target.getBoundingClientRect().top + window.scrollY - offset

          window.scrollTo({ top, left: 0, behavior: 'smooth' })
          return
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

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

      <ScrollManager />
      <Navbar />

      <main id="main-content" className="site-main" role="main">
        <Suspense fallback={<ScreenFallback />}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/projects" element={<ProjectsScreen />} />
            <Route path="/skills" element={<SkillsScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
          </Routes>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
      <Footer />
    </>
  )
}
