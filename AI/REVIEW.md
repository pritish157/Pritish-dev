# Self-Review Protocol & Quality Check (`AI/REVIEW.md`)

## 1. Metadata
- **Purpose**: Standardized self-review guide executed by AI working agents before declaring any task complete or submitting code changes.
- **Owner**: AI Quality Lead.
- **Update Trigger**: Updated when new compliance rules or quality gates are added to the repository.

## 2. Permitted Contents
- Self-review steps for Phase 4 Review.
- Quality checklist items (responsiveness, accessibility, performance, types, linting).
- Code smell patterns to avoid.

## 3. Forbidden Contents
- Specific session logs (use `AI/CHANGELOG.md`).
- Project plan timelines (use `MASTER_PLAN.md`).

## 4. Usage Rules for AI Agents
Agents MUST complete all items in `AI/REVIEW.md` prior to handing off work or concluding a session turn.

## 5. Relationship to Core Documents
- **Relationship to `AGENTS.md`**: Directly executes `AGENTS.md § Phase 4 — Review` and `Review Checklist`.
- **Relationship to `MASTER_PLAN.md`**: Enforces compliance with `MASTER_PLAN.md § Quality Gates`.

---

# AI Self-Review Checklist

### 1. Code Integrity & Types
- [ ] `npm run typecheck` (`tsc --noEmit`) passes cleanly with **0 errors**.
- [ ] `npm run lint` (`eslint .`) passes cleanly with **0 warnings / 0 errors**.
- [ ] All props and variables have explicit TypeScript interfaces/types. No `any` casting.
- [ ] No unused imports, dead code, or magic numbers left in components.

### 2. Responsiveness & Layout
- [ ] Tested layout reflow across mobile (375px), tablet (768px), desktop (1024px), and ultrawide (1440px+).
- [ ] Mobile dock appears on `<1024px` with safe area padding (`env(safe-area-inset-bottom)`).
- [ ] Zero horizontal overflow / scrollbar bugs (`overflow-x-clip` enforced on body).

### 3. Accessibility & Keyboard Flow
- [ ] Keyboard tab navigation flows logically top-to-bottom.
- [ ] All interactive elements feature visible focus rings (`focus-visible:ring-2 focus-visible:ring-violet-400/60`).
- [ ] Modal dialogs trap keyboard focus and dismiss on `Escape`.
- [ ] Form submission notices announce via `aria-live="polite"`.

### 4. Performance & Motion
- [ ] Continuous marquee ticker runs off main JS thread using CSS `@keyframes`.
- [ ] Heavy below-the-fold sections use `next/dynamic` lazy loading.
- [ ] `prefers-reduced-motion: reduce` suppresses smooth scrolling and continuous motion.
