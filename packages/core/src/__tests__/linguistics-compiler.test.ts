import { describe, it, expect } from 'vitest';
import { compileLinguistics } from '../compiler/linguistics-compiler.js';
import type { AieosLinguistics } from '../types/aieos-linguistics.js';

describe('compileLinguistics', () => {
  it('returns communication style section header', () => {
    const ling: AieosLinguistics = {
      text_style: { formality: 0.2 },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('## Communication Style');
    expect(result).toContain('casual');
  });

  it('generates casual instruction for low formality (<0.3)', () => {
    const ling: AieosLinguistics = {
      text_style: { formality: 0.2 },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('casual');
  });

  it('generates formal instruction for high formality (>0.7)', () => {
    const ling: AieosLinguistics = {
      text_style: { formality: 0.8 },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('formal');
  });

  it('generates brief instruction for low verbosity (<0.3)', () => {
    const ling: AieosLinguistics = {
      text_style: { verbosity: 0.2 },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('brief');
  });

  it('generates detailed instruction for high verbosity (>0.7)', () => {
    const ling: AieosLinguistics = {
      text_style: { verbosity: 0.8 },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('detailed');
  });

  it('generates humor instruction for high humor (>0.7)', () => {
    const ling: AieosLinguistics = {
      text_style: { humor: 0.8 },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('wit');
  });

  it('generates serious instruction for low humor (<0.3)', () => {
    const ling: AieosLinguistics = {
      text_style: { humor: 0.2 },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('serious');
  });

  it('includes catchphrases in output', () => {
    const ling: AieosLinguistics = {
      idiolect: {
        catchphrases: ['Let\'s go', 'You know what I mean'],
      },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('Let\'s go');
    expect(result).toContain('You know what I mean');
  });

  it('includes forbidden words in output', () => {
    const ling: AieosLinguistics = {
      idiolect: {
        forbidden_words: ['synergy', 'leverage', 'circle back'],
      },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('synergy');
    expect(result).toContain('leverage');
    expect(result).toContain('circle back');
  });

  it('includes vocabulary in output', () => {
    const ling: AieosLinguistics = {
      idiolect: {
        vocabulary: ['resonates', 'authentic', 'angle'],
      },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('resonates');
    expect(result).toContain('authentic');
    expect(result).toContain('angle');
  });

  it('includes primary language in output', () => {
    const ling: AieosLinguistics = {
      primary_language: 'English',
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('English');
  });

  it('returns empty string for empty linguistics object', () => {
    const ling: AieosLinguistics = {};
    const result = compileLinguistics(ling);
    expect(result).toBe('');
  });

  it('handles Jordan fixture idiolect correctly', () => {
    const ling: AieosLinguistics = {
      idiolect: {
        catchphrases: [
          'Let\'s make this pop!',
          'Okay, hear me out —',
          'Here\'s what I\'m thinking...',
        ],
        forbidden_words: [
          'synergy',
          'leverage',
          'circle back',
        ],
      },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('Let\'s make this pop!');
    expect(result).toContain('synergy');
    expect(result).toContain('leverage');
  });

  it('combines multiple text style rules', () => {
    const ling: AieosLinguistics = {
      text_style: {
        formality: 0.2,
        verbosity: 0.8,
        humor: 0.6,
      },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('casual');
    expect(result).toContain('detailed');
  });

  it('skips undefined style properties', () => {
    const ling: AieosLinguistics = {
      text_style: {
        formality: 0.8,
        // verbosity and humor undefined
      },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('## Communication Style');
    // Should not crash, just handle gracefully
    expect(result.length).toBeGreaterThan(0);
  });

  it('handles empty catchphrases array gracefully', () => {
    const ling: AieosLinguistics = {
      idiolect: {
        catchphrases: [],
        forbidden_words: ['bad', 'word'],
      },
    };
    const result = compileLinguistics(ling);
    expect(result).toContain('bad');
  });
});
