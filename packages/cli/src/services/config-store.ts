/** Typed config store for InternsMarket CLI (im) — persists to XDG-compliant path */
import Conf from 'conf';

export type Tier = 'free' | 'starter' | 'pro';

interface ConfigSchema {
  licenseKey: string;
  activationId: string;   // Polar activation UUID (was instanceId)
  tier: Tier;
  validUntil: number;
  graceUsesRemaining: number;
  installedInterns: string[];
}

export const configStore = new Conf<ConfigSchema>({
  projectName: 'internsmarket',
  defaults: {
    licenseKey: '',
    activationId: '',
    tier: 'free',
    validUntil: 0,
    graceUsesRemaining: 3,
    installedInterns: [],
  },
});
