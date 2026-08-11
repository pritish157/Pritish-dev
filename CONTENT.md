# CONTENT.md

Version: 1.0

Project: Pritish Kumar Panda Portfolio

---

# Content Philosophy

Content drives design. Words come before visuals.

Every word on the portfolio must earn its place. If removing a sentence improves clarity, remove it.

The portfolio speaks to recruiters who scan, hiring managers who evaluate, and technical interviewers who verify. Every piece of text serves at least one of these audiences.

---

# Tone of Voice

## Character

Confident. Not arrogant.

Technical. Not jargon-heavy.

Minimal. Not empty.

Direct. Not blunt.

Professional. Not corporate.

Specific. Not vague.

## Examples

Good: "Built secure authentication with JWT and role-based access control."

Bad: "Used Express and MongoDB."

Good: "Realtime messaging with read receipts and presence-aware feedback."

Bad: "Implemented a chat feature using Socket.IO."

Good: "3-node stateful agent graph with 4-step loop safeguard."

Bad: "Built an AI chatbot."

## Anti-Patterns

Never use:

- "Passionate about technology"
- "Fast learner"
- "Team player"
- "Hard worker"
- Buzzwords without substance
- Superlatives without evidence ("best", "amazing", "incredible")
- Self-deprecation ("just a student", "simple project")
- Filler phrases ("In today's world", "As we all know")

---

# Writing Rules

## Headlines

Maximum: 6–8 words.

Style: action-oriented, outcome-focused.

One or two key words may use gradient text emphasis.

Examples:

- "I Build Systems That Ship."
- "Featured Work"
- "Experience Arc"
- "Core Stack"

## Eyebrow Badges

Style: uppercase, wide letter-spacing, accent color.

Purpose: category label above a heading.

Examples: `FEATURED WORK`, `BACKEND ENGINEER`, `AGENTIC AI`, `REALTIME PLATFORM`

Maximum: 2–3 words.

## Section Subtitles

Maximum: 1 sentence.

Purpose: provide context for the section heading without repeating it.

## Body Text

Maximum: 2 sentences per block.

Front-load the most important information.

Use active voice.

Avoid passive constructions.

## Project Descriptions

Show impact, not just technology.

Structure: what was built → why it matters → what it proves.

See AGENTS.md § Content Rules and § Project Standards for the required project fields.

## Metric Presentation

Format: value first, label second.

Examples: "03 Flagship systems", "58+ Product endpoints", "40+ API routes"

Use leading zeros for single digits (03, not 3) for visual consistency.

---

# Section Content Goals

Each section must deliver a specific message to a recruiter.

## Hero

Message: "I am [name], I do [capability], you should [action]."

Must contain:

- Full name
- Role definition
- One-line value proposition
- Primary call-to-action
- Availability status

Must not contain:

- Long biography
- Technology lists (that's the trust bar's job)
- Project details (that's the projects section's job)

## Trust Bar

Message: "Here is proof of my technical stack and availability."

Must contain:

- Tech stack ticker (tool names only, no descriptions)
- Key credibility metrics
- Availability signal

Must not contain:

- Descriptions of what each technology does
- Self-assessed proficiency levels

## Featured Projects

Message: "I have shipped real software. Here is the evidence."

Each project must contain:

- Eyebrow category badge
- Project title
- One-sentence impact summary
- Tech stack tags
- Link to live demo and/or GitHub
- Case study with: challenge, architecture, outcome

Must not contain:

- Tutorial-style explanations
- Self-assessed difficulty ratings
- Fabricated user counts or traffic numbers

## Experience

Message: "This is my career trajectory and current positioning."

Must contain:

- Current professional focus
- Timeline of key career phases
- Positioning statement (what kind of engineer I am)

Must not contain:

- Fabricated job titles
- Fabricated company names
- Invented metrics or performance reviews

## Skills

Message: "These are the engineering domains I cover."

Must contain:

- Skills grouped by domain (Frontend, Backend, AI/ML, Databases, DevOps, Tools)
- Domain title and brief description
- Technology names within each domain

Must not contain:

- Proficiency percentages or progress bars
- Star ratings
- Self-assessed skill levels

## Contact

Message: "Here is how to reach me. It is easy."

Must contain:

- Email address
- Location and timezone
- Link directory (GitHub, LinkedIn, Resume)
- Contact form

Must not contain:

- Marketing copy
- Pressure tactics
- Unnecessary form fields

---

# Content Data Source

The single source of truth for all portfolio content is:

`frontend/lib/data/portfolio.ts`

This file contains:

- Site configuration (name, role, headline, email, links)
- Navigation items
- Quick access links
- Hero signals
- Credibility metrics
- Trust pills (tech stack)
- Featured projects (all fields)
- Experience timeline
- Skill groups
- Contact reasons
- Social links

Content is never hardcoded in components. Components read from this data file.

To update content: modify `portfolio.ts`. Never edit component JSX to change text.

---

# The Never-Assume Policy

Reference: AGENTS.md § Never Assume

The following must never be fabricated:

- Job titles
- Company names
- Employment dates
- User counts
- Traffic numbers
- Revenue figures
- Performance benchmarks
- Test coverage percentages
- Awards or certifications
- Optimization metrics

If information is needed but missing, ask the project owner.

Do not guess.

Do not extrapolate.

Do not infer from project complexity.

---

# Content Review Checklist

Before any content is published, verify:

- [ ] Factually accurate (no fabricated claims)
- [ ] Concise (no unnecessary words)
- [ ] Recruiter-valuable (answers a hiring question)
- [ ] Original (not copied from another portfolio)
- [ ] Consistent tone (matches voice guidelines)
- [ ] Front-loaded (most important info first)
- [ ] Active voice (no passive constructions)
- [ ] Accessible (clear language, no unexplained acronyms)

---

# References

| Document | Relationship |
|---|---|
| PORTFOLIO.md | Target audience and information hierarchy |
| AGENTS.md § Content Rules | Project description standards |
| AGENTS.md § Never Assume | Fabrication policy |
| COMPONENTS.md | Components that render content |
| portfolio.ts | Single source of truth for content data |
