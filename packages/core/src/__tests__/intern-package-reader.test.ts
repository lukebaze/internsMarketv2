import { describe, it, expect } from 'vitest';
import { readInternPackage } from '../package-io/intern-package-reader.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

describe('readInternPackage', () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const jordanPath = join(__dirname, '../../../interns/content-marketing-intern');

  it('reads Jordan fixture successfully', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg).toBeTruthy();
    expect(pkg.manifest).toBeTruthy();
    expect(pkg.aieos).toBeTruthy();
  });

  it('reads manifest correctly', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.manifest.id).toBe('content-marketing-intern');
    expect(pkg.manifest.name).toBe('Jordan Lee — Content Marketing Intern');
    expect(pkg.manifest.version).toBe('1.0.0');
  });

  it('reads AIEOS data correctly', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.aieos.identity?.names?.display).toBe('Jordan Lee');
    expect(pkg.aieos.psychology?.neural_matrix?.creativity).toBe(0.88);
  });

  it('reads skills array', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.skills).toBeTruthy();
    expect(Array.isArray(pkg.skills)).toBe(true);
    expect(pkg.skills.length).toBeGreaterThan(0);
  });

  it('reads skill names correctly', () => {
    const pkg = readInternPackage(jordanPath);
    const skillNames = pkg.skills.map(s => s.name);
    expect(skillNames).toContain('blog-post-writer');
    expect(skillNames).toContain('social-media-content');
  });

  it('reads SKILL.md content for each skill', () => {
    const pkg = readInternPackage(jordanPath);
    for (const skill of pkg.skills) {
      expect(skill.content).toBeTruthy();
      expect(skill.content.length).toBeGreaterThan(0);
    }
  });

  it('reads memory seed paths', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.memorySeedPaths).toBeTruthy();
    expect(Array.isArray(pkg.memorySeedPaths)).toBe(true);
    expect(pkg.memorySeedPaths.length).toBeGreaterThan(0);
  });

  it('memory seed paths point to .md files', () => {
    const pkg = readInternPackage(jordanPath);
    for (const path of pkg.memorySeedPaths) {
      expect(path).toMatch(/\.md$/);
    }
  });

  it('sets packageDir to resolved absolute path', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.packageDir).toBeTruthy();
    expect(pkg.packageDir).not.toContain('..'); // Should be absolute
  });

  it('detects profile.png presence correctly', () => {
    const pkg = readInternPackage(jordanPath);
    expect(typeof pkg.hasProfile).toBe('boolean');
  });

  it('validates manifest schema during read', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.manifest.tier_required).toBe('free');
    expect(pkg.manifest.primary_runtime).toBe('zeroclaw');
  });

  it('manifest includes all required fields', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.manifest.id).toBeTruthy();
    expect(pkg.manifest.name).toBeTruthy();
    expect(pkg.manifest.version).toBeTruthy();
    expect(pkg.manifest.description).toBeTruthy();
    expect(pkg.manifest.author).toBeTruthy();
    expect(pkg.manifest.license).toBeTruthy();
  });

  it('AIEOS includes standard section', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.aieos.standard).toBeTruthy();
    expect(pkg.aieos.standard.protocol).toBe('AIEOS');
    expect(pkg.aieos.standard.version).toBe('1.1');
  });

  it('all 5 skills are read for Jordan', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.skills.length).toBe(5);
  });

  it('skill content includes markdown formatting', () => {
    const pkg = readInternPackage(jordanPath);
    const hasMarkdown = pkg.skills.some(s =>
      s.content.includes('#') || s.content.includes('##')
    );
    expect(hasMarkdown).toBe(true);
  });

  it('includes identity, physics, psychology, and linguistics', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.aieos.identity).toBeTruthy();
    expect(pkg.aieos.physicality).toBeTruthy();
    expect(pkg.aieos.psychology).toBeTruthy();
    expect(pkg.aieos.linguistics).toBeTruthy();
  });

  it('identity has names section', () => {
    const pkg = readInternPackage(jordanPath);
    expect(pkg.aieos.identity?.names).toBeTruthy();
    expect(pkg.aieos.identity?.names?.given).toBe('Jordan');
    expect(pkg.aieos.identity?.names?.family).toBe('Lee');
  });

  it('throws on nonexistent directory', () => {
    expect(() => {
      readInternPackage('/nonexistent/path/12345');
    }).toThrow();
  });

  it('throws when manifest.json missing', () => {
    expect(() => {
      readInternPackage('/tmp');
    }).toThrow();
  });
});
