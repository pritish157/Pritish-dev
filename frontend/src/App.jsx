import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'

const HomeScreen    = lazy(() => import('./screens/HomeScreen'))
const ProjectsScreen = lazy(() => import('./screens/ProjectsScreen'))
const SkillsScreen  = lazy(() => import('./screens/SkillsScreen'))
const AboutScreen   = lazy(() => import('./screens/AboutScreen'))
const ContactScreen = lazy(() => import('./screens/ContactScreen'))

/* ── Dynamic page titles for SEO ── */
const PAGE_META = {
  '/':         { title: 'Pritish Kumar Panda | MERN Stack Developer & Full Stack Engineer' },
  '/projects': { title: 'Projects | Pritish Kumar Panda — MERN Stack Developer' },
  '/skills':   { title: 'Skills & Tech Stack | Pritish Kumar Panda' },
  '/about':    { title: 'About | Pritish Kumar Panda — Full Stack Engineer' },
  '/contact':  { title: 'Contact | Hire Pritish Kumar Panda — MERN Developer' },
}

/* ── Scroll to top on route change ── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/* ── Dynamic title updater ── */
function TitleUpdater() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = PAGE_META[pathname]
    if (meta) document.title = meta.title
  }, [pathname])
  return null
}

const ScreenFallback = () => (
  <div className="min-h-dvh flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
      <span className="text-sm text-text-muted font-mono">Loading…</span>
    </div>
  </div>
)

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {/* Accessibility: Skip to content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f0f23',
            color: '#F1F5F9',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '12px',
            fontSize: '0.875rem',
          },
        }}
      />

      <ScrollToTop />
      <TitleUpdater />
      <Navbar />

      <main id="main-content" role="main">
        <AnimatePresence mode="wait">
          <Suspense fallback={<ScreenFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/"         element={<HomeScreen />} />
              <Route path="/projects" element={<ProjectsScreen />} />
              <Route path="/skills"   element={<SkillsScreen />} />
              <Route path="/about"    element={<AboutScreen />} />
              <Route path="/contact"  element={<ContactScreen />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      {!isHome && <Footer />}
      <BottomNav />
    </>
  )
}
