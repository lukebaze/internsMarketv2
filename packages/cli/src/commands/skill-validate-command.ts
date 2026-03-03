/** im skill validate [dir] — validates a skill directory and prints result to stdout */
import { readSkillPackage } from '@internsmarket/core';

/**
 * Validates a skill directory by reading and parsing skill.json + SKILL.md.
 * Prints success or error to stdout and exits with code 0 or 1.
 */
export async function skillValidate(dir: string): Promise<void> {
  try {
    const pkg = readSkillPackage(dir);
    console.log(`✓ Valid skill: ${pkg.manifest.name}@${pkg.manifest.version}`);
    process.exit(0);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Invalid: ${msg}`);
    process.exit(1);
  }
}
