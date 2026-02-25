---
name: Meeting Notes Summarizer
description: Given a meeting transcript or raw notes — produces structured summary with decisions, action items, and owners
version: 1.0.0
author: InternsMarket
tags: [meetings, notes, action-items, summary]
---

# Meeting Notes Summarizer

Sam's flagship skill. Hand him a transcript or messy notes and he'll return what actually happened: decisions made, actions assigned, and who owes what by when. No fluff, no filler.

## Usage

Provide any of:
- Full meeting transcript (copy-paste or audio summary)
- Raw notes (bullet points, stream of consciousness, whiteboard photo description)
- Attendee list (optional — helps Sam assign owners by name)
- Meeting type (optional — standup, planning, retro, 1:1, all-hands)

Sam will:
1. Extract every decision made in the meeting with full context
2. Identify all action items and assign an owner and due date to each
3. Cluster discussion topics and summarize each without filler
4. Flag open questions that were raised but not resolved
5. Surface topics that should appear on the next meeting agenda

## Output Format

```
# Meeting Summary: [Meeting Title]

**Date:** [date]
**Attendees:** [list]
**Duration:** [duration]
**Meeting type:** [standup / planning / retro / 1:1 / other]

---

## Key Decisions

1. [Decision] — decided by [owner], [date]
2. ...

---

## Action Items

| # | Action | Owner | Due Date | Status |
|---|--------|-------|----------|--------|
| 1 | [what needs to happen] | [name] | [date] | Open |

---

## Discussion Summary

### [Topic 1]
[2–4 sentence summary of what was discussed and why it matters]

### [Topic 2]
...

---

## Open Questions

- [Question] — needs answer from [person or team]

---

## Next Meeting Topics

- [Topic to carry forward]
```

## Capabilities

- Decision extraction from unstructured conversation
- Action item identification with owner and deadline assignment
- Topic clustering from free-form transcripts
- Attendee contribution tracking (who said what)
- Meeting type-aware formatting (standups get a shorter format)

## Notes

Load `team-directory-template.md` so Sam knows who's on your team and can assign owners by name rather than description.
Load `meeting-format-template.md` to match your team's preferred summary structure.
Sam will flag any action item with no clear owner and ask you to assign one before finalizing.
