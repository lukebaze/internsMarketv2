/** im skill init [dir] — scaffolds a new skill directory with skill.json and SKILL.md templates */
import { createInterface } from 'node:readline';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';

/** Prompts user for a value via readline; returns defaultValue if empty input */
function prompt(rl: ReturnType<typeof createInterface>, question: string, defaultValue: string): Promise<string> {
  return new Promise(resolve_ => {
    rl.question(question, answer => {
      resolve_(answer.trim() || defaultValue);
    });
  });
}

/** Generates the skill.json content from provided fields */
function buildSkillJson(name: string, description: string, runtime: string): string {
  const manifest = {
    name,
    version: '1.0.0',
    description,
    runtimes: [runtime],
    author: '',
    license: 'MIT',
  };
  return JSON.stringify(manifest, null, 2);
}

/** Generates a minimal SKILL.md template */
function buildSkillMd(name: string, description: string): string {
  return `# ${name}

${description}

## Usage

<!-- Describe how to use this skill -->

## Commands

<!-- List available commands or instructions -->
`;
}

/**
 * Scaffolds a new skill directory with skill.json and SKILL.md.
 * Prompts for name (default: dir basename), description, and runtime.
 */
export async function skillInit(dir: string): Promise<void> {
  const absDir = resolve(dir);
  const dirName = basename(absDir);

  // Validate slug: lowercase alphanumeric + hyphens
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '');

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const name = slugify(await prompt(rl, `Skill name (default: ${slugify(dirName)}): `, slugify(dirName)));
    const description = await prompt(rl, 'Description: ', 'A Claude Code skill');
    const runtime = await prompt(rl, 'Runtime [zeroclaw/openclaw/claude-code] (default: zeroclaw): ', 'zeroclaw');

    rl.close();

    mkdirSync(absDir, { recursive: true });

    const skillJsonPath = `${absDir}/skill.json`;
    const skillMdPath = `${absDir}/SKILL.md`;

    if (existsSync(skillJsonPath)) {
      console.error(`✗ skill.json already exists in ${dir}`);
      process.exit(1);
    }

    writeFileSync(skillJsonPath, buildSkillJson(name, description, runtime), 'utf-8');
    writeFileSync(skillMdPath, buildSkillMd(name, description), 'utf-8');

    console.log(`✓ Created skill: ${name}@1.0.0`);
    console.log(`  ${skillJsonPath}`);
    console.log(`  ${skillMdPath}`);
    process.exit(0);
  } catch (err) {
    rl.close();
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Init failed: ${msg}`);
    process.exit(1);
  }
}
