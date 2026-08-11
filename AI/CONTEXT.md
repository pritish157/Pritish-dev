# AI Context & Knowledge Base (`AI/CONTEXT.md`)

## 1. Metadata
- **Purpose**: Provides incoming AI agents with an instant high-level technical summary of the codebase environment, technology stack, directory structure, and active architecture patterns.
- **Owner**: AI Technical Lead / Architect Subagent.
- **Update Trigger**: Updated whenever major architectural changes, dependency additions, or directory restructurings occur.

## 2. Permitted Contents
- Technical stack versions (Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS 3.4, Node.js 20, Express, MongoDB Atlas, Redis).
- Monorepo directory map (`frontend/app/`, `frontend/components/`, `frontend/lib/`, `backend/src/`).
- Active hosting environments (Vercel frontend serverless edge, Render Express API backend).
- Active design system tokens (`--background: #050816`, `--primary: #8B5CF6`).

## 3. Forbidden Contents
- Temporary session notes or WIP task checklists (use `AI/SESSION.md`).
- Specific bug tracebacks (use `AI/BUGS.md`).
- Raw source code snippets or duplicate component specs (reference `COMPONENTS.md` & `ARCHITECTURE.md`).

## 4. Usage Rules for AI Agents
Agents must inspect this file immediately after `AGENTS.md` to understand system context without needing to scan every single directory.

## 5. Relationship to Core Documents
- **Relationship to `AGENTS.md`**: Enforces strict adherence to the defined architecture and prevents AI hallucination.
- **Relationship to `MASTER_PLAN.md`**: Serves as the technical state reference for the current development phase.

---

## 6. Current Technical Context Summary
- **Frontend**: Next.js 15 App Router (`frontend/app/`), Single-Page Application (SPA) anchor layout, static SSR shell with dynamic dynamic section loading for below-the-fold surfaces.
- **Backend**: Hardened Express API (`backend/server.js`) with Mongoose Atlas connection pooling, 90-day TTL index on messages, ioredis cache with graceful fallback, Pino logging, Nodemailer email transport, and dual RAG / OpenAI `gpt-4o-mini` assistant endpoints.
- **Data Source**: Single Source of Truth in `frontend/lib/data/portfolio.ts`.
