# SEO.md
Version: 1.0
Project: Pritish Kumar Panda Portfolio

---

# SEO Strategy

The primary goal of this SEO strategy is to establish search dominance for name-based queries ("Pritish Kumar Panda", "Pritish Kumar Panda portfolio", "Pritish Kumar Panda developer") so technical recruiters, hiring managers, and interviewers can instantly locate the official portfolio.

Secondary goals include delivering pixel-perfect, high-signal social media previews across Twitter, LinkedIn, and Facebook, and ensuring flawless technical indexability for search engine crawlers.

For positioning alignment and brand identity, see PORTFOLIO.md § Brand Identity.

---

# Meta Tags

The document head metadata controls indexing directives, browser theme integration, and baseline search engine snippet generation.

## Specification & Target Values
- **Title Pattern**: `"Pritish Kumar Panda — Backend Engineer With Full-Stack Depth"`
- **Description**: Sourced from `siteConfig.description` in `frontend/lib/data/portfolio.ts` ("Premium portfolio of Pritish Kumar Panda, a frontend engineer with full-stack depth building modern product systems with Next.js, React, Node.js, realtime workflows, security-minded architecture, and AI-ready interaction design.")
- **Canonical URL**: `https://pritish-dev.vercel.app`
- **Viewport**: `width=device-width, initial-scale=1`
- **Theme Color**: `#050816` (matching background color in `frontend/public/site.webmanifest` and design tokens)

## Current Implementation (`frontend/app/layout.tsx`)
- **Implemented**: `metadataBase` is set to `new URL(siteConfig.siteUrl)`.
- **Implemented**: `title` resolves to `${siteConfig.name} | ${siteConfig.role}` using Next.js Metadata API.
- **Implemented**: `description` dynamically binds to `siteConfig.description`.
- **Implemented**: `viewport` configuration exports `themeColor: "#050816"` and `colorScheme: "dark"`. Next.js automatically generates the responsive viewport tag (`width=device-width, initial-scale=1`).
- **Implemented**: Manifest reference pointing to `/site.webmanifest`.
- **Note**: The current title string format in `layout.tsx` uses a pipe delimiter (`|`), whereas the target standard uses an em dash (`—`). Title delimiter consistency should be maintained across single-page routes.

---

# Open Graph

Open Graph (OG) and Twitter Card tags govern how the portfolio appears when shared across social channels, messaging applications, and professional networks.

## Specification & Image Standards
- **og:title**: `"Pritish Kumar Panda — Backend Engineer With Full-Stack Depth"`
- **og:description**: Sourced from `siteConfig.description`
- **og:url**: `https://pritish-dev.vercel.app`
- **og:type**: `"website"`
- **og:site_name**: `"Pritish.dev"`
- **og:locale**: `"en_US"`
- **Image Spec**: 1200×630px, PNG format, <1MB payload size, maintaining dark-mode visual hierarchy.
- **Twitter Card**: `summary_large_image`

## Current Implementation (`frontend/app/layout.tsx`)
- **Implemented**: `openGraph` object in `layout.tsx` contains `title`, `description`, `url`, `siteName`, `locale`, `type: "website"`, and `images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "..." }]`.
- **Implemented**: `twitter` object in `layout.tsx` defines `card: "summary_large_image"`, `title`, `description`, and `images: ["/og-image.png"]`.
- **Asset Status**: `og-image.png` exists in `frontend/public/og-image.png`.
- **Requirement**: All OG title, description, and preview text must stay identical in intent and substance to visible page hero content.

---

# Structured Data

Structured data provides search engines with unambiguous machine-readable JSON-LD schemas representing entity identity, role, contact capabilities, and external profiles.

## Target Schemata

### 1. Person Schema
- **@context**: `"https://schema.org"`
- **@type**: `"Person"`
- **name**: `"Pritish Kumar Panda"`
- **jobTitle**: `"Backend Engineer With Full-Stack Depth"`
- **url**: `"https://pritish-dev.vercel.app"`
- **email**: `"pritishpanda157@gmail.com"`
- **sameAs**: Array containing GitHub (`https://github.com/pritish157`) and LinkedIn (`https://www.linkedin.com/in/pritish-kumar-panda-dev/`) URLs.

### 2. WebSite Schema
- **@context**: `"https://schema.org"`
- **@type**: `"WebSite"`
- **name**: `"Pritish Kumar Panda Portfolio"`
- **url**: `"https://pritish-dev.vercel.app"`

## Current Implementation (`frontend/app/page.tsx`)
- **Implemented**: `page.tsx` embeds JSON-LD `Person` schema via `<script type="application/ld+json">`.
- **Implemented**: `sameAs` array explicitly includes verified GitHub and LinkedIn URLs from `siteConfig`.
- **Gap / Action Item**: WebSite schema can be appended alongside Person schema to explicitly declare site identity to search engine indexers.
- **Maintenance Rule**: JSON-LD entities must always read dynamically from `siteConfig` in `frontend/lib/data/portfolio.ts` to ensure data synchronization.

---

# Heading Hierarchy

Semantic heading structures ensure search engine bots and screen readers can parse page architecture accurately without ambiguity.

## Structural Rules
1. **Single `<h1>` Per Page**: Dedicated exclusively to the main hero headline ("Building AI-era frontends with production-grade systems underneath.") in `HeroSection`.
2. **Section Headings (`<h2>`)**: Every main layout section (`#projects`, `#experience`, `#skills`, `#contact`) must use an `<h2>` tag (e.g., "Featured Systems", "Engineering Experience", "Skills & Capabilities", "Get in Touch").
3. **Subsection Headings (`<h3>`)**: Individual project titles (e.g., "Aradhana AstroAgent", "Knot of Love") and skill domain headers must use `<h3>` tags.
4. **No Level Skipping**: Never skip heading levels (e.g., jumping from `<h1>` directly to `<h3>`).
5. **Semantic Integrity**: Headings must contain descriptive search-relevant text, never empty or purely decorative styling wrappers.

For guidelines on heading phrasing quality, see CONTENT.md § Writing Rules.

---

# Content SEO

Content must balance high search engine visibility with recruiter readability, avoiding artificial keyword packing.

## Guidelines
- **Image Accessibility & Alt Text**: All meaningful images (project preview cards, architecture graphics) must provide descriptive `alt` attributes containing project titles and key details. Decorative background elements and glowing blur overlays must use `aria-hidden="true"`.
- **Descriptive Hyperlink Text**: Hyperlinks must state destination context explicitly (e.g., "Explore Aradhana AstroAgent on GitHub" or "Launch Knot of Love live demo"). Generic anchor text like "click here" or "link" is prohibited.
- **Natural Keyword Integration**: Primary search terms ("Pritish Kumar Panda", "Backend Engineer", "Full-Stack Depth", "Next.js 15", "Node.js", "LangGraph.js", "TypeScript") must appear naturally within hero text, project descriptions, and skill groups.
- **Keyword Stuffing Ban**: Keywords must never be artificially repeated or hidden in text/CSS.

---

# Technical SEO

Technical SEO guarantees that search engine bots can discover, crawl, parse, and evaluate page assets efficiently.

## Core Technical Standards
- **Sitemap (`frontend/public/sitemap.xml`)**: Formatted per Sitemaps XML protocol 0.9. Includes the canonical URL (`https://pritish-dev.vercel.app/`), `<lastmod>` timestamp, `<changefreq>weekly</changefreq>`, and `<priority>1.0</priority>`.
- **Robots Directives (`frontend/public/robots.txt`)**: 
  - `User-agent: *`
  - `Allow: /`
  - `Disallow: /api/`
  - `Host: https://pritish-dev.vercel.app`
  - `Sitemap: https://pritish-dev.vercel.app/sitemap.xml`
- **Canonical URLs**: Next.js `metadataBase` configuration in `RootLayout` forces absolute canonical link header generation across all rendered pages.
- **Duplicate Content Avoidance**: Single canonical domain (`https://pritish-dev.vercel.app`) prevents duplicate indexing between preview deployments and production domain.
- **Performance Impact**: High Core Web Vitals directly improve search rankings and crawl budget efficiency. For performance targets, see PERFORMANCE.md § Core Vitals & Optimization.
- **Mobile Responsiveness**: Fully responsive layout optimized across mobile, tablet, desktop, and ultrawide viewports.

For URL architecture and route layout, see ARCHITECTURE.md § Routing.

---

# Social Preview Testing

Social media preview generation must be verified using platform validation tools prior to major design updates.

## Verification Tools
- **X / Twitter Card Validator**: `https://cards-dev.twitter.com/validator`
- **Facebook Sharing Debugger**: `https://developers.facebook.com/tools/debug/`
- **LinkedIn Post Inspector**: `https://www.linkedin.com/post-inspector/`

## Testing Checklist
1. Verify `og:title` renders clearly without truncated text.
2. Verify `og:description` conveys the target engineering role and stack within 2 lines.
3. Verify `og-image.png` (1200×630px) loads instantly with high visual clarity and zero aspect-ratio distortion.
4. Confirm no cached legacy images persist by triggering a cache purge via platform debuggers when updating static image assets.

---

# Maintenance

SEO data requires active synchronization whenever portfolio content or infrastructure changes.

## Maintenance Triggers & Actions
- **Role or Positioning Update**: Update `siteConfig.role` and `siteConfig.description` in `frontend/lib/data/portfolio.ts`. Metadata in `layout.tsx` and structured data in `page.tsx` update automatically.
- **Visual Design Overhaul**: Regenerate and replace `frontend/public/og-image.png` (1200×630px) to mirror current theme aesthetics.
- **Route Additions or Changes**: Update `frontend/public/sitemap.xml` to include any new indexable static routes or dynamic paths.
- **Social Profile Changes**: Update `sameAs` array links in `siteConfig` to preserve structured data entity accuracy.

---

# References

- See PORTFOLIO.md § Brand Identity
- See CONTENT.md § Writing Rules
- See PERFORMANCE.md § Core Vitals & Optimization
- See ARCHITECTURE.md § Routing
