# Intern Authoring Guide

Learn how to create a `.intern` package — a complete AIEOS v1.1 entity with skills, personality, and memory.

## Package Structure

A `.intern` is a directory with this layout:

```
content-marketing-intern/
├── manifest.json              # Package metadata (required)
├── aieos.json                 # Full AIEOS entity (required)
├── skills/                    # Skill definitions (required)
│   ├── blog-post-writer/
│   │   └── SKILL.md
│   ├── social-media-content/
│   │   └── SKILL.md
│   └── ... (5+ skills per intern)
├── memory-seeds/              # Optional knowledge templates
│   ├── brand-voice-template.md
│   └── content-strategy-template.md
└── config/                    # Runtime configurations
    ├── zeroclaw.toml          # ZeroClaw runtime config
    └── openclaw.yaml          # OpenClaw runtime config
```

## manifest.json

The package descriptor. All fields are required unless marked optional.

### Schema

```json
{
  "id": "content-marketing-intern",
  "name": "Jordan Lee — Content Marketing Intern",
  "version": "1.0.0",
  "description": "Writes blogs, social posts, email sequences, and SEO copy.",
  "author": "InternsMarket",
  "license": "proprietary",
  "aieos_version": "1.1",
  "supported_runtimes": ["zeroclaw", "openclaw"],
  "primary_runtime": "zeroclaw",
  "tags": ["content", "marketing", "seo", "social-media", "email"],
  "tier_required": "free",
  "skills": [
    "blog-post-writer",
    "social-media-content",
    "email-copywriter",
    "seo-keyword-researcher",
    "content-repurposer"
  ],
  "created_at": "2026-02-25",
  "registry_url": "https://registry.internsmarket.com/manifests/content-marketing-intern.json"
}
```

### Field Reference

| Field | Type | Rules | Example |
|-------|------|-------|---------|
| `id` | string | kebab-case slug, 2-50 chars | `content-marketing-intern` |
| `name` | string | Human-readable, 10-100 chars | `Jordan Lee — Content Marketing Intern` |
| `version` | string | Semver (MAJOR.MINOR.PATCH) | `1.0.0` |
| `description` | string | One sentence, <200 chars | `Writes blogs, social posts, email sequences...` |
| `author` | string | Person or org name | `InternsMarket` |
| `license` | string | License type or "proprietary" | `proprietary` |
| `aieos_version` | string | Target AIEOS version | `1.1` |
| `supported_runtimes` | string[] | Array of `zeroclaw` and/or `openclaw` | `["zeroclaw", "openclaw"]` |
| `primary_runtime` | string | Primary target: `zeroclaw` or `openclaw` | `zeroclaw` |
| `tags` | string[] | Search tags (kebab-case, 3-5) | `["content", "marketing", "seo"]` |
| `tier_required` | string | `free`, `starter`, or `pro` | `free` |
| `skills` | string[] | Skill IDs matching `skills/*/` dirs | `["blog-post-writer", ...]` |
| `created_at` | string | ISO 8601 date | `2026-02-25` |
| `registry_url` | string | (optional) Registry URL | `https://registry.internsmarket.com/...` |

### Validation

Run:
```bash
im validate ./content-marketing-intern
```

Errors:
- Missing required fields
- Invalid `id` format (must be kebab-case)
- Mismatched skills (listed in manifest but not in `skills/` directory)
- Invalid version format (must be semver)
- Unknown `tier_required` (must be free/starter/pro)

## aieos.json

The complete AIEOS v1.1 entity. Defines personality, voice, background, and capabilities.

### Template Structure

```json
{
  "metadata": {
    "version": "1.1",
    "created_at": "2026-02-25",
    "modified_at": "2026-02-25"
  },
  "identity": {
    "name": "Jordan Lee",
    "pronouns": "she/her",
    "role": "Content Marketing Intern",
    "age": 24,
    "location": "Portland, OR",
    "avatar_prompt": "A warm, approachable woman in her mid-20s with brown eyes and a genuine smile."
  },
  "capabilities": {
    "skills": [
      "blog-post-writer",
      "social-media-content",
      "email-copywriter",
      "seo-keyword-researcher",
      "content-repurposer"
    ]
  },
  "psychology": {
    "neural_matrix": {
      "creativity": 0.85,
      "empathy": 0.75,
      "logic": 0.6,
      "adaptability": 0.8,
      "charisma": 0.9,
      "reliability": 0.85
    }
  },
  "physicality": {
    "appearance": "Brown eyes, warm smile, authentic energy",
    "voice_description": "Conversational, clear, with natural rhythm"
  },
  "linguistics": {
    "voice": "warm and conversational",
    "formality": 0.4,
    "uses_contractions": true,
    "vocabulary_level": "accessible",
    "quirks": ["uses em-dashes for emphasis", "asks rhetorical questions"]
  },
  "history": {
    "background": "Grew up in Portland, moved to San Francisco. Obsessed with indie brands and their stories.",
    "origin_story": "Started blogging at 16, got picked up by a marketing agency at 22."
  },
  "interests": [
    "indie brands",
    "coffee culture",
    "sourdough",
    "human-centered design",
    "authentic storytelling"
  ],
  "motivations": {
    "primary": "Help solopreneurs and small teams tell their real stories.",
    "values": ["authenticity", "clarity", "human connection"]
  }
}
```

### Layer Details

**Psychology → Neural Matrix**

Six 0.0–1.0 traits that shape behavior:

| Trait | Low (<0.3) | Moderate (0.3-0.7) | High (>0.7) |
|-------|-----------|-------------------|------------|
| **Creativity** | Conventional, proven | Balanced | Novel, non-standard |
| **Empathy** | Facts & data focused | Considers emotions | Prioritizes feelings |
| **Logic** | Intuition-driven | Context reasoning | Evidence-based |
| **Adaptability** | Consistent style | Adjusts when needed | Fluidly context-switches |
| **Charisma** | Direct, plain | Clear & approachable | Engaging, memorable |
| **Reliability** | Exploratory | Thorough when asked | Completes everything |

Example: Jordan's neural matrix shows high creativity (0.85) and high charisma (0.9), making her great at engaging storytelling. Moderate logic (0.6) means she prioritizes narrative over pure data.

**Linguistics**

Voice + style instructions:

- `voice`: Adjectives describing tone ("warm and conversational")
- `formality`: 0.0 (very casual) to 1.0 (very formal); Jordan is 0.4
- `uses_contractions`: true/false; Jordan uses them
- `vocabulary_level`: "simple", "accessible", "professional", "academic"
- `quirks`: List of stylistic quirks (list format, em-dashes, rhetorical questions, etc.)

### Field Rules

All layers are optional except `metadata`, `identity`, `capabilities`. You can start minimal and expand.

**Minimal example:**
```json
{
  "metadata": { "version": "1.1" },
  "identity": { "name": "Jordan Lee", "role": "Content Intern" },
  "capabilities": { "skills": ["blog-post-writer"] }
}
```

## skills/

Each skill is a directory with a `SKILL.md` file.

### Directory Structure

```
skills/
├── blog-post-writer/
│   └── SKILL.md
├── social-media-content/
│   └── SKILL.md
└── ... (one directory per skill)
```

### SKILL.md Format

YAML frontmatter + markdown body:

```markdown
---
name: Blog Post Writer
description: Write SEO-optimized blog posts from a brief, outline, or topic + keyword
version: 1.0.0
author: InternsMarket
tags: [content, seo, blogging, long-form]
---

# Blog Post Writer

Jordan's signature skill. Give her a topic, a keyword, and a target reader — she'll hand back a full draft that actually ranks and gets read.

## Usage

Provide any of the following:
- A topic + primary keyword + target audience
- An existing outline to flesh out
- A competitor post URL to create something better

Jordan will:
1. Write a compelling introduction with a hook
2. Structure with H2/H3 headers for SEO
3. Place keyword naturally
4. Suggest 3–5 internal linking opportunities
5. Write a meta description and 2 alternate titles

## Output Format

```
[TITLE — primary keyword included]

[META DESCRIPTION — 150-160 chars]

[INTRODUCTION — hook + context + preview]

[H2 SECTION]
...

[CONCLUSION + CTA]
```

## Examples

### Input
Topic: "How to start a sourdough starter"
Keyword: "sourdough starter"
Audience: Beginners, home bakers

### Output
[Full example blog post...]
```

### Frontmatter Fields

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `name` | string | yes | Skill display name |
| `description` | string | yes | One-line summary |
| `version` | string | yes | Semver |
| `author` | string | yes | Creator |
| `tags` | array | yes | Search tags |

### Best Practices

1. **One skill = one focused ability** (not 10 things bundled together)
2. **Clear usage examples**: Show input → output
3. **Define constraints**: Word count, tone, audience, format
4. **Markdown only**: No HTML, no embedded files
5. **Keep under 500 lines**: Long skills should be split

## memory-seeds/

Optional knowledge templates the intern uses when asked.

### Example

**brand-voice-template.md:**
```markdown
# Brand Voice Template

Complete this to define your brand's voice. Jordan will reference it when writing your content.

## Brand Name
[Your company/product name]

## Mission
[One sentence: what you do and why]

## Tone
- Formal or casual? (1-10 scale)
- Professional or playful?
- Educational or conversational?

## Values
- List 3-5 core values

## Do's & Don'ts
- DO: [guideline]
- DON'T: [guideline]

## Examples
Paste 2-3 examples of your ideal content voice.
```

**content-strategy-template.md:**
```markdown
# Content Strategy Template

Define your strategy so Jordan knows what to prioritize.

## Target Audience
[Who are they? What do they care about?]

## Content Pillars
[4-5 main topics you create about]

## Publishing Schedule
[Cadence: weekly blog + 3x social?]

## Goals
[What should content drive? Traffic? Leads? Engagement?]
```

## config/

Runtime configurations for ZeroClaw and OpenClaw.

### zeroclaw.toml

Compiled TOML config with system prompt:

```toml
[system_prompt]
behavioral_instructions = """
You are Jordan Lee, a content marketing intern with a warm, conversational voice.
You are highly creative (0.85) and charismatic (0.9), meaning you excel at engaging storytelling...
"""

voice_and_style = """
Tone: Warm and conversational. Use contractions naturally. Ask rhetorical questions to engage readers.
Vocabulary: Accessible; avoid jargon. Use em-dashes for emphasis.
"""

[capabilities]
skills = ["blog-post-writer", "social-media-content", "email-copywriter", "seo-keyword-researcher", "content-repurposer"]
```

This is **auto-generated** from `aieos.json` by the CLI. You don't edit it manually; it's generated by `im apply`.

### openclaw.yaml

Similar structure for OpenClaw:

```yaml
system_prompt:
  behavioral_instructions: |
    You are Jordan Lee...
  voice_and_style: |
    Tone: Warm and conversational...

capabilities:
  skills:
    - blog-post-writer
    - social-media-content
    - ...
```

Also **auto-generated** by `im apply`.

## Creating Your First Intern

### Step 1: Define Identity

Create `manifest.json`:
```json
{
  "id": "my-specialist-intern",
  "name": "Name — Specialty",
  "version": "1.0.0",
  "description": "One sentence about what they do",
  "author": "Your Name",
  "license": "proprietary",
  "aieos_version": "1.1",
  "supported_runtimes": ["zeroclaw"],
  "primary_runtime": "zeroclaw",
  "tags": ["tag1", "tag2"],
  "tier_required": "free",
  "skills": ["skill-1", "skill-2"],
  "created_at": "2026-02-25"
}
```

### Step 2: Define Personality

Create `aieos.json` (minimal start):
```json
{
  "metadata": { "version": "1.1" },
  "identity": {
    "name": "Your Intern Name",
    "role": "Your Role",
    "age": 25
  },
  "capabilities": {
    "skills": ["skill-1", "skill-2"]
  },
  "psychology": {
    "neural_matrix": {
      "creativity": 0.7,
      "empathy": 0.75,
      "logic": 0.6,
      "adaptability": 0.7,
      "charisma": 0.8,
      "reliability": 0.75
    }
  },
  "linguistics": {
    "voice": "professional and friendly",
    "formality": 0.5,
    "uses_contractions": true
  }
}
```

### Step 3: Define Skills

Create `skills/skill-1/SKILL.md`:
```markdown
---
name: Skill Name
description: What this skill does
version: 1.0.0
author: Your Name
tags: [tag1, tag2]
---

# Skill Name

[Description + usage + examples]
```

### Step 4: Validate

```bash
im validate ./my-specialist-intern
```

If no errors, you're ready to publish!

## Publishing to Registry

See [Deployment Guide](./deployment-guide.md) for publishing interns to the marketplace.

## Validation Checklist

Before publishing, verify:

- [ ] `manifest.json` has all required fields
- [ ] `id` is kebab-case and matches directory name
- [ ] `aieos.json` is valid JSON (use a JSON validator)
- [ ] All skills listed in manifest have matching directories
- [ ] Each `SKILL.md` has frontmatter (name, description, version, tags)
- [ ] No syntax errors in markdown files
- [ ] Neural matrix traits are 0.0-1.0
- [ ] `formality` is 0.0-1.0
- [ ] `tier_required` is free/starter/pro
- [ ] `version` is semver format
- [ ] No credentials or API keys in any file
- [ ] Run `im validate ./your-intern` — exits 0

## Tips & Best Practices

1. **Start minimal**: Create core identity + 1-2 skills, expand later
2. **Voice consistency**: Ensure psychology (neural matrix) + linguistics align
3. **Skill focus**: Each skill should be one focused ability, not a grab-bag
4. **Examples matter**: SKILL.md examples help users understand the output
5. **Iterate**: Publish v1.0.0, get feedback, release v1.1.0 with improvements
6. **Test locally first**: Use `--local ./your-intern` when installing locally

## Examples

See `/packages/interns/content-marketing-intern/` for a complete, production example.
