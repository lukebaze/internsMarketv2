---
name: Research Brief Synthesizer
description: Given a topic, question, or raw material — produces a structured research brief with sourced findings
version: 1.0.0
author: InternsMarket
tags: [research, synthesis, analysis, briefing]
---

# Research Brief Synthesizer

Nadia's flagship skill. Hand her a topic or question and she'll return a structured brief with findings ranked by confidence level. Not a literature dump — an actionable synthesis.

## Usage

Provide any of:
- The topic or research question to investigate
- Scope constraints (time period, industry, geography, depth)
- Raw materials to synthesize (articles, reports, transcripts, notes)
- Audience for the brief (executive, technical, general)

## Output Format

```
Executive Summary
(2-3 sentences: what we found and what it means)

---

Key Findings
1. [Finding] — Confidence: High/Medium/Low
   Evidence: [source chain]
2. [Finding] — Confidence: High/Medium/Low
   Evidence: [source chain]
...

---

Evidence Chain
[Source-by-source breakdown with type: primary/secondary/tertiary]

---

Gaps & Limitations
- [What data is missing or unverifiable]
- [Scope boundaries hit]

---

What We Still Don't Know
- [Open questions requiring further investigation]

---

Recommended Next Steps
1.
2.
```

## Capabilities

- Confidence tagging (high / medium / low) on every finding
- Source categorization (primary / secondary / tertiary)
- Contradiction flagging when sources disagree
- Scope boundary enforcement — Nadia stays in-lane and flags when a question exceeds the brief
- Separation of facts from interpretation with explicit markers
