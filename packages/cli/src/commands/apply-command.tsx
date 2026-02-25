/** im apply <intern-id> --runtime=zeroclaw|openclaw — opt-in runtime activation */
import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { ErrorMessage } from '../ui/error-message.js';
import { SuccessMessage } from '../ui/success-message.js';
import { getAdapter } from '../services/runtime-adapter-factory.js';
import type { SupportedRuntime } from '../services/runtime-adapter-factory.js';

interface Props {
  internId: string;
  runtime: SupportedRuntime;
}

type Step = 'applying' | 'success' | 'error';

export function ApplyCommand({ internId, runtime }: Props) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('applying');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      getAdapter(runtime).apply(internId);
      setStep('success');
      setTimeout(() => exit(), 1200);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setStep('error');
      setTimeout(() => exit(), 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">InternsMarket Apply</Text>

      {step === 'applying' && (
        <Text color="yellow">
          Applying <Text bold>{internId}</Text> to <Text bold>{runtime}</Text>...
        </Text>
      )}

      {step === 'success' && (
        <SuccessMessage
          message={`${internId} applied to ${runtime} successfully!`}
        />
      )}

      {step === 'error' && <ErrorMessage message={errorMsg} />}
    </Box>
  );
}
