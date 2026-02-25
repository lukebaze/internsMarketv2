/** License activation and deactivation via Lemon Squeezy public API */
import { hostname } from 'node:os';
import { configStore } from './config-store.js';
import {
  LS_ACTIVATE_URL, LS_DEACTIVATE_URL,
  VARIANT_TIER_MAP, CACHE_TTL_PAID_MS, GRACE_USES,
} from './license-constants.js';

interface LsActivateResponse {
  activated: boolean;
  instance: { id: string };
  license_key: { variant_id: number };
  error?: string;
}

/** Activate a license key on this machine */
export async function activate(key: string): Promise<string> {
  const res = await fetch(LS_ACTIVATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ license_key: key, instance_name: hostname() }),
  });

  const data = await res.json() as LsActivateResponse;
  if (!data.activated) {
    throw new Error(data.error ?? 'Activation failed');
  }

  const tier = VARIANT_TIER_MAP[String(data.license_key.variant_id)] ?? 'starter';
  configStore.set('licenseKey', key);
  configStore.set('instanceId', data.instance.id);
  configStore.set('tier', tier);
  configStore.set('validUntil', Date.now() + CACHE_TTL_PAID_MS);
  configStore.set('graceUsesRemaining', GRACE_USES);

  return tier;
}

/** Deactivate the current license key */
export async function deactivate(): Promise<void> {
  const key = configStore.get('licenseKey');
  const instanceId = configStore.get('instanceId');

  if (key && instanceId) {
    await fetch(LS_DEACTIVATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ license_key: key, instance_id: instanceId }),
    });
  }

  configStore.set('licenseKey', '');
  configStore.set('instanceId', '');
  configStore.set('tier', 'free');
  configStore.set('validUntil', 0);
}
