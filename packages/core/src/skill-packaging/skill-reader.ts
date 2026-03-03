/** Reads and validates a skill package directory */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { SkillManifestSchema } from '../types/skill-manifest.js';
import type { SkillPackage } from '../types/skill-package-composite-type.js';

/** Reads and validates a skill directory, returns a SkillPackage */
export function readSkillPackage(dir: string): SkillPackage {
  const packageDir = resolve(dir);
  const manifestPath = join(packageDir, 'skill.json');
  const skillMdPath = join(packageDir, 'SKILL.md');

  if (!existsSync(manifestPath)) throw new Error(`Missing skill.json in ${dir}`);
  if (!existsSync(skillMdPath)) throw new Error(`Missing SKILL.md in ${dir}`);

  const manifest = SkillManifestSchema.parse(
    JSON.parse(readFileSync(manifestPath, 'utf-8'))
  );
  const skillMdContent = readFileSync(skillMdPath, 'utf-8');

  return { manifest, skillMdContent, packageDir };
}
