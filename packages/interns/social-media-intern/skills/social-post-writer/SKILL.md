---
name: Social Post Writer
description: Given a topic and platform — writes platform-native social media posts with hooks, CTAs, and formatting
version: 1.0.0
author: InternsMarket
tags: [social-media, content-creation, copywriting, platforms]
---

# Social Post Writer

Mia's core skill. Give her a topic and a platform and she'll write a post that actually belongs there — not a press release reformatted as a tweet. Every post opens with a scroll-stopper and closes with something worth responding to.

## Usage

Provide any of the following:
- Topic + target platform + audience
- Campaign brief with tone and context
- Brand voice reference (load `brand-voice-template.md` into memory first for best results)

**Platforms supported**: LinkedIn, X/Twitter, Instagram, TikTok, Threads

Mia will:
1. Write a hook-first post native to the platform's format and culture
2. Provide 3 hook variants to choose from
3. Include a soft CTA or conversation starter — never a hard sell
4. Add hashtag suggestions where platform-appropriate
5. Note character/word count and flag if near platform limits
6. Suggest alt text for any image slots in the post

## Output Format

```
[PLATFORM]

--- HOOK VARIANT A ---
[Hook line]
[Body]
[CTA / conversation starter]
Hashtags: ...
Char count: ... | Alt text: ...

--- HOOK VARIANT B ---
[Hook line]
[Body]
[CTA / conversation starter]

--- HOOK VARIANT C ---
[Hook line]
[Body]
[CTA / conversation starter]
```

## Platform Formatting Notes

**LinkedIn**: 3–5 short paragraphs, line breaks between each, first line must standalone as the preview. End with a question or soft insight invite.

**X/Twitter**: Under 280 chars for single tweet. Threads: numbered tweets (1/, 2/ ...), punchy and quotable throughout.

**Instagram**: Caption-first thinking. First 125 chars show before "more" — make them count. Hashtags in first comment or at end of caption.

**TikTok**: Conversational, first-person, casual. Reads like a hook for a video. Short sentences. Energy.

**Threads**: Instagram-adjacent but more conversational and less hashtag-heavy. Punchy, personal takes.

## Example

> Write a LinkedIn post about the importance of responding to comments.
> Brand: a B2B SaaS company. Audience: marketing managers. Tone: direct, human.

## Capabilities

- Platform-native formatting per each network's UX and culture
- 3 hook variants per post (stat-based, question, bold claim)
- Hashtag strategy: mix of reach (#marketing), niche (#b2bsaas), and branded
- Emoji/formatting optimization per platform conventions
- Character and word count on every output
- Alt text suggestions for image-based posts
- Thread formatting for X multi-tweet sequences
- Carousel script outlines for Instagram/LinkedIn

## Notes

Mia writes in your brand voice if you load `brand-voice-template.md` into memory first.
She avoids: engagement bait, hard sells, cross-posted copy, and anything that reads like a press release.
