/** Packs a skill directory into a deterministic .tgz archive with SHA256 hash */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, lstatSync, readlinkSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { create as tarCreate } from 'tar';

/** Result of packing a skill directory */
export interface PackResult {
  tgzPath: string;
  sha256: string;
  size: number;
}

/** Patterns to exclude when packing */
const EXCLUDE = new Set(['node_modules', '.git', '.DS_Store']);

/**
 * Recursively scans for symlinks that point outside the skill directory.
 * Throws if any external symlink is found (security check before packing).
 */
function scanForExternalSymlinks(dir: string, rootDir: string): void {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDE.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = lstatSync(fullPath);

    if (stat.isSymbolicLink()) {
      const linkTarget = readlinkSync(fullPath);
      const resolved = resolve(dir, linkTarget);
      const rootWithSlash = rootDir.endsWith('/') ? rootDir : rootDir + '/';
      if (resolved !== rootDir && !resolved.startsWith(rootWithSlash)) {
        throw new Error(`External symlink detected: ${fullPath} -> ${resolved}`);
      }
    } else if (stat.isDirectory()) {
      scanForExternalSymlinks(fullPath, rootDir);
    }
  }
}

/** Collects top-level entry names (relative) from skill dir, excluding unwanted patterns */
function collectTopLevelEntries(dir: string): string[] {
  return readdirSync(dir).filter(name => !EXCLUDE.has(name));
}

/**
 * Packs a skill directory to a .tgz file at the given output path.
 * Uses fixed mtime (epoch 0) for determinism, excludes node_modules/.git/.DS_Store.
 * Pre-scans for external symlinks before packing.
 * Returns tgzPath, sha256 hex, and byte size.
 */
export async function packSkill(skillDir: string, outPath: string): Promise<PackResult> {
  const absSkillDir = resolve(skillDir);
  const absTgzPath = resolve(outPath);

  if (!existsSync(absSkillDir)) {
    throw new Error(`Skill directory not found: ${skillDir}`);
  }

  // Security: reject symlinks pointing outside skill dir before packing
  scanForExternalSymlinks(absSkillDir, absSkillDir);

  const entries = collectTopLevelEntries(absSkillDir);

  await tarCreate(
    {
      gzip: true,
      file: absTgzPath,
      cwd: absSkillDir,
      follow: false,       // never follow symlinks
      portable: true,      // omit uid/gid for reproducibility
      mtime: new Date(0),  // fixed mtime for deterministic output
      filter: (entryPath: string) => {
        const parts = entryPath.split('/');
        return !parts.some((p: string) => EXCLUDE.has(p));
      },
    },
    entries
  );

  const tgzBuffer = readFileSync(absTgzPath);
  const sha256 = createHash('sha256').update(tgzBuffer).digest('hex');

  return { tgzPath: absTgzPath, sha256, size: tgzBuffer.byteLength };
}
