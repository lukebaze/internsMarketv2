/** Manages the local intern store at ~/.internsmarket/interns/ */
import os from 'os';
import path from 'path';
import fs from 'fs';
import { configStore } from './config-store.js';
import type { InternManifest } from '@internsmarket/core';

/** Base path for all installed interns */
export function getStorePath(): string {
  return path.join(os.homedir(), '.internsmarket', 'interns');
}

/** Full path to a specific intern's install directory */
export function getInternPath(id: string): string {
  return path.join(getStorePath(), id);
}

/** Returns true if intern directory exists */
export function isInstalled(id: string): boolean {
  return fs.existsSync(getInternPath(id));
}

/** Reads the manifest from an installed intern */
export function getInstalledManifest(id: string): InternManifest | null {
  const manifestPath = path.join(getInternPath(id), 'manifest.json');
  if (!fs.existsSync(manifestPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as InternManifest;
  } catch {
    return null;
  }
}

/** Registers an intern ID in config store */
export function registerIntern(id: string): void {
  const installed = configStore.get('installedInterns') ?? [];
  if (!installed.includes(id)) {
    configStore.set('installedInterns', [...installed, id]);
  }
}

/** Removes an intern ID from config store */
export function unregisterIntern(id: string): void {
  const installed = configStore.get('installedInterns') ?? [];
  configStore.set('installedInterns', installed.filter(i => i !== id));
}

/** Deletes the intern directory and unregisters it */
export function deleteInternFiles(id: string): void {
  const internPath = getInternPath(id);
  if (fs.existsSync(internPath)) {
    fs.rmSync(internPath, { recursive: true, force: true });
  }
  unregisterIntern(id);
}

/** Ensures the store directory exists */
export function ensureStorePath(): void {
  fs.mkdirSync(getStorePath(), { recursive: true });
}
