import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let mockActivationId = 'act-uuid-789';

vi.mock('../services/config-store.js', () => ({
  configStore: {
    get: (k: string) => k === 'activationId' ? mockActivationId : undefined,
  },
}));

import { watermarkInstall, readWatermark } from '../services/package-watermarker.js';

describe('package-watermarker', () => {
  let tmpDir: string;

  beforeEach(() => {
    mockActivationId = 'act-uuid-789';
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'watermark-test-'));
    const manifest = { id: 'test-intern', version: '1.0.0', tier_required: 'starter' };
    fs.writeFileSync(path.join(tmpDir, 'manifest.json'), JSON.stringify(manifest));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('injects _watermark into manifest.json', () => {
    watermarkInstall(tmpDir, '1.0.0');
    const result = JSON.parse(fs.readFileSync(path.join(tmpDir, 'manifest.json'), 'utf8'));
    expect(result._watermark).toBeDefined();
    expect(result._watermark.activationId).toBe('act-uuid-789');
    expect(result._watermark.cliVersion).toBe('1.0.0');
    expect(result._watermark.installedAt).toBeTruthy();
  });

  it('preserves existing manifest fields', () => {
    watermarkInstall(tmpDir, '1.0.0');
    const result = JSON.parse(fs.readFileSync(path.join(tmpDir, 'manifest.json'), 'utf8'));
    expect(result.id).toBe('test-intern');
    expect(result.version).toBe('1.0.0');
    expect(result.tier_required).toBe('starter');
  });

  it('readWatermark returns the injected watermark', () => {
    watermarkInstall(tmpDir, '1.0.0');
    const wm = readWatermark(tmpDir);
    expect(wm).not.toBeNull();
    expect(wm!.activationId).toBe('act-uuid-789');
  });

  it('does not modify manifest when activationId is empty', () => {
    mockActivationId = '';
    watermarkInstall(tmpDir, '1.0.0');
    const result = JSON.parse(fs.readFileSync(path.join(tmpDir, 'manifest.json'), 'utf8'));
    expect(result._watermark).toBeUndefined();
  });

  it('readWatermark returns null for un-watermarked manifest', () => {
    expect(readWatermark(tmpDir)).toBeNull();
  });

  it('readWatermark returns null for missing manifest', () => {
    expect(readWatermark('/tmp/nonexistent-path-12345')).toBeNull();
  });
});
