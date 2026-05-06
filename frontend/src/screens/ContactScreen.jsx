import { Download } from 'lucide-react'
import Contact from '../components/Contact'
import PageLayout from '../components/PageLayout'
import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'
import { siteConfig } from '../content/siteContent'

export default function ContactScreen() {
  return (
    <>
      <Seo pageKey="contact" />
      <PageLayout
        eyebrow="Contact"
        title="Let's talk about the role, team, or system you are building."
        description="If you are hiring for a MERN developer, React developer, Node.js developer, or full-stack engineering role, this page is designed to get you to the right context quickly."
      >
        <div className="space-y-6">
          <Reveal className="surface-panel">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="section-eyebrow">Fast recruiter path</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                  Prefer a quick screen before a full walkthrough?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
                  Download the resume for a fast review, then send the role details or project context through the form
                  below. I usually respond within 24 hours.
                </p>
              </div>
              <a href={siteConfig.resumePath} download className="primary-button shrink-0" rel="noreferrer">
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </Reveal>

          <Contact />
        </div>
      </PageLayout>
    </>
  )
}
