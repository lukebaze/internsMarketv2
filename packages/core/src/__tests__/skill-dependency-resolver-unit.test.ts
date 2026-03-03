import { describe, it, expect } from 'vitest';
import {
  resolveSkillDependencies,
  VersionConflictError,
  SkillNotFoundError,
} from '../skill-registry/skill-dependency-resolver.js';
import type { SkillRegistryIndex } from '../skill-registry/skill-registry-types.js';

// ── Fixtures ────────────────────────────────────────────────────────────────

const baseIndex: SkillRegistryIndex = {
  version: '1',
  updated_at: '2026-01-01T00:00:00Z',
  skills: {
    'tool-a': {
      latest: '2.0.0',
      versions: {
        '1.0.0': { sha256: 'aaa100', size: 100 },
        '1.1.0': { sha256: 'aaa110', size: 110 },
        '2.0.0': { sha256: 'aaa200', size: 200 },
      },
      runtimes: ['claude-code'],
    },
    'tool-b': {
      latest: '1.0.0',
      versions: {
        '1.0.0': { sha256: 'bbb100', size: 50 },
      },
      runtimes: ['claude-code'],
      dependencies: { 'tool-a': '^1.0.0' },
    },
    'tool-c': {
      latest: '1.0.0',
      versions: {
        '1.0.0': { sha256: 'ccc100', size: 60 },
      },
      runtimes: ['claude-code'],
      dependencies: { 'tool-a': '^2.0.0' },
    },
    'circular-x': {
      latest: '1.0.0',
      versions: { '1.0.0': { sha256: 'cx100', size: 10 } },
      runtimes: ['claude-code'],
      dependencies: { 'circular-y': '^1.0.0' },
    },
    'circular-y': {
      latest: '1.0.0',
      versions: { '1.0.0': { sha256: 'cy100', size: 10 } },
      runtimes: ['claude-code'],
      dependencies: { 'circular-x': '^1.0.0' },
    },
    'deep-a': {
      latest: '1.0.0',
      versions: { '1.0.0': { sha256: 'da100', size: 10 } },
      runtimes: ['claude-code'],
      dependencies: { 'deep-b': '^1.0.0' },
    },
    'deep-b': {
      latest: '1.0.0',
      versions: { '1.0.0': { sha256: 'db100', size: 10 } },
      runtimes: ['claude-code'],
    },
  },
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe('resolveSkillDependencies', () => {
  it('resolves a single root dep to maxSatisfying version', () => {
    const result = resolveSkillDependencies({ 'tool-a': '^1.0.0' }, baseIndex);
    expect(result.resolved).toHaveLength(1);
    expect(result.resolved[0]).toEqual({ name: 'tool-a', version: '1.1.0', sha256: 'aaa110' });
  });

  it('resolves exact version range', () => {
    const result = resolveSkillDependencies({ 'tool-a': '2.0.0' }, baseIndex);
    expect(result.resolved[0].version).toBe('2.0.0');
  });

  it('resolves transitive deps (tool-b depends on tool-a)', () => {
    const result = resolveSkillDependencies({ 'tool-b': '^1.0.0' }, baseIndex);
    const names = result.resolved.map(r => r.name).sort();
    expect(names).toEqual(['tool-a', 'tool-b']);
  });

  it('deduplicates when same skill required by root and transitive dep', () => {
    const result = resolveSkillDependencies({ 'tool-a': '^1.0.0', 'tool-b': '^1.0.0' }, baseIndex);
    const names = result.resolved.map(r => r.name);
    expect(names.filter(n => n === 'tool-a')).toHaveLength(1);
  });

  it('is deterministic — same input produces same output', () => {
    const r1 = resolveSkillDependencies({ 'tool-b': '^1.0.0', 'tool-a': '^1.0.0' }, baseIndex);
    const r2 = resolveSkillDependencies({ 'tool-b': '^1.0.0', 'tool-a': '^1.0.0' }, baseIndex);
    expect(r1.resolved.map(r => r.version)).toEqual(r2.resolved.map(r => r.version));
  });

  it('resolves transitive deps (tool-c -> tool-a ^2.0.0)', () => {
    const result = resolveSkillDependencies({ 'tool-c': '^1.0.0' }, baseIndex);
    const a = result.resolved.find(r => r.name === 'tool-a');
    expect(a?.version).toBe('2.0.0');
  });

  it('throws SkillNotFoundError for unknown skill', () => {
    expect(() =>
      resolveSkillDependencies({ 'nonexistent-skill': '^1.0.0' }, baseIndex),
    ).toThrow(SkillNotFoundError);
  });

  it('SkillNotFoundError carries skill name', () => {
    try {
      resolveSkillDependencies({ 'nonexistent-skill': '^1.0.0' }, baseIndex);
    } catch (e) {
      expect(e).toBeInstanceOf(SkillNotFoundError);
      expect((e as SkillNotFoundError).skillName).toBe('nonexistent-skill');
    }
  });

  it('throws VersionConflictError when no version satisfies range', () => {
    expect(() =>
      resolveSkillDependencies({ 'tool-a': '^9.0.0' }, baseIndex),
    ).toThrow(VersionConflictError);
  });

  it('VersionConflictError carries skill name and ranges', () => {
    try {
      resolveSkillDependencies({ 'tool-a': '^9.0.0' }, baseIndex);
    } catch (e) {
      expect(e).toBeInstanceOf(VersionConflictError);
      expect((e as VersionConflictError).skillName).toBe('tool-a');
      expect((e as VersionConflictError).ranges.length).toBeGreaterThan(0);
    }
  });

  it('throws VersionConflictError when root and transitive demand incompatible ranges', () => {
    // root wants ^1.0.0 but tool-c pulls ^2.0.0 — conflict when tool-a already pinned to 1.x
    expect(() =>
      resolveSkillDependencies({ 'tool-a': '^1.0.0', 'tool-c': '^1.0.0' }, baseIndex),
    ).toThrow(VersionConflictError);
  });

  it('throws on circular dependency', () => {
    expect(() =>
      resolveSkillDependencies({ 'circular-x': '^1.0.0' }, baseIndex),
    ).toThrow(/[Cc]ircular/);
  });

  it('throws on invalid skill name (not matching SLUG_REGEX)', () => {
    expect(() =>
      resolveSkillDependencies({ 'INVALID_NAME': '^1.0.0' }, baseIndex),
    ).toThrow(/Invalid skill name/);
  });

  it('resolves nested transitive deps (deep-a -> deep-b)', () => {
    const result = resolveSkillDependencies({ 'deep-a': '^1.0.0' }, baseIndex);
    const names = result.resolved.map(r => r.name).sort();
    expect(names).toEqual(['deep-a', 'deep-b']);
  });

  it('respects maxDepth limit', () => {
    expect(() =>
      resolveSkillDependencies({ 'deep-a': '^1.0.0' }, baseIndex, 0),
    ).toThrow(/[Mm]ax.*depth/);
  });

  it('returns empty resolved for empty rootDeps', () => {
    const result = resolveSkillDependencies({}, baseIndex);
    expect(result.resolved).toHaveLength(0);
  });
});
