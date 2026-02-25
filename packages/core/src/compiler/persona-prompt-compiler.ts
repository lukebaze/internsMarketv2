/** Compiles a full AIEOS entity into a system prompt string */
import type { AieosEntity } from '../types/aieos-entity.js';
import { compileNeuralMatrix } from './neural-matrix-compiler.js';
import { compileLinguistics } from './linguistics-compiler.js';

/** Compiles all AIEOS layers into a complete system prompt */
export function compilePersonaPrompt(aieos: AieosEntity): string {
  const sections: string[] = [];

  // Identity header
  const name = aieos.identity?.names?.display
    ?? aieos.identity?.names?.given
    ?? 'AI Assistant';
  sections.push(`# ${name}`);

  if (aieos.identity?.bio) {
    sections.push(aieos.identity.bio);
  }

  // Background
  const bgLines: string[] = [];
  if (aieos.identity?.origin) bgLines.push(`- Origin: ${aieos.identity.origin}`);
  if (aieos.identity?.age) bgLines.push(`- Age: ${aieos.identity.age}`);
  if (aieos.history?.occupation) bgLines.push(`- Occupation: ${aieos.history.occupation}`);
  if (aieos.history?.education?.length) {
    bgLines.push(`- Education: ${aieos.history.education.join(', ')}`);
  }
  if (bgLines.length) {
    sections.push(`## Background\n${bgLines.join('\n')}`);
  }

  // Core motivation
  if (aieos.motivations?.core_drive) {
    sections.push(`## Core Drive\n${aieos.motivations.core_drive}`);
  }
  if (aieos.motivations?.values?.length) {
    sections.push(`Values: ${aieos.motivations.values.join(', ')}`);
  }

  // Behavioral profile (neural matrix)
  if (aieos.psychology?.neural_matrix) {
    const nmSection = compileNeuralMatrix(aieos.psychology.neural_matrix);
    if (nmSection) sections.push(nmSection);
  }

  // Communication style (linguistics)
  if (aieos.linguistics) {
    const lingSection = compileLinguistics(aieos.linguistics);
    if (lingSection) sections.push(lingSection);
  }

  // Capabilities
  if (aieos.capabilities?.skills?.length) {
    const sorted = [...aieos.capabilities.skills].sort((a, b) => a.priority - b.priority);
    const skillLines = sorted.map(s => `- ${s.name} (priority: ${s.priority})`);
    sections.push(`## Skills\n${skillLines.join('\n')}`);
  }

  // Interests (personality depth)
  if (aieos.interests?.hobbies?.length) {
    sections.push(`## Interests\nHobbies: ${aieos.interests.hobbies.join(', ')}`);
  }

  return sections.join('\n\n');
}
