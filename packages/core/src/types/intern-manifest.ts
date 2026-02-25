/** .intern package manifest schema — the package descriptor */
import { z } from 'zod';

export type SupportedRuntime = 'zeroclaw' | 'openclaw';
export type TierRequired = 'free' | 'starter' | 'pro';

export interface InternManifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly author: string;
  readonly license: string;
  readonly aieos_version: string;
  readonly supported_runtimes: SupportedRuntime[];
  readonly primary_runtime: SupportedRuntime;
  readonly tags: string[];
  readonly tier_required: TierRequired;
  readonly skills: string[];
  readonly created_at: string;
  readonly registry_url?: string;
}

/** Safe slug pattern: lowercase alphanumeric + hyphens only */
const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

export const InternManifestSchema = z.object({
  id: z.string().regex(SLUG_REGEX, 'ID must be kebab-case slug'),
  name: z.string().min(1),
  version: z.string().min(1),
  description: z.string().min(1),
  author: z.string().min(1),
  license: z.string().min(1),
  aieos_version: z.string().min(1),
  supported_runtimes: z.array(z.enum(['zeroclaw', 'openclaw'])).min(1),
  primary_runtime: z.enum(['zeroclaw', 'openclaw']),
  tags: z.array(z.string()),
  tier_required: z.enum(['free', 'starter', 'pro']),
  skills: z.array(z.string()),
  created_at: z.string(),
  registry_url: z.string().optional(),
});
