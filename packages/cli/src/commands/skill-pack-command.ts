/** im skill pack [dir] — packs a skill directory into a .tgz archive and prints result to stdout */
import { join, resolve, basename } from 'node:path';
import { readSkillPackage, packSkill } from '@internsmarket/core';

/**
 * Packs a skill directory into a .tgz at the given output directory.
 * Reads skill.json first to get name/version for the output filename.
 * Prints packed path and SHA256 hash to stdout.
 */
export async function skillPack(dir: string, outputDir: string): Promise<void> {
  try {
    const pkg = readSkillPackage(dir);
    const { name, version } = pkg.manifest;
    const tgzName = `${name}-${version}.tgz`;
    const outPath = join(resolve(outputDir), tgzName);

    const result = await packSkill(dir, outPath);
    const shortPath = basename(result.tgzPath);
    console.log(`✓ Packed: ${shortPath} (SHA256: ${result.sha256})`);
    process.exit(0);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Pack failed: ${msg}`);
    process.exit(1);
  }
}
