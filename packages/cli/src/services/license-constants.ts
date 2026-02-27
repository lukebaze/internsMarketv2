/** License system constants — Polar.sh URLs, TTLs, benefit→tier mapping */
import type { Tier } from './config-store.js';

// Polar.sh Customer Portal API — no auth required
export const POLAR_ACTIVATE_URL =
  'https://api.polar.sh/v1/customer-portal/license-keys/activate';
export const POLAR_VALIDATE_URL =
  'https://api.polar.sh/v1/customer-portal/license-keys/validate';
export const POLAR_DEACTIVATE_URL =
  'https://api.polar.sh/v1/customer-portal/license-keys/deactivate';

// Polar organization ID — get from Polar dashboard → Settings → Organization
export const POLAR_ORG_ID = 'REPLACE_WITH_POLAR_ORG_ID';

export const CACHE_TTL_PAID_MS = 24 * 60 * 60 * 1000; // 24h
export const CACHE_TTL_FREE_MS = 1 * 60 * 60 * 1000;  // 1h
export const GRACE_USES = 3;

/**
 * Map Polar benefit_id → CLI tier.
 * Fill in after creating products in Polar dashboard.
 * Each paid tier is a separate Benefit in Polar.
 */
export const BENEFIT_TIER_MAP: Record<string, Tier> = {
  // 'STARTER_BENEFIT_ID': 'starter',
  // 'PRO_BENEFIT_ID': 'pro',
};

export const TIER_RANK: Record<Tier, number> = { free: 0, starter: 1, pro: 2 };

// GitHub Releases distribution — public repo, CLI-side license gate
export const GITHUB_OWNER = 'lukebaze';
export const GITHUB_REPO = 'internsMarketv2';
export const GITHUB_RELEASE_TAG = 'packages-v1';
export const GITHUB_MANIFEST_URL =
  `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download/${GITHUB_RELEASE_TAG}/manifest.json`;
