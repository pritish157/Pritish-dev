# Navigation System — Feature Specification

## Document Metadata
- **Feature Name**: Navigation System (Top Nav & Mobile Dock)
- **Target Files**: 
  - `frontend/components/layout/top-nav.tsx` (Desktop Header & Mobile Drawer)
  - `frontend/components/layout/mobile-dock.tsx` (Mobile Floating Dock)
- **Owner**: Google Staff Software Engineer & Staff UX Architect
- **Priority**: P0 (Critical Structural Navigation)
- **Status**: Approved / Standard Specification
- **Target Release**: v1.0 (Core Engine)

---

# 1. Feature Overview

## Purpose
The Navigation System provides persistent, frictionless, high-speed spatial orientation and section jump navigation across the single-page engineering portfolio. It includes a glassmorphic top header for desktop/tablet viewports and an ergonomic bottom floating dock for touch/mobile viewports.

## Business Value
Ensures recruiters can navigate directly to high-intent sections (Projects, Experience, Skills, Contact) without scroll friction, significantly reducing bounce rates and maximizing evaluation velocity.

## Recruiter Value
Answers critical recruiter navigation requirements:
- **Where am I?**: Active section spy highlights current scroll location (`#projects`, `#experience`, etc.).
- **How do I jump?**: Instant smooth scroll navigation to any portfolio section.
- **How do I take action?**: Persistent top-right CTA ("Contact" / "Resume") available at all times.
- **Mobile Usability**: Mobile dock positioned within natural thumb reach zone.

## Problem Statement
Traditional fixed headers often block vertical screen real estate on small screens or fail to indicate active scroll context. The dual-mode Navigation System (Top Nav on desktop, Mobile Dock on mobile) optimizes screen space while maintaining persistent interaction.

## Success Criteria
- **Scroll Response**: `<16ms` transition latency for glassmorphism backdrop activation.
- **Active Section Accuracy**: 100% accurate hash updates based on viewport `IntersectionObserver`.
- **Mobile Usability**: Zero layout shifts (`CLS = 0.00`), thumb-friendly touch targets (`≥44x44px`).
- **Accessibility**: 100% WCAG 2.1 AA keyboard tab traversal & mobile menu focus trap.

## Out of Scope
- Multi-page routing (this is a high-performance SPA using hash anchors).
- Light mode navigation styling (portfolio is strictly dark mode).

## Dependencies
- **Data Source**: `frontend/lib/data/portfolio.ts` (`siteConfig.navLinks`, `siteConfig.socialLinks`).
- **UI Primitives**: `components/ui/button.tsx`, `components/ui/magnetic-link.tsx`, `components/ui/badge.tsx`.
- **Packages**: `framer-motion`, `lucide-react`, `lenis` (for smooth scroll synchronization).

---

# 2. User Stories

### User Story 1 (Recruiter on Desktop)
**As a** Recruiter browsing on a desktop monitor,  
**I want to** click navigation links ("Projects", "Experience", "Skills") in the fixed top bar,  
**So that I can** instantly jump to specific sections and see which section I am currently viewing.

#### Acceptance Criteria
- [ ] **Given** top nav is rendered, **When** scrolling past 20px, **Then** the top nav background smoothly transitions into a glassmorphic panel (`.glass-panel`).
- [ ] **Given** user clicks `"#projects"`, **When** the page scrolls down, **Then** smooth scroll positions section below header with `scroll-margin-top: 7rem`.
- [ ] **Given** user is viewing `#experience`, **When** section enters viewport, **Then** `"Experience"` link displays active indicator pill (`bg-white/10 text-white`).

### User Story 2 (Recruiter on Mobile Phone)
**As a** Recruiter viewing the portfolio on a mobile device,  
**I want** a floating bottom navigation dock with icon targets,  
**So that I can** effortlessly navigate using one hand without reaching to the top of the screen.

#### Acceptance Criteria
- [ ] **Given** viewport `<768px`, **When** page renders, **Then** desktop top nav links hide and `MobileDock` appears at bottom center of viewport.
- [ ] **Given** user taps mobile dock item, **When** section scrolls, **Then** active icon highlights with violet glow indicator.

---

# 3. UX Specification

## Layout & Framing
- **Desktop Top Nav (`top-nav.tsx`)**: Fixed header (`fixed top-0 left-0 right-0 z-50`), `h-20`, container `max-w-7xl mx-auto px-4 sm:px-6`. Left: Logo badge, Center: Nav link pill container, Right: Action CTA button.
- **Mobile Dock (`mobile-dock.tsx`)**: Floating dock (`fixed bottom-6 left-1/2 -translate-x-1/2 z-50`), `h-14`, rounded-full glass pill (`rounded-full glass-panel px-4 py-2 flex items-center gap-2`). Visible only on `md:hidden`.

## Spacing & Density
- **Header Clearance**: `h-20` (80px height).
- **Target Touch Dimensions**: All link targets enforce `min-h-[44px]` and `min-w-[44px]`.
- **Nav Link Gap**: `gap-1` inside desktop link container, `gap-3` inside mobile dock.

## Information Hierarchy
1. **Brand Identity**: Left logo badge (`"PKP"` / `"Pritish.dev"`).
2. **Navigation Links**: "Profile", "Projects", "Experience", "Skills", "Contact".
3. **Primary CTA**: "Get in Touch" / "Resume" button highlighted on right.

## Responsive Behavior
- **Mobile (<768px)**: Desktop navigation links hidden (`hidden md:flex`). Top nav retains logo badge and mobile drawer button (`md:hidden`). Bottom `MobileDock` renders floating icons.
- **Desktop (768px+)**: `MobileDock` hidden (`md:hidden`). Top nav renders full horizontal link bar and CTA button.

## Component States
- **Scrolled Rest State**: `.glass-panel` background (`bg-white/[0.04] border-white/10 shadow-soft backdrop-blur-xl`).
- **Link Hover**: Translucent hover background (`hover:bg-white/5 hover:text-white`).
- **Link Active**: Subdued highlight pill (`bg-white/10 text-white font-medium`).
- **Focus State**: Standardized focus ring (`ring-2 ring-violet-400/60 ring-offset-2 ring-offset-black`).
- **Mobile Drawer Open**: Backdrop blur overlay (`backdrop-blur-md bg-black/60`), drawer slides in from right (`x: "100%" -> "0%"`), body scroll locked.

## Animations
- **Glass Transformation**: CSS transition on `background-color`, `backdrop-filter`, and `border-color` (`duration-300`).
- **Active Pill Indicator**: Framer Motion `layoutId="active-nav-pill"` for smooth sliding highlight between active links.
- **Drawer Slide**: Framer Motion spring transition (`stiffness: 300, damping: 30`).

---

# 4. Technical Design

## Component Architecture
```
frontend/components/layout/
├── top-nav.tsx
│   ├── NavBrand (Logo & Status)
│   ├── NavLinks (Desktop pill container)
│   ├── NavActions (CTA Button & Social Links)
│   └── MobileDrawer (Dialog overlay for mobile menu)
└── mobile-dock.tsx
    └── DockItem (Icon button with active indicator)
```

## Component Boundaries
- **Files**: `frontend/components/layout/top-nav.tsx`, `frontend/components/layout/mobile-dock.tsx`
- **Line Count Target**: `<200 lines` per file.
- **Client Boundary**: Both components require `'use client'` due to scroll event listeners, `IntersectionObserver` state, and Framer Motion layout animations.

## Prop Contracts & Interfaces
```typescript
export type TopNavProps = {
  activeSection?: string;
};

export type MobileDockProps = {
  className?: string;
};
```

## Data Flow & SSOT Integration
- Consumes `siteConfig.navLinks` from `@/lib/data/portfolio`:
  ```typescript
  export const navLinks = [
    { label: "Profile", href: "#profile", icon: "User" },
    { label: "Projects", href: "#projects", icon: "FolderGit2" },
    { label: "Experience", href: "#experience", icon: "Briefcase" },
    { label: "Skills", href: "#skills", icon: "Cpu" },
    { label: "Contact", href: "#contact", icon: "Mail" }
  ] as const;
  ```

## Custom Hooks & Utilities
- `useScrollPosition`: Track `window.scrollY > 20` to toggle background state.
- `useActiveSection`: Track visible section via `IntersectionObserver` threshold (`0.4`).
- `cn()` utility for conditional Tailwind class merging.

## Component Dependencies
- `Button` from `@/components/ui/button`
- `MagneticLink` from `@/components/ui/magnetic-link`
- `Badge` from `@/components/ui/badge`
- `LucideIcons`: `User`, `FolderGit2`, `Briefcase`, `Cpu`, `Mail`, `Menu`, `X`.

---

# 5. Design Requirements

## Typography
- **Brand Logo**: Space Grotesk (`font-display`), `text-base font-bold tracking-tight`.
- **Nav Links**: General Sans (`font-sans`), `text-sm font-medium`, `tracking-wide`.

## Color System Tokens
- **Resting Header**: `bg-transparent` when `scrollY === 0`.
- **Scrolled Header**: `bg-[#050816]/80` with `border-white/10` and `backdrop-blur-xl`.
- **Active Pill**: `bg-violet-500/20 text-violet-300 border border-violet-500/30`.
- **Hover State**: `text-white bg-white/5`.

## Glassmorphism Specification
- Header & Mobile Dock consume standard `.glass-panel` utilities with `backdrop-filter: blur(24px)`.

## Motion Physics
- Active tab highlight uses Framer Motion `layoutId="nav-indicator"` with spring physics (`stiffness: 380, damping: 30`).

---

# 6. Performance Requirements

## Lighthouse Metrics Budget
- **Lighthouse Score Impact**: Zero regression (target `≥95`).
- **Cumulative Layout Shift (CLS)**: `0.00` (Header uses `fixed` positioning with explicit `h-20` line reservation).
- **Scroll Frame Rate**: `60 FPS` smooth scrolling.

## Event Performance
- Scroll listeners must be passive (`{ passive: true }`) or driven via `requestAnimationFrame` / `useScroll` from Framer Motion.
- `IntersectionObserver` utilized instead of continuous `window.onscroll` element bounding checks.

---

# 7. Accessibility Requirements (WCAG 2.1 AA)

## Keyboard Navigation
- **Tab Sequence**: Logo link → Profile → Projects → Experience → Skills → Contact → CTA button.
- **Focus Trap**: Mobile drawer traps keyboard focus when open; pressing `Escape` restores focus to hamburger trigger button.

## Visual Focus Indicators
- All links display high-contrast focus rings:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black`.

## ARIA Semantics
- Landmark Container: `<header>` tag wrapping `<nav aria-label="Main Navigation">`.
- Mobile Dock Container: `<nav aria-label="Mobile Quick Navigation">`.
- Active Link: Sets `aria-current="page"` (or `aria-current="true"`) on active section link.
- Mobile Menu Button: `aria-expanded="true|false"` and `aria-controls="mobile-menu-drawer"`.

## Reduced Motion
- When `prefers-reduced-motion: reduce` is active:
  - Mobile drawer slide animation replaced with instantaneous opacity toggle.
  - Active tab sliding indicator replaced with instant color swap.

---

# 8. SEO Requirements

## Navigation Links
- All nav links use semantic `<a>` tags with explicit `href` attributes pointing to section hash anchors (`#profile`, `#projects`, `#experience`, `#skills`, `#contact`).

## Semantic HTML
- `<header>` landmark wrapper.
- `<nav>` landmark navigation container.

---

# 9. Risks & Mitigations

| Risk Domain | Risk Description | Potential Impact | Mitigation Strategy |
|---|---|---|---|
| **Performance** | Unthrottled scroll listeners causing lag | High | Use passive event listeners or `IntersectionObserver` for scroll tracking. |
| **UX** | Mobile dock covering bottom content or footer | Medium | Add `pb-24` padding to page main wrapper on mobile viewports. |
| **Accessibility** | Mobile drawer open state losing keyboard focus | High | Implement focus trap and `Escape` key handler in mobile menu modal. |
| **Maintenance** | Nav links duplicated between TopNav and MobileDock | Medium | Import link array strictly from `@/lib/data/portfolio.ts`. |

---

# 10. Testing Plan & Feature Validation Policy

## How to Test

### 1. Start the Project
- Execute `cd frontend && npm run dev`.
- Launch `http://localhost:3000` in browser. Confirm application starts cleanly.

### 2. Navigate
- View the top fixed header (`top-nav.tsx`) at the very top of the page.
- Slowly scroll down toward `#projects`, `#experience`, and `#contact`.

### 3. Verify Expected Behavior
- [x] **Scroll Glassmorphism**: When `window.scrollY > 20`, TopNav transitions smoothly from transparent to glass panel backdrop (`.glass-panel` blur).
- [x] **Active Section Spy**: As page scrolls to `#projects`, `"Projects"` nav item highlights with active pill background (`bg-violet-500/20`).
- [x] **Smooth Scroll Anchor**: Clicking `"Skills"` smoothly scrolls page and aligns `#skills` section exactly below fixed header (`scroll-margin-top: 7rem`).
- [x] **Persistent CTA**: `"Get in Touch"` CTA button remains accessible in top right corner at all scroll positions.

### 4. Responsive Testing
- [x] **Desktop (1440px / 1024px)**: Full horizontal link bar rendered in TopNav (`hidden md:flex`). `MobileDock` hidden (`md:hidden`).
- [x] **Tablet (768px)**: Horizontal nav bar adapts to compact pill spacing.
- [x] **Mobile (375px - iPhone SE)**: TopNav desktop links hide (`hidden md:flex`). Hamburger menu button appears (`md:block`). `MobileDock` appears floating at bottom center (`fixed bottom-6`).
- [x] **Mobile Dock Touch Verification**: Tapping icon targets on `MobileDock` triggers instant section jumps without obscuring content.

### 5. Accessibility Testing
- [x] **Keyboard Tab Sequence**: Press `Tab` continuously from page top. Focus moves: `Logo` → `Profile` → `Projects` → `Experience` → `Skills` → `Contact` → `CTA Button`.
- [x] **Focus Indicator**: High-contrast violet ring (`focus-visible:ring-violet-400/60`) highlights active focused link.
- [x] **Mobile Drawer Focus Trap**: Open mobile menu via hamburger button. Press `Tab` repeatedly; focus stays trapped inside drawer. Pressing `Escape` closes drawer and restores focus to hamburger trigger.
- [x] **Screen Reader Labels**: VoiceOver announces `<nav aria-label="Main Navigation">` and `aria-current="page"` on the active section link.

### 6. Edge Cases
- [x] **Fast Scroll Jumps**: Drag scrollbar rapidly from top to bottom. `IntersectionObserver` updates active link without skipping or flickering.
- [x] **Resize Across Breakpoints**: Open drawer on mobile viewport (375px), then expand browser width to 1024px. Drawer closes automatically and desktop links restore cleanly.

### 7. Browser Testing
- [x] **Chrome**: Smooth scrolling and Framer Motion sliding pill indicator function without jank.
- [x] **Firefox**: Fixed header positioning and scroll margin offset align accurately.
- [x] **Edge**: Focus ring renders sharply across all links.
- [x] **Safari / Mobile Safari**: Mobile dock floating shadow (`shadow-soft`) and glass backdrop blur display cleanly on iOS.

### 8. Performance
- [x] **Scroll Latency**: `<16ms` frame time during scrolling (60 FPS verified via DevTools Rendering FPS meter).
- [x] **Zero Layout Shift**: `CLS = 0.00` (Header uses `fixed` positioning with explicit `h-20` reservation).
- [x] **Console Output**: 0 console warnings or errors.

### 9. Expected Result
The Navigation System sticks during scroll, glass background activates smoothly, active section indicator accurately updates via IntersectionObserver, mobile dock functions seamlessly on small screens, drawer focus trap passes accessibility audits, and zero layout shifts occur.

---

# 11. Review Checklist

- [x] **Engineering**: 0 TypeScript errors, 0 ESLint warnings, typed prop contracts.
- [x] **Design System**: 100% token compliant, `.glass-panel` backdrop blur, no inline hex.
- [x] **Accessibility**: WCAG 2.1 AA compliant, visible focus rings, focus trap in mobile drawer.
- [x] **Performance**: Passive scroll event handling, `IntersectionObserver` section spy, 60 FPS.
- [x] **SEO**: Semantic `<header>` and `<nav>`, valid anchor hrefs.
- [x] **Recruiter Experience**: Frictionless section jumps and persistent CTA visibility.

---

# 12. Definition of Done

A feature is complete and ready for production merge **ONLY** when:

1. [x] **Implementation Finished**: Feature code written and formatted.
2. [x] **Code Reviewed**: Code inspected against `ENGINEERING_STANDARDS.md`.
3. [x] **Manual Testing Steps Written**: Complete "How to Test" guide written in `NAVIGATION_SPEC.md`.
4. [x] **Testing Completed Successfully**: All 9 steps in "How to Test" manually executed and passed.
5. [x] **No Regressions Introduced**: `typecheck`, `lint`, and adjacent sections verified clean.
