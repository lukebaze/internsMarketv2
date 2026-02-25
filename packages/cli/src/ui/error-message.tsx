/** Red error message display */
import React from 'react';
import { Box, Text } from 'ink';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <Box borderStyle="round" borderColor="red" paddingX={1}>
      <Text color="red">Error: {message}</Text>
    </Box>
  );
}
