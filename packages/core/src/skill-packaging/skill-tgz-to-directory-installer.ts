/** Installs a skill from a .tgz archive into a destination directory with SHA256 verification */
import { createHash } from 'node:crypto';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { extract as tarExtract } from 'tar';
import { readSkillPackage } from './skill-reader.js';
import type { SkillPackage } from '../types/skill-package-composite-type.js';

/**
 * Installs a skill .tgz into destDir.
 * If expectedSha256 is provided, verifies integrity BEFORE extraction.
 * Validates the extracted directory via readSkillPackage after extraction.
 * Returns the loaded SkillPackage.
 */
export async function installSkillFromTgz(
  tgzPath: string,
  destDir: string,
  expectedSha256?: string
): Promise<SkillPackage> {
  const absTgzPath = resolve(tgzPath);
  const absDestDir = resolve(destDir);

  if (!existsSync(absTgzPath)) {
    throw new Error(`Skill archive not found: ${tgzPath}`);
  }

  // Verify SHA256 integrity BEFORE extraction
  if (expectedSha256) {
    const tgzBuffer = readFileSync(absTgzPath);
    const actual = createHash('sha256').update(tgzBuffer).digest('hex');
    if (actual !== expectedSha256) {
      throw new Error(
        `SHA256 mismatch for ${tgzPath}: expected ${expectedSha256}, got ${actual}`
      );
    }
  }

  // Ensure destination directory exists
  mkdirSync(absDestDir, { recursive: true });

  // Extract archive — node-tar validates paths by default (prevents ../ traversal)
  await tarExtract({
    file: absTgzPath,
    cwd: absDestDir,
    strict: true,  // throw on missing files
  });

  // Validate the extracted directory as a proper skill package
  return readSkillPackage(absDestDir);
}
