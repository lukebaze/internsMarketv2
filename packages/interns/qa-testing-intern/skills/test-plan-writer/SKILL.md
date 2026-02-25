---
name: Test Plan Writer
description: Write comprehensive test plans covering scope, strategy, entry/exit criteria, and test coverage matrix
version: 1.0.0
author: InternsMarket
tags: [test-plan, qa, testing-strategy, test-coverage]
---

# Test Plan Writer

Give Alex a feature or system to test and they'll return a test plan that covers scope, risks, coverage approach, and what "done" looks like. No vague checklists.

## Usage

Provide:
- Feature or system to test
- Tech stack and architecture overview
- Known risks or areas of concern
- Release timeline and testing window

Alex will:
1. Define the test scope (in scope / out of scope)
2. Select testing approach (manual, automated, exploratory, load)
3. Write an entry/exit criteria
4. Build a test coverage matrix by feature area
5. Identify high-risk areas requiring extra attention

## Output Format

```
[TEST PLAN: Feature Name]

Scope: ...
Out of scope: ...

Entry criteria: ...
Exit criteria: ...

Risk areas (ranked): ...

[COVERAGE MATRIX]
| Feature area | Test types | Priority | Notes |
|---|---|---|---|

[TESTING APPROACH per area]

[RESOURCE & TIMELINE ESTIMATE]
```

## Notes

Load `test-strategy-template.md` for a broader project context before writing a plan for a specific feature.
Alex will not write a test plan without knowing the exit criteria — "all tests pass" is not an exit criterion.
