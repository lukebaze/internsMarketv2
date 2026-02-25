/** im update [intern-id] — update one or all installed interns */
import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { ErrorMessage } from '../ui/error-message.js';
import { SuccessMessage } from '../ui/success-message.js';
import { updateIntern } from '../services/bundle-installer.js';
import { configStore } from '../services/config-store.js';

type Step = 'updating' | 'success' | 'error';

export function UpdateCommand({ internId }: { internId?: string }) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('updating');
  const [pct, setPct] = useState(0);
  const [status, setStatus] = useState('Starting...');
  const [errorMsg, setErrorMsg] = useState('');
  const [updated, setUpdated] = useState<string[]>([]);

  const target = internId ?? 'all interns';

  useEffect(() => {
    const ids = internId
      ? [internId]
      : (configStore.get('installedInterns') ?? []);

    if (ids.length === 0) {
      setErrorMsg('No interns installed to update.');
      setStep('error');
      setTimeout(() => exit(), 2000);
      return;
    }

    const runUpdates = async () => {
      const results: string[] = [];
      for (const id of ids) {
        await updateIntern(id, (p, s) => {
          setPct(p);
          setStatus(`[${id}] ${s}`);
        });
        results.push(id);
      }
      return results;
    };

    runUpdates()
      .then(results => {
        setUpdated(results);
        setStep('success');
        setTimeout(() => exit(), 1500);
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
      <Text bold color="cyan">InternsMarket Update</Text>

      {step === 'updating' && (
        <Box flexDirection="column" marginTop={1}>
          <Text>Updating <Text bold>{target}</Text>...</Text>
          <Box marginTop={1}>
            <Text color="yellow">[{renderBar(pct)}] {pct}%</Text>
            <Text color="gray"> {status}</Text>
          </Box>
        </Box>
      )}

      {step === 'success' && (
        <SuccessMessage message={`Updated: ${updated.join(', ')}`} />
      )}

      {step === 'error' && <ErrorMessage message={errorMsg} />}
    </Box>
  );
}

function renderBar(pct: number): string {
  const filled = Math.floor(pct / 5);
  return '█'.repeat(filled) + '░'.repeat(20 - filled);
}
