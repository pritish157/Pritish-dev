# Contact Section — AI Implementation Prompt

## Context
The contact section must make it trivially easy for a recruiter to reach out. Multiple channels, minimal friction.
Reference: PORTFOLIO.md § Page Goals → Contact
Reference: CONTENT.md § Contact

## Data Source
Contact data from portfolio.ts → siteConfig (email, location), socialLinks, contactReasons.

## Component Map
- ContactSection (sections/contact-section.tsx)
  - SectionHeading
  - Button
  - SectionReveal

Reference: COMPONENTS.md § Contact Section

## Content Rules
- Direct email always visible
- Location and timezone for international recruiters
- Link directory: GitHub, LinkedIn, Resume PDF
- Contact form: Name, Email, Subject, Message
- No marketing pressure, no unnecessary fields
Reference: CONTENT.md § Contact

## Form Implementation
- Client-side validation with character counters
- Input sanitization (sanitizeInput from utils.ts)
- POST to /api/contact
- Success/error feedback
- Accessible form labels and error announcements
Reference: ACCESSIBILITY.md § Interactive Elements

## Design References
- Form inputs: glass-panel styling
- Button: primary variant for submit
- Section: .section-space padding
Reference: DESIGN_SYSTEM.md § Effects → Glassmorphism

## Quality Checklist
- [ ] Email visible without form interaction
- [ ] Resume download link present
- [ ] Form validates before submission
- [ ] Success/error states handle gracefully
- [ ] All inputs have visible labels
- [ ] Form is keyboard navigable
- [ ] Responsive two-column → single-column layout
