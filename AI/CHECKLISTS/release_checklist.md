# Production Release Checklist (`AI/CHECKLISTS/release_checklist.md`)

Execute this checklist prior to triggering a production release to Vercel and Render.

- [ ] **Typecheck & Lint**: `npm run typecheck` and `npm run lint` pass with 0 errors.
- [ ] **Backend Tests**: `npm test --prefix backend` passes with 100% test suite success.
- [ ] **Lighthouse Audit**: Lighthouse score ≥95 across Performance, Accessibility, Best Practices, SEO.
- [ ] **SEO Verification**: `sitemap.xml`, `robots.txt`, `Person` and `WebSite` JSON-LD schemas validated. Title metadata uses em dash delimiter (`—`).
- [ ] **Mobile & Cross-Browser Audit**: Verified on Chrome, Safari (iOS), Firefox, Edge, and 375px mobile viewports.
- [ ] **Environment Configuration**: Production environment variables set on Vercel and Render (`EMAIL_USER`, `EMAIL_PASS`, `MONGO_URI`, `REDIS_URL`).
- [ ] **Documentation Update**: `AI/CHANGELOG.md` and `AI/SESSION.md` updated with release notes and git hash tag.
