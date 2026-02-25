# Code Standards: [Project / Team Name]

> Ethan reads this to understand your team's code standards before reviewing any PR.
> Fill in once — they'll align every review to these conventions instead of generic best practices.

---

## Language & Framework

**Primary language:**
**Framework(s):**
**Language version:**
**Runtime / platform:**

---

## Style Guide Reference

**Existing style guide:** [link or "none — inline rules below"]
**Linter:** [ESLint / Pylint / golangci-lint / etc. — config location]
**Formatter:** [Prettier / Black / gofmt / etc. — enforced in CI?]
**Inline rules (if no external guide):**

---

## Review Priorities

_Ethan weights feedback according to this hierarchy. Reorder to match your team._

1. Security (auth, input validation, secrets, injection)
2. Correctness (logic errors, edge cases, data integrity)
3. Performance (N+1 queries, unnecessary allocations, blocking calls)
4. Readability (naming, structure, comments)
5. Style (formatting, conventions — non-blocking unless enforced)

---

## Patterns We Use

**Architecture pattern:** [MVC / layered / hexagonal / feature-sliced / etc.]
**Naming conventions:**
- Variables:
- Functions:
- Classes / types:
- Files:
**Error handling approach:** [exceptions / result types / error codes]
**Async pattern:** [async/await / promises / goroutines / etc.]
**State management:** [if applicable]
**Key shared abstractions:** [base classes, shared utilities, common interfaces]

---

## Patterns We Avoid

_Anti-patterns, deprecated approaches, or project-specific no-gos._

- [ ] [Pattern]: [Why we avoid it]
- [ ] [Pattern]: [Why we avoid it]
- [ ] [Pattern]: [Why we avoid it]

---

## Testing Requirements

**Minimum coverage:** [%] on [unit / integration / critical paths]
**Required test types:** [ ] Unit [ ] Integration [ ] E2E [ ] Contract
**Testing framework:** [Jest / pytest / Go testing / etc.]
**Test file location:** [co-located / separate __tests__ dir / etc.]
**What requires tests:** [all new behavior / all bug fixes / etc.]

---

## Branch & Merge Strategy

**Branch naming:** [feature/TICKET-desc / feat/short-name / etc.]
**Merge strategy:** [ ] Merge commit [ ] Squash merge [ ] Rebase
**Required approvals before merge:** [N]
**Required CI checks before merge:**
**Protected branches:** [main / master / release/*]

---

---

## Verification Gate Priorities

_Ethan runs 5 verification gates during review. Adjust weights to match your team's priorities._

| Gate | Default Priority | Your Priority |
|------|-----------------|---------------|
| 1. Syntax & Types | Required (auto-fail) | |
| 2. Logic & Correctness | Required (auto-fail) | |
| 3. Security | Required (auto-fail) | |
| 4. Performance | Warning | |
| 5. Maintainability | Advisory | |

**Custom gate rules:**
- [Gate]: [custom rule for your project]

---

## Security Policy

_Ethan uses this to calibrate security gate intensity._

**Credential handling:** [env vars / secrets manager / vault / etc.]
**Sensitive data types:** [PII, payment data, health data, etc.]
**OWASP concerns most relevant to this project:**
- [ ] Injection (SQL, XSS, command)
- [ ] Broken Authentication
- [ ] Sensitive Data Exposure
- [ ] Broken Access Control
- [ ] Security Misconfiguration
- [ ] Other: [specify]
**Pre-commit secret scanning:** [enabled / disabled — tool name]

---

## Test Requirements (Expanded)

**Minimum coverage:** [%] on [unit / integration / critical paths]
**Required test types:** [ ] Unit [ ] Integration [ ] E2E [ ] Contract [ ] Performance [ ] Security
**Testing framework:** [Jest / pytest / Go testing / Vitest / etc.]
**Test file location:** [co-located / separate __tests__ dir / etc.]
**What requires tests:** [all new behavior / all bug fixes / critical paths only]
**Coverage tool:** [Istanbul/c8/nyc / pytest-cov / go cover]
**CI test command:** [the exact command CI runs]

---

## CI/CD Pipeline Overview

_Ethan uses this to understand how code reaches production and what gates exist._

**CI provider:** [GitHub Actions / GitLab CI / CircleCI / Jenkins / etc.]
**Pipeline stages:**
1. [ ] Lint
2. [ ] Type check
3. [ ] Unit tests
4. [ ] Integration tests
5. [ ] Build
6. [ ] Deploy (staging)
7. [ ] Deploy (production)

**Required checks before merge:** [list]
**Deploy trigger:** [merge to main / manual / scheduled]
**Rollback strategy:** [feature flags / blue-green / revert commit]

---

_Last updated: [date] by [name]_
