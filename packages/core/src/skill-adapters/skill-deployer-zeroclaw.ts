/**
 * Deploys resolved registry skills into a ZeroClaw intern's skills directory.
 * Since ZeroClaw uses a single [skills] path per intern,
 * registry skills are installed alongside embedded skills.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { ResolutionResult, ResolvedSkill } from '../skill-registry/skill-dependency-resolver.js';
import { installSkillFromTgz } from '../skill-packaging/skill-tgz-to-directory-installer.js';

/**
 * Deploys resolved registry skills into an intern's skills directory.
 *
 * @param resolved - Resolved dependencies from resolver
 * @param internSkillsDir - Intern's skills directory (e.g., ~/.zeroclaw/skills/<intern-id>/)
 * @param tgzCacheDir - Directory containing downloaded .tgz files
 */
export async function deployResolvedSkills(
  resolved: ResolutionResult,
  internSkillsDir: string,
  tgzCacheDir: string,
): Promise<void> {
  fs.mkdirSync(internSkillsDir, { recursive: true });

  for (const skill of resolved.resolved) {
    const destDir = path.join(internSkillsDir, skill.name);
    const tmpDir = `${destDir}.tmp`;
    const tgzPath = path.join(tgzCacheDir, `${skill.name}-${skill.version}.tgz`);

    // Skip if already installed at correct version
    if (isAlreadyInstalled(destDir, skill.version)) continue;

    // Clean up any leftover .tmp from a previous failed run
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });

    try {
      // Atomic: extract to .tmp first (SHA256 verified inside installSkillFromTgz)
      await installSkillFromTgz(tgzPath, tmpDir, skill.sha256);

      // Replace existing version
      if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true });
      fs.renameSync(tmpDir, destDir);
    } catch (err) {
      // Clean up partial .tmp on failure before re-throwing
      if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
      throw err;
    }
  }
}

/**
 * Removes skills from intern dir that are no longer in resolved set.
 * Only removes skills that were previously installed from registry
 * (identified by having a skill.json manifest file).
 *
 * @returns Array of skill names that were removed
 */
export function cleanStaleRegistrySkills(
  internSkillsDir: string,
  resolved: ResolutionResult,
): string[] {
  if (!fs.existsSync(internSkillsDir)) return [];

  const resolvedNames = new Set(resolved.resolved.map((s: ResolvedSkill) => s.name));
  const removed: string[] = [];

  for (const entry of fs.readdirSync(internSkillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const skillDir = path.join(internSkillsDir, entry.name);
    const manifestPath = path.join(skillDir, 'skill.json');

    // Only remove if it looks like a registry-installed skill (has skill.json)
    // and is no longer in the resolved set
    if (fs.existsSync(manifestPath) && !resolvedNames.has(entry.name)) {
      fs.rmSync(skillDir, { recursive: true });
      removed.push(entry.name);
    }
  }

  return removed;
}

/** Returns true if skill is already installed at the expected version */
function isAlreadyInstalled(destDir: string, version: string): boolean {
  const manifestPath = path.join(destDir, 'skill.json');
  if (!fs.existsSync(manifestPath)) return false;
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as { version?: string };
    return manifest.version === version;
  } catch {
    return false;
  }
}
