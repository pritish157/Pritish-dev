import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import About from '../components/About'
import PageLayout from '../components/PageLayout'
import Seo from '../components/seo/Seo'

export default function AboutScreen() {
  return (
    <>
      <Seo pageKey="about" />
      <PageLayout
        eyebrow="About"
        title="Product-minded engineering with a strong bias toward clean systems."
        description="This page focuses on how I think, what kinds of systems energize me, and why my portfolio is intentionally centered on delivery clarity rather than surface-only visuals."
        actions={
          <Link to="/contact" className="text-button">
            Talk about fit
            <ArrowRight size={16} />
          </Link>
        }
      >
        <About />
      </PageLayout>
    </>
  )
}
