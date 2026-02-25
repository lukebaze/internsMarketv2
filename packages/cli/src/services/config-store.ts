/** Typed config store for InternsMarket CLI (im) — persists to XDG-compliant path */
import Conf from 'conf';

export type Tier = 'free' | 'starter' | 'pro';

interface ConfigSchema {
  licenseKey: string;
  instanceId: string;
  tier: Tier;
  validUntil: number;
  graceUsesRemaining: number;
  installedInterns: string[];
  apiEndpoint: string;
}

export const configStore = new Conf<ConfigSchema>({
  projectName: 'internsmarket',
  defaults: {
    licenseKey: '',
    instanceId: '',
    tier: 'free',
    validUntil: 0,
    graceUsesRemaining: 3,
    installedInterns: [],
    apiEndpoint: 'https://registry.internsmarket.com',
  },
});
