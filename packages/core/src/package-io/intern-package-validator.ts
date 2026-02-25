/** Validates an .intern package directory structure and contents */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { InternManifestSchema } from '../types/intern-manifest.js';
import { AieosEntitySchema } from '../validators/aieos-zod-schema.js';

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: string[];
  readonly warnings: string[];
}

/** Validates an .intern package directory. Returns structured result. */
export function validateInternPackage(dir: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check manifest.json exists
  const manifestPath = join(dir, 'manifest.json');
  if (!existsSync(manifestPath)) {
    errors.push('Missing required file: manifest.json');
    return { valid: false, errors, warnings };
  }

  // Validate manifest schema
  try {
    const raw = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    const manifest = InternManifestSchema.parse(raw);

    // Check aieos.json exists
    const aieosPath = join(dir, 'aieos.json');
    if (!existsSync(aieosPath)) {
      errors.push('Missing required file: aieos.json');
    } else {
      // Validate aieos schema
      try {
        const aieosRaw = JSON.parse(readFileSync(aieosPath, 'utf-8'));
        AieosEntitySchema.parse(aieosRaw);
      } catch (e) {
        errors.push(`Invalid aieos.json: ${e instanceof Error ? e.message : String(e)}`);
      }
    }

    // Check declared skills have SKILL.md files
    for (const skillName of manifest.skills) {
      const skillMd = join(dir, 'skills', skillName, 'SKILL.md');
      if (!existsSync(skillMd)) {
        warnings.push(`Declared skill "${skillName}" missing SKILL.md`);
      }
    }

    // Check optional files
    if (!existsSync(join(dir, 'profile.png'))) {
      warnings.push('No profile.png found (optional but recommended)');
    }
  } catch (e) {
    errors.push(`Invalid manifest.json: ${e instanceof Error ? e.message : String(e)}`);
  }

  return { valid: errors.length === 0, errors, warnings };
}
