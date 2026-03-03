/** Skill package manifest schema — descriptor for .claude/skills/* packages */
import { z } from 'zod';

export type SkillRuntime = 'zeroclaw' | 'openclaw' | 'claude-code';

export interface SkillManifest {
  readonly name: string;        // kebab-case slug
  readonly version: string;     // semver
  readonly description: string;
  readonly runtimes: SkillRuntime[];
  readonly dependencies?: Record<string, string>; // name -> semver range
  readonly author: string;
  readonly license: string;
}

/** Safe slug pattern: lowercase alphanumeric + hyphens only (min 2 chars) */
export const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

const SEMVER_REGEX = /^\d+\.\d+\.\d+(-[\w.]+)?$/;

export const SkillManifestSchema = z.object({
  name: z.string().regex(SLUG_REGEX, 'name must be kebab-case slug'),
  version: z.string().regex(SEMVER_REGEX, 'version must be valid semver'),
  description: z.string().min(1),
  runtimes: z.array(z.enum(['zeroclaw', 'openclaw', 'claude-code'])).min(1),
  dependencies: z.record(z.string(), z.string()).optional(),
  author: z.string().min(1),
  license: z.string().min(1),
});
