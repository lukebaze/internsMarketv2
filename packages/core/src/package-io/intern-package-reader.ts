/** Reads and validates an .intern package directory */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { InternManifestSchema } from '../types/intern-manifest.js';
import { validateAieos } from '../validators/aieos-zod-schema.js';
import type { InternPackage } from '../types/intern-package.js';
import type { SkillFile } from '../types/intern-package.js';

/** Reads an .intern package from a directory path */
export function readInternPackage(dir: string): InternPackage {
  const packageDir = resolve(dir);

  // Read and validate manifest
  const manifestPath = join(packageDir, 'manifest.json');
  const manifestRaw = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const manifest = InternManifestSchema.parse(manifestRaw);

  // Read and validate AIEOS persona
  const aieosPath = join(packageDir, 'aieos.json');
  const aieosRaw = JSON.parse(readFileSync(aieosPath, 'utf-8'));
  const aieos = validateAieos(aieosRaw);

  // Scan skills directory
  const skills = readSkills(join(packageDir, 'skills'));

  // Scan memory seeds
  const memorySeedPaths = readMemorySeeds(join(packageDir, 'memory-seeds'));

  // Check for profile image
  const hasProfile = existsSync(join(packageDir, 'profile.png'));

  return { manifest, aieos, skills, memorySeedPaths, hasProfile, packageDir };
}

/** Reads SKILL.md files from skills/ subdirectories */
function readSkills(skillsDir: string): SkillFile[] {
  if (!existsSync(skillsDir)) return [];

  return readdirSync(skillsDir)
    .filter(name => {
      const full = join(skillsDir, name);
      return statSync(full).isDirectory();
    })
    .map(name => {
      const skillPath = join(skillsDir, name, 'SKILL.md');
      const content = existsSync(skillPath)
        ? readFileSync(skillPath, 'utf-8')
        : '';
      return { name, content };
    })
    .filter(s => s.content.length > 0);
}

/** Lists .md files in memory-seeds/ directory */
function readMemorySeeds(seedsDir: string): string[] {
  if (!existsSync(seedsDir)) return [];

  return readdirSync(seedsDir)
    .filter(name => name.endsWith('.md'))
    .map(name => join(seedsDir, name));
}
