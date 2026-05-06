import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CaseStudies from '../components/CaseStudies'
import PageLayout from '../components/PageLayout'
import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'
import { engineeringPrinciples } from '../content/siteContent'

export default function AboutScreen() {
  return (
    <>
      <Seo pageKey="about" />
      <PageLayout
        eyebrow="Engineering depth"
        title="How the systems are shaped: architecture, workflow decisions, and product tradeoffs."
        description="This page leans into the thinking behind the builds, especially where trust, permissions, and operational clarity affect the architecture."
        actions={
          <Link to="/contact" className="text-button">
            Talk about fit
            <ArrowRight size={16} />
          </Link>
        }
      >
        <div className="space-y-8">
          <Reveal className="surface-panel">
            <div className="grid gap-4 lg:grid-cols-3">
              {engineeringPrinciples.map((principle) => (
                <article key={principle.title} className="surface-tile">
                  <h2 className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
                    {principle.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{principle.description}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <CaseStudies />
        </div>
      </PageLayout>
    </>
  )
}
