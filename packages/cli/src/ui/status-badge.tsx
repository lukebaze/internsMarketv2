/** Tier-colored status badge */
import React from 'react';
import { Text } from 'ink';
import type { Tier } from '../services/config-store.js';

const TIER_COLOR: Record<Tier, string> = {
  free: 'gray',
  starter: 'yellow',
  pro: 'green',
};

export function StatusBadge({ tier }: { tier: Tier }) {
  return <Text color={TIER_COLOR[tier]}>[{tier.toUpperCase()}]</Text>;
}
