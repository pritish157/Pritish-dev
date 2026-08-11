# Homepage — AI Implementation Prompt

## Context
The portfolio is a single-page application. This prompt covers the full page composition.
Reference: PORTFOLIO.md § Page Goals

## Section Order
1. TopNav (fixed)
2. HeroSection (#profile)
3. TrustBar
4. FeaturedProjects (#projects) — dynamic import
5. ExperienceSection (#experience)
6. SkillsSection (#skills) — dynamic import
7. ContactSection (#contact) — dynamic import
8. SiteFooter
9. MobileDock (mobile only)

## Layout Rules
- Max content width: 1200px (max-w-7xl mx-auto)
- Section spacing: py-24 px-4 sm:px-6 (.section-space)
- Scroll margin: 7rem on [id] elements
- Background: layered (base → mesh → grid → noise)

## Performance
- Sections 4, 6, 7 are dynamically imported (See PERFORMANCE.md § Code Splitting)
- Effects are wrapped in SiteProviders

## Quality Checklist
- [ ] All sections render in correct order
- [ ] Section anchors work from navigation
- [ ] Scroll margin accounts for fixed nav
- [ ] Dynamic imports load without layout shift
- [ ] JSON-LD structured data present
- [ ] Mobile dock tracks active section
