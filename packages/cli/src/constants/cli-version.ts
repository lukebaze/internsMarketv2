/** Single source of truth for CLI version — avoids duplicate createRequire calls */
import { createRequire } from 'node:module';

const esmRequire = createRequire(import.meta.url);
export const CLI_VERSION: string = (esmRequire('../../package.json') as { version: string }).version;
