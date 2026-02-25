/** License activation/deactivation via Polar.sh Customer Portal API */
import { hostname } from 'node:os';
import { configStore } from './config-store.js';
import {
  POLAR_ACTIVATE_URL, POLAR_DEACTIVATE_URL, POLAR_ORG_ID,
  BENEFIT_TIER_MAP, CACHE_TTL_PAID_MS, GRACE_USES,
} from './license-constants.js';

interface PolarActivateResponse {
  id: string;                          // activation UUID
  license_key_id: string;
  label: string;
  license_key: {
    id: string;
    status: 'active' | 'inactive' | 'expired';
    benefit_id: string;
  };
}

/** Activate a Polar license key — stores activationId + tier */
export async function activate(key: string): Promise<string> {
  if (!POLAR_ORG_ID || POLAR_ORG_ID === 'REPLACE_WITH_POLAR_ORG_ID') {
    throw new Error('POLAR_ORG_ID not configured — cannot activate');
  }

  const res = await fetch(POLAR_ACTIVATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key,
      organization_id: POLAR_ORG_ID,
      label: hostname(),
    }),
  });

  if (res.status === 422) {
    throw new Error('Activation limit exceeded — deactivate another device first or upgrade your plan');
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Activation failed (${res.status}): ${text}`);
  }

  const data = await res.json() as PolarActivateResponse;
  const benefitId = data.license_key.benefit_id;
  const tier = BENEFIT_TIER_MAP[benefitId] ?? 'free';
  if (!BENEFIT_TIER_MAP[benefitId]) {
    console.warn(`[warn] Unknown benefit_id "${benefitId}" — defaulting to free tier`);
  }

  configStore.set('licenseKey', key);
  configStore.set('activationId', data.id);
  configStore.set('tier', tier);
  configStore.set('validUntil', Date.now() + CACHE_TTL_PAID_MS);
  configStore.set('graceUsesRemaining', GRACE_USES);

  return tier;
}

/** Deactivate current license — clears local config */
export async function deactivate(): Promise<void> {
  const key = configStore.get('licenseKey');
  const activationId = configStore.get('activationId');

  if (key && activationId) {
    await fetch(POLAR_DEACTIVATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, organization_id: POLAR_ORG_ID, activation_id: activationId }),
    }).catch(() => { /* best-effort — clear local state regardless */ });
  }

  configStore.set('licenseKey', '');
  configStore.set('activationId', '');
  configStore.set('tier', 'free');
  configStore.set('validUntil', 0);
}
