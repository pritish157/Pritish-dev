import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { primaryNav, siteConfig, toolEcosystem } from '../content/siteContent'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-shell" role="contentinfo">
      <div className="section-shell">
        <div className="surface-panel footer-card">
          <div>
            <p className="section-eyebrow">Portfolio</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              {siteConfig.name}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
              {siteConfig.role} building premium React interfaces, strong Node.js APIs, and product-ready systems
              that help recruiters see value quickly.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {siteConfig.socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="soft-chip">
                  {link.shortLabel}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="subsection-title">Explore</h3>
            <nav className="mt-4 grid gap-3" aria-label="Footer navigation">
              {primaryNav.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="subsection-title">Quick recruiter view</h3>
            <div className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)]">
              <p>{siteConfig.availability}</p>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-[var(--color-text-primary)]">
                {siteConfig.email}
                <ArrowUpRight size={15} />
              </a>
              <p>{toolEcosystem.slice(0, 4).join(' · ')}</p>
              <a href={siteConfig.resumePath} download className="text-button w-fit">
                Download Resume
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-text-dim)] sm:flex-row sm:items-center sm:justify-between">
          <p>Built with React, Vite, Tailwind CSS, Framer Motion, and deployment-ready SEO foundations.</p>
          <p>&copy; {year} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  )
}
