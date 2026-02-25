/** Reusable wizard step wrapper with label */
import React from 'react';
import { Box, Text } from 'ink';

interface WizardStepProps {
  label: string;
  children: React.ReactNode;
}

export function WizardStep({ label, children }: WizardStepProps) {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text bold color="cyan">{'›'} {label}</Text>
      <Box marginLeft={2}>{children}</Box>
    </Box>
  );
}
