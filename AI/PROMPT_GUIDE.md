# AI Prompting & Agent Interaction Guide (`AI/PROMPT_GUIDE.md`)

## 1. Metadata
- **Purpose**: Provides prompt patterns, system prompt structures, and guidelines for human developers and subagents interacting with this portfolio repository.
- **Owner**: AI Workflow Engineer.
- **Update Trigger**: Updated when new AI interaction workflows or tool schemas are introduced.

## 2. Permitted Contents
- Effective prompt templates for feature addition, bug fixing, refactoring, and code reviews.
- Subagent delegation guidelines.
- Standardized slash command recommendations (`/goal`, `/schedule`, `/browser`, `/grill-me`, `/teamwork-preview`).

## 3. Forbidden Contents
- Raw source code or API credentials.
- Duplicate guidelines already in `AGENTS.md`.

## 4. Usage Rules for AI Agents
Agents reference this file when launching subagents or structuring multi-agent workflows.

## 5. Relationship to Core Documents
- **Relationship to `AGENTS.md`**: Translates `AGENTS.md` rules into operational agent prompting strategies.
- **Relationship to `MASTER_PLAN.md`**: Helps break down sprint goals into subagent prompts.

---

# Standard Prompt Templates

### 1. Subagent Research Task Prompt
```
Explore the codebase for [FEATURE/COMPONENT] and return a summary covering:
1. Architectural patterns used
2. Dependencies and prop signatures
3. Relevant design system tokens
4. Potential risk areas
Do not modify any source code.
```

### 2. Feature Implementation Task Prompt
```
Implement [FEATURE NAME] following the 4-phase workflow in AGENTS.md.
Ensure:
1. All content is sourced from frontend/lib/data/portfolio.ts (SSOT)
2. UI components use existing primitives from components/ui/
3. Keyboard navigation and ARIA attributes pass WCAG AA standards
4. Run npm run typecheck and npm run lint before completing
```

### 3. Bug Fixing Task Prompt
```
Investigate issue [BUG ID].
1. Inspect full un-truncated log/stack trace first
2. Identify empirical root cause (no guessing)
3. Fix underlying contract violation (no superficial patches)
4. Record fix details in AI/BUGS.md
```
