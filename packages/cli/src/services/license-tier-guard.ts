/** Tier gating — throws if current tier is insufficient */
import type { Tier } from './config-store.js';
import { configStore } from './config-store.js';
import { TIER_RANK } from './license-constants.js';

export class TierError extends Error {
  constructor(public required: Tier) {
    super(`This feature requires the ${required} plan. Upgrade: https://internsmarket.com/upgrade`);
    this.name = 'TierError';
  }
}

/** Throws TierError if current tier is below the required minimum */
export function requireTier(min: Tier): void {
  const current: Tier = configStore.get('tier') ?? 'free';
  if (TIER_RANK[current] < TIER_RANK[min]) {
    throw new TierError(min);
  }
}
