/** im remove <intern-id> — deletes local files and unregisters from config */
import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { ErrorMessage } from '../ui/error-message.js';
import { SuccessMessage } from '../ui/success-message.js';
import { removeIntern } from '../services/bundle-installer.js';

type Step = 'removing' | 'success' | 'error';

export function RemoveCommand({ internId }: { internId: string }) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('removing');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    removeIntern(internId)
      .then(() => {
        setStep('success');
        setTimeout(() => exit(), 1000);
      })
      .catch(err => {
        setErrorMsg(err instanceof Error ? err.message : String(err));
        setStep('error');
        setTimeout(() => exit(), 2000);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">InternsMarket Remove</Text>

      {step === 'removing' && (
        <Text color="yellow">Removing <Text bold>{internId}</Text>...</Text>
      )}

      {step === 'success' && (
        <SuccessMessage message={`${internId} removed successfully.`} />
      )}

      {step === 'error' && <ErrorMessage message={errorMsg} />}
    </Box>
  );
}
