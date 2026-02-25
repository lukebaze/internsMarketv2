/** License validation with 24h offline cache and grace period — Polar.sh backend */
import type { Tier } from './config-store.js';
import { configStore } from './config-store.js';
import {
  POLAR_VALIDATE_URL, POLAR_ORG_ID, BENEFIT_TIER_MAP,
  CACHE_TTL_PAID_MS, CACHE_TTL_FREE_MS, GRACE_USES,
} from './license-constants.js';

interface PolarValidateResponse {
  id: string;
  status: 'active' | 'inactive' | 'expired';
  benefit_id: string;
  benefits: Array<{ id: string; type: string }>;
  activation?: { id: string };
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

/** Validate license: cache-first → Polar API if stale → grace period on failure */
export async function checkLicense(): Promise<Tier> {
  const key = configStore.get('licenseKey');
  if (!key) return 'free';

  // Cache hit
  if (Date.now() < configStore.get('validUntil')) {
    return configStore.get('tier');
  }

  // Cache stale — call Polar
  // Guard: skip network call if POLAR_ORG_ID is placeholder — return free (not cached tier)
  if (!POLAR_ORG_ID || POLAR_ORG_ID === 'REPLACE_WITH_POLAR_ORG_ID') {
    return 'free';
  }

  try {
    const activationId = configStore.get('activationId');
    const body: Record<string, string> = { key, organization_id: POLAR_ORG_ID };
    if (activationId) body.activation_id = activationId;

    const res = await fetch(POLAR_VALIDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) { resetToFree(); return 'free'; }

    const data = await res.json() as PolarValidateResponse;
    if (data.status !== 'active') { resetToFree(); return 'free'; }

    // Resolve tier from benefits array — fallback to 'free'
    let tier: Tier = 'free';
    for (const benefit of data.benefits) {
      const mapped = BENEFIT_TIER_MAP[benefit.id];
      if (mapped) { tier = mapped; break; }
    }

    const ttl = tier === 'free' ? CACHE_TTL_FREE_MS : CACHE_TTL_PAID_MS;
    configStore.set('tier', tier);
    configStore.set('validUntil', Date.now() + ttl);
    configStore.set('graceUsesRemaining', GRACE_USES); // reset grace on success
    return tier;
  } catch {
    // Network failure — grace period
    const grace = configStore.get('graceUsesRemaining') ?? 0;
    if (grace > 0) {
      configStore.set('graceUsesRemaining', grace - 1);
      return configStore.get('tier');
    }
    resetToFree();
    return 'free';
  }
}
