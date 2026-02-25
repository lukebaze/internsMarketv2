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

_Last updated: [date] by [name]_
