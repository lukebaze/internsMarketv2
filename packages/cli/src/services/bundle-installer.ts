/** Orchestrates intern install/remove/update: tier-check → download → extract → register */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { readInternPackage, validateInternPackage } from '@internsmarket/core';
import type { InternManifest } from '@internsmarket/core';
import { requireTier } from './license-tier-guard.js';
import type { Tier } from './config-store.js';
import {
  getInternPath,
  isInstalled,
  registerIntern,
  deleteInternFiles,
  ensureStorePath,
} from './local-store-manager.js';
import { fetchInternEntry, downloadBundle } from './registry-client.js';
import { getAdapter } from './runtime-adapter-factory.js';

export interface InstallOptions {
  force?: boolean;
  /** Local directory path — bypasses registry download (dev mode) */
  localPath?: string;
  runtime?: 'zeroclaw' | 'openclaw';
}

export type ProgressCallback = (pct: number, status: string) => void;

/** Installs an intern from the registry or a local path */
export async function installIntern(
  id: string,
  opts: InstallOptions,
  onProgress: ProgressCallback,
): Promise<InternManifest> {
  // 1. Check if already installed
  if (isInstalled(id) && !opts.force) {
    throw new Error(`"${id}" is already installed. Use --force to reinstall.`);
  }

  const installPath = getInternPath(id);
  ensureStorePath();

  if (opts.localPath) {
    // Dev mode: copy from local directory
    onProgress(10, 'Reading local package...');
    const validation = validateInternPackage(opts.localPath);
    if (!validation.valid) {
      throw new Error(`Invalid package: ${validation.errors.join(', ')}`);
    }

    onProgress(30, 'Checking tier...');
    const pkg = readInternPackage(opts.localPath);
    requireTier(pkg.manifest.tier_required as Tier);

    onProgress(50, 'Copying files...');
    if (fs.existsSync(installPath)) {
      fs.rmSync(installPath, { recursive: true, force: true });
    }
    fs.mkdirSync(installPath, { recursive: true });
    copyDirSync(opts.localPath, installPath);

    onProgress(80, 'Generating runtime config...');
    const localPkg = readInternPackage(installPath);
    const runtime = opts.runtime ?? localPkg.manifest.primary_runtime;
    getAdapter(runtime).generate(localPkg, installPath);

    onProgress(90, 'Registering...');
    registerIntern(id);
    onProgress(100, 'Done');
    return localPkg.manifest;
  }

  // Registry mode
  onProgress(5, 'Fetching registry...');
  const entry = await fetchInternEntry(id);
  requireTier(entry.tier_required as Tier);

  onProgress(15, 'Downloading bundle...');
  const tmpDir = path.join(installPath + '_tmp');
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    const tarPath = await downloadBundle(
      entry.download_url,
      tmpDir,
      pct => onProgress(15 + Math.floor(pct * 0.6), 'Downloading...'),
    );

    onProgress(75, 'Extracting...');
    // Extract using system tar (available on macOS/Linux/Windows WSL)
    const extractDir = path.join(tmpDir, 'extracted');
    fs.mkdirSync(extractDir, { recursive: true });
    execFileSync('tar', ['-xzf', tarPath, '-C', extractDir]);

    // Find the intern dir inside the tarball (may be in a subdirectory)
    const extracted = fs.readdirSync(extractDir);
    const sourceDir = extracted.length === 1
      ? path.join(extractDir, extracted[0])
      : extractDir;

    onProgress(85, 'Validating...');
    const validation = validateInternPackage(sourceDir);
    if (!validation.valid) {
      throw new Error(`Bundle validation failed: ${validation.errors.join(', ')}`);
    }

    onProgress(90, 'Installing...');
    if (fs.existsSync(installPath)) {
      fs.rmSync(installPath, { recursive: true, force: true });
    }
    fs.renameSync(sourceDir, installPath);

    onProgress(93, 'Generating runtime config...');
    const installedPkg = readInternPackage(installPath);
    const runtime = opts.runtime ?? installedPkg.manifest.primary_runtime;
    getAdapter(runtime).generate(installedPkg, installPath);

    onProgress(97, 'Registering...');
    registerIntern(id);

    onProgress(100, 'Done');
    return installedPkg.manifest;
  } finally {
    // Cleanup temp directory
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }
}

/** Removes an installed intern */
export async function removeIntern(id: string): Promise<void> {
  if (!isInstalled(id)) {
    throw new Error(`"${id}" is not installed`);
  }
  deleteInternFiles(id);
}

/** Updates an intern (remove + reinstall from registry) */
export async function updateIntern(
  id: string,
  onProgress: ProgressCallback,
): Promise<InternManifest> {
  if (!isInstalled(id)) {
    throw new Error(`"${id}" is not installed`);
  }
  // Remove local files but keep in config until reinstall succeeds
  const installPath = getInternPath(id);
  if (fs.existsSync(installPath)) {
    fs.rmSync(installPath, { recursive: true, force: true });
  }
  return installIntern(id, { force: true }, onProgress);
}

/** Recursively copies a directory */
function copyDirSync(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
