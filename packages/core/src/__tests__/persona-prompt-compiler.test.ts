import { describe, it, expect } from 'vitest';
import { compilePersonaPrompt } from '../compiler/persona-prompt-compiler.js';
import type { AieosEntity } from '../types/aieos-entity.js';
import jordanAieos from '../../../interns/content-marketing-intern/aieos.json' with { type: 'json' };

describe('compilePersonaPrompt', () => {
  it('compiles Jordan fixture to non-empty string', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it('includes name in output for Jordan', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('Jordan');
  });

  it('includes bio in output', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('content marketing specialist');
  });

  it('includes background section with origin', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('## Background');
    expect(result).toContain('Seoul');
  });

  it('includes core drive section', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('## Core Drive');
    expect(result).toContain('brands sound like humans');
  });

  it('includes behavioral profile section', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('## Behavioral Profile');
  });

  it('includes communication style section', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('## Communication Style');
  });

  it('includes skills section', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('## Skills');
    expect(result).toContain('Blog Post Writer');
  });

  it('sorts skills by priority', () => {
    const result = compilePersonaPrompt(jordanAieos);
    const blogIndex = result.indexOf('Blog Post Writer');
    const socialIndex = result.indexOf('Social Media Content');
    expect(blogIndex).toBeLessThan(socialIndex);
  });

  it('includes interests section with hobbies', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('## Interests');
    expect(result).toContain('vinyl');
  });

  it('handles minimal entity with just standard field', () => {
    const minimal: AieosEntity = {
      standard: {
        protocol: 'AIEOS',
        version: '1.1',
      },
    };
    const result = compilePersonaPrompt(minimal);
    expect(result).toContain('AI Assistant');
  });

  it('uses given name when display name is not available', () => {
    const entity: AieosEntity = {
      standard: { protocol: 'AIEOS', version: '1.1' },
      identity: {
        names: { given: 'Alice' },
      },
    };
    const result = compilePersonaPrompt(entity);
    expect(result).toContain('Alice');
  });

  it('falls back to default when no name is provided', () => {
    const entity: AieosEntity = {
      standard: { protocol: 'AIEOS', version: '1.1' },
    };
    const result = compilePersonaPrompt(entity);
    expect(result).toContain('AI Assistant');
  });

  it('includes age in background section', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('24');
  });

  it('includes occupation in background section', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('Content Marketing Specialist');
  });

  it('includes education in background section', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('University of Toronto');
  });

  it('includes values in output', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('Authenticity');
  });

  it('returns valid markdown format', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('#');
    expect(result).toContain('##');
  });

  it('sections are separated by double newlines', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('\n\n');
  });

  it('skill output includes priority number', () => {
    const result = compilePersonaPrompt(jordanAieos);
    expect(result).toContain('priority: 1');
    expect(result).toContain('priority: 2');
  });

  it('handles entity with partial identity', () => {
    const entity: AieosEntity = {
      standard: { protocol: 'AIEOS', version: '1.1' },
      identity: {
        names: { display: 'Test Bot' },
        age: 5,
      },
    };
    const result = compilePersonaPrompt(entity);
    expect(result).toContain('Test Bot');
    expect(result).toContain('5');
  });

  it('handles entity without psychology section gracefully', () => {
    const entity: AieosEntity = {
      standard: { protocol: 'AIEOS', version: '1.1' },
      identity: { names: { display: 'Simple Bot' } },
    };
    const result = compilePersonaPrompt(entity);
    expect(result).toBeTruthy();
    expect(result).not.toContain('undefined');
  });

  it('handles entity without capabilities gracefully', () => {
    const entity: AieosEntity = {
      standard: { protocol: 'AIEOS', version: '1.1' },
      identity: { names: { display: 'No Skills Bot' } },
    };
    const result = compilePersonaPrompt(entity);
    expect(result).toBeTruthy();
    // Should not have Skills section if no capabilities
    const hasSkillsSection = result.includes('## Skills');
    expect(hasSkillsSection).toBe(false);
  });
});
