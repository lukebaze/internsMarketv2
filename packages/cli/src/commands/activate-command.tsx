/** im activate — multi-step license activation wizard */
import React, { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { WizardStep } from '../ui/wizard-step.js';
import { ErrorMessage } from '../ui/error-message.js';
import { SuccessMessage } from '../ui/success-message.js';
import { activate } from '../services/license-activator.js';

type Step = 'enter-key' | 'validating' | 'success' | 'error';

export function ActivateCommand() {
  const { exit } = useApp();
  const [step, setStep] = useState<Step>('enter-key');
  const [key, setKey] = useState('');
  const [tier, setTier] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useInput((input, keyInfo) => {
    if (step !== 'enter-key') return;

    if (keyInfo.return) {
      if (key.length < 4) return;
      setStep('validating');
      activate(key)
        .then(t => { setTier(t); setStep('success'); setTimeout(() => exit(), 1000); })
        .catch(e => { setErrorMsg(e.message); setStep('error'); setTimeout(() => exit(), 2000); });
      return;
    }
    if (keyInfo.backspace || keyInfo.delete) {
      setKey(prev => prev.slice(0, -1));
      return;
    }
    if (input && !keyInfo.ctrl) {
      setKey(prev => prev + input);
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">InternsMarket License Activation</Text>

      {step === 'enter-key' && (
        <WizardStep label="Enter your license key">
          <Text>{key.length > 0 ? key : <Text color="gray">Type your key and press Enter...</Text>}</Text>
        </WizardStep>
      )}

      {step === 'validating' && (
        <WizardStep label="Activating...">
          <Text color="yellow">Contacting Lemon Squeezy...</Text>
        </WizardStep>
      )}

      {step === 'success' && (
        <SuccessMessage message={`License activated! Tier: ${tier.toUpperCase()}`} />
      )}

      {step === 'error' && (
        <ErrorMessage message={errorMsg} />
      )}
    </Box>
  );
}
