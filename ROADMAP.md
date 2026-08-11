# ROADMAP.md

Version: 1.0

Project: Pritish Kumar Panda Portfolio

---

# Vision

A world-class engineering portfolio that generates interview opportunities through premium design, clear communication, and verifiable technical depth.

See PORTFOLIO.md for the full product vision.

---

# Phase History

## Phase 0 — Foundation (Completed)

Established the initial portfolio with:

- Next.js 15 App Router frontend with TypeScript
- Express backend with MongoDB, Redis, and AI chat
- Tailwind CSS + Framer Motion + GSAP animation system
- Component architecture (ui, layout, sections, effects, providers)
- Single-page layout with hero, trust bar, projects, experience, skills, contact
- Contact form with email delivery
- Vercel deployment (frontend)
- Render deployment capability (backend)

## Phase 1 — Documentation Architecture (Completed)

Created the professional documentation system:

- AGENTS.md — AI behavioral contract
- PORTFOLIO.md — Product vision
- DESIGN_SYSTEM.md — Visual token system
- ARCHITECTURE.md — Technical blueprint
- COMPONENTS.md — Component registry
- CONTENT.md — Content strategy
- ANIMATIONS.md — Motion specifications
- PERFORMANCE.md — Performance budget
- ACCESSIBILITY.md — A11Y standards
- SEO.md — Search strategy
- ROADMAP.md — This document
- TODO.md — Task tracking
- PROMPTS/ — Reusable AI prompts

---

# Current Phase

## Phase 2 — Design Refinement

Goals:

- Refine visual design to match the premium, minimal, engineering-first aesthetic defined in PORTFOLIO.md and DESIGN_SYSTEM.md
- Improve recruiter scan speed (information hierarchy per PORTFOLIO.md § Information Hierarchy)
- Ensure all components meet accessibility standards (ACCESSIBILITY.md)
- Optimize performance to meet targets (PERFORMANCE.md)
- Verify SEO implementation (SEO.md)

---

# Future Phases

## Phase 3 — Content Polish

- Review and refine all project case studies
- Strengthen impact-focused language
- Optimize section messaging for recruiter clarity
- Add missing project screenshots or visual assets

## Phase 4 — Performance and Accessibility Audit

- Run comprehensive Lighthouse audit
- Fix any accessibility violations
- Optimize bundle size
- Review animation performance
- Test on real mobile devices

## Phase 5 — Advanced Features (Evaluate)

- Blog integration (evaluate need vs. complexity)
- Dark/light theme toggle (evaluate vs. dark-only simplicity)
- Analytics integration (privacy-conscious)
- Enhanced AI chat capabilities

---

# Backlog

Ideas under consideration. Not committed to any phase.

- Custom domain setup
- Project screenshot automation
- Animated project preview surfaces
- Performance monitoring dashboard
- A/B testing on hero messaging
- Internationalization

---

# Deferred

Features explicitly not being built. With reasoning.

| Feature | Reason |
|---|---|
| Light mode | Dark-only maintains brand consistency and reduces maintenance |
| Blog | Portfolio is conversion-focused, not content-marketing-focused |
| Complex page routing | Single-page is optimal for recruiter scan speed |
| Client-side analytics | Privacy concern; evaluate Vercel Analytics if needed |
| Multiple themes | Over-engineering for a single-user portfolio |

---

# References

| Document | Relationship |
|---|---|
| PORTFOLIO.md | Strategic product vision |
| TODO.md | Current tactical task list |
| AGENTS.md | Quality standards for all work |
