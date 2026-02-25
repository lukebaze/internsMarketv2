# System Architecture

InternsMarket is a monorepo with four packages: **core** (shared types), **cli** (CLI tool), **website** (Next.js landing page), and **interns** (11 AI intern bundles).

## Monorepo Layout

```
internsmarket/
├── packages/
│   ├── core/              # Shared library (AIEOS types, validators, compilers)
│   │   ├── src/types/     # AIEOS schema (9 layers)
│   │   ├── src/compiler/  # Neural matrix, linguistics, persona prompt
│   │   ├── src/validators # Zod schemas
│   │   └── src/package-io # Manifest reader/writer/validator
│   ├── cli/               # CLI application (Commander + Ink)
│   │   ├── src/commands/  # 8 command handlers
│   │   ├── src/services/  # License, bundle, runtime adapters
│   │   ├── src/ui/        # Ink React components
│   │   └── bin/           # Entry point (im command)
│   ├── website/           # Next.js 15 landing page
│   │   ├── src/app/       # Layout, page (server components)
│   │   ├── src/components # Section-based UI (navigation, hero, features, etc.)
│   │   ├── src/data/      # Static data (interns-data.ts)
│   │   └── public/        # Assets (images, favicon)
│   └── interns/           # 11 .intern packages
│       ├── content-marketing-intern/
│       ├── code-review-intern/
│       ├── data-analyst-intern/
│       ├── ... (8 more)
│       └── ux-research-design-intern/
└── package.json          # npm workspaces
```

## Data Flow

### Setup Flow (Runtime Installation)

```
User Command:
  im setup [--runtime zeroclaw] [--yes]

↓ (SetupCommand)

Detect Installed Runtimes:
  runtime-installer → check ~/.zeroclaw, ~/.openclaw existence

↓

Interactive Mode (if no flags):
  Show welcome → multi-select runtimes (Space/Arrow keys)

Direct Mode (--runtime flag):
  Skip to install specific runtime

Auto Mode (--yes flag):
  Skip wizard, install all missing runtimes

↓

Install Selected Runtimes:
  - ZeroClaw: Download binary from GitHub → ~/.zeroclaw/bin/
  - OpenClaw: Git clone → ~/.openclaw/

↓

Success:
  render results → exit
```

### Install Flow

```
User Command:
  im install content-marketing-intern

↓ (InstallCommand)

Registry Lookup:
  registry-client → fetch manifest + tarball URL from GitHub Releases
  (5-min TTL cache via ETag)

↓

License Check:
  license-validator → Polar.sh API (cached 24h, grace period 3 days)
  tier-guard → verify tier allows N interns

↓

Package Verification:
  package-signature-verifier → Ed25519 signature check against TRUSTED_PUBLIC_KEYS
  (integrity: "${internId}@${version}:${sha256}")

↓

Bundle Install:
  bundle-installer → download tarball → extract → validate → verify signature
  intern-package-validator → schema check (manifest.json + aieos.json)

↓

Watermarking & Cleanup:
  package-watermarker → inject activationId into manifest for tracking
  (if post-rename failure → cleanup orphaned installPath to prevent stale files)

↓

Local Store:
  local-store-manager → save manifest + aieos.json to ~/.config/internsmarket/

↓

Success UI (Ink):
  render progress bar → show installed intern name → exit
```

### Apply Flow

```
User Command:
  im apply content-marketing-intern --runtime=zeroclaw

↓ (ApplyCommand)

Load Installed Intern:
  local-store-manager → read manifest + aieos.json

↓

Select Runtime Adapter:
  runtime-adapter-factory → ZeroClaw or OpenClaw

↓

Compile Persona:
  neural-matrix-compiler → behavioral instructions
  linguistics-compiler → voice + style + idiolect
  persona-prompt-compiler → complete system prompt
  openclaw-identity-compiler → identity JSON (if OpenClaw)

↓

Write Config:
  zeroclaw: config/zeroclaw.toml (from intern package)
  openclaw: config/openclaw.yaml + identity.json

↓

Output:
  print path to generated config
```

## AIEOS v1.1 Schema (9 Layers)

Each AI Intern is an AIEOS entity with:

| Layer | Purpose | Example |
|-------|---------|---------|
| **Metadata** | Version, created_at, modified_at | "created_at": "2026-02-25" |
| **Identity** | Name, pronouns, role, age, avatar | name: "Jordan Lee", role: "Content Intern" |
| **Capabilities** | Skills + skill descriptions | skills: ["blog-post-writer", ...] |
| **Psychology** | Neural matrix (6 0.0-1.0 traits) | creativity: 0.85, empathy: 0.75 |
| **Physicality** | Body appearance prompts for avatar generation | hair: "auburn, wavy" |
| **Linguistics** | Voice, idiolect, text style | uses_contractions: true, formality: 0.4 |
| **History** | Background story, origin | "Grew up in Portland, moved to SF..." |
| **Interests** | Hobbies, topics | ["coffee", "sourdough", "indie brands"] |
| **Motivations** | Goals, values, what drives them | "Help solopreneurs tell better stories" |

Example (partial):
```json
{
  "metadata": { "version": "1.1", "created_at": "2026-02-25" },
  "identity": { "name": "Jordan Lee", "pronouns": "she/her", "role": "Content Marketing Intern" },
  "psychology": { "creativity": 0.85, "empathy": 0.75, "logic": 0.6, ... },
  "linguistics": { "voice": "warm and conversational", "uses_contractions": true, ... },
  "capabilities": { "skills": ["blog-post-writer", "social-media-content", ...] }
}
```

## .intern Package Format

A `.intern` is a directory bundle:

```
content-marketing-intern/
├── manifest.json              # Package metadata
├── aieos.json                 # Full AIEOS entity
├── skills/
│   ├── blog-post-writer/
│   │   └── SKILL.md           # Skill definition (YAML frontmatter + markdown)
│   ├── social-media-content/
│   │   └── SKILL.md
│   └── ... (5 skills total)
├── memory-seeds/
│   ├── brand-voice-template.md
│   └── content-strategy-template.md
└── config/
    ├── zeroclaw.toml          # ZeroClaw runtime config
    └── openclaw.yaml          # OpenClaw runtime config
```

**manifest.json:**
- `id`: slug (kebab-case)
- `name`: human-readable name
- `version`: semver
- `aieos_version`: "1.1"
- `supported_runtimes`: ["zeroclaw", "openclaw"]
- `primary_runtime`: "zeroclaw" or "openclaw"
- `tier_required`: "free" | "starter" | "pro"
- `skills`: list of skill IDs
- `tags`: for search/discovery

**SKILL.md format:**
```yaml
---
name: Blog Post Writer
description: SEO-optimized long-form content
version: 1.0.0
author: InternsMarket
tags: [content, seo, blogging]
---

# Blog Post Writer

[Markdown description of what the skill does, usage, output format...]
```

## License System (Polar.sh)

### Tiers

| Tier | Interns | Cost | Features |
|------|---------|------|----------|
| Free | 1 | $0 | Try it out |
| Starter | 5 | $9/mo | Small team |
| Pro | Unlimited | $19/mo | Enterprise |

### Flow

1. **Activate**: User runs `im activate` → wizard prompts for Polar.sh license key
2. **Cache**: License key + tier stored in `~/.config/internsmarket/config.json` (24h TTL for paid, 1h for free)
3. **Validate**: On install, check cached tier. If stale, validate via Polar.sh API
4. **Fallback**: If network fails, grace period allows 3 days offline with up to 3 grace uses (maintains last valid tier)
5. **Tier Gate**: If tier < required (e.g., pro-only intern), reject with upgrade link

### Polar.sh Integration

- **API Endpoints**: Activate, Validate, Deactivate via Polar Customer Portal API
- **Benefit Mapping**: Each Polar benefit_id maps to CLI tier (Free/Starter/Pro)
- **Org ID**: Configured in license-constants.ts (POLAR_ORG_ID)
- **Tier Ranking**: Pro > Starter > Free (prevents downgrade attacks)

### Storage

Config file at `~/.config/internsmarket/config.json`:
```json
{
  "licenseKey": "pol_xxx_xxx",
  "tier": "starter",
  "validUntil": 1740123456000,
  "activationId": "uuid",
  "graceUsesRemaining": 3
}
```

Interns stored at `~/.internsmarket/interns/`:
```
~/.internsmarket/interns/
├── content-marketing-intern/
│   ├── manifest.json      (includes activationId for tracking)
│   └── aieos.json
└── ... (other installed interns)
```

## Runtime Adapters

### ZeroClaw Adapter

Writes `zeroclaw.toml`:
```toml
[system_prompt]
behavioral_instructions = "..."  # from neural-matrix-compiler
voice_and_style = "..."           # from linguistics-compiler
```

### OpenClaw Adapter

Writes:
- `openclaw.yaml` with system prompt
- `identity.json` from openclaw-identity-compiler

Identity JSON includes structured fields:
```json
{
  "name": "Jordan Lee",
  "role": "Content Marketing Intern",
  "personality_traits": { "creativity": 0.85, ... },
  "communication_style": { "formality": 0.4, ... }
}
```

## Command Flow Pattern

All CLI commands follow this pattern:

```typescript
// 1. Commander parses args
.command('install <intern-id>')
  .action(async (internId: string, opts: {...}) => {
    // 2. Render Ink component
    const { waitUntilExit } = render(
      <InstallCommand internId={internId} {...} />
    );
    // 3. Wait for async work to complete
    await waitUntilExit();
  });

// Inside Ink component:
// - useEffect handles business logic (services)
// - useState tracks UI state (step, progress, errors)
// - useApp().exit() when done
```

## Service Layer

| Service | Purpose |
|---------|---------|
| `config-store` | XDG-compliant config/data store (conf package); holds license, tier, activationId |
| `license-constants` | Polar.sh URLs, org ID, TTLs, benefit→tier mapping, GitHub Releases constants |
| `license-validator` | 24h cache + grace period for Polar.sh Customer Portal API |
| `license-activator` | License key input + validation wizard (supports Polar.sh format) |
| `license-tier-guard` | Reject installs if tier < required |
| `package-signature-verifier` | Ed25519 signature verification (zero npm deps, uses node:crypto) |
| `bundle-installer` | Download + extract + validate + verify signature → save to local store |
| `registry-client` | Fetch manifest/tarball URLs from GitHub Releases (5-min ETag cache) |
| `npm-package-resolver` | Resolve npm package names; shell vs. full detection for paid packages; skip symlinks on copy |
| `package-watermarker` | Inject activationId into manifest for install tracking |
| `intern-id-validator` | Shared validation for intern IDs (kebab-case); prevents path traversal |
| `local-store-manager` | Read/write interns to XDG data dir |
| `runtime-adapter-factory` | Factory for ZeroClaw/OpenClaw |
| `runtime-adapter-zeroclaw` | ZeroClaw config generation |
| `runtime-adapter-openclaw` | OpenClaw config + identity generation |

## Website Architecture

### Tech Stack
- **Framework**: Next.js 15.1.6 with App Router
- **Styling**: Tailwind CSS v4 with CSS custom properties (design tokens)
- **Fonts**: Anton (display), Inter (body), JetBrains Mono (code)
- **Rendering**: Static site generation (server components)
- **Deployment**: Vercel (preview + prod)

### Component Hierarchy

```
layout.tsx (root layout with fonts + globals.css)
  ├─ page.tsx (home page)
  │   ├─ navigation-bar.tsx
  │   ├─ hero-section.tsx
  │   ├─ feature-highlights-section.tsx
  │   ├─ how-it-works-section.tsx
  │   ├─ intern-catalog-section.tsx
  │   │   └─ intern-card.tsx (repeating)
  │   ├─ pricing-section.tsx
  │   ├─ social-proof-section.tsx
  │   ├─ final-cta-section.tsx
  │   └─ footer-section.tsx
  └─ not-found.tsx (404 page)
```

### Data Flow

All interns (11 profiles) are loaded from `src/data/interns-data.ts`. Each has:
- Name, role, avatar URL
- Tags (skills, specialties)
- Link to CLI install command

Design tokens (colors, spacing, typography) defined in `globals.css` via CSS custom properties, consumed by Tailwind v4.

## Testing Strategy

- **Unit tests**: Validators (Zod), compilers (neural matrix → prompt)
- **Integration tests**: Bundle install → extract → validate → store
- **No real network**: Mock Lemon Squeezy API, use temp directories for fs ops
- **Test framework**: Vitest

## Compilation Flow

From AIEOS entity → system prompt:

1. **Neural Matrix Compiler**: 6 traits (0.0-1.0) → behavioral instructions
   - Maps trait values to 3 buckets: low (<0.3), moderate (0.3-0.7), high (>0.7)
   - Generates specific behavioral rules per trait

2. **Linguistics Compiler**: voice + idiolect → text style instructions
   - Tone, formality, vocabulary level, quirks

3. **Persona Prompt Compiler**: Combines all layers → complete system prompt
   - "You are [identity]. You are [psychology]. You speak like [linguistics]."

4. **OpenClaw Identity Compiler**: Extracts structured identity JSON
   - Name, role, personality traits, communication style

## Package Security & Distribution

### Ed25519 Signature Verification

All intern packages are signed with Ed25519 (NIST standard, zero npm dependencies via node:crypto):

- **Signing**: `scripts/sign-package.ts` generates signature over integrity string `${internId}@${version}:${sha256}`
- **Verification**: `package-signature-verifier.ts` checks against `TRUSTED_PUBLIC_KEYS` (hardcoded hex-encoded keys)
- **Key Rotation**: Add new key to array, keep old key active for N months, bump CLI major version when removing old key
- **Build-Time Enforcement**: `signing-keys.ts` throws (not warns) if `TRUSTED_PUBLIC_KEYS` empty in non-test environments (prevents unsigned packages in production)

### Download URL Validation

- **URL Prefix Whitelisting**: `registry-client.ts` validates all `download_url` fields against expected GitHub repo prefix before fetching
- **Allowed Prefix**: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/` (configurable via `license-constants.ts`)
- **Prevents**: Manifest injection attacks that redirect to arbitrary domains
- **Implementation**: Check before instantiating HTTP client (reject early)

### Path Traversal Protection

- **Symlink Rejection**: `copyDirSync()` in `npm-package-resolver.ts` skips symlinks to prevent traversal attacks
- **Intern ID Validation**: `intern-id-validator.ts` enforces kebab-case regex `/^[a-z0-9-]+$/` on all intern IDs
- **Path Sanitization**: `path.join()` + validation prevent `../` escapes in extract paths

### GitHub Releases Distribution

- **Registry**: manifest.json hosted on GitHub Releases (public, no auth)
- **Caching**: 5-min ETag-based cache in registry-client
- **URL**: `https://github.com/internsmarket/packages/releases/download/packages-v1/manifest.json`
- **Tarballs**: Downloaded per-intern from manifest URLs (with URL validation)
- **Gate**: License check happens on CLI side before accepting install

### npm Package Publishing

- **Free Interns**: Full `.intern` bundles published to npm
  - `@internsmarket/content-marketing-intern`
  - `@internsmarket/code-review-intern`
  - (3 total free packages)

- **Paid Interns**: Shell packages published to npm with activation gate
  - `@internsmarket/starter-bundle-shell` (5 Starter-tier interns)
  - `@internsmarket/pro-bundle-shell` (8 Pro-tier interns)
  - Actual content fetched from GitHub Releases at runtime after license validation

### Package Watermarking

- **Purpose**: Track installation activations and tier usage
- **Implementation**: `package-watermarker.ts` injects `activationId` into manifest.json at install time
- **Storage**: Watermarked manifest persists in local store (~/.internsmarket/interns/)
- **Privacy**: activationId is random UUID; no PII collected
