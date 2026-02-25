# Codebase Summary

Complete file-by-file inventory of the InternsMarket monorepo (~60 source files, 5,141 LOC).

## packages/core

Shared library: AIEOS types, validators, compilers.

### src/types (10 files)

| File | Purpose | Key Exports |
|------|---------|-------------|
| `aieos-metadata.ts` | AIEOS layer: version, timestamps | `AieosMetadata` |
| `aieos-identity.ts` | AIEOS layer: name, pronouns, role, age, location | `AieosNames`, `AieosIdentity` |
| `aieos-capabilities.ts` | AIEOS layer: skills array + skill descriptions | `AieosSkill`, `AieosCapabilities` |
| `aieos-psychology.ts` | AIEOS layer: neural matrix (6 traits), emotional profile, ocean traits | `NeuralMatrix`, `OceanTraits`, `EmotionalProfile`, `AieosPsychology` |
| `aieos-physicality.ts` | AIEOS layer: body appearance, avatar prompts | `AieosImagePrompts`, `AieosPhysicality` |
| `aieos-linguistics.ts` | AIEOS layer: voice, idiolect, text style, vocabulary | `AieosTextStyle`, `AieosIdiolect`, `AieosVoiceConfig`, `AieosLinguistics` |
| `aieos-history.ts` | AIEOS layer: background story, origin story | `AieosHistory` |
| `aieos-interests.ts` | AIEOS layer: hobbies, topics, passions | `AieosInterests` |
| `aieos-motivations.ts` | AIEOS layer: goals, values, drivers | `AieosMotivations` |
| `aieos-entity.ts` | AIEOS layer: complete entity (all 9 layers combined) + standard spec | `AieosStandard`, `AieosEntity` |

### src/types (continued)

| File | Purpose | Key Exports |
|------|---------|-------------|
| `intern-manifest.ts` | .intern package metadata schema + Zod validator | `InternManifest`, `TierRequired`, `SupportedRuntime`, `InternManifestSchema` |
| `intern-package.ts` | .intern directory structure type definition | `SkillFile`, `InternPackage` |

### src/validators (1 file)

| File | Purpose | Key Exports |
|------|---------|-------------|
| `aieos-zod-schema.ts` | Zod schemas for all AIEOS layers; `validateAieos()` function | `AieosEntitySchema`, `validateAieos()` |

### src/compiler (4 files)

| File | Purpose | Key Exports |
|------|---------|-------------|
| `neural-matrix-compiler.ts` | Maps 6 traits (0.0-1.0) → behavioral instructions (low/moderate/high buckets) | `compileNeuralMatrix()` |
| `linguistics-compiler.ts` | Voice + idiolect + style → text style instructions (tone, formality, quirks) | `compileLinguistics()` |
| `persona-prompt-compiler.ts` | Combines all layers → complete system prompt for LLM | `compilePersonaPrompt()` |
| `openclaw-identity-compiler.ts` | Extracts structured identity JSON for OpenClaw runtime (name, role, traits) | `compileOpenclawIdentity()` |

### src/package-io (3 files)

| File | Purpose | Key Exports |
|------|---------|-------------|
| `intern-package-reader.ts` | Read manifest.json + aieos.json from .intern directory | `readInternPackage()` |
| `intern-package-validator.ts` | Validate .intern directory structure; check manifest + aieos match | `validateInternPackage()` |
| `intern-package-writer.ts` | Write manifest.json + aieos.json to disk | `writeInternPackage()` |

### src/index.ts

Exports all types, validators, compilers, and `VERSION` constant. Public API entry point.

---

## packages/cli

Command-line application (Commander + Ink v5).

### src/commands (8 files)

React/Ink components that render TUI for each command:

| File | Command | Purpose |
|------|---------|---------|
| `setup-command.tsx` | `im setup` | Interactive wizard for runtime installation (ZeroClaw, OpenClaw); `--runtime`, `--yes` flags |
| `install-command.tsx` | `im install <id>` | Download + extract + validate intern from registry; show progress bar |
| `update-command.tsx` | `im update [id]` | Check for updates; update one or all interns |
| `remove-command.tsx` | `im remove <id>` | Delete installed intern from local store |
| `list-command.tsx` | `im list` | Show all installed interns + versions |
| `activate-command.tsx` | `im activate` | License key wizard; store key in config |
| `status-command.tsx` | `im status` | Display current tier + installed count |
| `apply-command.tsx` | `im apply <id>` | Generate runtime config for ZeroClaw or OpenClaw |

### src/constants (1 file)

| File | Purpose | Key Exports |
|------|---------|-------------|
| `signing-keys.ts` | Ed25519 public keys for package signature verification (hex-encoded, 32 bytes); supports key rotation | `TRUSTED_PUBLIC_KEYS` |

### src/services (14 files)

Business logic, no UI:

| File | Purpose | Key Exports |
|------|---------|-------------|
| `runtime-installer.ts` | Detect, download, and install runtimes (ZeroClaw from GitHub releases, OpenClaw git clone) | `getRuntimeInfo()`, `installRuntime()`, `isRuntimeInstalled()` |
| `config-store.ts` | XDG-compliant persistent config store (conf package); tier, license key, activationId | `configStore` |
| `license-constants.ts` | Polar.sh URLs, org ID, TTLs, benefit→tier mapping, GitHub Releases constants | `POLAR_ACTIVATE_URL`, `POLAR_VALIDATE_URL`, `BENEFIT_TIER_MAP`, `CACHE_TTL_*_MS` |
| `license-activator.ts` | Wizard interaction: prompt for Polar.sh license key, validate format, store in config | `activateLicense()` |
| `license-validator.ts` | Check license validity via Polar.sh API: cache-first (24h TTL for paid, 1h for free), grace period (3 uses over 3 days) | `checkLicense()`, `getCurrentTier()` |
| `license-tier-guard.ts` | Gate install/update by tier: raise `TierError` if tier < required | `guardTierRequired()` |
| `package-signature-verifier.ts` | Ed25519 signature verification using node:crypto; compares signature against integrity string | `verifyPackageSignature()` |
| `bundle-installer.ts` | Download tarball → extract → verify signature → validate → watermark → save to local store | `installIntern()` |
| `registry-client.ts` | Fetch manifest + tarball URLs from GitHub Releases manifest.json (5-min ETag cache) | `fetchManifest()`, `fetchTarballUrl()` |
| `npm-package-resolver.ts` | Resolve npm package names; detect shell vs. full packages; manage npm-local install flow | `resolveNpmPackage()`, `isShellPackage()` |
| `package-watermarker.ts` | Inject activationId into manifest.json for installation tracking (no PII) | `watermarkPackage()` |
| `local-store-manager.ts` | Read/write interns to XDG data directory (`~/.internsmarket/interns/`) | `saveIntern()`, `readIntern()`, `listInterns()`, `removeIntern()` |
| `runtime-adapter-factory.ts` | Factory: return correct adapter (ZeroClaw or OpenClaw) based on flag | `getRuntimeAdapter()` |
| `runtime-adapter-zeroclaw.ts` | Generate zeroclaw.toml config from aieos.json; compile neural matrix + linguistics | `ZeroClawAdapter` |
| `runtime-adapter-openclaw.ts` | Generate openclaw.yaml config + identity.json from aieos.json | `OpenClawAdapter` |

### src/ui (4 files)

Reusable Ink React components:

| File | Purpose | Key Exports |
|------|---------|-------------|
| `error-message.tsx` | Red ✗ + error text on black background | `ErrorMessage` component |
| `success-message.tsx` | Green ✓ + success text | `SuccessMessage` component |
| `status-badge.tsx` | Colored badge: tier name (Free/Starter/Pro) | `StatusBadge` component |
| `wizard-step.tsx` | Interactive input prompt (keyboard navigation, validation) | `WizardStep` component |

### src/cli.tsx

Commander entry point: defines all 8 commands, wires to Ink components.

### bin/im.js

Entry point (shebang + require main). Installed as `npm bin` alias for `im` command.

---

## packages/website

Next.js 15 landing page with Tailwind CSS v4. Static site with component architecture.

### src/app (2 files)

| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout with fonts (Anton, Inter, JetBrains Mono), global styles |
| `page.tsx` | Home page (server component); imports and renders all sections |

### src/components (9 files)

Section-based components. Each exported as named function:

| File | Purpose | Dependencies |
|------|---------|--------------|
| `navigation-bar.tsx` | Header with logo, nav links, CTA buttons | None (client component) |
| `hero-section.tsx` | Main headline, subheading, hero image | None |
| `feature-highlights-section.tsx` | 4 feature cards (with icons) | None |
| `how-it-works-section.tsx` | 4-step process flow | None |
| `intern-catalog-section.tsx` | Grid of all 11 interns | `intern-card.tsx`, `interns-data.ts` |
| `intern-card.tsx` | Single intern preview card | None |
| `pricing-section.tsx` | 3-tier pricing table with CTA buttons | None |
| `social-proof-section.tsx` | Testimonials, trust badges | None |
| `final-cta-section.tsx` | Last call-to-action before footer | None |
| `footer-section.tsx` | Footer with links, branding | None |

### src/data (1 file)

| File | Purpose | Exports |
|------|---------|---------|
| `interns-data.ts` | Hardcoded list of 11 intern profiles (name, role, avatar, tags) | `InternsData[]` |

### src/app/globals.css (1 file)

CSS custom properties (design tokens) for colors, spacing, fonts. Tailwind v4 integration.

### public/ (images, favicon)

Static assets: hero image, intern avatars, icons, favicon.

---

## packages/interns

AI intern bundles (`.intern` packages). 11 intern personas, each a `.intern` directory.

### Intern List

Each intern has: `manifest.json`, `aieos.json`, `skills/`, `memory-seeds/`, `config/`.

| Intern | ID | Role | Status |
|--------|----|----|--------|
| Jordan Lee | `content-marketing-intern` | Content Marketing Intern | Launch (v1.0) |
| (ProMax) | `code-review-intern` | Code Review Intern | v1.1 (ProMax upgrade) |
| Data Analyst | `data-analyst-intern` | Data Analysis Intern | v1.1 |
| DevOps Specialist | `devops-infrastructure-intern` | DevOps & Infrastructure Intern | v1.1 |
| Luna Sage | `life-coach-intern` | Life OS Coach Intern | v1.1 |
| Ops Manager | `ops-meetings-intern` | Ops & Meetings Coordinator | v1.1 |
| QA Tester | `qa-testing-intern` | QA & Testing Intern | v1.1 |
| Researcher | `research-intern` | Research Intern | v1.1 |
| Social Media | `social-media-intern` | Social Media Intern | v1.1 |
| Tech Writer | `technical-writer-intern` | Technical Writer Intern | v1.1 |
| UX Designer | `ux-research-design-intern` | UX Research & Design Intern | v1.1 |

---

## Scripts (5 files)

Utility scripts for key signing and publishing:

| File | Purpose | Input/Output |
|------|---------|-------------|
| `generate-signing-keypair.ts` | Generate Ed25519 keypair for package signing; prints PUBLIC_KEY_HEX for signing-keys.ts | Output: private key (secure storage), public key hex (to signing-keys.ts) |
| `sign-package.ts` | Sign intern package tarball with Ed25519 private key; generates signature.json | Input: tarball path, private key; Output: signature hex |
| `publish-to-github-releases.ts` | Publish intern tarballs + manifest.json to GitHub Releases (packages-v1 tag) | Input: intern list; Output: GitHub release assets |
| `publish-free-intern.sh` | Bash script: npm publish free intern packages (3 full bundles) | Input: npm credentials; Output: published to npm registry |
| `publish-paid-intern-shell.sh` | Bash script: npm publish paid tier shell packages (8 shells referencing GitHub Releases) | Input: npm credentials; Output: published to npm registry |

## Configuration & Root Files

| File | Purpose |
|------|---------|
| `package.json` | npm workspaces root; scripts: build, dev, test, lint |
| `tsconfig.base.json` | Shared TypeScript config (inherited by packages) |
| `packages/core/package.json` | Core lib: exports types, compilers, validators |
| `packages/core/tsconfig.json` | TypeScript config: ESM, NodeNext, strict mode |
| `packages/cli/package.json` | CLI app: Commander, Ink, React, Zod, conf, got |
| `packages/cli/tsconfig.json` | TypeScript config: ESM, jsx: react-jsx |
| `packages/interns/package.json` | Interns workspace (empty, no code) |
| `scripts/` | Signing, publishing, and distribution scripts |
| `.claude/commands/.md` | Claude Code command definitions |
| `CLAUDE.md` | Project-specific Claude Code rules |
| `.repomixignore` | Repomix ignore rules |
| `.gitignore` | Git ignore rules |

---

## Documentation (6 files)

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Project overview, quickstart, commands, tech stack | End users, developers |
| `docs/system-architecture.md` | Monorepo layout, data flow, AIEOS schema, runtime adapters | Developers |
| `docs/code-standards.md` | TypeScript/ESM conventions, file naming, 200-line limit, testing | Developers |
| `docs/cli-reference.md` | All 7 commands with flags, examples, exit codes, troubleshooting | End users |
| `docs/intern-authoring-guide.md` | How to create a `.intern` package (manifest, aieos, skills, memory) | Creators |
| `docs/deployment-guide.md` | Bundle, host, register interns in marketplace | Publishers |

---

## Test Files

| Package | Config | Framework |
|---------|--------|-----------|
| `packages/core/vitest.config.ts` | Vitest config | Vitest |
| `packages/cli/vitest.config.ts` | Vitest config | Vitest |

Tests are co-located with source files (`.test.ts`, `.test.tsx`).

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| packages/core TypeScript files | 28 |
| packages/cli TypeScript files | 28 (includes new signing, watermarking, npm resolver) |
| packages/website TypeScript/CSS | 15 |
| React/Ink components (.tsx) | 22 |
| Type definitions | 12 |
| Validators/Compilers | 5 |
| Services (CLI) | 14 (added: signing-verifier, npm-resolver, watermarker) |
| Commands | 8 |
| .intern packages | 11 (3 free full, 8 paid shell) |
| Utility scripts | 5 (signing, publishing, distribution) |
| Configuration files | 10 |
| Documentation files | 7 |
| **Total source files** | **~120** |
| **Total source LOC** | **~5,600** |

---

## Architecture at a Glance

```
User CLI Command
  ↓
Commander (cli.tsx)
  ↓
Ink React Component (commands/*.tsx)
  ↓
Service Layer (services/*.ts)
  ├─ Config management (config-store.ts)
  ├─ License validation (license-validator.ts)
  ├─ Bundle management (bundle-installer.ts, registry-client.ts)
  ├─ Runtime adapters (runtime-adapter-*.ts)
  └─ Local storage (local-store-manager.ts)
  ↓
Core Library (@internsmarket/core)
  ├─ AIEOS types (types/aieos-*.ts)
  ├─ Validators (validators/aieos-zod-schema.ts)
  ├─ Compilers (compiler/*.ts)
  └─ Package I/O (package-io/*.ts)
  ↓
Data
  ├─ Config: ~/.config/internsmarket/config.json
  ├─ Interns: ~/.internsmarket/interns/
  └─ Registry: https://registry.internsmarket.com/
```

---

## Key Dependencies

| Package | Version | Use |
|---------|---------|-----|
| commander | ^14.0.0 | CLI argument parsing |
| ink | ^5.1.0 | React-based TUI rendering |
| react | ^18.3.0 | UI framework |
| zod | ^3.24.0 | Runtime validation |
| conf | ^13.0.0 | XDG-compliant config storage |
| got | ^14.4.0 | HTTP client (download tarballs) |
| execa | ^9.6.1 | Safe subprocess execution |
| typescript | ^5.7.0 | Language + compiler |
| vitest | ^4.0.18 | Test framework |

---

## Development Workflows

### Build
```bash
npm run build  # Compile all packages (tsc)
```

### Test
```bash
npm test  # Run all tests (vitest)
```

### Lint
```bash
npm run lint  # Type check (tsc --noEmit)
```

### Watch
```bash
npm run dev  # Watch mode (tsc --watch)
```

### Local Development
```bash
npm run start  # Run im CLI locally
```

---

## Notes

- **ESM-only**: All packages use `"type": "module"` and `.js` extensions in imports
- **No test files included**: The repomix output only lists source structure (tests are referenced but not shown)
- **Compiled output**: `dist/` directories exist but are generated (not shown in source)
- **Package management**: npm workspaces (no lerna, yarn, pnpm)
