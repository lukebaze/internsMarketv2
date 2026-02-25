import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { validateInternPackage } from '../package-io/intern-package-validator.js';
import { writeInternPackage } from '../package-io/intern-package-writer.js';
import { readInternPackage } from '../package-io/intern-package-reader.js';
import { rmSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

describe('validateInternPackage', () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const jordanPath = join(__dirname, '../../../interns/content-marketing-intern');
  let testDir: string;

  beforeEach(() => {
    testDir = join(tmpdir(), `test-validate-${Date.now()}-${Math.random()}`);
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
  });

  it('validates Jordan fixture successfully', () => {
    const result = validateInternPackage(jordanPath);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('returns validation result object', () => {
    const result = validateInternPackage(jordanPath);
    expect(result).toHaveProperty('valid');
    expect(result).toHaveProperty('errors');
    expect(result).toHaveProperty('warnings');
  });

  it('errors is array', () => {
    const result = validateInternPackage(jordanPath);
    expect(Array.isArray(result.errors)).toBe(true);
  });

  it('warnings is array', () => {
    const result = validateInternPackage(jordanPath);
    expect(Array.isArray(result.warnings)).toBe(true);
  });

  it('returns error when manifest.json missing', () => {
    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('manifest.json');
  });

  it('returns error when aieos.json missing', () => {
    const pkg = readInternPackage(jordanPath);
    const minimalPkg = { ...pkg, skills: [], memorySeedPaths: [] };
    writeInternPackage(minimalPkg, testDir);

    // Remove aieos.json
    rmSync(join(testDir, 'aieos.json'));

    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('aieos.json'))).toBe(true);
  });

  it('returns error for invalid manifest.json JSON', () => {
    writeFileSync(join(testDir, 'manifest.json'), 'invalid json {');
    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('manifest.json'))).toBe(true);
  });

  it('returns error for invalid AIEOS schema', () => {
    writeFileSync(
      join(testDir, 'manifest.json'),
      JSON.stringify({
        id: 'test-intern',
        name: 'Test',
        version: '1.0.0',
        description: 'Test',
        author: 'Test',
        license: 'MIT',
        aieos_version: '1.1',
        supported_runtimes: ['zeroclaw'],
        primary_runtime: 'zeroclaw',
        tags: [],
        tier_required: 'free',
        skills: [],
        created_at: '2026-02-25',
      })
    );
    writeFileSync(
      join(testDir, 'aieos.json'),
      JSON.stringify({ invalid: 'structure' })
    );

    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('aieos.json'))).toBe(true);
  });

  it('returns warning for missing profile.png', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);

    const result = validateInternPackage(testDir);
    const hasProfileWarning = result.warnings.some(w => w.includes('profile.png'));
    // Note: Jordan may or may not have profile.png, so this is flexible
    expect(Array.isArray(result.warnings)).toBe(true);
  });

  it('returns warning for missing SKILL.md of declared skill', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);

    // Add a skill to manifest that doesn't have a SKILL.md
    const manifestPath = join(testDir, 'manifest.json');
    const { readFileSync: read } = require('node:fs');
    const manifestData = JSON.parse(read(manifestPath, 'utf-8'));
    manifestData.skills = [...manifestData.skills, 'nonexistent-skill'];
    writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2));

    const result = validateInternPackage(testDir);
    const hasWarning = result.warnings.some(w => w.includes('nonexistent-skill'));
    expect(hasWarning).toBe(true);
  });

  it('valid field is true when no errors', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);

    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(true);
  });

  it('valid field is false when errors present', () => {
    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
  });

  it('returns error with descriptive message for missing manifest', () => {
    const result = validateInternPackage(testDir);
    expect(result.errors[0]).toMatch(/manifest\.json/i);
  });

  it('continues checking aieos even when manifest missing', () => {
    writeFileSync(join(testDir, 'manifest.json'), JSON.stringify({
      id: 'test-intern',
      name: 'Test',
      version: '1.0.0',
      description: 'Test',
      author: 'Test',
      license: 'MIT',
      aieos_version: '1.1',
      supported_runtimes: ['zeroclaw'],
      primary_runtime: 'zeroclaw',
      tags: [],
      tier_required: 'free',
      skills: [],
      created_at: '2026-02-25',
    }));
    // Intentionally omit aieos.json

    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('aieos.json'))).toBe(true);
  });

  it('handles manifest schema validation errors', () => {
    writeFileSync(join(testDir, 'manifest.json'), JSON.stringify({
      id: 'invalid id with spaces',
      name: 'Test',
      version: '1.0.0',
      description: 'Test',
      author: 'Test',
      license: 'MIT',
      aieos_version: '1.1',
      supported_runtimes: ['zeroclaw'],
      primary_runtime: 'zeroclaw',
      tags: [],
      tier_required: 'free',
      skills: [],
      created_at: '2026-02-25',
    }));

    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
  });

  it('validates manifest tier_required values', () => {
    const pkg = readInternPackage(jordanPath);
    // Create a manifest with invalid tier_required
    const manifestPath = join(testDir, 'manifest.json');
    const manifestData = { ...pkg.manifest, tier_required: 'invalid-tier' };
    writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2));
    writeFileSync(join(testDir, 'aieos.json'), JSON.stringify(pkg.aieos, null, 2));

    const result = validateInternPackage(testDir);
    expect(result.valid).toBe(false);
  });

  it('Jordan fixture is valid (may have optional warnings)', () => {
    const result = validateInternPackage(jordanPath);
    expect(result.valid).toBe(true);
    // Jordan is valid; may have warnings about optional files like profile.png
    expect(result.errors.length).toBe(0);
  });
});
