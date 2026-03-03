/** im skill install <name> — installs a skill from the registry with Ink progress UI */
import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import os from 'node:os';
import {
  fetchSkillRegistryIndex,
  resolveSkillDependencies,
  getSkillDownloadUrl,
  downloadSkillTgz,
  installSkillFromTgz,
} from '@internsmarket/core';
import { ErrorMessage } from '../ui/error-message.js';
import { SuccessMessage } from '../ui/success-message.js';

interface Props {
  name: string;
  versionRange: string;
}

type Step = 'resolving' | 'downloading' | 'installing' | 'success' | 'error';

const SKILLS_BASE_DIR = join(os.homedir(), '.internsmarket', 'skills');

/** Renders a simple ASCII progress bar */
function renderBar(pct: number): string {
  const filled = Math.floor(pct / 5);
  return '█'.repeat(filled) + '░'.repeat(20 - filled);
}

export function SkillInstallCommand({ name, versionRange }: Props) {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('resolving');
  const [status, setStatus] = useState('Fetching registry...');
  const [pct, setPct] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    runInstall();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runInstall() {
    try {
      // Step 1: resolve
      setStep('resolving');
      setStatus('Fetching registry index...');
      setPct(10);
      const index = await fetchSkillRegistryIndex();

      setStatus(`Resolving ${name}@${versionRange}...`);
      setPct(25);
      const { resolved } = resolveSkillDependencies({ [name]: versionRange }, index);

      if (resolved.length === 0) {
        throw new Error(`No version of "${name}" satisfies "${versionRange}"`);
      }

      // Step 2: download each resolved skill
      setStep('downloading');
      const tmpDir = join(os.tmpdir(), 'internsmarket-skills');
      mkdirSync(tmpDir, { recursive: true });

      const total = resolved.length;
      for (let i = 0; i < total; i++) {
        const skill = resolved[i];
        const downloadUrl = getSkillDownloadUrl(skill.name, skill.version);
        const tgzPath = join(tmpDir, `${skill.name}-${skill.version}.tgz`);

        setStatus(`Downloading ${skill.name}@${skill.version}...`);
        setPct(25 + Math.floor(((i + 0.5) / total) * 40));

        await downloadSkillTgz(downloadUrl, tgzPath);

        // Step 3: install
        setStep('installing');
        setStatus(`Installing ${skill.name}@${skill.version}...`);
        setPct(65 + Math.floor(((i + 0.5) / total) * 30));

        const destDir = join(SKILLS_BASE_DIR, skill.name);
        mkdirSync(destDir, { recursive: true });
        await installSkillFromTgz(tgzPath, destDir, skill.sha256);

        setPct(65 + Math.floor(((i + 1) / total) * 30));
      }

      setPct(100);
      setStatus('Done');
      setStep('success');
      setTimeout(() => exit(), 1500);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setStep('error');
      setTimeout(() => exit(), 3000);
    }
  }

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">InternsMarket Skill Install</Text>

      {(step === 'resolving' || step === 'downloading' || step === 'installing') && (
        <Box flexDirection="column" marginTop={1}>
          <Text>Installing skill <Text bold>{name}</Text>...</Text>
          <Box marginTop={1}>
            <Text color="yellow">[{renderBar(pct)}] {pct}%</Text>
            <Text color="gray"> {status}</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="gray">
              {step === 'resolving' && 'Resolving dependencies...'}
              {step === 'downloading' && 'Downloading archive...'}
              {step === 'installing' && 'Extracting and validating...'}
            </Text>
          </Box>
        </Box>
      )}

      {step === 'success' && (
        <Box flexDirection="column" marginTop={1}>
          <SuccessMessage message={`${name} installed to ~/.internsmarket/skills/${name}/`} />
        </Box>
      )}

      {step === 'error' && <ErrorMessage message={errorMsg} />}
    </Box>
  );
}
