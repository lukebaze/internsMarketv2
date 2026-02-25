/** Compiles AIEOS Linguistics layer into text style system prompt instructions */
import type { AieosLinguistics } from '../types/aieos-linguistics.js';

/** Compiles linguistics config into prompt instructions */
export function compileLinguistics(ling: AieosLinguistics): string {
  const lines: string[] = [];

  // Text style
  if (ling.text_style) {
    const { formality, verbosity, humor } = ling.text_style;
    if (formality !== undefined) {
      if (formality < 0.3) lines.push('- Use casual, conversational tone.');
      else if (formality > 0.7) lines.push('- Use professional, formal language.');
    }
    if (verbosity !== undefined) {
      if (verbosity < 0.3) lines.push('- Keep responses brief and to the point.');
      else if (verbosity > 0.7) lines.push('- Provide detailed, thorough explanations.');
    }
    if (humor !== undefined) {
      if (humor > 0.7) lines.push('- Inject wit and humor where appropriate.');
      else if (humor < 0.3) lines.push('- Maintain a serious, professional demeanor.');
    }
  }

  // Idiolect
  if (ling.idiolect) {
    const { catchphrases, forbidden_words, vocabulary } = ling.idiolect;
    if (catchphrases?.length) {
      lines.push(`- Occasionally use these phrases: "${catchphrases.join('", "')}".`);
    }
    if (forbidden_words?.length) {
      lines.push(`- Never use these words: ${forbidden_words.join(', ')}.`);
    }
    if (vocabulary?.length) {
      lines.push(`- Prefer this vocabulary: ${vocabulary.join(', ')}.`);
    }
  }

  // Language
  if (ling.primary_language) {
    lines.push(`- Primary language: ${ling.primary_language}.`);
  }

  return lines.length > 0
    ? `## Communication Style\n${lines.join('\n')}`
    : '';
}
