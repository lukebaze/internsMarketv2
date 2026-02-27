/** Single source of truth for CLI version — injected at build time by tsup define */
declare const __CLI_VERSION__: string;
export const CLI_VERSION: string = __CLI_VERSION__;
