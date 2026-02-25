/** License system constants — URLs, TTLs, tier mapping */
import type { Tier } from './config-store.js';

export const LS_ACTIVATE_URL = 'https://api.lemonsqueezy.com/v1/licenses/activate';
export const LS_VALIDATE_URL = 'https://api.lemonsqueezy.com/v1/licenses/validate';
export const LS_DEACTIVATE_URL = 'https://api.lemonsqueezy.com/v1/licenses/deactivate';

export const CACHE_TTL_PAID_MS = 24 * 60 * 60 * 1000; // 24h
export const CACHE_TTL_FREE_MS = 1 * 60 * 60 * 1000;  // 1h
export const GRACE_USES = 3;

/** Map LS variant IDs to tiers — populate after creating LS product */
export const VARIANT_TIER_MAP: Record<string, Tier> = {
  // 'STARTER_VARIANT_ID': 'starter',
  // 'PRO_VARIANT_ID': 'pro',
};

export const TIER_RANK: Record<Tier, number> = { free: 0, starter: 1, pro: 2 };
