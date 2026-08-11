# Projects Section — AI Implementation Prompt

## Context
The featured projects section is the most important section for recruiter conversion. It must prove that Pritish ships real software.
Reference: PORTFOLIO.md § Featured Work
Reference: CONTENT.md § Featured Projects

## Data Source
All project data lives in portfolio.ts → featuredProjects array.
Never hardcode project information in components.

## Component Map
- FeaturedProjects (sections/featured-projects.tsx)
  - SectionHeading
  - SpotlightCard (per project)
  - Badge (tech tags, eyebrow)
  - Button (CTAs)
  - Dialog (case study modal)
  - SectionReveal (entrance animation)

Reference: COMPONENTS.md § Featured Projects

## Design References
- Card styling: See DESIGN_SYSTEM.md § Effects → Glassmorphism
- Project accents: See DESIGN_SYSTEM.md § Project Accent Colors
- Spotlight effect: See DESIGN_SYSTEM.md § Effects → Spotlight Effect

## Content Rules
- Show impact, not just technology
- One-sentence summary per project
- Tech tags as glass pills
- Case study structure: Challenge → Architecture → Outcome
Reference: CONTENT.md § Featured Projects

## Animation
- Section entrance: SectionReveal fade-up
- Card hover: translateY(-4px), border glow
- Tab switching: AnimatePresence slide transition
Reference: ANIMATIONS.md § Entrance Patterns, § Interaction Patterns

## Quality Checklist
- [ ] All 5 projects render from portfolio.ts data
- [ ] Each project has live/github links (where available)
- [ ] Case study modal opens with correct content
- [ ] Focus trapped in modal, Escape closes
- [ ] Cards are keyboard accessible
- [ ] Responsive: single column on mobile
- [ ] No fabricated metrics
