/**
 * License watermarking — inject activationId into installed manifest.json.
 * Provides traceability if a package is shared/leaked: watermark identifies the
 * specific Polar license activation that downloaded this copy.
 *
 * Watermark is written to manifest._watermark (internal metadata, not AIEOS spec).
 * Gracefully skips if no activationId is set (free intern installs).
 */
import fs from 'node:fs';
import path from 'node:path';
import { configStore } from './config-store.js';

export interface WatermarkData {
  activationId: string;
  installedAt: string;
  cliVersion: string;
}

/**
 * Read manifest.json from installPath, inject watermark, write back.
 * No-op if activationId is empty (free install).
 */
export function watermarkInstall(installPath: string, cliVersion: string): void {
  const activationId = configStore.get('activationId');
  if (!activationId) return;

  const manifestPath = path.join(installPath, 'manifest.json');
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(raw) as Record<string, unknown>;

  const watermark: WatermarkData = {
    activationId,
    installedAt: new Date().toISOString(),
    cliVersion,
  };

  manifest._watermark = watermark;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
}

/**
 * Read watermark from an installed intern's manifest.json.
 * Returns null if no watermark present (free intern or pre-watermark install).
 */
export function readWatermark(installPath: string): WatermarkData | null {
  try {
    const manifestPath = path.join(installPath, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
    return (manifest._watermark as WatermarkData) ?? null;
  } catch {
    return null;
  }
}
