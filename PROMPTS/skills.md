# Skills Section — AI Implementation Prompt

## Context
Displays engineering capabilities grouped by domain. Must be scannable in under 5 seconds.
Reference: PORTFOLIO.md § Page Goals → Skills
Reference: CONTENT.md § Skills

## Data Source
All skill data lives in portfolio.ts → skillGroups array.
6 groups: Frontend, Backend, AI/ML, Databases, DevOps, Tools.

## Component Map
- SkillsSection (sections/skills-section.tsx)
  - SectionHeading
  - SpotlightCard (per skill group)
  - SectionReveal

Reference: COMPONENTS.md § Skills Section

## Content Rules
- Group by domain, not by proficiency
- No proficiency bars, percentages, or star ratings
- Domain title + brief description + technology list
Reference: CONTENT.md § Skills

## Design References
- Card spotlight: See DESIGN_SYSTEM.md § Effects → Spotlight Effect
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile

## Animation
- Section entrance: SectionReveal
- Cards: floating animation on desktop
- Spotlight tracking on hover
Reference: ANIMATIONS.md § Interaction Patterns

## Quality Checklist
- [ ] All 6 skill groups render from portfolio.ts
- [ ] No proficiency indicators
- [ ] Responsive grid layout
- [ ] Spotlight effect works on desktop
- [ ] Cards are keyboard accessible
