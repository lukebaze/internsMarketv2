/** Green success message display */
import React from 'react';
import { Box, Text } from 'ink';

export function SuccessMessage({ message }: { message: string }) {
  return (
    <Box paddingX={1}>
      <Text color="green">{'✓'} {message}</Text>
    </Box>
  );
}
