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
import { verifyPackageSignature } from './package-signature-verifier.js';
import { checkLicense } from './license-validator.js';
import { watermarkInstall } from './package-watermarker.js';
import { resolveNpmPackagePath, installFromNpmPackage, copyDirSync } from './npm-package-resolver.js';
import { validateInternId } from './intern-id-validator.js';
import { CLI_VERSION } from '../constants/cli-version.js';

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
  validateInternId(id);
  if (isInstalled(id) && !opts.force) {
    throw new Error(`"${id}" is already installed. Use --force to reinstall.`);
  }

  const installPath = getInternPath(id);
  ensureStorePath();

  // Dev mode: copy from local directory
  if (opts.localPath) {
    return installFromLocal(id, opts.localPath, installPath, opts, onProgress);
  }

  // Check if intern is available as a local npm package (full or shell)
  const npmPackagePath = resolveNpmPackagePath(id);
  if (npmPackagePath && !opts.force) {
    const hasAieos = fs.existsSync(path.join(npmPackagePath, 'aieos.json'));
    if (hasAieos) {
      return installFromNpmPackage(id, npmPackagePath, installPath, opts, onProgress);
    }
    // Shell package — fall through to registry/GitHub Releases download
  }

  // Registry mode
  return installFromRegistry(id, installPath, opts, onProgress);
}

/** Install from local directory path (dev mode) */
async function installFromLocal(
  id: string,
  localPath: string,
  installPath: string,
  opts: InstallOptions,
  onProgress: ProgressCallback,
): Promise<InternManifest> {
  onProgress(10, 'Reading local package...');
  const validation = validateInternPackage(localPath);
  if (!validation.valid) {
    throw new Error(`Invalid package: ${validation.errors.join(', ')}`);
  }

  onProgress(30, 'Checking tier...');
  const pkg = readInternPackage(localPath);
  requireTier(pkg.manifest.tier_required as Tier);

  onProgress(50, 'Copying files...');
  if (fs.existsSync(installPath)) {
    fs.rmSync(installPath, { recursive: true, force: true });
  }
  fs.mkdirSync(installPath, { recursive: true });
  copyDirSync(localPath, installPath);

  onProgress(75, 'Watermarking...');
  watermarkInstall(installPath, CLI_VERSION);

  onProgress(80, 'Generating runtime config...');
  const localPkg = readInternPackage(installPath);
  const runtime = opts.runtime ?? localPkg.manifest.primary_runtime;
  getAdapter(runtime).generate(localPkg, installPath);

  onProgress(90, 'Registering...');
  registerIntern(id);
  onProgress(100, 'Done');
  return localPkg.manifest;
}

/** Install from GitHub Releases registry (production mode) */
async function installFromRegistry(
  id: string,
  installPath: string,
  opts: InstallOptions,
  onProgress: ProgressCallback,
): Promise<InternManifest> {
  onProgress(3, 'Checking license...');
  await checkLicense();

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

    // Verify Ed25519 signature
    onProgress(72, 'Verifying signature...');
    if (entry.dist?.signature) {
      const tarball = fs.readFileSync(tarPath);
      const valid = verifyPackageSignature({
        tarballBytes: tarball,
        internId: id,
        version: entry.version,
        signatureHex: entry.dist.signature,
      });
      if (!valid) {
        throw new Error(`Signature verification failed for "${id}". Package may be tampered.`);
      }
    } else {
      console.warn(`[warn] No signature found for "${id}" — skipping verification`);
    }

    onProgress(75, 'Extracting...');
    const extractDir = path.join(tmpDir, 'extracted');
    fs.mkdirSync(extractDir, { recursive: true });
    execFileSync('tar', ['-xzf', tarPath, '-C', extractDir]);

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

    try {
      onProgress(91, 'Watermarking...');
      watermarkInstall(installPath, CLI_VERSION);

      onProgress(93, 'Generating runtime config...');
      const installedPkg = readInternPackage(installPath);
      const runtime = opts.runtime ?? installedPkg.manifest.primary_runtime;
      getAdapter(runtime).generate(installedPkg, installPath);

      onProgress(97, 'Registering...');
      registerIntern(id);
      onProgress(100, 'Done');
      return installedPkg.manifest;
    } catch (err) {
      // Cleanup orphaned installPath on post-rename failure
      if (fs.existsSync(installPath)) {
        fs.rmSync(installPath, { recursive: true, force: true });
      }
      throw err;
    }
  } finally {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }
}

/** Removes an installed intern */
export async function removeIntern(id: string): Promise<void> {
  validateInternId(id);
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
  validateInternId(id);
  if (!isInstalled(id)) {
    throw new Error(`"${id}" is not installed`);
  }
  const installPath = getInternPath(id);
  if (fs.existsSync(installPath)) {
    fs.rmSync(installPath, { recursive: true, force: true });
  }
  return installIntern(id, { force: true }, onProgress);
}
