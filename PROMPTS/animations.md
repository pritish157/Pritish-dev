# Animations — AI Implementation Prompt

## Context
This prompt guides the implementation of animations. Every animation must have a purpose.
Reference: AGENTS.md § Animation Philosophy
Reference: ANIMATIONS.md (full motion specification)

## Before Animating
1. What attention does this guide?
2. What hierarchy does this improve?
3. What interaction does this reinforce?
4. What perceived quality does this add?

If none of these, do not animate.

## Standard Patterns

### Section Entrance
Wrap section content in SectionReveal.
Reference: ANIMATIONS.md § Entrance Patterns
Reference: COMPONENTS.md § Section Reveal

### Staggered Children
Use Framer Motion staggerChildren with 0.08s delay.
Reference: ANIMATIONS.md § Entrance Patterns

### Card Hover
translateY(-4px), border glow transition.
Reference: ANIMATIONS.md § Interaction Patterns

### Button Hover
Scale, shadow intensify for primary. Border brighten for secondary.
Reference: ANIMATIONS.md § Interaction Patterns

### Infinite Ticker
CSS @keyframes marquee, no JavaScript.
Reference: ANIMATIONS.md § Continuous Patterns

## Performance Constraints
- GPU-only: transform, opacity
- Max concurrent: 5-6 animations on screen
- Disable decorative motion on mobile/touch
Reference: PERFORMANCE.md § Animation Performance

## Accessibility
- Must handle prefers-reduced-motion
- Content must be visible without animations
Reference: ACCESSIBILITY.md § Motion Sensitivity

## Quality Checklist
- [ ] Animation has documented purpose
- [ ] Uses transform/opacity only
- [ ] Reduced motion fallback exists
- [ ] No janky frames (test at 60fps)
- [ ] Disabled on touch devices if decorative
- [ ] Listed in ANIMATIONS.md inventory
