/** Compiles AIEOS entity layers into OpenClaw markdown files (IDENTITY.md + SOUL.md) */
import type { AieosEntity } from '../types/aieos-entity.js';
import { compilePersonaPrompt } from './persona-prompt-compiler.js';

/** Builds IDENTITY.md markdown from AIEOS identity, history, and motivations layers */
export function compileIdentityMd(entity: AieosEntity): string {
  const name = entity.identity?.names?.display
    ?? entity.identity?.names?.given
    ?? 'AI Intern';

  const lines: string[] = [`# Identity: ${name}`, ''];

  // Bio
  if (entity.identity?.bio) {
    lines.push(entity.identity.bio, '');
  }

  // Background section
  const bg: string[] = [];
  if (entity.identity?.age) bg.push(`- **Age:** ${entity.identity.age}`);
  if (entity.identity?.gender) bg.push(`- **Gender:** ${entity.identity.gender}`);
  if (entity.identity?.origin) bg.push(`- **Origin:** ${entity.identity.origin}`);
  if (entity.identity?.residence) bg.push(`- **Location:** ${entity.identity.residence}`);
  if (entity.history?.occupation) bg.push(`- **Occupation:** ${entity.history.occupation}`);
  if (entity.history?.education?.length) {
    bg.push(`- **Education:** ${entity.history.education.join('; ')}`);
  }
  if (bg.length) {
    lines.push('## Background', '', ...bg, '');
  }

  // History narrative
  if (entity.history?.origin_story) {
    lines.push('## Story', '', entity.history.origin_story, '');
  }
  if (entity.history?.key_life_events?.length) {
    lines.push('## Key Events', '');
    for (const ev of entity.history.key_life_events) {
      lines.push(`- ${ev}`);
    }
    lines.push('');
  }

  // Motivations
  if (entity.motivations?.core_drive) {
    lines.push('## Core Drive', '', entity.motivations.core_drive, '');
  }
  if (entity.motivations?.goals?.length) {
    lines.push('## Goals', '');
    for (const g of entity.motivations.goals) lines.push(`- ${g}`);
    lines.push('');
  }

  return lines.join('\n');
}

/** Builds SOUL.md markdown wrapping compilePersonaPrompt output */
export function compileSoulMd(entity: AieosEntity): string {
  const name = entity.identity?.names?.display
    ?? entity.identity?.names?.given
    ?? 'AI Intern';

  const personaPrompt = compilePersonaPrompt(entity);

  return [
    `# Soul: ${name}`,
    '',
    '## Behavioral Guidelines',
    '',
    personaPrompt,
    '',
  ].join('\n');
}
