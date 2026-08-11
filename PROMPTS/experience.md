# Experience Section — AI Implementation Prompt

## Context
Shows career trajectory. Must communicate professional positioning without fabricating job titles or company names.
Reference: PORTFOLIO.md § Page Goals → Experience
Reference: CONTENT.md § Experience

## Data Source
All timeline data lives in portfolio.ts → experienceTimeline array.
Never invent experience entries.

## Component Map
- ExperienceSection (sections/experience-section.tsx)
  - SectionHeading
  - SectionReveal

Reference: COMPONENTS.md § Experience Section

## Content Rules
- Show trajectory, not just events
- Each entry: period + title + description
- Positioning card emphasizes 'what kind of engineer'
- No fabricated job titles, companies, or dates
Reference: CONTENT.md § Experience
Reference: AGENTS.md § Never Assume

## Design References
- Timeline styling: See DESIGN_SYSTEM.md § Borders and Radii
- Section spacing: See DESIGN_SYSTEM.md § Spacing

## Quality Checklist
- [ ] Timeline entries render from portfolio.ts
- [ ] No fabricated content
- [ ] Positioning statement is clear and accurate
- [ ] Accessible heading hierarchy
- [ ] Responsive layout
