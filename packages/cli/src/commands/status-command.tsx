/** im status — shows license tier, installed interns, cache info */
import React, { useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
import { configStore } from '../services/config-store.js';
import { StatusBadge } from '../ui/status-badge.js';

export function StatusCommand() {
  const { exit } = useApp();
  const tier = configStore.get('tier');
  const interns = configStore.get('installedInterns');
  const validUntil = configStore.get('validUntil');
  const hasKey = configStore.get('licenseKey').length > 0;
  const grace = configStore.get('graceUsesRemaining');

  useEffect(() => { exit(); }, []);

  const cacheStatus = validUntil > Date.now()
    ? `valid for ${Math.round((validUntil - Date.now()) / 3600000)}h`
    : hasKey ? 'expired' : 'n/a';

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={1}>
        <Text bold>Tier:</Text>
        <StatusBadge tier={tier} />
        {!hasKey && <Text color="gray">(no license key — run: im activate)</Text>}
      </Box>
      <Box gap={1}>
        <Text bold>Interns:</Text>
        <Text>{interns.length} installed</Text>
      </Box>
      <Box gap={1}>
        <Text bold>Cache:</Text>
        <Text>{cacheStatus}</Text>
        {hasKey && grace < 3 && <Text color="yellow"> (grace uses: {grace})</Text>}
      </Box>
      <Box gap={1}>
        <Text bold>Config:</Text>
        <Text color="gray">{configStore.path}</Text>
      </Box>
    </Box>
  );
}
