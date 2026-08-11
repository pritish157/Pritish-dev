# Refactoring — AI Implementation Prompt

## Context
This prompt guides safe code refactoring that preserves existing functionality while improving quality.
Reference: AGENTS.md § Required Workflow

## Before Refactoring

### Phase 1 — Understand
1. Read the file(s) being refactored completely
2. Identify all imports and exports
3. Search for all usages across the codebase
4. Understand the component's role in the composition map (See COMPONENTS.md § Composition Map)
5. Note any animation dependencies (See ANIMATIONS.md)
6. Note any design token usage (See DESIGN_SYSTEM.md)

### Phase 2 — Plan
1. Document what will change and why
2. List all files that will be affected
3. Identify risks (breaking imports, changing props, animation regressions)
4. Consider if a simpler approach exists

## During Refactoring
- Make incremental changes, not large rewrites
- Preserve all existing functionality
- Do not change unrelated code
- Do not remove comments or documentation unless obsolete
- Do not change file naming conventions (See ARCHITECTURE.md § File Conventions)
- Do not hardcode values (use design tokens)
- Do not introduce new dependencies without evaluation (See PERFORMANCE.md § Third-Party Dependencies)

## After Refactoring
Run the review checklist from AGENTS.md § Review Checklist:
- [ ] Responsive
- [ ] Accessible
- [ ] TypeScript clean
- [ ] No lint errors
- [ ] No console errors
- [ ] No dead code
- [ ] No duplicated logic
- [ ] Animations smooth
- [ ] No layout shifts
- [ ] Performance maintained
- [ ] Mobile tested
- [ ] Dark mode consistent
- [ ] Existing functionality still works

## Common Refactoring Patterns

### Extract Reusable Component
1. Identify repeated UI pattern across sections
2. Create component in ui/ category
3. Define typed props interface
4. Replace all instances with new component
5. Add to COMPONENTS.md registry

### Consolidate Design Tokens
1. Find hardcoded color/spacing values
2. Map to existing token from DESIGN_SYSTEM.md
3. Replace hardcoded value with token reference
4. If no token exists, define one in globals.css and tailwind.config.ts first

### Reduce Client JavaScript
1. Identify components with 'use client' that don't need interactivity
2. Extract static portions into Server Components
3. Keep interactive portions in minimal Client Components
Reference: PERFORMANCE.md § Server Components
