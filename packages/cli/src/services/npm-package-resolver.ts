/** Resolves and installs interns from npm-local packages (full or shell detection) */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { readInternPackage, validateInternPackage } from '@internsmarket/core';
import type { InternManifest } from '@internsmarket/core';
import { requireTier } from './license-tier-guard.js';
import type { Tier } from './config-store.js';
import { registerIntern } from './local-store-manager.js';
import { getAdapter } from './runtime-adapter-factory.js';
import { watermarkInstall } from './package-watermarker.js';
import { isValidInternId } from './intern-id-validator.js';
import { CLI_VERSION } from '../constants/cli-version.js';
import type { InstallOptions, ProgressCallback } from './bundle-installer.js';

const esmRequire = createRequire(import.meta.url);

/** Resolve npm-installed package path for an intern (returns null if not installed) */
export function resolveNpmPackagePath(id: string): string | null {
  if (!isValidInternId(id)) return null;
  try {
    const manifestPath = esmRequire.resolve(`@internsmarket/${id}/manifest.json`);
    return path.dirname(manifestPath);
  } catch {
    return null;
  }
}

/** Install from a local npm package (full package — has aieos.json) */
export async function installFromNpmPackage(
  id: string,
  sourcePath: string,
  installPath: string,
  opts: InstallOptions,
  onProgress: ProgressCallback,
): Promise<InternManifest> {
  onProgress(10, 'Reading npm package...');
  const validation = validateInternPackage(sourcePath);
  if (!validation.valid) {
    throw new Error(`Invalid npm package: ${validation.errors.join(', ')}`);
  }

  onProgress(30, 'Checking tier...');
  const pkg = readInternPackage(sourcePath);
  requireTier(pkg.manifest.tier_required as Tier);

  onProgress(50, 'Copying files...');
  if (fs.existsSync(installPath)) {
    fs.rmSync(installPath, { recursive: true, force: true });
  }
  fs.mkdirSync(installPath, { recursive: true });
  copyDirSync(sourcePath, installPath);

  onProgress(75, 'Watermarking...');
  watermarkInstall(installPath, CLI_VERSION);

  onProgress(80, 'Generating runtime config...');
  const installedPkg = readInternPackage(installPath);
  const runtime = opts.runtime ?? installedPkg.manifest.primary_runtime;
  getAdapter(runtime).generate(installedPkg, installPath);

  onProgress(90, 'Registering...');
  registerIntern(id);
  onProgress(100, 'Done');
  return installedPkg.manifest;
}

/** Recursively copies a directory (skips symlinks to prevent traversal attacks) */
export function copyDirSync(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue; // skip symlinks — security guard
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
