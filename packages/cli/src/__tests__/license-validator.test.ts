import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock config store with controllable values
const store: Record<string, unknown> = {};
function resetStore() {
  Object.assign(store, {
    licenseKey: 'test-key-123',
    activationId: 'act-uuid-456',
    tier: 'starter',
    validUntil: 0,
    graceUsesRemaining: 3,
  });
}

vi.mock('../services/config-store.js', () => ({
  configStore: {
    get: (k: string) => store[k],
    set: (k: string, v: unknown) => { store[k] = v; },
  },
}));

vi.mock('../services/license-constants.js', () => ({
  POLAR_VALIDATE_URL: 'https://api.polar.sh/v1/customer-portal/license-keys/validate',
  POLAR_ORG_ID: 'test-org-id',
  BENEFIT_TIER_MAP: { 'STARTER_BENEFIT_ID': 'starter' as const },
  CACHE_TTL_PAID_MS: 86400000,
  CACHE_TTL_FREE_MS: 3600000,
}));

import { checkLicense, getCurrentTier } from '../services/license-validator.js';

describe('license-validator', () => {
  beforeEach(() => {
    resetStore();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getCurrentTier', () => {
    it('returns tier from store', () => {
      expect(getCurrentTier()).toBe('starter');
    });

    it('returns free when tier is undefined', () => {
      store.tier = undefined;
      expect(getCurrentTier()).toBe('free');
    });
  });

  describe('checkLicense', () => {
    it('returns free when no license key stored', async () => {
      store.licenseKey = '';
      expect(await checkLicense()).toBe('free');
    });

    it('returns cached tier without network when cache is fresh', async () => {
      store.validUntil = Date.now() + 60_000;
      const tier = await checkLicense();
      expect(tier).toBe('starter');
      expect(fetch).not.toHaveBeenCalled();
    });

    it('calls Polar validate with JSON body when cache is stale', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'active',
          benefit_id: 'STARTER_BENEFIT_ID',
          benefits: [{ id: 'STARTER_BENEFIT_ID', type: 'license_keys' }],
          activation: { id: 'act-uuid-456' },
        }),
      } as Response);

      await checkLicense();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('polar.sh'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        }),
      );
    });

    it('resets to free when Polar returns inactive status', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 'inactive', benefits: [] }),
      } as Response);

      expect(await checkLicense()).toBe('free');
      expect(store.tier).toBe('free');
    });

    it('resets to free when Polar returns non-ok response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response);
      expect(await checkLicense()).toBe('free');
    });

    it('uses grace period on network failure', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));
      const tier = await checkLicense();
      expect(tier).toBe('starter');
      expect(store.graceUsesRemaining).toBe(2);
    });

    it('falls to free when grace uses exhausted', async () => {
      store.graceUsesRemaining = 0;
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));
      expect(await checkLicense()).toBe('free');
    });

    it('resolves tier from benefits array', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'active',
          benefits: [{ id: 'STARTER_BENEFIT_ID', type: 'license_keys' }],
        }),
      } as Response);

      expect(await checkLicense()).toBe('starter');
    });

    it('defaults to free for unmapped benefit', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'active',
          benefits: [{ id: 'UNKNOWN_BENEFIT', type: 'license_keys' }],
        }),
      } as Response);

      expect(await checkLicense()).toBe('free');
    });
  });
});
