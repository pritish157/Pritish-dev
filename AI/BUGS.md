# Active & Resolved Bug Register (`AI/BUGS.md`)

## 1. Metadata
- **Purpose**: Centralized log of discovered defects, open runtime errors, browser compatibility issues, and their empirical root-cause analysis and resolution status.
- **Owner**: AI Quality & Debugging Engineer.
- **Update Trigger**: Updated immediately when a bug is reproduced or resolved.

## 2. Permitted Contents
- Bug ID, severity (`CRITICAL` / `HIGH` / `MEDIUM` / `LOW`), and status (`OPEN` / `INVESTIGATING` / `RESOLVED`).
- Exact error message, full un-truncated stack trace, or reproduction steps.
- Empirically verified root cause analysis (never diagnostic guesswork).
- Resolution details and verification command output.

## 3. Forbidden Contents
- Theoretical or unconfirmed diagnostic hypotheses without log proof.
- Superficial symptom patches (wrapping broken calls in silent try/except or commenting out failing tests).

## 4. Usage Rules for AI Agents
Per `AGENTS.md § Inspect Logs Before Diagnosing`, agents MUST fetch full error logs before forming hypotheses, and log findings here.

## 5. Relationship to Core Documents
- **Relationship to `AGENTS.md`**: Enforces `AGENTS.md § No Superficial Symptom Patches` and log inspection guidelines.
- **Relationship to `MASTER_PLAN.md`**: Feeds defect metrics into Quality Gate validation.

---

# Bug Register

### BUG-001: PowerShell Command Operator Syntax Error (`&&`)
- **Severity**: Low
- **Status**: `RESOLVED` (2026-08-01)
- **Symptom**: Terminal command `npm run typecheck && npm run lint` failed with `The token '&&' is not a valid statement separator in this version`.
- **Root Cause**: Windows PowerShell engine does not support `&&` chaining operator in standard configuration.
- **Fix**: Executed commands sequentially as single invocations (`npm run typecheck` followed by `npm run lint`).
- **Verification**: Commands executed cleanly with exit code 0.

---

# Currently Open Defect Queue
*No active open defects. All components passing 100% typecheck and linting validation.*
