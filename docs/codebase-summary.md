# Codebase Summary

Complete file-by-file inventory of the InternsMarket monorepo (44 source files).

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
| `apply-command.tsx` | `im apply <id>` | Generate runtime config (zeroclaw.toml or openclaw.yaml) |

### src/services (11 files)

Business logic, no UI:

| File | Purpose | Key Exports |
|------|---------|-------------|
| `runtime-installer.ts` | Detect, download, and install runtimes (ZeroClaw from GitHub releases, OpenClaw git clone) | `getRuntimeInfo()`, `installRuntime()`, `isRuntimeInstalled()` |
| `config-store.ts` | XDG-compliant persistent config store (conf package); tier, license key, instance ID | `configStore` |
| `license-constants.ts` | License tier settings: cache TTL, variant ID → tier mapping, API endpoints | `LS_VALIDATE_URL`, `VARIANT_TIER_MAP`, `CACHE_TTL_*_MS` |
| `license-activator.ts` | Wizard interaction: prompt for license key, validate format, store in config | `activateLicense()` |
| `license-validator.ts` | Check license validity: cache-first (24h TTL), network fallback, grace period (3 days) | `checkLicense()`, `getCurrentTier()` |
| `license-tier-guard.ts` | Gate install/update by tier: raise `TierError` if tier < required | `guardTierRequired()` |
| `local-store-manager.ts` | Read/write interns to XDG data directory (`~/.internsmarket/interns/`) | `saveIntern()`, `readIntern()`, `listInterns()`, `removeIntern()` |
| `registry-client.ts` | Fetch manifest + tarball URL from registry (static JSON) | `fetchManifest()`, `fetchTarballUrl()` |
| `bundle-installer.ts` | Download tarball → extract → validate → call local-store-manager to save | `installIntern()` |
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

## packages/interns

AI intern bundles (`.intern` packages).

### content-marketing-intern

The launch intern (Jordan Lee).

| Subdir | Purpose | Files |
|--------|---------|-------|
| `manifest.json` | Package metadata | ID, name, version, tier, skills, tags |
| `aieos.json` | AIEOS v1.1 entity | 9 layers: identity, psychology, linguistics, etc. |
| `skills/` | 5 skill definitions | Each skill: `.../SKILL.md` (YAML frontmatter + markdown) |
| `memory-seeds/` | Optional knowledge templates | Brand voice, content strategy templates (markdown) |
| `config/` | Runtime configs | `zeroclaw.toml`, `openclaw.yaml` (auto-generated) |

Skills:
1. `blog-post-writer/SKILL.md` — SEO-optimized long-form content
2. `social-media-content/SKILL.md` — Platform-specific social posts
3. `email-copywriter/SKILL.md` — Email sequences, newsletters
4. `seo-keyword-researcher/SKILL.md` — Keyword research, difficulty analysis
5. `content-repurposer/SKILL.md` — Reuse content across formats

---

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
| TypeScript source files (src/) | 29 |
| React/Ink components (.tsx) | 12 |
| Type definitions | 12 |
| Validators/Compilers | 5 |
| Services | 11 |
| UI components | 4 |
| Commands | 8 |
| Configuration files | 10 |
| Documentation files | 6 |
| **Total source files** | **46** |

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
