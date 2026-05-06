import { NavLink } from 'react-router-dom'

const FOOTER_LINKS = [
  { to: '/about',    label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills' },
  { to: '/contact',  label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-accent-purple/8 bg-bg-primary/90" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/15">
              P
            </div>
            <div>
              <div className="font-bold text-sm gradient-text tracking-wide">PRITISH KUMAR PANDA</div>
              <div className="text-xs text-slate-500 mt-0.5">MERN Stack Developer · Full Stack Engineer</div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex gap-6 sm:gap-8 text-sm text-slate-500" aria-label="Footer navigation">
            {FOOTER_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} className="hover:text-purple-400 transition-colors duration-200">
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-xs text-slate-600 font-mono text-center">
            © {year} Pritish Kumar Panda
          </div>
        </div>
      </div>
      <div className="h-[var(--bottomnav-h)] md:hidden" aria-hidden="true" />
    </footer>
  )
}
