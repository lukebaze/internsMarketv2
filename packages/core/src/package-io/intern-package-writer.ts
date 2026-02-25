/** Writes an .intern package to a directory */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { InternPackage } from '../types/intern-package.js';

/** Writes a complete .intern package to the given directory */
export function writeInternPackage(pkg: InternPackage, dir: string): void {
  // Create base directory
  mkdirSync(dir, { recursive: true });

  // Write manifest.json
  writeFileSync(
    join(dir, 'manifest.json'),
    JSON.stringify(pkg.manifest, null, 2) + '\n',
  );

  // Write aieos.json
  writeFileSync(
    join(dir, 'aieos.json'),
    JSON.stringify(pkg.aieos, null, 2) + '\n',
  );

  // Write skills
  if (pkg.skills.length > 0) {
    for (const skill of pkg.skills) {
      const skillDir = join(dir, 'skills', skill.name);
      mkdirSync(skillDir, { recursive: true });
      writeFileSync(join(skillDir, 'SKILL.md'), skill.content);
    }
  }

  // Create config directory
  mkdirSync(join(dir, 'config'), { recursive: true });

  // Create memory-seeds directory
  if (pkg.memorySeedPaths.length > 0) {
    mkdirSync(join(dir, 'memory-seeds'), { recursive: true });
  }
}
