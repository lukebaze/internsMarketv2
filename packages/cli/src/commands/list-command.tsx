/** im list — renders a table of installed interns from local store */
import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { configStore } from '../services/config-store.js';
import { getInstalledManifest } from '../services/local-store-manager.js';
import type { InternManifest } from '@internsmarket/core';

const TIER_COLOR: Record<string, string> = {
  free: 'gray',
  starter: 'yellow',
  pro: 'green',
};

export function ListCommand() {
  const { exit } = useApp();
  const [manifests, setManifests] = useState<InternManifest[]>([]);

  useEffect(() => {
    const ids = configStore.get('installedInterns') ?? [];
    const loaded = ids
      .map(id => getInstalledManifest(id))
      .filter((m): m is InternManifest => m !== null);
    setManifests(loaded);
    setTimeout(() => exit(), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (manifests.length === 0) {
    return (
      <Text color="gray">
        No interns installed. Run: im install {'<intern-id>'}
      </Text>
    );
  }

  return (
    <Box flexDirection="column">
      <Text bold>Installed Interns ({manifests.length})</Text>
      <Box marginTop={1} flexDirection="column">
        {/* Header */}
        <Box gap={2}>
          <Text bold color="white" dimColor>{padEnd('ID', 32)}</Text>
          <Text bold color="white" dimColor>{padEnd('VERSION', 9)}</Text>
          <Text bold color="white" dimColor>{padEnd('RUNTIME', 10)}</Text>
          <Text bold color="white" dimColor>TIER</Text>
        </Box>

        {manifests.map(m => (
          <Box key={m.id} gap={2}>
            <Text>{padEnd(m.id, 32)}</Text>
            <Text color="gray">{padEnd(m.version, 9)}</Text>
            <Text color="cyan">{padEnd(m.primary_runtime, 10)}</Text>
            <Text color={TIER_COLOR[m.tier_required] ?? 'white'}>
              [{m.tier_required.toUpperCase()}]
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function padEnd(s: string, len: number): string {
  return s.length >= len ? s : s + ' '.repeat(len - s.length);
}
