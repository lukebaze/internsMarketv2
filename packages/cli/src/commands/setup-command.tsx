/** im setup — interactive onboarding wizard with runtime selection & installation */
import React, { useState, useEffect } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { SuccessMessage } from '../ui/success-message.js';
import { ErrorMessage } from '../ui/error-message.js';
import {
  getRuntimeInfo,
  installRuntime,
  type RuntimeInfo,
} from '../services/runtime-installer.js';
import type { SupportedRuntime } from '../services/runtime-adapter-factory.js';

type Step = 'welcome' | 'select' | 'installing' | 'done' | 'error';

interface Props {
  /** Skip wizard — directly install a specific runtime */
  directRuntime?: SupportedRuntime;
  /** Non-interactive mode (auto-confirm) */
  autoConfirm?: boolean;
}

export function SetupCommand({ directRuntime, autoConfirm }: Props) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>(directRuntime ? 'installing' : 'welcome');
  const [runtimes, setRuntimes] = useState<RuntimeInfo[]>([]);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Set<SupportedRuntime>>(
    directRuntime ? new Set([directRuntime]) : new Set(),
  );
  const [progress, setProgress] = useState('');
  const [results, setResults] = useState<{ id: string; ok: boolean; msg: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  /* Load runtime info on mount */
  useEffect(() => {
    const info = getRuntimeInfo();
    setRuntimes(info);

    /* Non-interactive: direct runtime flag → install immediately */
    if (directRuntime) {
      runInstall(new Set([directRuntime]));
      return;
    }

    /* Non-interactive: --yes without --runtime → install all not-yet-installed */
    if (autoConfirm) {
      const toInstall = new Set<SupportedRuntime>(
        info.filter(r => !r.installed).map(r => r.id),
      );
      if (toInstall.size > 0) {
        setSelected(toInstall);
        runInstall(toInstall);
      } else {
        setResults(info.map(r => ({ id: r.id, ok: true, msg: 'already installed' })));
        setStep('done');
        setTimeout(() => exit(), 1500);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isInteractive = !directRuntime && !autoConfirm;

  /* Handle keyboard input — only active in interactive mode */
  useInput((input, key) => {

    if (step === 'welcome') {
      if (key.return || input === ' ') setStep('select');
      if (input === 'q') { exit(); return; }
      return;
    }

    if (step === 'select') {
      const items = runtimes.length + 1; /* +1 for "Continue" button */

      if (key.upArrow) setCursor(c => (c - 1 + items) % items);
      if (key.downArrow) setCursor(c => (c + 1) % items);

      /* Toggle selection on space */
      if (input === ' ' && cursor < runtimes.length) {
        const rt = runtimes[cursor]!;
        setSelected(prev => {
          const next = new Set(prev);
          if (next.has(rt.id)) next.delete(rt.id);
          else next.add(rt.id);
          return next;
        });
      }

      /* Confirm on Enter */
      if (key.return) {
        if (cursor === runtimes.length || selected.size > 0) {
          runInstall(selected);
        }
      }

      if (input === 'q') { exit(); return; }
    }
  }, { isActive: isInteractive });

  async function runInstall(targets: Set<SupportedRuntime>) {
    if (targets.size === 0) {
      setStep('done');
      setTimeout(() => exit(), 1500);
      return;
    }

    setStep('installing');
    const installResults: typeof results = [];

    for (const rtId of targets) {
      try {
        await installRuntime(rtId, (msg, detail) => {
          setProgress(detail ? `${msg} (${detail})` : msg);
        });
        installResults.push({ id: rtId, ok: true, msg: 'installed successfully' });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        installResults.push({ id: rtId, ok: false, msg });
      }
    }

    setResults(installResults);
    const hasError = installResults.some(r => !r.ok);
    if (hasError) {
      setErrorMsg(installResults.filter(r => !r.ok).map(r => `${r.id}: ${r.msg}`).join('\n'));
      setStep('error');
    } else {
      setStep('done');
    }
    setTimeout(() => exit(), 3000);
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">InternsMarket Setup</Text>
      <Text dimColor>─────────────────────</Text>

      {step === 'welcome' && <WelcomeScreen />}
      {step === 'select' && (
        <RuntimeSelector
          runtimes={runtimes}
          cursor={cursor}
          selected={selected}
        />
      )}
      {step === 'installing' && <InstallingScreen progress={progress} />}
      {step === 'done' && <DoneScreen results={results} />}
      {step === 'error' && <ErrorMessage message={errorMsg} />}
    </Box>
  );
}

function WelcomeScreen() {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Text>Welcome! This wizard will help you set up a runtime for your AI interns.</Text>
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>Runtimes are the engines that run your AI intern personas.</Text>
        <Text dimColor>You need at least one installed to use your interns.</Text>
      </Box>
      <Box marginTop={1}>
        <Text color="yellow">Press Enter to continue, or q to quit</Text>
      </Box>
    </Box>
  );
}

function RuntimeSelector({
  runtimes,
  cursor,
  selected,
}: {
  runtimes: RuntimeInfo[];
  cursor: number;
  selected: Set<SupportedRuntime>;
}) {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Text>Select runtimes to install (Space to toggle, Enter to confirm):</Text>
      <Box flexDirection="column" marginTop={1}>
        {runtimes.map((rt, i) => {
          const isCursor = cursor === i;
          const isSelected = selected.has(rt.id);
          const check = isSelected ? '[x]' : '[ ]';
          const pointer = isCursor ? '>' : ' ';
          const alreadyTag = rt.installed ? ' (already installed)' : '';

          return (
            <Box key={rt.id}>
              <Text color={isCursor ? 'cyan' : undefined} bold={isCursor}>
                {pointer} {check} {rt.name}
                <Text dimColor> — {rt.description}{alreadyTag}</Text>
              </Text>
            </Box>
          );
        })}

        {/* Continue button */}
        <Box marginTop={1}>
          <Text
            color={cursor === runtimes.length ? 'cyan' : undefined}
            bold={cursor === runtimes.length}
          >
            {cursor === runtimes.length ? '>' : ' '}{' '}
            {selected.size > 0
              ? `Install ${selected.size} runtime${selected.size > 1 ? 's' : ''}`
              : 'Skip (no runtime selected)'}
          </Text>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>{'↑/↓'} Navigate  Space Toggle  Enter Confirm  q Quit</Text>
      </Box>
    </Box>
  );
}

function InstallingScreen({ progress }: { progress: string }) {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Text color="yellow">Installing...</Text>
      <Box marginTop={1}>
        <Text>{progress}</Text>
      </Box>
    </Box>
  );
}

function DoneScreen({ results }: { results: { id: string; ok: boolean; msg: string }[] }) {
  return (
    <Box flexDirection="column" marginTop={1}>
      {results.length === 0 ? (
        <Text>Setup complete. No runtimes installed.</Text>
      ) : (
        results.map(r => (
          <Box key={r.id}>
            {r.ok
              ? <SuccessMessage message={`${r.id}: ${r.msg}`} />
              : <ErrorMessage message={`${r.id}: ${r.msg}`} />}
          </Box>
        ))
      )}
      <Box marginTop={1}>
        <Text dimColor>
          Next: im install {'<intern-id>'} to install your first AI intern
        </Text>
      </Box>
    </Box>
  );
}
