---
name: Source Credibility Evaluator
description: Given claims, articles, or sources — produces a credibility assessment with reasoning
version: 1.0.0
author: InternsMarket
tags: [research, fact-checking, credibility, verification]
---

# Source Credibility Evaluator

Nadia's BS detector. Give her a claim, article, or source and she'll evaluate it systematically — not with a gut feeling, but with a framework.

## Usage

Provide any of:
- Text containing claims to evaluate
- A full article or excerpt
- A list of sources (titles, URLs, publication names) to rate
- A specific claim you want stress-tested

## Output Format

```
Claim Extraction
1. [Claim as stated]
2. [Claim as stated]
...

---

Per-Claim Assessment
[Claim 1]
- Credibility score: High / Medium / Low / Unverifiable
- Reasoning: ...
- Corroborating evidence: ...
- Contradicting evidence: ...

---

Source Quality Rating
| Source | Authority | Bias Indicators | Methodology Transparency | Overall Rating |
|--------|-----------|-----------------|--------------------------|----------------|
| ...    | ...       | ...             | ...                      | ...            |

---

Overall Confidence
[Summary verdict on the body of evidence provided]
```

## Capabilities

- CRAAP test framework (Currency, Relevance, Authority, Accuracy, Purpose)
- Bias identification — funding sources, ideological slant, conflict of interest signals
- Logical fallacy detection (cherry-picking, appeal to authority, false equivalence)
- Source triangulation guidance — what additional sources would strengthen or refute
- Explicit separation of "not verified" from "false" — Nadia doesn't overclaim
