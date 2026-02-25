import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeInternPackage } from '../package-io/intern-package-writer.js';
import { readInternPackage } from '../package-io/intern-package-reader.js';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

describe('writeInternPackage', () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const jordanPath = join(__dirname, '../../../interns/content-marketing-intern');
  let testDir: string;

  beforeEach(() => {
    testDir = join(tmpdir(), `test-intern-${Date.now()}-${Math.random()}`);
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
  });

  it('creates package directory', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    expect(existsSync(testDir)).toBe(true);
  });

  it('writes manifest.json file', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const manifestPath = join(testDir, 'manifest.json');
    expect(existsSync(manifestPath)).toBe(true);
  });

  it('writes aieos.json file', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const aieosPath = join(testDir, 'aieos.json');
    expect(existsSync(aieosPath)).toBe(true);
  });

  it('writes skills directory', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const skillsDir = join(testDir, 'skills');
    expect(existsSync(skillsDir)).toBe(true);
  });

  it('writes SKILL.md files for each skill', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);

    for (const skill of pkg.skills) {
      const skillMdPath = join(testDir, 'skills', skill.name, 'SKILL.md');
      expect(existsSync(skillMdPath)).toBe(true);
    }
  });

  it('creates config directory', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const configDir = join(testDir, 'config');
    expect(existsSync(configDir)).toBe(true);
  });

  it('round-trip: write then read returns equivalent data', () => {
    const original = readInternPackage(jordanPath);
    writeInternPackage(original, testDir);
    const readBack = readInternPackage(testDir);

    expect(readBack.manifest.id).toBe(original.manifest.id);
    expect(readBack.manifest.name).toBe(original.manifest.name);
    expect(readBack.manifest.version).toBe(original.manifest.version);
  });

  it('round-trip: AIEOS data matches', () => {
    const original = readInternPackage(jordanPath);
    writeInternPackage(original, testDir);
    const readBack = readInternPackage(testDir);

    expect(readBack.aieos.standard.protocol).toBe(original.aieos.standard.protocol);
    expect(readBack.aieos.identity?.names?.display).toBe(original.aieos.identity?.names?.display);
  });

  it('round-trip: skills match', () => {
    const original = readInternPackage(jordanPath);
    writeInternPackage(original, testDir);
    const readBack = readInternPackage(testDir);

    expect(readBack.skills.length).toBe(original.skills.length);
    const originalNames = original.skills.map(s => s.name);
    const readBackNames = readBack.skills.map(s => s.name);
    expect(readBackNames).toEqual(expect.arrayContaining(originalNames));
  });

  it('round-trip: skill content matches', () => {
    const original = readInternPackage(jordanPath);
    writeInternPackage(original, testDir);
    const readBack = readInternPackage(testDir);

    for (const originalSkill of original.skills) {
      const readBackSkill = readBack.skills.find(s => s.name === originalSkill.name);
      expect(readBackSkill).toBeTruthy();
      expect(readBackSkill?.content).toBe(originalSkill.content);
    }
  });

  it('manifest.json is valid JSON', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const manifestPath = join(testDir, 'manifest.json');
    const content = readFileSync(manifestPath, 'utf-8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  it('aieos.json is valid JSON', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const aieosPath = join(testDir, 'aieos.json');
    const content = readFileSync(aieosPath, 'utf-8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  it('JSON files are formatted with indentation', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const manifestPath = join(testDir, 'manifest.json');
    const content = readFileSync(manifestPath, 'utf-8');
    expect(content).toMatch(/\n  /); // Check for indentation
  });

  it('handles empty skills array gracefully', () => {
    const pkg = readInternPackage(jordanPath);
    const pkgCopy = { ...pkg, skills: [] };
    expect(() => writeInternPackage(pkgCopy, testDir)).not.toThrow();
  });

  it('handles empty memory seed paths gracefully', () => {
    const pkg = readInternPackage(jordanPath);
    const pkgCopy = { ...pkg, memorySeedPaths: [] };
    expect(() => writeInternPackage(pkgCopy, testDir)).not.toThrow();
  });

  it('creates memory-seeds directory only when paths exist', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);
    const seedsDir = join(testDir, 'memory-seeds');
    // Should exist since Jordan has memory seeds
    expect(existsSync(seedsDir)).toBe(true);
  });

  it('skill directories follow expected structure', () => {
    const pkg = readInternPackage(jordanPath);
    writeInternPackage(pkg, testDir);

    for (const skill of pkg.skills) {
      const skillDir = join(testDir, 'skills', skill.name);
      expect(existsSync(skillDir)).toBe(true);
      const skillMd = join(skillDir, 'SKILL.md');
      expect(existsSync(skillMd)).toBe(true);
    }
  });

  it('can write to nested directory paths', () => {
    const nestedDir = join(testDir, 'deeply', 'nested', 'path');
    const pkg = readInternPackage(jordanPath);
    expect(() => writeInternPackage(pkg, nestedDir)).not.toThrow();
    expect(existsSync(nestedDir)).toBe(true);
    expect(existsSync(join(nestedDir, 'manifest.json'))).toBe(true);
  });
});
