import { describe, it, expect } from 'vitest';
import { compileNeuralMatrix } from '../compiler/neural-matrix-compiler.js';
import type { NeuralMatrix } from '../types/aieos-psychology.js';

describe('compileNeuralMatrix', () => {
  const createMatrix = (overrides: Partial<NeuralMatrix> = {}): NeuralMatrix => ({
    creativity: 0.5,
    empathy: 0.5,
    logic: 0.5,
    adaptability: 0.5,
    charisma: 0.5,
    reliability: 0.5,
    ...overrides,
  });

  it('returns non-empty string with behavioral profile section', () => {
    const matrix = createMatrix();
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('## Behavioral Profile');
  });

  it('generates "novel solutions" instruction for high creativity (>0.7)', () => {
    const matrix = createMatrix({ creativity: 0.88 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('novel');
  });

  it('generates conventional instruction for low creativity (<0.3)', () => {
    const matrix = createMatrix({ creativity: 0.2 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('conventional');
  });

  it('generates balanced creativity instruction for moderate values (0.3-0.7)', () => {
    const matrix = createMatrix({ creativity: 0.5 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('Balance creativity');
  });

  it('generates empathy-focused instruction for high empathy (>0.7)', () => {
    const matrix = createMatrix({ empathy: 0.75 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('Prioritize user emotional state');
  });

  it('generates facts-focused instruction for low empathy (<0.3)', () => {
    const matrix = createMatrix({ empathy: 0.2 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('Focus on facts');
  });

  it('generates evidence-based reasoning for high logic (>0.7)', () => {
    const matrix = createMatrix({ logic: 0.8 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('evidence-based');
  });

  it('generates intuition instruction for low logic (<0.3)', () => {
    const matrix = createMatrix({ logic: 0.2 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('intuition');
  });

  it('generates context-switching instruction for high adaptability (>0.7)', () => {
    const matrix = createMatrix({ adaptability: 0.82 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('Context-switch fluidly');
  });

  it('generates consistency instruction for low adaptability (<0.3)', () => {
    const matrix = createMatrix({ adaptability: 0.2 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('consistent');
  });

  it('generates engaging instruction for high charisma (>0.7)', () => {
    const matrix = createMatrix({ charisma: 0.71 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('engaging');
  });

  it('generates direct instruction for low charisma (<0.3)', () => {
    const matrix = createMatrix({ charisma: 0.2 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('directly');
  });

  it('generates completion instruction for high reliability (>0.7)', () => {
    const matrix = createMatrix({ reliability: 0.78 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('Complete every task');
  });

  it('generates exploratory instruction for low reliability (<0.3)', () => {
    const matrix = createMatrix({ reliability: 0.2 });
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('exploratory');
  });

  it('includes all 6 trait instructions in output', () => {
    const matrix = createMatrix();
    const result = compileNeuralMatrix(matrix);
    const lines = result.split('\n');
    // Should have header + 6 trait instructions
    expect(lines.length).toBeGreaterThanOrEqual(7);
  });

  it('handles boundary value 0.3 as transition point (moderate)', () => {
    const low = compileNeuralMatrix(createMatrix({ creativity: 0.29 }));
    const atBoundary = compileNeuralMatrix(createMatrix({ creativity: 0.3 }));
    expect(low).toContain('conventional');
    expect(atBoundary).toContain('Balance');
  });

  it('handles boundary value 0.7 as transition point (moderate to high)', () => {
    const moderate = compileNeuralMatrix(createMatrix({ creativity: 0.7 }));
    const high = compileNeuralMatrix(createMatrix({ creativity: 0.71 }));
    expect(moderate).toContain('Balance');
    expect(high).toContain('novel');
  });

  it('generates valid instructions for all axes simultaneously', () => {
    const matrix: NeuralMatrix = {
      creativity: 0.88,
      empathy: 0.75,
      logic: 0.55,
      adaptability: 0.82,
      charisma: 0.71,
      reliability: 0.78,
    };
    const result = compileNeuralMatrix(matrix);
    expect(result).toContain('novel');
    expect(result).toContain('Prioritize user emotional');
    expect(result).toContain('reasoning');
    expect(result).toContain('Context-switch');
    expect(result).toContain('engaging');
    expect(result).toContain('Complete');
  });
});
