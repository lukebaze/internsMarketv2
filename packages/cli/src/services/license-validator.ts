/** License validation with 24h offline cache and grace period */
import type { Tier } from './config-store.js';
import { configStore } from './config-store.js';
import {
  LS_VALIDATE_URL, VARIANT_TIER_MAP,
  CACHE_TTL_PAID_MS, CACHE_TTL_FREE_MS,
} from './license-constants.js';

interface LsValidateResponse {
  valid: boolean;
  license_key: { variant_id: number; status: string };
}

/** Reset config to free tier */
function resetToFree(): void {
  configStore.set('tier', 'free');
  configStore.set('validUntil', 0);
}

/** Get current tier from cache (sync, no network) */
export function getCurrentTier(): Tier {
  return configStore.get('tier') ?? 'free';
}

/** Validate license: cache-first, network if stale, grace period on failure */
export async function checkLicense(): Promise<Tier> {
  const key = configStore.get('licenseKey');
  if (!key) return 'free';

  // Cache hit — return without network
  if (Date.now() < configStore.get('validUntil')) {
    return configStore.get('tier');
  }

  // Cache stale — validate via network
  try {
    const body: Record<string, string> = { license_key: key };
    const instanceId = configStore.get('instanceId');
    if (instanceId) body.instance_id = instanceId;

    const res = await fetch(LS_VALIDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body),
    });

    const data = await res.json() as LsValidateResponse;
    if (!data.valid) { resetToFree(); return 'free'; }

    const tier = VARIANT_TIER_MAP[String(data.license_key.variant_id)] ?? 'starter';
    const ttl = tier === 'free' ? CACHE_TTL_FREE_MS : CACHE_TTL_PAID_MS;
    configStore.set('tier', tier);
    configStore.set('validUntil', Date.now() + ttl);
    return tier;
  } catch {
    // Network error — use grace period
    const grace = configStore.get('graceUsesRemaining') ?? 0;
    if (grace > 0) {
      configStore.set('graceUsesRemaining', grace - 1);
      return configStore.get('tier');
    }
    resetToFree();
    return 'free';
  }
}
