/** Factory that returns the correct runtime adapter by name */
import type { InternPackage } from '@internsmarket/core';
import { generateZeroClawConfig, applyToZeroClaw } from './runtime-adapter-zeroclaw.js';
import { generateOpenClawConfig, applyToOpenClaw } from './runtime-adapter-openclaw.js';

export type SupportedRuntime = 'zeroclaw' | 'openclaw';

export interface RuntimeAdapter {
  generate(pkg: InternPackage, installPath: string): void;
  apply(internId: string): void;
}

/** Returns the adapter for the given runtime identifier */
export function getAdapter(runtime: SupportedRuntime): RuntimeAdapter {
  if (runtime === 'zeroclaw') {
    return { generate: generateZeroClawConfig, apply: applyToZeroClaw };
  }
  if (runtime === 'openclaw') {
    return { generate: generateOpenClawConfig, apply: applyToOpenClaw };
  }
  throw new Error(`Unknown runtime: ${runtime as string}`);
}
