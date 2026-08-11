# DESIGN_SYSTEM.md

Version: 1.0

Project: Pritish Kumar Panda Portfolio

---

# Design Philosophy

The visual identity communicates engineering precision, not decorative excess.

The portfolio should feel premium, technical, and minimal. Every visual element serves a purpose: reinforcing credibility, improving readability, or guiding attention.

See PORTFOLIO.md § Brand Identity for the full positioning statement.

---

# Color System

All colors are defined as CSS custom properties in `globals.css` and mapped to Tailwind utilities in `tailwind.config.ts`.

No color may be hardcoded in components. Every color must reference a token.

## Core Tokens

| Token | CSS Variable | Value | Usage |
|---|---|---|---|
| background | `--background` | `#050816` | Page background |
| foreground | `--foreground` | `#ffffff` | Primary text, headlines |
| muted | `--muted` | `#94A3B8` | Secondary text, descriptions, body copy |
| card | `--card` | `rgba(255, 255, 255, 0.04)` | Card backgrounds, glass panels |
| border | `--border` | `rgba(255, 255, 255, 0.08)` | Default borders, dividers |
| primary | `--primary` | `#8B5CF6` | Primary accent (Violet-500) |
| secondary | `--secondary` | `#A855F7` | Secondary accent (Fuchsia-500) |
| glow | `--glow` | `rgba(139, 92, 246, 0.35)` | Glow effects, ambient lighting |

## State Colors

| Purpose | Value | Usage |
|---|---|---|
| Focus ring | `rgba(196, 181, 253, 0.85)` | Keyboard focus indicators |
| Selection | `rgba(139, 92, 246, 0.24)` | Text selection highlight |
| Success | Use green from project accent if needed | Availability indicator |

## Project Accent Colors

Each featured project has a unique accent color for visual distinction:

| Project | Accent | Hex |
|---|---|---|
| Aradhana AstroAgent | Electric Blue | `#3B82F6` |
| Knot of Love | Violet | `#8B5CF6` |
| Vireon | Fuchsia | `#A855F7` |
| Fuel Route Optimisation | Deep Purple | `#7C3AED` |
| ImageSteg | Light Purple | `#C084FC` |

These accents are defined in `portfolio.ts` per project and consumed by project card components.

## Background Layers

The page background is a composite of layered effects, ordered bottom to top:

1. **Base**: Solid `#050816` (deep navy-black)
2. **Mesh gradient**: Multi-point radial gradient creating ambient depth — defined as `bg-mesh-main` in Tailwind
3. **Grid overlay**: Subtle 1px grid lines at `rgba(255,255,255,0.04)` — defined as `bg-hero-grid` in Tailwind
4. **Noise texture**: SVG fractal noise at low opacity (`0.2`), blended with `soft-light` — applied via `.noise-overlay` class

## Opacity Scale

| Purpose | Value |
|---|---|
| Card fill | `0.04` |
| Border default | `0.08` |
| Border hover | `0.10` |
| Glass panel border | `0.10` |
| Noise overlay | `0.2` |
| Selection background | `0.24` |
| Glow effect | `0.35` |
| Scrollbar thumb end | `0.45` |
| Focus ring | `0.85` |
| Scrollbar thumb start | `0.9` |

---

# Typography

## Font Stack

| Role | Font Family | Source | CSS Variable | Fallback |
|---|---|---|---|---|
| Display / Headlines | Space Grotesk | Google Fonts (`next/font`) | `--font-space` | `sans-serif` |
| Body / UI | General Sans | Fontshare CDN | — | `Satoshi, var(--font-space), system-ui, sans-serif` |
| Body Fallback | Satoshi | Fontshare CDN | — | `system-ui, sans-serif` |
| Monospace | System monospace | Built-in | `font-mono` | `ui-monospace, monospace` |

### Font Loading

- Space Grotesk is loaded via `next/font/google` in `layout.tsx` for automatic optimization.
- General Sans and Satoshi are loaded via Fontshare CDN `@import` in `globals.css` with `display=swap`.

See PERFORMANCE.md § Font Loading Strategy for optimization constraints.

## Type Scale

The type system uses responsive sizing via `clamp()` where appropriate.

| Element | Class / Size | Weight | Tracking | Line Height | Color Token |
|---|---|---|---|---|---|
| Hero headline | `text-5xl md:text-7xl` | 700 (bold) | `-0.06em` | `1.08` | foreground |
| Section heading (H2) | `text-3xl md:text-5xl` | 600 (semibold) | `-0.04em` | `1.15` | foreground |
| Card title (H3) | `text-xl` | 600 | `-0.02em` | `1.3` | foreground |
| Eyebrow badge | `text-xs` | 500 | `0.1em` | `1` | primary |
| Body text | `text-base md:text-lg` | 400 | `0em` | `1.65` | muted |
| Caption / Meta | `text-sm` | 400 | `0.01em` | `1.5` | muted (dimmed) |

## Hierarchy Rules

- Headlines use `font-display` (Space Grotesk).
- Body text uses `font-sans` (General Sans / Satoshi).
- Code snippets use `font-mono`.
- Gradient text is achieved with the `.text-gradient` utility class.

---

# Spacing

## Section Spacing

| Context | Padding | Tailwind Class |
|---|---|---|
| Section vertical | `96px` (6rem) | `py-24` |
| Section horizontal | `16px` mobile, `24px` tablet+ | `px-4 sm:px-6` |
| Section combined | Both | `.section-space` |
| Content max width | `1200px` | `max-w-7xl mx-auto` |

## Scroll Margin

All elements with `[id]` have `scroll-margin-top: 7rem` to account for the fixed navigation header.

---

# Borders and Radii

## Border Tokens

| State | Value | Usage |
|---|---|---|
| Default | `border-white/10` | Card borders, panel edges |
| Subtle | `border-white/[0.08]` | Dividers, separators |
| Hover | — (increase opacity on hover) | Interactive card borders |

## Radius Scale

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| Small | `0.375rem` | `rounded-md` | Badges, small pills |
| Medium | `0.75rem` | `rounded-xl` | Cards, inputs |
| Large | `1rem` | `rounded-2xl` | Panels, sections |
| Extra large | `2rem` | `rounded-4xl` | Hero containers |
| Full | `9999px` | `rounded-full` | Pills, avatars, buttons |

---

# Shadows

| Token | CSS Value | Tailwind | Usage |
|---|---|---|---|
| Soft | `0 18px 60px rgba(10, 10, 30, 0.35)` | `shadow-soft` | Glass panels, cards |
| Glow | `0 0 0 1px rgba(139, 92, 246, 0.15), 0 24px 80px rgba(81, 43, 161, 0.25)` | `shadow-glow` | Featured/active elements |
| Luxe | `0 30px 120px rgba(4, 7, 20, 0.7)` | `shadow-luxe` | Hero containers, elevated surfaces |

---

# Effects

## Glassmorphism

The `.glass-panel` utility combines:

```css
.glass-panel {
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 18px 60px rgba(10, 10, 30, 0.35);
  backdrop-filter: blur(24px); /* backdrop-blur-xl */
}
```

Used for: navigation header, cards, project panels, skill cards, contact form container.

## Glow Line

A horizontal gradient divider between sections:

```
linear-gradient(90deg, transparent, rgba(139,92,246,0.9), rgba(168,85,247,0.9), transparent)
```

Applied via `.surface-divider::after` pseudo-element.

## Gradient Text

The `.text-gradient` utility creates gradient-colored text:

```css
.text-gradient {
  background: linear-gradient(to right, white, violet-100, fuchsia-200);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Used sparingly on hero headlines and key emphasis words.

## Noise Overlay

SVG fractal noise texture at `opacity: 0.2` with `mix-blend-mode: soft-light`. Adds subtle grain to prevent flat backgrounds.

## Spotlight Effect

Mouse-tracking radial gradient on cards. CSS custom properties `--spotlight-x` and `--spotlight-y` are updated via JavaScript, driving a `radial-gradient` at the pointer position.

Implemented in `spotlight-card.tsx`.

---

# Responsive Breakpoints

| Name | Min Width | Tailwind Prefix | Layout Behavior |
|---|---|---|---|
| Mobile | `0px` | (default) | Single column, bottom dock nav |
| Small | `640px` | `sm:` | Minor spacing adjustments |
| Medium | `768px` | `md:` | Two-column layouts begin |
| Large | `1024px` | `lg:` | Full desktop layout, cursor effects active |
| Extra Large | `1280px` | `xl:` | Max-width containers, wider spacing |

## Mobile Behavior

- Bottom dock navigation replaces top nav links on mobile
- Cursor glow effect disabled on touch/coarse pointer devices
- Floating animations reduced or disabled
- Single column layouts throughout

---

# Iconography

## Icon System

- Primary: Lucide Icons (via `lucide-react`)
- Custom: SVG sprite sheet at `public/icons.svg`
- Sizing: consistent scale per context (16px inline, 20px UI, 24px navigation)
- Color: inherits from parent text color

## Icon Rules

- Every icon-only button must have an `aria-label`
- Decorative icons must have `aria-hidden="true"`
- Never use icons to convey meaning that isn't also conveyed by text

See ACCESSIBILITY.md § Screen Readers for full requirements.

---

# Implementation

## CSS Variables

All design tokens are defined in `globals.css` under `:root`.

```css
:root {
  color-scheme: dark;
  --background: #050816;
  --foreground: #ffffff;
  --muted: #94a3b8;
  --card: rgba(255, 255, 255, 0.04);
  --border: rgba(255, 255, 255, 0.08);
  --primary: #8b5cf6;
  --secondary: #a855f7;
  --glow: rgba(139, 92, 246, 0.35);
}
```

## Tailwind Integration

Tokens are mapped into `tailwind.config.ts` under `theme.extend.colors` so that utility classes like `bg-background`, `text-primary`, `border-border` work throughout the project.

Custom keyframes, animations, shadows, gradients, and font families are also defined in the Tailwind config.

## Token Update Process

1. Update the CSS variable in `globals.css`
2. Update the corresponding value in `tailwind.config.ts`
3. Verify all components that use the token still render correctly
4. Update this document

Never change a color in a component file. Always change the token.

---

# Dark Mode

The portfolio is dark-mode only. There is no light mode toggle.

`color-scheme: dark` is set on `:root`.

All colors are designed for dark backgrounds. There is no need for `dark:` variant classes.

---

# References

| Document | Relationship |
|---|---|
| PORTFOLIO.md § Brand Identity | Design philosophy and feel |
| ACCESSIBILITY.md § Color and Contrast | Minimum contrast ratios |
| PERFORMANCE.md § Font Loading Strategy | Font optimization constraints |
| ANIMATIONS.md | Motion tokens and animation specs |
| COMPONENTS.md | Components that consume these tokens |
| globals.css | CSS variable definitions |
| tailwind.config.ts | Tailwind token mappings |
