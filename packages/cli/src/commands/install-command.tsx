/** im install <intern-id> — real implementation with progress UI */
import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { ErrorMessage } from '../ui/error-message.js';
import { SuccessMessage } from '../ui/success-message.js';
import { installIntern } from '../services/bundle-installer.js';
import { TierError } from '../services/license-tier-guard.js';

interface Props {
  internId: string;
  force?: boolean;
  localPath?: string;
  runtime?: 'zeroclaw' | 'openclaw';
}

type Step = 'installing' | 'success' | 'error';

export function InstallCommand({ internId, force, localPath, runtime }: Props) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('installing');
  const [pct, setPct] = useState(0);
  const [status, setStatus] = useState('Starting...');
  const [internName, setInternName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    installIntern(
      internId,
      { force, localPath, runtime },
      (p, s) => { setPct(p); setStatus(s); },
    )
      .then(manifest => {
        setInternName(manifest.name);
        setStep('success');
        setTimeout(() => exit(), 1500);
      })
      .catch(err => {
        if (err instanceof TierError) {
          setErrorMsg(`Tier required: ${err.required}. Upgrade at https://internsmarket.com/upgrade`);
        } else {
          setErrorMsg(err instanceof Error ? err.message : String(err));
        }
        setStep('error');
        setTimeout(() => exit(), 3000);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">InternsMarket Install</Text>

      {step === 'installing' && (
        <Box flexDirection="column" marginTop={1}>
          <Text>Installing <Text bold>{internId}</Text>...</Text>
          <Box marginTop={1}>
            <Text color="yellow">[{renderBar(pct)}] {pct}%</Text>
            <Text color="gray"> {status}</Text>
          </Box>
        </Box>
      )}

      {step === 'success' && (
        <Box flexDirection="column" marginTop={1}>
          <SuccessMessage message={`${internName} installed successfully!`} />
          <Text color="gray">
            To activate in ZeroClaw, run:{'\n'}
            {'  '}im apply {internId} --runtime=zeroclaw
          </Text>
        </Box>
      )}

      {step === 'error' && <ErrorMessage message={errorMsg} />}
    </Box>
  );
}

function renderBar(pct: number): string {
  const filled = Math.floor(pct / 5);
  return '█'.repeat(filled) + '░'.repeat(20 - filled);
}
