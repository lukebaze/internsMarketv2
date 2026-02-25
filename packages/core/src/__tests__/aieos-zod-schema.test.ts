import { describe, it, expect } from 'vitest';
import { validateAieos } from '../validators/aieos-zod-schema.js';
import jordanAieos from '../../../interns/content-marketing-intern/aieos.json' with { type: 'json' };

describe('validateAieos', () => {
  it('validates Jordan fixture without errors', () => {
    expect(() => validateAieos(jordanAieos)).not.toThrow();
  });

  it('returns parsed entity matching input data', () => {
    const result = validateAieos(jordanAieos);
    expect(result.identity?.names?.display).toBe('Jordan Lee');
    expect(result.psychology?.neural_matrix?.creativity).toBe(0.88);
  });

  it('throws on missing standard field', () => {
    expect(() => validateAieos({})).toThrow();
  });

  it('throws when standard field is incomplete', () => {
    const bad = { standard: { protocol: 'AIEOS' } };
    expect(() => validateAieos(bad)).toThrow();
  });

  it('throws on neural_matrix value exceeding max (1.0)', () => {
    const bad = {
      ...jordanAieos,
      psychology: { neural_matrix: { creativity: 1.5, empathy: 0.5, logic: 0.5, adaptability: 0.5, charisma: 0.5, reliability: 0.5 } }
    };
    expect(() => validateAieos(bad)).toThrow();
  });

  it('throws on neural_matrix value below min (0.0)', () => {
    const bad = {
      ...jordanAieos,
      psychology: { neural_matrix: { creativity: -0.1, empathy: 0.5, logic: 0.5, adaptability: 0.5, charisma: 0.5, reliability: 0.5 } }
    };
    expect(() => validateAieos(bad)).toThrow();
  });

  it('throws on non-numeric neural_matrix value', () => {
    const bad = {
      ...jordanAieos,
      psychology: { neural_matrix: { creativity: 'high', empathy: 0.5, logic: 0.5, adaptability: 0.5, charisma: 0.5, reliability: 0.5 } }
    };
    expect(() => validateAieos(bad)).toThrow();
  });

  it('accepts minimal valid entity with just standard field', () => {
    const minimal = {
      standard: {
        protocol: 'AIEOS',
        version: '1.1',
      }
    };
    expect(() => validateAieos(minimal)).not.toThrow();
  });

  it('accepts ocean traits within bounds', () => {
    const withOcean = {
      ...jordanAieos,
      psychology: {
        ...jordanAieos.psychology,
        ocean: { openness: 0.9, conscientiousness: 0.72 }
      }
    };
    expect(() => validateAieos(withOcean)).not.toThrow();
  });

  it('throws on ocean trait exceeding bounds', () => {
    const bad = {
      ...jordanAieos,
      psychology: {
        ...jordanAieos.psychology,
        ocean: { openness: 1.5 }
      }
    };
    expect(() => validateAieos(bad)).toThrow();
  });
});
