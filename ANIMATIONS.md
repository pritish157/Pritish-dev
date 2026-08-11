# ANIMATIONS.md

Version: 1.0  
Project: Pritish Kumar Panda Portfolio  

---

# Motion Philosophy

Animation in this portfolio exists solely to guide reader attention, clarify visual hierarchy, provide interaction feedback, and improve perceived engineering quality.

As specified in See AGENTS.md § Animation Philosophy:
- Motion must never be applied for purely decorative excess or visual clutter.
- Every movement must serve a functional purpose.
- Performance and responsiveness take precedence over visual embellishment (See AGENTS.md § Core Principles).

---

# Motion Tokens

## Duration Scale

| Token Name | Value | Class / Usage | Functional Context |
|---|---|---|---|
| Instant | `100ms` / `0.01ms` | Reduced motion override | Accessibility fallbacks, instant state resets |
| Fast | `200ms`–`300ms` | `duration-300`, GSAP `0.3s` | Button hover states, magnetic pull, small UI feedback |
| Normal | `400ms`–`500ms` | `duration-500` | Spotlight card hover transitions, glass panel state changes |
| Slow | `650ms`–`700ms` | Framer Motion `0.65s` / `0.7s` | Section entrance reveals, hero staggered element reveals |
| Extended | `1.05s`–`1.8s` | `duration: 1.05`, `1.8s` | Lenis smooth scroll inertia, hero scroll hint loop |
| Ambient Continuous | `3.4s`–`24s` | `3.4s` to `24s` keyframes | Marquee ticker (`24s`), float (`8s`/`11s`), orb (`16s`), pulse glow (`3.4s`) |

## Easing Curves

| Token Name | Value / Cubic Bezier | Character & Purpose | Source Implementation |
|---|---|---|---|
| Section Decelerate | `cubic-bezier(0.22, 1, 0.36, 1)` | Premium ease-out deceleration with zero overshoot; smooth, authoritative entry | Framer Motion `SectionReveal`, Hero items |
| Magnetic Power Out | `power3.out` | Snappy initial movement with smooth exponential deceleration towards cursor | GSAP `quickTo` in `MagneticLink` |
| Smooth Ease In-Out | `ease-in-out` | Symmetric acceleration and deceleration for continuous ambient looping | CSS keyframes (`float`, `orb`, `pulseGlow`) |
| Linear | `linear` | Constant speed distribution without acceleration curves | CSS marquee keyframe, shimmer sweep, terminal cursor |

## Spring Physics

Framer Motion spring physics are utilized for physics-driven pointer tracking and progress indicators:

| Component | Target Parameter | Stiffness | Damping | Mass | Rest Delta |
|---|---|---|---|---|---|
| `CursorGlow` | `smoothX`, `smoothY` | `120` | `24` | `0.5` | — |
| `ScrollProgress` | `scaleX` | `180` | `24` | — | `0.001` |

---

# Animation Inventory

| # | Name | Source File | Trigger | Element(s) Affected | From → To State | Duration & Easing | Library | Reduced Motion Fallback |
|---|---|---|---|---|---|---|---|---|
| 1 | Section Reveal | `components/effects/section-reveal.tsx` | Scroll-in (`whileInView`, viewport `0.18`, `once: true`) | Section containers / child wrappers | `opacity: 0, y: 28` → `opacity: 1, y: 0` | `0.65s` / `[0.22, 1, 0.36, 1]` | Framer Motion | `opacity: 1`, `y` translation removed (`initial={{ opacity: 1 }}`) |
| 2 | Cursor Glow | `components/effects/cursor-glow.tsx` | Pointer move on desktop (>=1024px) | Fixed `22rem x 22rem` radial glow div | `opacity: 0` → `opacity: 1`; `(x, y)` tracks pointer offset by `-180px` | Spring (`stiffness: 120`, `damping: 24`, `mass: 0.5`) | Framer Motion | Component returns null / disabled under `prefers-reduced-motion` or mobile |
| 3 | Scroll Progress | `components/effects/scroll-progress.tsx` | Scroll position change | Top fixed `1px` gradient bar | `scaleX: 0` → `scaleX: 1` | Spring (`stiffness: 180`, `damping: 24`, `restDelta: 0.001`) | Framer Motion | Bar remains static or follows instant non-animated transform |
| 4 | Smooth Scroll | `components/effects/lenis-provider.tsx` | Wheel / drag scroll & internal link clicks | Viewport document scroll body | Inertial scroll interpolation to target position | `1.05s` duration, `smoothWheel: true` | Lenis | Destroyed / bypassed completely under `prefers-reduced-motion`, coarse pointer, or width < 1024px |
| 5 | Marquee Ticker | `components/ui/marquee.tsx` & `tailwind.config.ts` | Always-running (desktop `md:`) | Duplicate flex track container | `transform: translate3d(0, 0, 0)` → `transform: translate3d(-50%, 0, 0)` | `24s`, `linear`, `infinite` | CSS Keyframe (`animate-marquee`) | CSS sets `animation-duration: 0.01ms !important`; fallback to native horizontal scroll on mobile |
| 6 | Float Animation | `tailwind.config.ts` | Always-running | Floating decorative cards & badges | `0%, 100%`: `translate3d(0, 0, 0)` → `50%`: `translate3d(0, -14px, 0)` | `8s`, `ease-in-out`, `infinite` | CSS Keyframe (`animate-float`) | `animation-duration: 0.01ms !important`, motion suppressed |
| 7 | Float Slow | `tailwind.config.ts` | Always-running | Secondary ambient visual panels | `0%, 100%`: `translate3d(0, 0, 0)` → `50%`: `translate3d(0, -14px, 0)` | `11s`, `ease-in-out`, `infinite` | CSS Keyframe (`animate-float-slow`) | `animation-duration: 0.01ms !important`, motion suppressed |
| 8 | Orb Animation | `tailwind.config.ts` | Always-running | Ambient background gradient spheres | `0%, 100%`: `translate3d(0, 0, 0) scale(1)` → `50%`: `translate3d(0, -24px, 0) scale(1.04)` | `16s`, `ease-in-out`, `infinite` | CSS Keyframe (`animate-orb`) | `animation-duration: 0.01ms !important`, static scale/position |
| 9 | Pulse Glow | `tailwind.config.ts` | Always-running | Ambient light backdrops & active halos | `0%, 100%`: `opacity: 0.45` → `50%`: `opacity: 0.95` | `3.4s`, `ease-in-out`, `infinite` | CSS Keyframe (`animate-pulse-glow`) | `animation-duration: 0.01ms !important`, constant baseline opacity |
| 10 | Shimmer | `tailwind.config.ts` | Always-running | Skeleton loaders & highlight bars | `transform: translateX(-120%)` → `transform: translateX(120%)` | `6s`, `linear`, `infinite` | CSS Keyframe (`animate-shimmer`) | `animation-duration: 0.01ms !important`, static overlay |
| 11 | Scroll Hint | `tailwind.config.ts` & `hero-section.tsx` | Always-running | Hero section scroll dot indicator | `0%, 100%`: `translateY(0), opacity: 0.9` → `50%`: `translateY(10px), opacity: 0.3` | `1.8s`, `ease-in-out`, `infinite` | CSS Keyframe (`animate-scroll-hint`) | Hidden or static under reduced motion |
| 12 | Spotlight Tracking | `components/ui/spotlight-card.tsx` | Hover / pointer movement | Radial gradient pseudo-element (`before:`) | `opacity: 0` → `opacity: 1` (`group-hover`); updating `--spotlight-x`, `--spotlight-y` | `500ms` transition (`transition duration-500`) | CSS Custom Props + React Mouse Event | `transition-duration: 0.01ms !important`; position updates immediately without transition |
| 13 | Magnetic Link Pull | `components/ui/magnetic-link.tsx` | Hover / pointer movement | Anchor element wrapper (`ref`) | Displaces `x, y` towards pointer `(deltaX * 0.14, deltaY * 0.22)`; returns to `0, 0` on leave | `0.3s`, `power3.out` | GSAP (`quickTo`) | Early return on `prefers-reduced-motion: reduce` or touch pointer; clean reset to `{x:0, y:0}` |
| 14 | Card Hover Effects | `components/ui/spotlight-card.tsx` | Hover / focus-within | Spotlight cards & project items | `translateY(0)` → `translateY(-4px)` (`hover:-translate-y-1`), border opacity `0.1` → `0.15`, bg opacity `0.04` → `0.055` | `500ms`, `ease-out` (`duration-500`) | CSS Transitions (Tailwind) | `transition-duration: 0.01ms !important`; transform skipped, instant color shift |
| 15 | Button Hover Effects | `components/ui/button.tsx` | Hover / focus-visible | Button component variants | Default: `scale-[1]` → `scale-[1.01]`, shadow `shadow-[0_16px_40px_...]` → `shadow-[0_22px_60px_...]`; Secondary: bg `white/5` → `white/[0.08]` | `300ms`, `transition-all` | CSS Transitions (Tailwind + CVA) | Scale transform disabled or instantaneous under reduced motion |

---

# Entrance Patterns

## Section Reveal Pattern

Standard layout sections utilize the `<SectionReveal>` wrapper (`components/effects/section-reveal.tsx`) to trigger on view:
- **Trigger threshold**: Triggers when `18%` (`amount: 0.18`) of the element enters the viewport.
- **Execution constraint**: Executed strictly once (`once: true`) to prevent repetitive re-triggering during bidirectional scrolling.
- **Properties**: Fades from `opacity: 0` to `opacity: 1` and translates `y: 28px` to `y: 0px` over `0.65s` using `cubic-bezier(0.22, 1, 0.36, 1)`.

## Staggered Children Sequence

Complex structural containers (such as `HeroSection` in `components/sections/hero-section.tsx`) orchestrate entry using Framer Motion variants:
- **Container config**: `staggerChildren: 0.1s`, `delayChildren: 0.08s`.
- **Item config**: `opacity: 0, y: 22px` → `opacity: 1, y: 0px` over `0.7s` (`cubic-bezier(0.22, 1, 0.36, 1)`).

---

# Interaction Patterns

## Card Hover Lift

Applied to `SpotlightCard` and interactive feature modules:
- On `:hover`, the card translates upward by `-4px` (`hover:-translate-y-1`) while transitioning border opacity from `10%` (`border-white/10`) to `15%` (`border-white/15`) and background opacity from `4%` (`bg-white/[0.04]`) to `5.5%` (`bg-white/[0.055]`).
- Smoothly interpolated over `500ms` via Tailwind utility `transition duration-500`.

## Button Hover Response

Defined in `components/ui/button.tsx`:
- **Default Variant**: Scale expand to `scale-[1.01]` with expanded shadow radius (`shadow-[0_22px_60px_rgba(139,92,246,0.4)]`). Accelerated via GPU (`transform-gpu`).
- **Secondary / Ghost Variants**: Opacity shifts on background fill (`bg-white/5` → `bg-white/[0.08]`) and border line.

## Magnetic Link Pull

Defined in `components/ui/magnetic-link.tsx`:
- Uses GSAP `quickTo` targeting element `x` and `y` offsets.
- Calculates pointer distance relative to component center and displaces coordinates by `14%` on X axis (`deltaX * 0.14`) and `22%` on Y axis (`deltaY * 0.22`).
- On `pointerleave`, spring-snaps back to origin `(0, 0)` over `0.3s` with `power3.out` easing.

## Spotlight Tracking

Defined in `components/ui/spotlight-card.tsx`:
- Tracks cursor coordinates relative to card bounding box (`event.clientX - bounds.left`, `event.clientY - bounds.top`).
- Sets CSS variables `--spotlight-x`, `--spotlight-y`, and `--spotlight-accent` on inline styles.
- CSS pseudo-element (`before:`) renders a `420px` radial gradient spotlight centered at pointer coordinates.

---

# Continuous Patterns

## Marquee Ticker

Implemented in `components/ui/marquee.tsx`:
- Infinite linear loop shifting dual concatenated arrays (`[...items, ...items]`) across X axis.
- Uses GPU-accelerated `translate3d(0,0,0)` → `translate3d(-50%,0,0)` over a `24s` cycle.

## Scroll Progress Bar

Implemented in `components/effects/scroll-progress.tsx`:
- Fixed 1px header bar scaling `scaleX` from `0` to `1` linked to global document scroll progress (`useScroll()`).
- Smoothed using spring physics (`stiffness: 180, damping: 24`).

## Cursor Glow

Implemented in `components/effects/cursor-glow.tsx`:
- Desktop-only `22rem` radial glow following pointer move events.
- Position smoothed via twin spring motion values (`stiffness: 120, damping: 24, mass: 0.5`).

## Floating Background Cards

Defined in `tailwind.config.ts`:
- CSS `@keyframes float` translates elements vertically by `-14px` over `8s` (standard) or `11s` (`float-slow`).
- `@keyframes orb` translates background ambient gradient spheres by `-24px` with scale expansion (`scale(1.04)`) over `16s`.

---

# Library Policy

## Framer Motion
- **Usage**: Used for layout mount/unmount animations, scroll-triggered section reveals (`whileInView`), entrance variant sequences, and spring physics tracking (`useSpring`, `useMotionValue`).
- **Guideline**: Wrap client components in minimal sub-trees to keep initial bundle cost low.

## GSAP
- **Usage**: Used exclusively for high-frequency interactive cursor tracking (`MagneticLink`).
- **Guideline**: Use `gsap.quickTo` for memory-efficient frame updates without creating new tween instances on every pointer event.

## CSS @keyframes
- **Usage**: Used for all continuous, looping ambient animations (`marquee`, `float`, `float-slow`, `orb`, `pulse-glow`, `shimmer`, `scroll-hint`).
- **Guideline**: Preferred for background loops to allow the browser compositor thread to execute animations off the main JS thread.

---

# Reduced Motion

When users enable `prefers-reduced-motion: reduce` at the OS level, motion behaviors adapt according to accessibility guidelines (See ACCESSIBILITY.md § Motion Sensitivity).

## Global CSS Overrides (`app/globals.css`)
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Component Specific Adaptations

1. **`SectionReveal`**: Hook `useReducedMotion()` returns `true`, forcing `initial={{ opacity: 1 }}` and bypassing vertical translation (`y`). Content renders instantly upon scroll.
2. **`LenisProvider`**: Bypasses initialization completely when `prefers-reduced-motion: reduce` matches, reverting browser scrolling to native instant placement.
3. **`CursorGlow`**: Early returns inside `useEffect` and remains hidden (`opacity: 0`).
4. **`MagneticLink`**: Media query check `window.matchMedia("(prefers-reduced-motion: reduce)")` suppresses pointer listener registration; `gsap.set(node, { x: 0, y: 0 })` ensures strict zero displacement.
5. **`Marquee`**: CSS duration override forces keyframe completion in `0.01ms`, rendering items as a static list. Mobile viewport exposes standard overflow scrolling (`overflow-x-auto`).

---

# Performance Rules

All animations must satisfy the performance limits outlined in See PERFORMANCE.md § Animation Performance:

1. **GPU-Only Properties**: Animations must strictly target GPU-accelerated CSS properties (`transform`, `opacity`). Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
2. **Concurrency Cap**: Limit active concurrent visible animations to a maximum of `5-6` elements on screen at any time to guarantee a steady `60fps` frame rate.
3. **Hardware Acceleration**: Use `transform-gpu` or `will-change: transform` selectively on interactive cards and buttons to promote layers to hardware compositor threads without consuming excessive memory.
4. **Touch & Mobile Optimization**: Heavy pointer-tracking effects (`CursorGlow`, `MagneticLink`, `LenisProvider`) are automatically disabled on touch devices (`pointer: coarse`) and mobile viewports (<1024px).

---

# References

- See DESIGN_SYSTEM.md (Visual design tokens and color variables)
- See PERFORMANCE.md § Animation Performance (Budget and frame constraints)
- See ACCESSIBILITY.md § Motion Sensitivity (Reduced motion accessibility rules)
- See COMPONENTS.md (Component architecture registry)
