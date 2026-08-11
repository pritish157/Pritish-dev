# Code Review Checklist (`AI/CHECKLISTS/code_review_checklist.md`)

Execute this checklist for every pull request or feature completion prior to merging into `main`.

- [ ] **Data Architecture**: All text, metrics, and URLs consume `frontend/lib/data/portfolio.ts` SSOT.
- [ ] **Component Standards**: Reused existing primitives in `components/ui/`; zero duplicated components.
- [ ] **Type Safety**: Strictly typed TypeScript props and interfaces. Zero `any` types.
- [ ] **Design Token Compliance**: CSS variables (`--background`, `--primary`) used via Tailwind classes. Zero hardcoded colors.
- [ ] **Accessibility (WCAG AA)**: Logical tab order, visible focus rings, ARIA labels on icon buttons, screen reader status announcements.
- [ ] **Performance Budget**: GPU-only animations (`transform`, `opacity`), dynamic section imports, initial bundle <150KB gzipped.
- [ ] **Validation Commands**: `npm run typecheck` and `npm run lint` execute cleanly with 0 errors.
