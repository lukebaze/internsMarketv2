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

type Step = 'applying' | 'resolving-skills' | 'deploying-skills' | 'success' | 'error';

const STEP_LABELS: Record<Step, string> = {
  'applying': 'Applying to runtime...',
  'resolving-skills': 'Resolving skill dependencies...',
  'deploying-skills': 'Deploying registry skills...',
  'success': '',
  'error': '',
};

export function ApplyCommand({ internId, runtime }: Props) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('applying');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        const adapter = getAdapter(runtime);

        if (adapter.applyWithSkills) {
          await adapter.applyWithSkills(internId, (progressStep) => {
            if (progressStep.toLowerCase().includes('resolving')) {
              setStep('resolving-skills');
            } else if (progressStep.toLowerCase().includes('deploying')) {
              setStep('deploying-skills');
            }
          });
        } else {
          adapter.apply(internId);
        }

        setStep('success');
        setTimeout(() => exit(), 1200);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : String(err));
        setStep('error');
        setTimeout(() => exit(), 3000);
      }
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">InternsMarket Apply</Text>

      {(step === 'applying' || step === 'resolving-skills' || step === 'deploying-skills') && (
        <Text color="yellow">
          {STEP_LABELS[step]}{' '}
          <Text bold>{internId}</Text> → <Text bold>{runtime}</Text>
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
