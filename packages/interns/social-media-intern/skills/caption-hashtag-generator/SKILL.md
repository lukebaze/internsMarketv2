---
name: Caption & Hashtag Generator
description: Given image descriptions or content themes — generates platform-specific captions and hashtag sets
version: 1.0.0
author: InternsMarket
tags: [social-media, captions, hashtags, instagram, content]
---

# Caption & Hashtag Generator

Mia pairs your visuals with words that work. Give her an image description and she'll write captions for multiple platforms — because what works on Instagram won't work on LinkedIn, and what lands on TikTok would get ignored on Threads. Three variants per platform so you have options, not just one shot.

## Usage

Provide any of the following:
- Image or video description (what's in the visual, mood, colors, context)
- Content theme or campaign name
- Visual mood (e.g., "cozy autumn aesthetic", "product flat lay on marble", "behind-the-scenes candid")

Also specify:
- Target platforms
- Brand voice (or load `brand-voice-template.md` into memory)
- Any branded hashtags to always include

## Output Format

```
[PLATFORM: Instagram]

Variant A:
Caption: [text — optimized for 125-char preview]
Hashtags (primary): #tag1 #tag2 #tag3 #tag4 #tag5
Hashtags (secondary): #tag6 ... #tag15
Alt text: [image description for accessibility]
Post timing suggestion: [day + time window]

Variant B:
Caption: ...
Hashtags: ...

Variant C:
Caption: ...
Hashtags: ...

---
[PLATFORM: LinkedIn]
...

---
[PLATFORM: X/Twitter]
...
```

## Hashtag Strategy

Mia builds hashtag sets with three layers:

- **Reach tags** (5–10k to 500k posts): broad discoverability — e.g., `#socialmedia`, `#marketing`
- **Niche tags** (under 50k posts): targeted community reach — e.g., `#dtcbrand`, `#foodiela`
- **Branded tags**: your own hashtag if provided — always included

Instagram: 5–10 hashtags (algorithm sweet spot)
LinkedIn: 3–5 hashtags (less is more)
X/Twitter: 1–2 hashtags max (readability first)
TikTok: 4–7 hashtags (mix niche and trending)

## Example

> Generate captions for a photo of a latte with our branded cup at a sunlit cafe window.
> Brand: a specialty coffee subscription company. Platforms: Instagram, LinkedIn, TikTok.
> Mood: warm, aspirational, slow morning. Brand hashtag: #SlowBrewCo.

## Capabilities

- 3 caption variants per platform with distinct angles (emotional / informational / conversational)
- Hashtag set per platform: primary 5–10 + secondary 10–15 where applicable
- Alt text generation for every output (accessibility-first)
- Caption length optimization: Instagram (125 preview + full), LinkedIn (150 preview), X (280 max), TikTok (short hook)
- Posting time suggestion based on platform and content type
- Branded hashtag integration — always included when provided
- Emoji usage: matched to platform norms (minimal on LinkedIn, natural on Instagram/TikTok)

## Notes

Mia generates captions and hashtags — she does not post or schedule.
For highest relevance, describe the visual in detail: subject, setting, mood, colors, and any text overlaid.
She avoids hashtag stuffing, banned hashtags, and hollow engagement tags (e.g., #like4like, #followback).
