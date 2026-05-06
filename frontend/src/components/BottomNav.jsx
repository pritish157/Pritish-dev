import { NavLink } from 'react-router-dom'
import { Home, Briefcase, Layers, User, Mail } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/',         label: 'Home',     Icon: Home },
  { to: '/projects', label: 'Work',     Icon: Briefcase },
  { to: '/skills',   label: 'Skills',   Icon: Layers },
  { to: '/about',    label: 'About',    Icon: User },
  { to: '/contact',  label: 'Contact',  Icon: Mail },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Mobile navigation">
      {NAV_ITEMS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `bottom-nav-item${isActive ? ' bottom-nav-item--active' : ''}`
          }
          aria-label={label}
        >
          <Icon size={20} strokeWidth={1.75} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
