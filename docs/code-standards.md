# Code Standards

All InternsMarket code follows TypeScript + ESM conventions optimized for clarity and maintainability.

## Language & Build

| Standard | Rule | Rationale |
|----------|------|-----------|
| **Module System** | ESM-only (`"type": "module"` in package.json) | Modern, tree-shakeable, native Node.js 20+ |
| **Module Resolution** | `moduleResolution: NodeNext` in tsconfig.json | Supports `.js` extensions in imports |
| **File Extensions** | Import paths must use `.js` extension (e.g., `./services/foo.js`) | ESM requirement; TS transpiler adds them automatically |
| **TypeScript** | Strict mode (`strict: true`) | No implicit any, full type safety |
| **Target** | `"target": "ES2020"` | Async/await, modern syntax |

## File Structure

### Naming Convention

| Type | Convention | Example |
|------|-----------|---------|
| Functions, services | kebab-case | `license-validator.ts`, `bundle-installer.ts` |
| React components | kebab-case | `error-message.tsx`, `wizard-step.tsx` |
| Type/interface files | kebab-case | `aieos-entity.ts`, `intern-manifest.ts` |
| Exported types | PascalCase | `type AieosEntity`, `interface InternManifest` |
| Variables/functions | camelCase | `getCurrentTier()`, `compileLinguistics()` |
| Constants | UPPER_SNAKE_CASE | `CACHE_TTL_PAID_MS`, `VARIANT_TIER_MAP` |

### File Size Limit

**Max 200 lines per file.** If you exceed this:
1. **Split by domain**: `user-service.ts` → `user-service-auth.ts` + `user-service-profile.ts`
2. **Extract utilities**: Complex logic → separate `utils-date-math.ts`
3. **Separate concerns**: Business logic → separate file from UI

Example split:
```
services/
├── license-validator.ts     (validate + cache logic)
├── license-activator.ts     (wizard interaction)
└── license-tier-guard.ts    (tier gating)
```

## TypeScript Conventions

### Imports

```typescript
// ✓ ESM with .js extension (required)
import { compileNeuralMatrix } from '../compiler/neural-matrix-compiler.js';
import type { NeuralMatrix } from '../types/aieos-psychology.js';

// ✗ No .js extension (will fail)
import { compileNeuralMatrix } from '../compiler/neural-matrix-compiler';

// ✓ React imports
import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
```

### Type Definitions

```typescript
// ✓ Use interfaces for contracts
export interface InternManifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
}

// ✓ Use type for unions/intersections
export type TierRequired = 'free' | 'starter' | 'pro';
export type SupportedRuntime = 'zeroclaw' | 'openclaw';

// ✗ No 'any'
const value: any = getTheThing(); // NEVER do this

// ✓ Use unknown if you don't know the type
const value: unknown = getTheThing();
if (typeof value === 'string') {
  // now it's a string
}
```

### Arrow Functions

```typescript
// ✓ Prefer arrow functions
const compileMatrixInstructions = (nm: NeuralMatrix): string => {
  // ...
};

// ✓ Export functions as const
export const getCurrentTier = (): Tier => {
  return configStore.get('tier') ?? 'free';
};
```

### Error Handling

```typescript
// ✓ Use try-catch for async
try {
  const res = await fetch(url);
  const data = await res.json() as LsValidateResponse;
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  // handle gracefully
}

// ✓ Custom error classes for domain logic
export class TierError extends Error {
  constructor(public required: TierRequired) {
    super(`Tier required: ${required}`);
  }
}
```

## Website / Frontend (packages/website)

### Next.js App Router Conventions

- **Server Components** (default): All page and layout files use server components
- **Client Components**: Add `'use client'` directive at top of interactive components
- **Page Structure**:
  - `src/app/layout.tsx` — Root layout (fonts, globals.css, metadata)
  - `src/app/page.tsx` — Home page (server component, imports section components)
  - `src/app/not-found.tsx` — 404 page

### Component Organization

**Naming:**
- Use **kebab-case** for file names: `navigation-bar.tsx`, `hero-section.tsx`
- Section components end in `-section.tsx`
- UI components are descriptive: `intern-card.tsx`, not `Card.tsx`

**Structure:**
- Each section is a standalone exported function
- Components accept minimal props (prefer static data from `interns-data.ts`)
- Example: `navigation-bar.tsx` imports nav links inline (no props)

### Styling with Tailwind CSS v4

**Design Tokens (CSS Custom Properties):**
- Defined in `src/app/globals.css`
- Colors, spacing, typography available as variables
- Usage: `className="bg-[var(--color-primary)]"`

**Fonts:**
- `Anton` — Display/headlines (imported in layout.tsx)
- `Inter` — Body text (default)
- `JetBrains Mono` — Code blocks

**Examples:**
```tsx
// ✓ Section component with Tailwind
export function HeroSection() {
  return (
    <section className="py-20 bg-[var(--bg-gradient)]">
      <h1 className="font-anton text-5xl">Hire AI Interns</h1>
    </section>
  );
}

// ✓ Use client for interactivity
'use client';
import { useState } from 'react';

export function PricingToggle() {
  const [yearly, setYearly] = useState(false);
  return <button onClick={() => setYearly(!yearly)}>Annual Billing</button>;
}
```

---

## React / Ink Components (packages/cli)

### File Extension

Use `.tsx` for any file exporting React components:

```typescript
// ✓ error-message.tsx
import React from 'react';
import { Box, Text } from 'ink';

export function ErrorMessage({ message }: { message: string }) {
  return <Box><Text color="red">✗ {message}</Text></Box>;
}
```

### Component Pattern

```typescript
// ✓ Functional components with props interface
interface Props {
  internId: string;
  force?: boolean;
}

export function InstallCommand({ internId, force }: Props) {
  const { exit } = useApp();
  const [step, setStep] = useState<'installing' | 'success' | 'error'>('installing');

  useEffect(() => {
    // async work
    installIntern(internId, { force })
      .then(result => {
        setStep('success');
        setTimeout(() => exit(), 1500);
      })
      .catch(err => {
        setStep('error');
        setTimeout(() => exit(), 3000);
      });
  }, []);

  return (
    <Box flexDirection="column">
      {/* render based on step */}
    </Box>
  );
}
```

## Validation

Use **Zod** for runtime schema validation:

```typescript
import { z } from 'zod';

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

export const InternManifestSchema = z.object({
  id: z.string().regex(SLUG_REGEX, 'ID must be kebab-case slug'),
  name: z.string().min(1),
  version: z.string().min(1),
  tier_required: z.enum(['free', 'starter', 'pro']),
});

// Parse with full type safety
const manifest = InternManifestSchema.parse(jsonData);
// if invalid, throws ZodError

// Safe parsing
const result = InternManifestSchema.safeParse(jsonData);
if (!result.success) {
  console.error(result.error.errors);
}
```

## Configuration & Storage

Use **conf** package (XDG-compliant, persistent JSON store):

```typescript
import Conf from 'conf';

export const configStore = new Conf({
  projectName: 'internsmarket',
  // macOS: ~/Library/Preferences/internsmarket-nodejs/config.json
  // Linux: ~/.config/internsmarket/config.json
  // Windows: %APPDATA%\internsmarket\config.json
});

// Get with default
const tier = configStore.get('tier') ?? 'free';

// Set
configStore.set('tier', 'starter');
configStore.set('validUntil', Date.now() + 24 * 60 * 60 * 1000);

// Get all
const all = configStore.store;
```

## Testing

### Framework

- **Vitest** for unit + integration tests
- Config: `vitest.config.ts` in each package

### Patterns

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

describe('internPackageValidator', () => {
  let tempDir: string;

  beforeEach(async () => {
    // Create temp directory for file ops
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'intern-test-'));
  });

  it('validates valid manifest', async () => {
    const validManifest = {
      id: 'content-marketing-intern',
      name: 'Jordan Lee',
      version: '1.0.0',
      // ...
    };
    const result = validateInternPackage(validManifest);
    expect(result.valid).toBe(true);
  });

  it('rejects invalid id (not kebab-case)', async () => {
    const invalid = { id: 'ContentMarketingIntern', /* ... */ };
    const result = validateInternPackage(invalid);
    expect(result.valid).toBe(false);
  });

  // ✓ No real network calls
  // ✓ Mock Lemon Squeezy with vi.mock()
  // ✓ Use temp directories for fs ops
});
```

### Coverage

Aim for >80% unit test coverage on:
- Validators (100% coverage required)
- Compilers (all paths)
- Services (happy path + error cases)

Components (Ink UI) are integration-tested via CLI tests; unit test only logic.

## Documentation

### Code Comments

```typescript
// ✓ Explain 'why', not 'what' (code is obvious)
// Cache is valid for 24h; if stale, validate via network.
// If network fails, use grace period (3 days) before forcing free tier.
if (Date.now() < configStore.get('validUntil')) {
  return configStore.get('tier');
}

// ✓ Mark deliberate workarounds
// eslint-disable-next-line react-hooks/exhaustive-deps
// Intentional: dependency array should be empty (init once on mount)
```

### JSDoc (minimal)

Only use JSDoc for complex public APIs:

```typescript
/**
 * Compile NeuralMatrix traits (0.0-1.0 scale) into behavioral instructions.
 * @param nm - NeuralMatrix with 6 traits (creativity, empathy, logic, adaptability, charisma, reliability)
 * @returns System prompt instructions describing how the intern should behave
 */
export const compileNeuralMatrix = (nm: NeuralMatrix): string => {
  // ...
};
```

## Linting & Formatting

### TypeScript

```bash
npm run lint  # tsc --noEmit in each package
```

No additional formatters (Prettier, ESLint) for MVP. Focus on:
- No syntax errors
- Type safety (`strict: true`)
- Unused imports

### Pre-commit

Before committing:
```bash
npm run lint   # type check
npm test       # run tests
npm run build  # compile
```

## Project Structure Best Practices

### Separation of Concerns

```
packages/core/
├── src/types/         # Type definitions only (no logic)
├── src/validators/    # Zod schemas + validate() functions
├── src/compiler/      # Transform types → output (prompt, config)
└── src/package-io/    # File I/O (read manifest, write config)

packages/cli/
├── src/commands/      # Ink components + command handlers
├── src/services/      # Business logic (install, activate, validate)
├── src/ui/            # Reusable Ink components
└── bin/               # Entry point
```

### Imports

```typescript
// ✓ OK to import core types
import type { AieosEntity } from '@internsmarket/core';

// ✓ OK for CLI to import core
import { validateAieos } from '@internsmarket/core';

// ✗ Never: core imports from cli
import { something } from '@internsmarket/cli';  // NEVER
```

## Performance

### Bundle Size

Keep the CLI binary under 50MB after packaging. Current breakdown:
- Node.js executable: ~40MB
- Ink + React: ~2MB
- Other deps: ~5MB

### Async Patterns

```typescript
// ✓ Use async/await, not .then() chains
const manifest = await installIntern(id);

// ✓ Parallel operations
const [m1, m2] = await Promise.all([
  readManifest(id1),
  readManifest(id2),
]);

// ✓ Abort slow operations
const controller = new AbortController();
setTimeout(() => controller.abort(), 10000);
const res = await fetch(url, { signal: controller.signal });
```

## Security Considerations

### Authentication & Licensing

1. **No credentials in code**: API keys, license keys → `conf` store only
2. **Polar.sh Integration**: Use Polar Customer Portal API (no auth required, keyed by license-key + org-id)
3. **Tier Fallback**: If network fails, grace period allows 3 offline uses before reverting to free tier
4. **Tier Ranking**: Pro > Starter > Free; reject downgrades via tier-rank comparison

### Package Security

5. **Ed25519 Signatures**: All intern packages signed with Ed25519 (NIST standard)
   - Uses Node.js built-in `crypto` module (zero npm dependencies)
   - Public keys hardcoded in `signing-keys.ts` (allows rotation: add new key, deprecate old)
   - Signature verifies over integrity string: `${internId}@${version}:${sha256}`
   - Bump CLI major version when removing deprecated keys

6. **Path Traversal Protection**: Validate intern IDs against kebab-case regex (`/^[a-z0-9][a-z0-9-]*[a-z0-9]$/`)
   - Extract paths use `path.join()` + validation to prevent `../` escapes

### Input Validation & Execution

7. **Validate all input**: Use Zod before processing (manifest, config, license responses)
8. **No shell execution**: Use execa package (escapes args, no shell injection)
9. **HTTPS only**: All API calls via HTTPS (Polar.sh, GitHub Releases)
10. **Verify downloads**: Check tarball hash against manifest SHA256; verify Ed25519 signature

### Watermarking & Tracking

11. **Package Watermarking**: Inject `activationId` (random UUID) into manifest at install time
    - No PII collected; used for activation tracking only
    - Watermarked manifest persists in local store

### npm Publishing

12. **Shell vs. Full Packages**: Free interns published as full bundles; paid interns as shell packages
    - Shell packages reference GitHub Releases content (fetched at runtime after license check)
    - Prevents free redistribution of paid content

## Dependencies

| Package | Use | Notes |
|---------|-----|-------|
| commander | CLI parsing | Industry standard |
| ink | React-based TUI | Maintains state, renders to terminal |
| react | UI library | Required for Ink |
| zod | Runtime validation | Type-safe parsing |
| conf | Config storage | XDG-compliant, cross-platform |
| got | HTTP client | Promise-based, retries, timeouts |
| execa | Run subprocesses | Safe argument escaping |

Avoid:
- fs-extra (use fs/promises)
- Axios (use got or fetch)
- Lodash (use ES6 built-ins)
- Multiple test frameworks (use Vitest only)
