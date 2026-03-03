import semver from 'semver';
import { SLUG_REGEX } from '../types/skill-manifest.js';
import type { SkillRegistryIndex } from './skill-registry-types.js';

export interface ResolvedSkill {
  readonly name: string;
  readonly version: string;
  readonly sha256: string;
}

export interface ResolutionResult {
  readonly resolved: ResolvedSkill[];
}

export class VersionConflictError extends Error {
  constructor(
    public readonly skillName: string,
    public readonly ranges: { range: string; requiredBy: string }[],
  ) {
    super(
      `No version of "${skillName}" satisfies: ${ranges.map(r => `${r.range} (by ${r.requiredBy})`).join(', ')}`,
    );
    this.name = 'VersionConflictError';
  }
}

export class SkillNotFoundError extends Error {
  constructor(public readonly skillName: string) {
    super(`Skill "${skillName}" not found in registry`);
    this.name = 'SkillNotFoundError';
  }
}

interface ResolveContext {
  /** name -> resolved version string */
  resolved: Map<string, ResolvedSkill>;
  /** name -> all required ranges */
  ranges: Map<string, { range: string; requiredBy: string }[]>;
  /** names currently in the DFS stack — circular dep detection */
  stack: Set<string>;
}

function resolveOne(
  name: string,
  range: string,
  requiredBy: string,
  index: SkillRegistryIndex,
  ctx: ResolveContext,
  depth: number,
  maxDepth: number,
): void {
  if (!SLUG_REGEX.test(name)) {
    throw new Error(`Invalid skill name "${name}": must match ${SLUG_REGEX.toString()}`);
  }

  const entry = index.skills[name];
  if (!entry) throw new SkillNotFoundError(name);

  // Track all ranges for this skill
  const allRanges = ctx.ranges.get(name) ?? [];
  allRanges.push({ range, requiredBy });
  ctx.ranges.set(name, allRanges);

  // Circular dependency check — must run before the resolved early-exit
  if (ctx.stack.has(name)) {
    throw new Error(`Circular dependency detected: "${name}" is already being resolved`);
  }

  if (depth > maxDepth) {
    throw new Error(`Max dependency depth (${maxDepth}) exceeded resolving "${name}"`);
  }

  const availableVersions = Object.keys(entry.versions);
  // Determine intersection-satisfying version across all known ranges so far
  const satisfying = semver.maxSatisfying(availableVersions, range);
  if (satisfying === null) {
    throw new VersionConflictError(name, allRanges);
  }

  // If already resolved, verify new range still satisfies the pinned version
  const existing = ctx.resolved.get(name);
  if (existing) {
    if (!semver.satisfies(existing.version, range)) {
      throw new VersionConflictError(name, allRanges);
    }
    // Already resolved and compatible — nothing more to do
    return;
  }

  const versionMeta = entry.versions[satisfying];
  ctx.resolved.set(name, { name, version: satisfying, sha256: versionMeta.sha256 });

  // Recurse into transitive dependencies
  if (entry.dependencies && Object.keys(entry.dependencies).length > 0) {
    ctx.stack.add(name);
    for (const [depName, depRange] of Object.entries(entry.dependencies)) {
      resolveOne(depName, depRange, name, index, ctx, depth + 1, maxDepth);
    }
    ctx.stack.delete(name);
  }
}

/**
 * Resolves a flat dependency list from root dependencies.
 * Synchronous — takes the full registry index as a parameter; no network calls.
 */
export function resolveSkillDependencies(
  rootDeps: Record<string, string>,
  index: SkillRegistryIndex,
  maxDepth = 10,
): ResolutionResult {
  const ctx: ResolveContext = {
    resolved: new Map(),
    ranges: new Map(),
    stack: new Set(),
  };

  for (const [name, range] of Object.entries(rootDeps)) {
    resolveOne(name, range, '<root>', index, ctx, 0, maxDepth);
  }

  return { resolved: Array.from(ctx.resolved.values()) };
}
