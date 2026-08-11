# ACCESSIBILITY.md
Version: 1.0
Project: Pritish Kumar Panda Portfolio

---

# Accessibility Standard
Target: WCAG 2.1 Level AA

Accessibility is a mandatory engineering requirement for the portfolio, not an optional post-launch enhancement. Every interactive component, design token, navigation flow, and dynamic state must comply with WCAG 2.1 Level AA standards. This ensures equal utility and seamless operation for users relying on keyboard navigation, screen readers, low-vision contrast settings, or reduced motion preferences. (See AGENTS.md § Accessibility).

---

# Keyboard Navigation
- **Logical Tab Order**: Keyboard tab flow follows a deterministic, top-to-bottom reading sequence: Skip link → TopNav / Header → Hero Call-to-Action → Main Sections (`#profile`, `#projects`, `#experience`, `#skills`, `#contact`) → MobileDock (on mobile viewports) → Footer. Explicit positive `tabindex` values (`tabindex > 0`) are strictly prohibited.
- **Focus Trap Rules**: Overlay dialogs (such as modal case study views built with `@radix-ui/react-dialog`) and the mobile navigation drawer must trap focus within the active container. Tabbing past the final interactive element loops focus back to the first. Focus traps release automatically upon overlay dismissal.
- **Skip-to-Content Link Requirement**: A hidden skip link (`<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>`) must exist as the first focusable element in the DOM, allowing keyboard-only users to bypass repetitive header navigation.
- **Escape Key Overlay Closure**: Pressing the `Escape` key must immediately close open modal overlays (`DialogContent`) and the mobile navigation drawer, restoring focus to the trigger control.

---

# Focus Management
- **Visible Focus Indicator Style**: All interactive controls (buttons, links, form inputs, toggle icons) must render a distinct focus ring on keyboard interaction. The standardized focus ring token defined in `Button` (`frontend/components/ui/button.tsx`) is:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black`.
- **Focus Restoration**: Closing a modal dialog (`Dialog`) or mobile navigation menu MUST programmatically restore focus to the element that triggered it (e.g., project card trigger or mobile toggle button `aria-expanded`). Radix UI primitives manage focus history automatically.
- **No Focus Loss During Dynamic Content Updates**: Asynchronous UI actions (such as form submission responses, section filtering, or dynamic data updates) must never reset keyboard focus to `document.body`. Focus must be explicitly moved to the newly presented content or maintained on the initiating control.

---

# Screen Readers
- **ARIA Landmark Structure**: Main layout sections must map to semantic ARIA landmarks: `<header>` (banner navigation), `<nav>` (navigation regions with distinct `aria-label` identifiers), `<main id="main-content">` (primary page container), `<section>` (content regions identified by `id` and `aria-label`), and `<footer>` (page closure).
- **ARIA Label Requirements for Icon-Only Buttons**: Any interactive control without visible text (such as the mobile menu toggle in `top-nav.tsx` or the modal close button in `dialog.tsx`) MUST feature an explicit text alternative via `aria-label` or an embedded `<span className="sr-only">`.
- **Live Regions for Form Submission Feedback**: Submission notices and validation status messages in forms (e.g., `contact-section.tsx`) must be wrapped in `aria-live="polite"` (or `role="status"`) with `aria-atomic="true"` to ensure screen readers announce status changes immediately.
- **Meaningful Alt Text for Images**: All informational images and media graphics must provide descriptive `alt` text explaining their visual content and context.
- **Decorative Elements Marked with aria-hidden**: Ambient light glows, background grid overlays, spotlight effects (`SpotlightCard`), and visual-only icons must be explicitly hidden from the accessibility tree using `aria-hidden="true"`.

---

# Semantic HTML
- **Required Element Mapping**:
  - Main top banner: `<header>`
  - Navigation regions: `<nav>`
  - Main content container: `<main>`
  - Page sections: `<section>` (with `id` and `data-nav-section`)
  - Standalone content modules or project cards: `<article>`
  - Page footer: `<footer>`
- **Heading Hierarchy**: Exactly one `<h1>` per page located in the Hero section establishing identity and role. Subsections follow sequential nesting (`<h2>` for main section titles, `<h3>` for card titles and sub-features). Skipping heading levels (e.g., `<h1>` directly to `<h3>`) is prohibited.
- **Lists for Navigation Items**: Navigation link sets in `<nav>` containers must use semantic list elements (`<ul>` and `<li>`) to expose item counts and position to screen readers.
- **Form Labels for All Inputs**: Every form input and textarea must be programmatically associated with a visible `<label>` using matching `htmlFor` and `id` attributes. Placeholder text must not serve as a replacement for form labels.

---

# Color and Contrast
- **Minimum Contrast Ratios (WCAG 2.1 Level AA)**:
  - Standard body text (`text-slate-300`, `text-slate-400` on dark canvas `#050816`): Minimum contrast ratio of 4.5:1.
  - Large text (18pt / 24px or 14pt bold, such as headings `text-white`): Minimum contrast ratio of 3:1.
  - See DESIGN_SYSTEM.md § Color System for color tokens and background pairings.
- **Color Independence**: Color must never be the sole mechanism for conveying state, interactive capability, or error conditions. Error messages, success badges, and active navigation indicators must combine color with text labels, icons, or structural borders.
- **Focus Indicator Contrast**: Focus rings (`ring-violet-400/60` with offset) must satisfy at least a 3:1 contrast ratio against adjacent canvas backgrounds.
- **Visible Interactive State Changes**: All interactive elements must feature distinct hover and focus states (background shifts, border contrast enhancements, focus rings).

---

# Motion Sensitivity
- **`prefers-reduced-motion` Handling**: User preferences for reduced motion must be respected at all times using CSS media queries (`@media (prefers-reduced-motion: reduce)`) and Framer Motion's `useReducedMotion()` hook.
- **Behavior Under Reduced Motion**:
  - **Parallax & Scroll Motion**: Disabled. `SectionReveal` (`frontend/components/effects/section-reveal.tsx`) forces `initial={{ opacity: 1 }}` and removes `y` translation offsets.
  - **Transitions**: Reduced to immediate or brief opacity-only fades (`duration: 0.1s`).
  - **Marquee Tickers**: Animated tracks pause or convert to static grid layouts.
  - **Cursor Glow & Spotlights**: Dynamic cursor-following spotlight tracking (`SpotlightCard`) and ambient floating animations are disabled.
  - **Programmatic Scrolling**: Section jumps (e.g., `mobile-dock.tsx`) switch to instantaneous placement (`behavior: "auto"`).
- **Essential State Transitions**: Functional feedback (such as button spinner loading states, modal visibility, and form validation alerts) remains present but uses non-spatial opacity transitions.
- **Reference**: See ANIMATIONS.md § Reduced Motion for implementation specifics.

---

# Interactive Elements
- **Minimum Touch Target Size**: Interactive elements across mobile and desktop viewports must provide touch targets of at least 44×44px (e.g., mobile toggle button `h-11 w-11`, dock buttons with `py-3`, dialog close control `h-10 w-10` with bounding padding).
- **Button vs. Link Usage**:
  - `<button>`: Used exclusively for actions, state updates, modal triggers, form submissions, and overlay toggles.
  - `<a>` / `<Link>`: Used exclusively for navigation to internal anchors (`#contact`), external URLs, or file downloads (`siteConfig.resumePath`).
- **Visible Input Labels**: All form fields (`contact-section.tsx`) must feature visible `<label>` elements linked via `htmlFor`. Placeholders serve only as helper text.
- **Form Validation Error Announcements**: Input fields with validation errors must expose error messages using `aria-describedby="[field-id]-error"` and set `aria-invalid="true"`. Submission failures must notify screen readers via an `aria-live` region.
- **Hover AND Focus States**: Interactive visuals cannot depend on hover alone. Every hover animation or highlight must be matched by an equivalent `focus-visible` state for keyboard users.

---

# Testing

## Manual Testing Checklist
- [ ] **Keyboard Navigation Pass**: Tab through the entire page from header to footer without using a mouse.
- [ ] **Keyboard Reachability**: Verify all links, buttons, form inputs, and modal controls are reachable and activatable via `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- [ ] **Screen Reader Audit**: Test with NVDA or VoiceOver to check landmark navigation, heading hierarchy, label associations, and live region notifications.
- [ ] **High Contrast Mode**: Test under OS high-contrast mode to ensure focus indicators, text, and borders remain visible.
- [ ] **200% Zoom Test**: Zoom browser to 200% to ensure layout reflows vertically without horizontal scrolling or clipping.
- [ ] **Reduced Motion Test**: Enable `prefers-reduced-motion` and verify scroll reveals, floating effects, and marquee animations disable gracefully.
- [ ] **Image Alt Text Check**: Ensure content images have descriptive `alt` text and decorative graphics carry `aria-hidden="true"`.

## Automated Testing
- **Lighthouse Accessibility Audit**: Maintain a score of ≥95 on production builds.
- **axe-core Browser Scan**: Execute automated axe-core browser scans on all views and modal overlays with zero critical or serious issue violations.

---

# Component Accessibility Patterns

### Modal / Dialog (`frontend/components/ui/dialog.tsx`)
- **Primitive**: Built on `@radix-ui/react-dialog` (`Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription`).
- **Focus Trap**: Automatic focus containment within `DialogContent`.
- **Escape Key**: Dismisses modal on `Escape`.
- **Focus Restoration**: Automatically returns focus to `DialogTrigger` on close.
- **ARIA Attributes**: Sets `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing `DialogTitle`, and `aria-describedby` referencing `DialogDescription`.
- **Close Control**: Close button includes `<span className="sr-only">Close</span>`.

### Navigation (`frontend/components/layout/top-nav.tsx` & `mobile-dock.tsx`)
- **Active State**: Sets `aria-current="page"` on the link or dock button matching the current active section.
- **Mobile Drawer Toggle**: Toggle button uses `aria-expanded={open}` and `aria-label="Toggle navigation"`.
- **Landmark Context**: Encapsulated in `<header>` and `<nav aria-label="...">` to differentiate primary top nav from mobile dock nav.

### Form (`frontend/components/sections/contact-section.tsx`)
- **Label Association**: Inputs and textareas link to explicit `<label htmlFor="id">`.
- **Error Identification**: Invalid fields specify `aria-invalid="true"` and `aria-describedby="[field]-error"`.
- **Submission Feedback**: Status box uses `role="status"` / `aria-live="polite"` for instant announcement of success or failure.
- **Submit Button**: Button updates visual state while preserving focusability and disabling double submission (`disabled={sending}`).

### Marquee / Ticker
- **Decorative Marquee**: Purely visual ticker tracks marked with `aria-hidden="true"`.
- **Informational Marquee**: Exposes underlying content as a semantic list to screen readers and pauses motion under `prefers-reduced-motion`.

### Cards (`frontend/components/ui/spotlight-card.tsx`)
- **Semantic Structure**: Wrapped in `<article>` or `<section>` tags.
- **Interactive Targets**: Inner links or action buttons retain individual focusability without wrapping whole cards in nested interactive tags.

---

# References
- AGENTS.md § Accessibility
- DESIGN_SYSTEM.md § Color System
- ANIMATIONS.md § Reduced Motion
- COMPONENTS.md § Component Registry
