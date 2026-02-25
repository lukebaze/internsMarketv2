# Project Architecture: [Project Name]

> Ethan uses this to understand your codebase structure so reviews consider architectural context, not just line-level code.
> Fill in once per project, update when architecture or component ownership changes.

---

## High-Level Architecture

**Structure:** [ ] Monolith [ ] Microservices [ ] Monorepo [ ] Serverless [ ] Hybrid
**Key components / services:**
- [Component]: [what it does]
- [Component]: [what it does]
**External dependencies:** [third-party APIs, SaaS integrations, infrastructure services]

---

## Directory Structure

_Map of where things live — enough for Ethan to know which layer a file belongs to._

```
/
├── [dir]/    # [what lives here]
├── [dir]/    # [what lives here]
├── [dir]/    # [what lives here]
└── [dir]/    # [what lives here]
```

---

## Data Flow

_How data moves through the system from entry point to persistence and back._

```
[Entry point] → [Validation layer] → [Business logic] → [Data access] → [Storage]
```

**Key data entities:**
- [Entity]: [brief description, where it lives]
**State management:** [how application state is managed, if applicable]

---

## Key Abstractions

_Important interfaces, base classes, and shared utilities Ethan should recognize._

| Abstraction | Location | Purpose |
|-------------|----------|---------|
| | | |
| | | |

**Shared utilities:**
**Dependency injection / IoC container:** [if applicable]

---

## Known Tech Debt

_Areas that are messy by intent, legacy code Ethan should flag but not over-refactor._

| Area | File/module | Issue | Priority to fix |
|------|-------------|-------|-----------------|
| | | | |
| | | | |

**Do not refactor without discussion:**
- [Module / pattern]: [reason — in progress, external dependency, intentional tradeoff]

---

## Deployment Pipeline

_How code gets from PR to production — Ethan uses this context when assessing risk._

**Environments:** [ ] Local → [ ] Dev → [ ] Staging → [ ] Production
**Deploy trigger:** [merge to main / manual / scheduled]
**Rollback strategy:** [feature flags / blue-green / revert commit]
**Deployment frequency:** [multiple per day / weekly / etc.]

---

## Common Gotchas

_Things that trip up new contributors and that Ethan should flag in reviews._

- [Gotcha]: [explanation and what to watch for]
- [Gotcha]: [explanation and what to watch for]
- [Gotcha]: [explanation and what to watch for]

---

_Last updated: [date] by [name]_
