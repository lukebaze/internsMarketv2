/** Tests for skill-reader, skill-directory-to-tgz-packer, and skill-tgz-to-directory-installer */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { readSkillPackage } from '../skill-packaging/skill-reader.js';
import { packSkill } from '../skill-packaging/skill-directory-to-tgz-packer.js';
import { installSkillFromTgz } from '../skill-packaging/skill-tgz-to-directory-installer.js';

// ── Fixture helpers ──────────────────────────────────────────────────────────

function makeSkillDir(base: string, name = 'test-skill'): string {
  const dir = join(base, name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'skill.json'), JSON.stringify({
    name: 'test-skill',
    version: '1.0.0',
    description: 'A test skill',
    runtimes: ['zeroclaw'],
    author: 'Tester',
    license: 'MIT',
  }));
  writeFileSync(join(dir, 'SKILL.md'), '# Test Skill\n\nThis is a test skill.');
  return dir;
}

// ── Test suite ───────────────────────────────────────────────────────────────

describe('readSkillPackage', () => {
  let tmpDir: string;
  let skillDir: string;

  beforeAll(() => {
    tmpDir = join(tmpdir(), `skill-reader-test-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
    skillDir = makeSkillDir(tmpDir);
  });

  afterAll(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('reads a valid skill directory', () => {
    const pkg = readSkillPackage(skillDir);
    expect(pkg).toBeTruthy();
    expect(pkg.manifest.name).toBe('test-skill');
    expect(pkg.manifest.version).toBe('1.0.0');
  });

  it('returns absolute packageDir', () => {
    const pkg = readSkillPackage(skillDir);
    expect(pkg.packageDir).toBe(resolve(skillDir));
    expect(pkg.packageDir).not.toContain('..');
  });

  it('reads SKILL.md content', () => {
    const pkg = readSkillPackage(skillDir);
    expect(pkg.skillMdContent).toContain('# Test Skill');
  });

  it('validates manifest schema fields', () => {
    const pkg = readSkillPackage(skillDir);
    expect(pkg.manifest.author).toBe('Tester');
    expect(pkg.manifest.license).toBe('MIT');
    expect(pkg.manifest.runtimes).toContain('zeroclaw');
  });

  it('throws when skill.json is missing', () => {
    const emptyDir = join(tmpDir, 'no-manifest');
    mkdirSync(emptyDir, { recursive: true });
    writeFileSync(join(emptyDir, 'SKILL.md'), '# No manifest');
    expect(() => readSkillPackage(emptyDir)).toThrow(/Missing skill\.json/);
  });

  it('throws when SKILL.md is missing', () => {
    const noMdDir = join(tmpDir, 'no-skillmd');
    mkdirSync(noMdDir, { recursive: true });
    writeFileSync(join(noMdDir, 'skill.json'), JSON.stringify({
      name: 'no-md-skill',
      version: '1.0.0',
      description: 'No SKILL.md',
      runtimes: ['zeroclaw'],
      author: 'X',
      license: 'MIT',
    }));
    expect(() => readSkillPackage(noMdDir)).toThrow(/Missing SKILL\.md/);
  });

  it('throws on invalid manifest (bad semver)', () => {
    const badDir = join(tmpDir, 'bad-manifest');
    mkdirSync(badDir, { recursive: true });
    writeFileSync(join(badDir, 'skill.json'), JSON.stringify({
      name: 'bad-skill',
      version: 'not-semver',
      description: 'Bad manifest',
      runtimes: ['zeroclaw'],
      author: 'X',
      license: 'MIT',
    }));
    writeFileSync(join(badDir, 'SKILL.md'), '# Bad');
    expect(() => readSkillPackage(badDir)).toThrow();
  });
});

// ── packSkill tests ──────────────────────────────────────────────────────────

describe('packSkill', () => {
  let tmpDir: string;
  let skillDir: string;

  beforeAll(() => {
    tmpDir = join(tmpdir(), `skill-packer-test-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
    skillDir = makeSkillDir(tmpDir);
  });

  afterAll(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('creates a .tgz file', async () => {
    const outPath = join(tmpDir, 'test-skill.tgz');
    const result = await packSkill(skillDir, outPath);
    expect(existsSync(result.tgzPath)).toBe(true);
  });

  it('returns sha256 as 64-char hex string', async () => {
    const outPath = join(tmpDir, 'test-skill-2.tgz');
    const result = await packSkill(skillDir, outPath);
    expect(result.sha256).toMatch(/^[a-f0-9]{64}$/);
  });

  it('returns positive byte size', async () => {
    const outPath = join(tmpDir, 'test-skill-3.tgz');
    const result = await packSkill(skillDir, outPath);
    expect(result.size).toBeGreaterThan(0);
  });

  it('produces deterministic output (same sha256 on repeat)', async () => {
    const out1 = join(tmpDir, 'det1.tgz');
    const out2 = join(tmpDir, 'det2.tgz');
    const r1 = await packSkill(skillDir, out1);
    const r2 = await packSkill(skillDir, out2);
    expect(r1.sha256).toBe(r2.sha256);
  });

  it('throws on nonexistent skill directory', async () => {
    await expect(packSkill('/nonexistent/skill/dir', join(tmpDir, 'x.tgz')))
      .rejects.toThrow(/Skill directory not found/);
  });
});

// ── installSkillFromTgz tests ────────────────────────────────────────────────

describe('installSkillFromTgz', () => {
  let tmpDir: string;
  let skillDir: string;
  let tgzPath: string;
  let validSha256: string;

  beforeAll(async () => {
    tmpDir = join(tmpdir(), `skill-installer-test-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
    skillDir = makeSkillDir(tmpDir);
    tgzPath = join(tmpDir, 'skill.tgz');
    const result = await packSkill(skillDir, tgzPath);
    validSha256 = result.sha256;
  });

  afterAll(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('installs and returns a valid SkillPackage', async () => {
    const destDir = join(tmpDir, 'installed-1');
    const pkg = await installSkillFromTgz(tgzPath, destDir);
    expect(pkg.manifest.name).toBe('test-skill');
    expect(pkg.skillMdContent).toContain('# Test Skill');
  });

  it('passes with correct expectedSha256', async () => {
    const destDir = join(tmpDir, 'installed-2');
    const pkg = await installSkillFromTgz(tgzPath, destDir, validSha256);
    expect(pkg.manifest.version).toBe('1.0.0');
  });

  it('throws with wrong expectedSha256', async () => {
    const destDir = join(tmpDir, 'installed-bad');
    await expect(
      installSkillFromTgz(tgzPath, destDir, 'a'.repeat(64))
    ).rejects.toThrow(/SHA256 mismatch/);
  });

  it('throws when tgz file does not exist', async () => {
    await expect(
      installSkillFromTgz('/nonexistent/skill.tgz', join(tmpDir, 'dest'))
    ).rejects.toThrow(/Skill archive not found/);
  });

  it('creates destDir if it does not exist', async () => {
    const destDir = join(tmpDir, 'auto-created-dest');
    expect(existsSync(destDir)).toBe(false);
    await installSkillFromTgz(tgzPath, destDir);
    expect(existsSync(destDir)).toBe(true);
  });
});
