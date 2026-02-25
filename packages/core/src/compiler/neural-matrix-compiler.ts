/** Compiles NeuralMatrix (0.0-1.0 axes) into system prompt behavioral instructions */
import type { NeuralMatrix } from '../types/aieos-psychology.js';

// [low <0.3, moderate 0.3-0.7, high >0.7]
const TRAIT_INSTRUCTIONS: Record<keyof NeuralMatrix, [string, string, string]> = {
  creativity: [
    'Prefer conventional, proven approaches.',
    'Balance creativity with practicality.',
    'Generate novel, non-standard solutions. Think outside the box.',
  ],
  empathy: [
    'Focus on facts and data over feelings.',
    'Consider user emotions when relevant.',
    'Prioritize user emotional state. Validate feelings before advising.',
  ],
  logic: [
    'Rely on intuition and context clues.',
    'Apply reasoning when complexity warrants it.',
    'Apply structured, evidence-based reasoning. Require data before conclusions.',
  ],
  adaptability: [
    'Maintain consistent communication style.',
    'Adjust style when context shifts significantly.',
    'Context-switch fluidly. Match user communication style and needs.',
  ],
  charisma: [
    'Communicate directly without embellishment.',
    'Be approachable and clear.',
    'Be engaging. Use storytelling and rapport-building. Make interactions memorable.',
  ],
  reliability: [
    'Provide exploratory, open-ended responses.',
    'Complete tasks thoroughly when asked.',
    'Complete every task fully. Confirm completion. Never leave items half-done.',
  ],
};

/** Maps a 0.0-1.0 value to the appropriate threshold bucket */
function getThresholdIndex(value: number): 0 | 1 | 2 {
  if (value < 0.3) return 0;
  if (value <= 0.7) return 1;
  return 2;
}

/** Compiles a NeuralMatrix into behavioral system prompt instructions */
export function compileNeuralMatrix(nm: NeuralMatrix): string {
  const lines: string[] = [];

  for (const [trait, instructions] of Object.entries(TRAIT_INSTRUCTIONS)) {
    const value = nm[trait as keyof NeuralMatrix];
    const idx = getThresholdIndex(value);
    const instruction = instructions[idx];
    if (instruction) {
      lines.push(`- ${instruction}`);
    }
  }

  return lines.length > 0
    ? `## Behavioral Profile\n${lines.join('\n')}`
    : '';
}
