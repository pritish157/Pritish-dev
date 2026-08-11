# Featured Projects Showcase — Feature Specification

## Document Metadata
- **Feature Name**: Featured Projects Showcase & Case Study System
- **Target File**: `frontend/components/sections/featured-projects.tsx`
- **Owner**: Google Staff Software Engineer & Senior Software Architect
- **Priority**: P0 (Primary Proof of Competence Surface)
- **Status**: Approved / Standard Specification
- **Target Release**: v1.0 (Core Engine)

---

# 1. Feature Overview

## Purpose
The Featured Projects Showcase presents Pritish's flagship software products as production products—not student assignments. It provides recruiters and hiring managers with a interactive gallery featuring tabbed category filtering, mouse-tracking spotlight cards, technical architecture summaries, live metrics, and deep-dive Case Study Modals (`components/ui/dialog.tsx`).

## Business Value
Transforms candidate evaluation from generic claim verification to empirical engineering proof. Demonstrates real-world software shipping, architecture decision-making, performance optimization, and problem-solving.

## Recruiter Value
Answers the most critical hiring question: **"What has this engineer actually built?"**
- **Immediate Proof**: Direct links to Live Demos and GitHub repositories.
- **Architectural Signals**: Concise breakdown of Problem, Architecture, Tech Stack, and Metrics.
- **Interactive Inspection**: Case Study Modal allows technical interviewers to inspect system architecture, trade-offs, and outcomes without leaving the page.

## Problem Statement
Recruiters often skim past text-heavy project descriptions. Traditional portfolios show static screenshots without architectural context or technical rationale. The Featured Projects Showcase combines high-impact visual surfaces with structured engineering case studies.

## Success Criteria
- **LCP Impact**: Zero negative impact on page load (loaded dynamically via `next/dynamic`).
- **Interactive Engagement**: >70% of recruiters interact with project tabs or click "Read Case Study".
- **Case Study Modal Performance**: `<50ms` open latency with smooth backdrop blur.
- **Accessibility**: 100% WCAG 2.1 AA compliant, full keyboard tab navigation, modal focus trap and restoration.

## Out of Scope
- Dynamic CMS fetching (project data is strictly sourced from `portfolio.ts` SSOT).
- External iframe previews within the modal (uses rich structured copy and screenshots).

## Dependencies
- **Data Source**: `frontend/lib/data/portfolio.ts` (`featuredProjects`).
- **UI Primitives**: `components/ui/spotlight-card.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/dialog.tsx`, `components/ui/section-heading.tsx`.
- **Effect Components**: `components/effects/section-reveal.tsx`.
- **Packages**: `framer-motion`, `@radix-ui/react-dialog`, `lucide-react`.

---

# 2. User Stories

### User Story 1 (Recruiter)
**As a** Technical Recruiter,  
**I want to** filter projects by domain (e.g., "AI Systems", "Full-Stack Web", "Algorithms") and click "Read Case Study",  
**So that I can** quickly evaluate relevant engineering experience tailored to my company's open role.

#### Acceptance Criteria
- [ ] **Given** category tabs render above project grid, **When** recruiter clicks `"AI Systems"`, **Then** project cards animate and filter smoothly (`AnimatePresence`).
- [ ] **Given** a project card, **When** hovering over it, **Then** a radial spotlight follows the mouse pointer (`SpotlightCard`).
- [ ] **Given** recruiter clicks `"Read Case Study"`, **When** the dialog opens, **Then** modal displays problem context, technical challenges, architecture diagram/text, key trade-offs, and metric outcomes.

### User Story 2 (Senior Engineering Manager)
**As a** Senior Engineering Manager,  
**I want to** inspect the engineering decisions and trade-offs of flagship projects,  
**So that I can** assess Pritish's architectural judgment and senior engineering capabilities.

#### Acceptance Criteria
- [ ] **Given** the Case Study Modal is open, **When** reviewing the `"Architecture & Trade-offs"` section, **Then** explicit architectural decisions and trade-offs are documented with clear engineering rationale.

---

# 3. UX Specification

## Layout & Framing
- **Section Wrapper**: `<section id="projects" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-28">`.
- **Header**: Standardized `SectionHeading` with eyebrow `"FLAGSHIP WORK"`, title `"Engineered Products & AI Systems"`, description `"Production applications built with strict architectural discipline."`.
- **Category Filter Tabs**: Horizontal pill container (`flex flex-wrap gap-2 mb-12`).
- **Project Grid**: Responsive grid layout — 1 column on mobile (`grid-cols-1`), 2 columns on tablet (`md:grid-cols-2`), 3 columns on large desktop (`xl:grid-cols-3`).

## Spacing & Density
- **Section Padding**: `py-24` (96px top and bottom).
- **Card Spacing**: `gap-6 sm:gap-8`.
- **Card Internal Padding**: `p-6 sm:p-8`.

## Information Hierarchy
1. **Section Heading**: Standard eyebrow + title + description.
2. **Project Card Header**: Category badge + Accent colored domain tag.
3. **Project Title (H3)**: `text-xl sm:text-2xl font-bold font-display`.
4. **Project Description**: Concise 2-sentence summary in `text-muted`.
5. **Tech Stack Pills**: High-frequency tech tokens (e.g., `Next.js 15`, `TypeScript`, `PyTorch`, `MongoDB`).
6. **Card Footer**: Primary Action ("Read Case Study") + Secondary Action ("Live Demo" / "GitHub").

## Project Accents
Each featured project features a custom accent color for visual distinction per `DESIGN_SYSTEM.md § Project Accent Colors`:
- **Aradhana AstroAgent**: Electric Blue (`#3B82F6`)
- **Knot of Love**: Violet (`#8B5CF6`)
- **Vireon**: Fuchsia (`#A855F7`)
- **Fuel Route Optimisation**: Deep Purple (`#7C3AED`)
- **ImageSteg**: Light Purple (`#C084FC`)

## Component States
- **Resting**: Glassmorphic card surface (`.glass-panel`) with subtle white border (`border-white/10`).
- **Card Hover**: Mouse-tracking spotlight active (`--spotlight-x`, `--spotlight-y`), border opacity shifts to `0.20`, subtle transform scale (`scale-[1.01]`).
- **Filter Active**: Selected category tab receives gradient fill (`bg-primary text-white`).
- **Modal Open**: Backdrop blur screen (`backdrop-blur-md bg-black/80`), focus trapped within dialog modal.

## Animations
- **Section Reveal**: Framer Motion viewport reveal (`SectionReveal`).
- **Tab Filtering**: `AnimatePresence` layout transition (`opacity: 0 -> 1`, `scale: 0.95 -> 1`).
- **Spotlight Physics**: Real-time radial gradient calculation on `mousemove`.

---

# 4. Technical Design

## Component Architecture
```
frontend/components/sections/featured-projects.tsx
├── ProjectFilterTabs (Category navigation)
├── ProjectGrid (Responsive card container)
│   └── ProjectCard (Consumes SpotlightCard & Badge)
│       └── CaseStudyTrigger (Button opening Dialog)
└── CaseStudyModal (Consumes Radix UI Dialog primitives)
    ├── CaseStudyHeader
    ├── CaseStudyArchitecture
    ├── CaseStudyTradeoffs
    └── CaseStudyMetrics
```

## Component Boundaries
- **File Location**: `frontend/components/sections/featured-projects.tsx`
- **Line Count Target**: Split into helper modules if total file length exceeds 300 lines (e.g., `components/sections/projects/case-study-modal.tsx`).
- **Loading Strategy**: Dynamically imported in `app/page.tsx` via `next/dynamic` to avoid blocking main bundle:
  ```typescript
  const FeaturedProjects = dynamic(
    () => import("@/components/sections/featured-projects"),
    { loading: () => <SectionFallback label="Loading flagship projects..." /> }
  );
  ```

## Server vs Client Boundary
- Requires `'use client'` directive due to filter state (`useState`), modal trigger state (`useState`), `AnimatePresence`, and mouse-tracking event handlers.

## Prop Contracts & Interfaces
```typescript
export type FeaturedProjectsProps = {
  className?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: "ai" | "web" | "algorithms";
  description: string;
  accentColor: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  caseStudy: {
    problem: string;
    challenge: string;
    architecture: string[];
    tradeoffs: string[];
    outcome: string;
  };
  demoUrl?: string;
  githubUrl?: string;
};
```

## Data Flow & SSOT Integration
- Consumes `featuredProjects` array strictly from `@/lib/data/portfolio`.

## Component Dependencies
- `SpotlightCard` from `@/components/ui/spotlight-card`
- `Badge` from `@/components/ui/badge`
- `Button` from `@/components/ui/button`
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` from `@/components/ui/dialog`
- `SectionHeading` from `@/components/ui/section-heading`
- `SectionReveal` from `@/components/effects/section-reveal`

---

# 5. Design Requirements

## Typography
- **Section Heading (H2)**: Space Grotesk (`font-display`), `text-3xl sm:text-5xl font-semibold tracking-tight`.
- **Card Titles (H3)**: Space Grotesk (`font-display`), `text-xl sm:text-2xl font-bold text-foreground`.
- **Case Study Body**: General Sans (`font-sans`), `text-base text-muted leading-relaxed`.

## Color System Tokens
- **Card Background**: `.glass-panel` (`bg-white/[0.04] border-white/10`).
- **Tag Pill Fill**: Accent colored translucent fills (e.g., `bg-blue-500/10 text-blue-400 border-blue-500/20`).

## Glassmorphism Specification
- Cards and Case Study Modal apply `.glass-panel` backdrop blur (`backdrop-blur-xl`).

## Motion & Keyframes
- Spring physics for card entrance (`stiffness: 300, damping: 25`).
- Filter transition duration: `0.3s`.

---

# 6. Performance Requirements

## Lighthouse Metrics Budget
- **Performance Target**: Zero regression on core initial bundle (loaded asynchronously below the fold).
- **Cumulative Layout Shift (CLS)**: `<0.1` (Skeleton loader matches section dimensions).
- **Modal Open Latency**: `<50ms`.

## Bundle Impact
- Dynamic code-splitting guarantees `featured-projects.tsx` and Radix Dialog dependencies load only when scrolled near viewport.

## Motion Performance
- Spotlight effect uses CSS variables updated via `requestAnimationFrame` to maintain 60 FPS without React re-renders.

---

# 7. Accessibility Requirements (WCAG 2.1 AA)

## Keyboard Navigation
- **Filter Tabs**: Standard arrow key navigation or tab traversal.
- **Card Traversal**: Tab sequence moves through project cards → "Read Case Study" button → Live Demo link → GitHub link.
- **Modal Focus Management**: 
  - Dialog traps focus when open.
  - Pressing `Escape` key closes dialog.
  - Focus restores automatically to triggering "Read Case Study" button upon closure.

## ARIA Semantics
- Section Landmark: `<section id="projects" aria-label="Flagship Projects">`.
- Category Filter Bar: `<div role="tablist" aria-label="Filter projects by category">`.
- Category Tabs: `<button role="tab" aria-selected="true|false">`.
- Modal Overlay: `aria-modal="true"`, `aria-labelledby="dialog-title"`, `aria-describedby="dialog-description"`.

## Reduced Motion
- When `prefers-reduced-motion: reduce` is detected:
  - Filtering layout transition switches to instant reveal without scaling.
  - Mouse-tracking spotlight animation disabled.

---

# 8. SEO Requirements

## Metadata & Semantic HTML
- Section Title uses `<h2>` heading tag (`SectionHeading`).
- Project titles inside cards use `<h3>` heading tags.
- Links to external live demos use `rel="noopener noreferrer" target="_blank"`.

## Structured Data
- Schema.org `SoftwareApplication` or `CreativeWork` JSON-LD integrated per project item.

---

# 9. Risks & Mitigations

| Risk Domain | Risk Description | Potential Impact | Mitigation Strategy |
|---|---|---|---|
| **Performance** | Large dialog components increasing initial JS bundle | High | Use `next/dynamic` code splitting for section loading. |
| **UX** | Mouse-tracking spotlight causing lag on low-power devices | Medium | Disable spotlight on touch devices and coarse pointer media queries. |
| **Accessibility** | Focus trap breaking when closing modal | High | Use Radix UI Dialog primitive which handles focus restoration out-of-the-box. |
| **Maintenance** | Inline project metrics violating SSOT | High | Keep all project copy, metrics, and URLs in `@/lib/data/portfolio.ts`. |

---

# 10. Testing Plan & Feature Validation Policy

## How to Test

### 1. Start the Project
- Run `cd frontend && npm run dev`.
- Open `http://localhost:3000` in browser. Confirm site starts cleanly.

### 2. Navigate
- Scroll down past Hero and Trust Bar to `#projects` section (or click `"Projects"` in TopNav).
- Confirm SectionHeading displays `"FLAGSHIP WORK"` eyebrow and `"Engineered Products & AI Systems"`.

### 3. Verify Expected Behavior
- [x] **Category Filter Switching**: Click `"AI Systems"` tab. Grid updates with smooth fade/scale transition (`AnimatePresence`) showing Aradhana AstroAgent.
- [x] **Mouse Spotlight Effect**: Hover mouse over project card. Radial spotlight glow tracks pointer position across card surface (`SpotlightCard`).
- [x] **Project Accent Colors**: Aradhana AstroAgent displays Electric Blue (`#3B82F6`), Knot of Love displays Violet (`#8B5CF6`), Vireon displays Fuchsia (`#A855F7`).
- [x] **Case Study Modal Launch**: Click `"Read Case Study"` button on Aradhana AstroAgent card. Dialog modal opens in `<50ms` with glass backdrop blur (`backdrop-blur-md bg-black/80`).
- [x] **Modal Architecture Content**: Modal displays Problem Statement, Architecture Decisions, Technical Trade-offs, and Metrics.
- [x] **External Links**: Click `"Live Demo"` / `"GitHub"` link inside card; opens in new tab with `rel="noopener noreferrer"`.

### 4. Responsive Testing
- [x] **Desktop (1440px)**: 3-column grid (`xl:grid-cols-3`). Case study modal renders in centered max-width container (`max-w-3xl`).
- [x] **Tablet (768px)**: 2-column grid (`md:grid-cols-2`). Category tabs align horizontally.
- [x] **Mobile (375px - iPhone SE)**: Single column card grid (`grid-cols-1`). Category tabs wrap neatly. Modal fills mobile viewport with scrollable body. All touch targets `≥44px`.

### 5. Accessibility Testing
- [x] **Keyboard Navigation**: Tab into filter bar (`role="tablist"`). Arrow keys or `Tab` move focus across filter tabs. Tab into project card moves focus to `"Read Case Study"` trigger button.
- [x] **Focus Ring**: Focused elements display visible violet ring (`ring-2 ring-violet-400/60 ring-offset-black`).
- [x] **Modal Focus Trap**: Open Case Study modal via `Enter` key. Tab through modal contents; focus remains trapped inside dialog.
- [x] **Modal Focus Restoration**: Press `Escape` key inside open modal. Modal closes instantly, and focus returns to the exact `"Read Case Study"` button that triggered it.
- [x] **Screen Reader**: VoiceOver announces `role="tablist"` and modal title `"Aradhana AstroAgent — Case Study"`.

### 6. Edge Cases
- [x] **Slow Network Load**: Enable Fast 3G throttling in DevTools. Section loads asynchronously via `next/dynamic` without causing LCP layout shift.
- [x] **Rapid Category Toggling**: Click filter tabs rapidly ("All" -> "AI" -> "Web" -> "All"). Transitions execute cleanly without queue buildup or component unmount errors.

### 7. Browser Testing
- [x] **Chrome**: Card spotlight and Framer Motion layout transitions run smoothly.
- [x] **Firefox**: Grid layout and Radix Dialog backdrop blur render cleanly.
- [x] **Edge**: Tab focus indicators render sharply.
- [x] **Safari / Mobile Safari**: iOS touch tap opens Case Study modal effortlessly; body scroll locks correctly.

### 8. Performance
- [x] **Layout Shift**: `CLS <0.1` (Skeleton loader reserves height during dynamic chunk load).
- [x] **Console Verification**: DevTools Console shows 0 warnings and 0 errors.
- [x] **Animation FPS**: Spotlight mouse tracking and modal transitions achieve 60 FPS.

### 9. Expected Result
Category tabs filter project cards smoothly, mouse-tracking spotlight follows cursor position, Case Study modal opens instantly with focus trapped, pressing Escape closes modal and restores focus, mobile views stack into single column, and zero layout shift or console errors occur.

---

# 11. Review Checklist

- [x] **Engineering**: 0 TypeScript errors, 0 ESLint warnings, typed project contracts.
- [x] **Design System**: 100% token compliant, project accent color integration, spotlight card usage.
- [x] **Accessibility**: WCAG 2.1 AA compliant, Radix Dialog focus trap, ARIA tablist semantics.
- [x] **Performance**: Below-the-fold dynamic import (`next/dynamic`), GPU-accelerated motion, 60 FPS.
- [x] **SEO**: Semantic `<h2>` and `<h3>` tags, valid external links.
- [x] **Recruiter Experience**: Clear project metrics, problem-solution narrative, instant case study access.

---

# 12. Definition of Done

A feature is complete and ready for production merge **ONLY** when:

1. [x] **Implementation Finished**: Feature code written and formatted.
2. [x] **Code Reviewed**: Code inspected against `ENGINEERING_STANDARDS.md`.
3. [x] **Manual Testing Steps Written**: Complete "How to Test" guide written in `FEATURED_PROJECTS_SPEC.md`.
4. [x] **Testing Completed Successfully**: All 9 steps in "How to Test" manually executed and passed.
5. [x] **No Regressions Introduced**: `typecheck`, `lint`, and adjacent sections verified clean.
