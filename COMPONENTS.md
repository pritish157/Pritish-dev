# COMPONENTS.md

Version: 1.0

Project: Pritish Kumar Panda Portfolio

---

# Component Philosophy

Reuse before creating.

Before building a new component, check this registry. If a component with similar purpose exists, extend or compose it. Do not duplicate.

Every component must be reusable, accessible, responsive, composable, typed, and documented.

See AGENTS.md § Component Rules for the full quality standard.

---

# Component Categories

Components are organized into five directories under `frontend/components/`.

| Category | Directory | Purpose |
|---|---|---|
| UI Primitives | `ui/` | Foundational building blocks. Buttons, badges, cards, dialogs. Reusable across the entire application. |
| Layout | `layout/` | Structural components. Navigation, footer, mobile dock. Page-level framing. |
| Sections | `sections/` | Full-page sections. Hero, projects, experience, skills, contact. Each renders a complete section of the homepage. |
| Effects | `effects/` | Visual effect providers. Cursor glow, smooth scroll, scroll progress, section reveals. Global behaviors. |
| Providers | `providers/` | React context wrappers. Combine multiple effect providers into a single tree. |

### Decision Criteria

- **Will it be used in multiple sections?** → `ui/`
- **Is it part of the page shell (nav, footer)?** → `layout/`
- **Does it render a complete homepage section?** → `sections/`
- **Is it a global visual behavior?** → `effects/`
- **Does it wrap children with context?** → `providers/`

---

# Component Registry

## UI Primitives — `components/ui/`

### Badge

| | |
|---|---|
| File | `ui/badge.tsx` |
| Purpose | Rounded pill label for eyebrow text and category tags |
| Props | `className` (string, optional) + `children` |
| Client | No (Server Component) |
| Status | Stable |
| Accessibility | Renders as `<span>`, purely decorative text container |
| Dependencies | `cn()` utility |

---

### Button

| | |
|---|---|
| File | `ui/button.tsx` |
| Purpose | Primary interactive button with expanded variant & loading system |
| Props | `variant` ("default" / "secondary" / "ghost" / "outline" / "link" / "danger"), `size` ("default" / "sm" / "lg" / "icon"), `loading` (boolean), `leftIcon`, `rightIcon`, `asChild` (boolean) |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Full keyboard support, focus-visible ring (`ring-violet-400/60`), disabled & loading states |
| Dependencies | `@radix-ui/react-slot`, `class-variance-authority`, `cn()`, `lucide-react` |

---

### Typography Modules

| | |
|---|---|
| File | `ui/typography.tsx` |
| Purpose | Typography primitives: Heading, Text, Paragraph, Eyebrow, Caption, Code, GradientText, Highlight, SectionDescription |
| Client | Partial (Server Components by default) |
| Status | Stable |

---

### Card Family

| | |
|---|---|
| File | `ui/cards.tsx` |
| Purpose | Unified card family: BaseCard, GlassCard, SpotlightCard, MetricCard, ProjectCardBase, InteractiveCard, FloatingCard, HoverCardContainer |
| Client | Yes (`"use client"`) |
| Status | Stable |

---

### Badges Family

| | |
|---|---|
| File | `ui/badges.tsx` |
| Purpose | Badges system: Badge, StatusBadge, AvailabilityBadge, TechBadge, GradientBadge, OutlineBadge, MetricBadge, Pill |
| Client | Partial |
| Status | Stable |

---

### Layout Primitives

| | |
|---|---|
| File | `ui/layout-primitives.tsx` |
| Purpose | Responsive layout components: Container, MaxWidthWrapper, Section, Stack, Grid, Flex, Cluster, PageWrapper, ContentWrapper, ResponsiveGrid, AutoGrid, Spacer |
| Client | No (Server Components) |
| Status | Stable |

---

### Interactive Primitives

| | |
|---|---|
| File | `ui/interactive.tsx` |
| Purpose | Interactive surface primitives: Tooltip, Popover, Dialog, Drawer, AccordionItem, Tabs, Collapse, ContextMenu |
| Client | Yes (`"use client"`) |
| Status | Stable |

---

### Feedback Components

| | |
|---|---|
| File | `ui/feedback.tsx` |
| Purpose | Feedback and status components: LoadingSpinner, Skeleton, Progress, Toast, EmptyState, ErrorState, SuccessState |
| Client | Partial |
| Status | Stable |

---

### Media Components

| | |
|---|---|
| File | `ui/media.tsx` |
| Purpose | Media and device frames: Avatar, AppImage, BrowserMockup, PhoneMockup, ProjectPreview, VideoWrapper, GradientBackground |
| Client | Partial |
| Status | Stable |

---

### Decorative Accents

| | |
|---|---|
| File | `ui/decorative.tsx` |
| Purpose | Atmospheric visual accents: Divider, Glow, GridBackground, NoiseLayer, AmbientLight, GradientOrb, GlassSurface, BorderGlow, Spotlight |
| Client | No (Server Components) |
| Status | Stable |

---

### Motion Primitives

| | |
|---|---|
| File | `ui/motion-primitives.tsx` |
| Purpose | Animation wrappers: AnimatedText, Reveal, FadeIn, Stagger, ParallaxWrapper, HoverScale, MagneticWrapper, CursorGlow, ScrollReveal |
| Client | Yes (`"use client"`) |
| Status | Stable |

---

### Icon System

| | |
|---|---|
| File | `ui/icon-system.tsx` |
| Purpose | Icon components: IconWrapper, SocialIcon, TechIcon, ActionIcon, StatusIcon |
| Client | Partial |
| Status | Stable |

---

### Form Controls

| | |
|---|---|
| File | `ui/form-controls.tsx` |
| Purpose | Accessible form controls: Input, Textarea, Label, ErrorMessage, HelperText, Checkbox, Radio, Switch, Select |
| Client | Yes (`"use client"`) |
| Status | Stable |

---

### Dialog

| | |
|---|---|
| File | `ui/dialog.tsx` |
| Purpose | Modal overlay for case study details and expanded content |
| Props | Radix UI Dialog primitives: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogClose`, `DialogTitle`, `DialogDescription` |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Focus trap, Escape to close, focus restoration, `aria-modal`, `aria-labelledby` |
| Dependencies | `@radix-ui/react-dialog`, `cn()` |
| Notes | Overlay uses glassmorphism backdrop. Content panel uses glass-panel styling. |

---

### Magnetic Link

| | |
|---|---|
| File | `ui/magnetic-link.tsx` |
| Purpose | Link that magnetically pulls toward mouse on hover |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Standard anchor semantics, keyboard-accessible |
| Dependencies | `gsap` (quickTo for spring animation) |
| Animation | See ANIMATIONS.md § Interaction Patterns |
| Notes | GSAP is used here because Framer Motion lacks quickTo-equivalent spring targeting. |

---

### Marquee

| | |
|---|---|
| File | `ui/marquee.tsx` |
| Purpose | Infinite horizontal scrolling ticker container |
| Props | `children`, `speed` (optional), `className` (optional) |
| Client | No (CSS-only animation) |
| Status | Stable |
| Accessibility | Decorative — consider `aria-hidden` if content is repeated elsewhere |
| Dependencies | CSS `animate-marquee` keyframe from Tailwind config |
| Animation | See ANIMATIONS.md § Continuous Patterns |
| Notes | Duplicates children for seamless loop. Gradient fade masks on edges. |

---

### Section Heading

| | |
|---|---|
| File | `ui/section-heading.tsx` |
| Purpose | Standardized section header with eyebrow badge, title, and description |
| Props | `eyebrow` (string), `title` (string), `description` (string), `align` ("left" / "center", default "left") |
| Client | No (Server Component) |
| Status | Stable |
| Accessibility | Renders `<h2>` for section title, proper heading hierarchy |
| Dependencies | `Badge`, `cn()` |
| Notes | Reuse this for every section heading. Do not create custom heading layouts. |

---

### Spotlight Card

| | |
|---|---|
| File | `ui/spotlight-card.tsx` |
| Purpose | Card with mouse-tracking radial spotlight effect |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Spotlight is decorative, does not affect content accessibility |
| Dependencies | React refs for mouse tracking, CSS custom properties |
| Animation | See ANIMATIONS.md § Interaction Patterns |
| Notes | Updates `--spotlight-x` and `--spotlight-y` CSS variables on mousemove. |

---

## Layout — `components/layout/`

### Top Nav

| | |
|---|---|
| File | `layout/top-nav.tsx` |
| Purpose | Fixed header navigation with brand, links, CTA, mobile drawer |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | `<nav>` landmark, `aria-current` for active link, `aria-expanded` for mobile toggle, focus management in drawer |
| Dependencies | `Button`, `MagneticLink`, `Badge`, Framer Motion, navigation data from `portfolio.ts` |
| Responsive | Desktop: full link bar + CTA. Mobile: hamburger → slide-in drawer. |
| Animation | Glassmorphism background fades in after scroll threshold. |

---

### Mobile Dock

| | |
|---|---|
| File | `layout/mobile-dock.tsx` |
| Purpose | Floating bottom navigation bar for mobile devices |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | `<nav>` landmark, `aria-label`, active section tracking |
| Dependencies | IntersectionObserver for section visibility detection |
| Responsive | Visible only on `md:hidden`. Hidden on desktop. |

---

### Site Footer

| | |
|---|---|
| File | `layout/site-footer.tsx` |
| Purpose | Page footer with brand, social links, back-to-top button |
| Client | Partial (back-to-top uses client-side scroll) |
| Status | Stable |
| Accessibility | `<footer>` landmark, social links with `aria-label` |
| Dependencies | Social link data from `portfolio.ts` |

---

## Sections — `components/sections/`

### Hero Section

| | |
|---|---|
| File | `sections/hero-section.tsx` |
| Purpose | Primary landing section — identity, capability, CTA |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Contains page `<h1>`, availability status, primary CTA buttons |
| Dependencies | `Button`, `Badge`, `MagneticLink`, `SectionReveal`, Framer Motion, `siteConfig` and `heroSignals` from `portfolio.ts` |
| Content | See CONTENT.md § Hero |
| Features | Availability pill, interactive terminal simulation, gradient headline, magnetic CTA buttons, quick launchpad cards |

---

### Trust Bar

| | |
|---|---|
| File | `sections/trust-bar.tsx` |
| Purpose | Tech stack marquee + credibility metric cards |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Dependencies | `Marquee`, `SectionReveal`, `trustPills`, `credibilityMetrics`, `credibilityNotes` from `portfolio.ts` |
| Content | See CONTENT.md § Trust Bar |

---

### Featured Projects

| | |
|---|---|
| File | `sections/featured-projects.tsx` |
| Purpose | Project showcase with tabbed switcher and case study modals |
| Client | Yes (`"use client"`) |
| Loading | Dynamically imported via `next/dynamic` |
| Status | Stable |
| Dependencies | `SpotlightCard`, `Badge`, `Button`, `Dialog`, `SectionHeading`, `SectionReveal`, AnimatePresence, `featuredProjects` from `portfolio.ts` |
| Content | See CONTENT.md § Featured Projects |
| Features | Tabbed project switching, animated preview surfaces, case study dialog with challenge/architecture/outcome |

---

### Experience Section

| | |
|---|---|
| File | `sections/experience-section.tsx` |
| Purpose | Career timeline and professional positioning |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Dependencies | `SectionHeading`, `SectionReveal`, `experienceTimeline` from `portfolio.ts` |
| Content | See CONTENT.md § Experience |

---

### Skills Section

| | |
|---|---|
| File | `sections/skills-section.tsx` |
| Purpose | Skill domain grid with spotlight cards |
| Client | Yes (`"use client"`) |
| Loading | Dynamically imported via `next/dynamic` |
| Status | Stable |
| Dependencies | `SpotlightCard`, `SectionHeading`, `SectionReveal`, `skillGroups` from `portfolio.ts` |
| Content | See CONTENT.md § Skills |

---

### Contact Section

| | |
|---|---|
| File | `sections/contact-section.tsx` |
| Purpose | Contact form + direct channel directory |
| Client | Yes (`"use client"`) |
| Loading | Dynamically imported via `next/dynamic` |
| Status | Stable |
| Dependencies | `Button`, `SectionHeading`, `SectionReveal`, `siteConfig`, `socialLinks`, `contactReasons` from `portfolio.ts` |
| Content | See CONTENT.md § Contact |
| Features | Client-side validation, character counters, sanitized input, POST to `/api/contact` |

---

## Effects — `components/effects/`

### Cursor Glow

| | |
|---|---|
| File | `effects/cursor-glow.tsx` |
| Purpose | Ambient glowing orb following mouse cursor |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Decorative only (`pointer-events-none`). Disabled on touch devices and when reduced motion is preferred. |
| Dependencies | Framer Motion (`useMotionValue`, `useSpring`) |
| Animation | See ANIMATIONS.md § Continuous Patterns |

---

### Lenis Provider

| | |
|---|---|
| File | `effects/lenis-provider.tsx` |
| Purpose | Smooth scroll behavior for fine pointer devices |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Disabled on coarse pointer / touch devices. Respects reduced motion. |
| Dependencies | `lenis` library |
| Animation | See ANIMATIONS.md § Continuous Patterns |

---

### Scroll Progress

| | |
|---|---|
| File | `effects/scroll-progress.tsx` |
| Purpose | Thin progress bar at top of viewport indicating scroll position |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Decorative (`aria-hidden`). Does not interfere with content. |
| Dependencies | Framer Motion (`useScroll`, `useSpring`) |
| Animation | See ANIMATIONS.md § Continuous Patterns |

---

### Section Reveal

| | |
|---|---|
| File | `effects/section-reveal.tsx` |
| Purpose | Viewport-triggered fade-up animation wrapper |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Accessibility | Respects reduced motion. Content is visible regardless of animation state. |
| Dependencies | Framer Motion (`whileInView`) |
| Animation | See ANIMATIONS.md § Entrance Patterns |

---

## Providers — `components/providers/`

### Site Providers

| | |
|---|---|
| File | `providers/site-providers.tsx` |
| Purpose | Wraps the application with global client-side providers |
| Client | Yes (`"use client"`) |
| Status | Stable |
| Children | `LenisProvider`, `ScrollProgress`, `CursorGlow` |
| Notes | Combined into one provider to minimize client component boundaries in the tree. |

---

# Composition Map

```
layout.tsx
├── SiteProviders
│   ├── LenisProvider
│   ├── ScrollProgress
│   └── CursorGlow
├── TopNav
│   ├── Badge
│   ├── MagneticLink
│   └── Button
├── <main>
│   ├── HeroSection
│   │   ├── Badge
│   │   ├── Button
│   │   ├── MagneticLink
│   │   └── SectionReveal
│   ├── TrustBar
│   │   ├── Marquee
│   │   └── SectionReveal
│   ├── FeaturedProjects (dynamic)
│   │   ├── SectionHeading
│   │   ├── SpotlightCard
│   │   ├── Badge
│   │   ├── Button
│   │   ├── Dialog
│   │   └── SectionReveal
│   ├── ExperienceSection
│   │   ├── SectionHeading
│   │   └── SectionReveal
│   ├── SkillsSection (dynamic)
│   │   ├── SectionHeading
│   │   ├── SpotlightCard
│   │   └── SectionReveal
│   └── ContactSection (dynamic)
│       ├── SectionHeading
│       ├── Button
│       └── SectionReveal
├── SiteFooter
└── MobileDock
```

---

# Creating New Components

Before creating a new component, answer these questions:

1. Does a component with this purpose already exist in this registry?
2. Can an existing component be extended or composed to meet the need?
3. Which category does it belong to? (ui / layout / sections / effects / providers)
4. Will it be reused? If not, does it need to be a separate component?
5. Does it need client-side interactivity? If not, keep it as a Server Component.

### New Component Checklist

- [ ] File created in the correct category directory
- [ ] Named in kebab-case (`my-component.tsx`)
- [ ] Exported as named export (PascalCase)
- [ ] Props interface defined with TypeScript
- [ ] Uses design tokens from DESIGN_SYSTEM.md (no hardcoded colors)
- [ ] Responsive across all breakpoints
- [ ] Keyboard accessible
- [ ] Includes `aria-label` for icon-only interactive elements
- [ ] Respects `prefers-reduced-motion` if animated
- [ ] Added to this registry

---

# References

| Document | Relationship |
|---|---|
| DESIGN_SYSTEM.md | Visual tokens consumed by all components |
| ANIMATIONS.md | Motion specs applied to components |
| ARCHITECTURE.md § Component Architecture | Category system and patterns |
| ACCESSIBILITY.md | A11Y requirements every component must meet |
| PERFORMANCE.md | Performance constraints on component implementation |
| CONTENT.md | Content rules governing text within components |
| portfolio.ts | Data source for section components |
