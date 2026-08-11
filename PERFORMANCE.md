# PERFORMANCE.md
Version: 1.0
Project: Pritish Kumar Panda Portfolio

---

# Performance Targets

| Metric | Target | Priority |
|---|---|---|
| Lighthouse Overall | ≥95 | Critical |
| LCP | <2.5s | Critical |
| CLS | <0.1 | Critical |
| INP | <200ms | High |
| FCP | <1.8s | High |
| Total Blocking Time | <200ms | High |

---

# JavaScript Budget

- **Total First-Load JS Budget**: Target `<150KB` gzipped across initial entry bundle.
- **Per-Route Considerations**: As a single-page application built on Next.js 15 App Router, initial page load must prioritize critical above-the-fold content (`HeroSection`, `TrustBar`, `TopNav`).
- **Third-Party JS Policy**: Minimize third-party script reliance. Every candidate script must be evaluated for bundle cost, render-blocking impact, and privacy footprint prior to integration.
- **Current Dynamic Imports**: Heavy below-the-fold sections are dynamically imported via `next/dynamic` to keep initial bundle size within target thresholds:
  - `FeaturedProjects` (`components/sections/featured-projects.tsx`)
  - `SkillsSection` (`components/sections/skills-section.tsx`)
  - `ContactSection` (`components/sections/contact-section.tsx`)

---

# Image Optimization

- **Format Priority**:
  - SVG for icons, logos, and resolution-independent illustrations.
  - WebP / AVIF for bitmap photos and graphics (configured in `frontend/next.config.ts`).
- **Maximum Dimensions & Quality Settings**:
  - High-density raster assets capped at `1200x630` (e.g. `og-image.png`).
  - Image quality configured for optimal compression balance (80–85%) via Next.js image optimization pipeline.
- **Optimization Directive**: Always use `next/image` or equivalent optimization wrappers to benefit from responsive `srcset`, automatic format negotiation, and layout shift prevention.
- **Lazy Loading**: Native `loading="lazy"` for all below-fold images; set `priority` attribute only on critical above-fold hero images.
- **Blur Placeholders**: Enable low-quality image placeholder (LQIP) blur effect for hero images where applicable to minimize perceived load latency.
- **Current Static Assets**:
  - `favicon.svg` (vector icon)
  - `icons.svg` (sprite sheet)
  - `og-image.png` (social media preview card)
  - `resume PDF` (static document asset served with long-term cache headers)

---

# Font Loading Strategy

- **Native Font Optimization**: Use `next/font` for automatic optimization, zero layout shift, and self-hosted delivery (currently `Space_Grotesk` via `next/font/google` in `frontend/app/layout.tsx`).
- **External CDN Fonts**: Fonts loaded via external CDN (General Sans, Satoshi via Fontshare CDN in `frontend/app/globals.css`) must specify `display=swap` (`font-display: swap`) to prevent Flash of Invisible Text (FOIT).
- **Family Limit**: Restrict active typography stack to a maximum of 2–3 font families (`Space Grotesk`, `General Sans`, `Satoshi`).
- **Weight Preloading**: Preload critical font weights (`400`, `500`, `600`, `700`) only to prevent unnecessary network overhead.

---

# Code Splitting

- **Route-Based Splitting**: Handled automatically by the Next.js 15 App Router architecture.
- **Component-Level Splitting**: Use `next/dynamic` lazy loading for heavy component sections containing complex DOM trees, heavy visual libraries, or interactive logic.
- **Current Split Points** (in `frontend/app/page.tsx`):
  - `FeaturedProjects`: Dynamic import with section loading fallback shell.
  - `SkillsSection`: Dynamic import with section loading fallback shell.
  - `ContactSection`: Dynamic import with section loading fallback shell.
- **Evaluation Threshold**: Evaluate any component or section exceeding `>50KB` uncompressed for component-level dynamic import.

---

# Animation Performance

- **GPU-Only Properties**: Limit CSS keyframe animations and Framer Motion / GSAP transitions strictly to GPU-accelerated properties (`transform`, `opacity`).
- **Forbidden Layout Properties**: Never animate properties that trigger browser layout re-calculation or repaints: `width`, `height`, `top`, `left`, `margin`, `padding`.
- **Concurrency Cap**: Maximum of `5-6` active concurrent animations on screen to preserve a smooth `60fps` frame rate.
- **Low-Power & Mobile Strategy**: Disable non-essential ambient motion or parallax effects on low-power and mobile devices.
- **Reduced Motion Support**: Respect `prefers-reduced-motion: reduce` by disabling decorative motion and setting animation durations to near-zero (See `frontend/app/globals.css`).
- **Marquee Ticker**: CSS-only animation loop without JavaScript execution.
- **Cursor Glow**: Disabled or hidden on touch-enabled and mobile devices.
- **Reference**: See ANIMATIONS.md § Performance Rules

---

# Third-Party Dependencies

## Evaluation Criteria

Before adding any dependency:
1. Is there a native/built-in alternative?
2. What is the bundle size impact?
3. Is it tree-shakeable?
4. Is it actively maintained?
5. Can the functionality be built in <50 lines?

## Current Critical Dependencies

| Dependency | Purpose | Category |
|---|---|---|
| `framer-motion` | Page and component enter/exit animations and gesture hooks | UI Animation |
| `gsap` | Complex scroll-triggered and timeline visual sequences | UI Animation |
| `lenis` | Smooth scrolling physics normalization | Scroll Experience |
| `@radix-ui/react-dialog` | Unstyled accessible modal and overlay primitives | UI Primitive |

*Note: Audit dependencies periodically to identify and remove unused packages.*

---

# Server Components

- **Server-First Approach**: Prefer Server Components by default to ship zero client JS for static layout and markup.
- **Selective Interactivity**: Use `'use client'` strictly at the leaf component level when interactivity, state, or browser APIs are required.
- **Current Client Components**: Sections, effects, and interactive UI components requiring animations, scroll hooks, or state management (`components/sections/*`, `components/effects/*`, `components/providers/*`).
- **Server-Rendered Content**: Static elements (such as `SiteFooter`, navigation markup structure, and schema metadata) should remain server-rendered.

---

# Monitoring

- **Lighthouse CI**: Run Lighthouse CI audits before every deployment to enforce score thresholds.
- **Animation Profiling**: Use Chrome DevTools Performance panel for animation profiling and long-task analysis (`>50ms`).
- **Bundle Analysis**: Check bundle analyzer periodically via `npx @next/bundle-analyzer` to track client bundle size distribution.
- **Real User Monitoring**: Monitor Core Web Vitals (LCP, CLS, INP) via Vercel Analytics (if enabled).

---

# Anti-Patterns

Never:
- Import entire libraries when only one function is needed.
- Use synchronous layout-triggering animations or measure layout synchronously during frames.
- Load fonts synchronously without `font-display: swap`.
- Use unoptimized images (`<img />` without dimensions or optimization attributes).
- Add polyfills for modern browsers only.
- Use `setInterval` for animations (use `requestAnimationFrame` or CSS keyframe animations).
- Render heavy components on server and client (pick one).

---

# References

- AGENTS.md § Performance
- ARCHITECTURE.md § Build and Deploy
- ANIMATIONS.md § Performance Rules
- ACCESSIBILITY.md § Motion Sensitivity
