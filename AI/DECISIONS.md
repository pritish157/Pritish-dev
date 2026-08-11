# Architecture Decision Records — ADRs (`AI/DECISIONS.md`)

## 1. Metadata
- **Purpose**: Records key architectural, design, and technical decisions made during the project, along with context, rationale, trade-offs, and alternatives rejected. Prevents future AI agents from re-proposing poor or rejected technical solutions.
- **Owner**: AI Lead Architect.
- **Update Trigger**: Updated whenever a significant technical or architectural decision is finalized.

## 2. Permitted Contents
- Decision title, status (`ACCEPTED` / `REJECTED` / `SUPERSEDED`), and timestamp.
- Technical context and problem statement.
- Chosen solution and engineering rationale.
- Trade-offs considered and rejected alternatives with explanation.

## 3. Forbidden Contents
- Daily commit logs or minor refactoring notes (use `AI/CHANGELOG.md`).
- Raw code snippets or temporary task lists (use `AI/SESSION.md`).

## 4. Usage Rules for AI Agents
Before proposing major refactors or structural changes, AI agents MUST check `AI/DECISIONS.md` to avoid re-introducing rejected designs or breaking established architectural patterns.

## 5. Relationship to Core Documents
- **Relationship to `AGENTS.md`**: Implements `AGENTS.md § Core Principles` and `Decision Hierarchy`.
- **Relationship to `MASTER_PLAN.md`**: Provides historical justification for technical choices in `MASTER_PLAN.md`.

---

# Recorded ADRs

### ADR-001: Next.js 15 App Router Monorepo over Vite SPA Setup
- **Status**: `ACCEPTED` (2026-08-01)
- **Context**: The repository initially contained a legacy Vite React setup (`frontend/src/`) alongside Next.js 15 (`frontend/app/`).
- **Decision**: Purge legacy Vite SPA files (`frontend/src/` and `vite.config.js`) and standardize 100% on Next.js 15 App Router.
- **Rationale**: Next.js 15 provides native Server Components, image optimization, Route Handlers, automatic code splitting, and superior SEO capabilities required for Lighthouse ≥95 scores.
- **Rejected Alternative**: Maintaining dual Vite/Next.js setup was rejected due to build complexity, code duplication, and confusion for AI agents.

### ADR-002: Single Source of Truth (SSOT) Data Architecture
- **Status**: `ACCEPTED` (2026-08-01)
- **Context**: Portfolio content, project case study metrics, and links could be hardcoded across component JSX or centralized.
- **Decision**: All content MUST be exported from `frontend/lib/data/portfolio.ts`. No text or metrics may be hardcoded inside components.
- **Rationale**: Guarantees zero data drift between page sections, case study dialogs, and JSON-LD schemas. Makes updating portfolio content instantaneous.

### ADR-003: Pure CSS Keyframe Marquees & Motion Performance Cap
- **Status**: `ACCEPTED` (2026-08-01)
- **Context**: Infinite marquee tickers and ambient backgrounds can cause JS main thread frame drops.
- **Decision**: Marquee tickers MUST use pure CSS `@keyframes marquee` animations on GPU-accelerated `transform`. Framer Motion is restricted to layout mount reveals (`SectionReveal`).
- **Rationale**: Ensures continuous 60fps scrolling off the main JavaScript thread, respecting the performance budget in `PERFORMANCE.md`.
