/** Zod runtime validator for AIEOS v1.1 entities */
import { z } from 'zod';
import type { AieosEntity } from '../types/aieos-entity.js';

const NeuralMatrixSchema = z.object({
  creativity: z.number().min(0).max(1),
  empathy: z.number().min(0).max(1),
  logic: z.number().min(0).max(1),
  adaptability: z.number().min(0).max(1),
  charisma: z.number().min(0).max(1),
  reliability: z.number().min(0).max(1),
});

const OceanSchema = z.object({
  openness: z.number().min(0).max(1).optional(),
  conscientiousness: z.number().min(0).max(1).optional(),
  extraversion: z.number().min(0).max(1).optional(),
  agreeableness: z.number().min(0).max(1).optional(),
  neuroticism: z.number().min(0).max(1).optional(),
});

const SkillSchema = z.object({
  name: z.string(),
  uri: z.string().optional(),
  priority: z.number().int().min(1).max(10),
  description: z.string().optional(),
});

const TextStyleSchema = z.object({
  formality: z.number().min(0).max(1).optional(),
  verbosity: z.number().min(0).max(1).optional(),
  humor: z.number().min(0).max(1).optional(),
});

const IdiolectSchema = z.object({
  vocabulary: z.array(z.string()).optional(),
  catchphrases: z.array(z.string()).optional(),
  forbidden_words: z.array(z.string()).optional(),
  syntax_patterns: z.array(z.string()).optional(),
});

export const AieosEntitySchema = z.object({
  standard: z.object({
    protocol: z.string(),
    version: z.string(),
    schema_url: z.string().optional(),
  }),
  metadata: z.object({
    instance_id: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    author: z.string().optional(),
    license: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  capabilities: z.object({
    skills: z.array(SkillSchema).optional(),
    tools: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
  }).optional(),
  identity: z.object({
    names: z.object({
      given: z.string().optional(),
      family: z.string().optional(),
      display: z.string().optional(),
      aliases: z.array(z.string()).optional(),
    }).optional(),
    bio: z.string().optional(),
    origin: z.string().optional(),
    residence: z.string().optional(),
    age: z.number().optional(),
    gender: z.string().optional(),
    pronouns: z.string().optional(),
  }).optional(),
  physicality: z.object({
    image_prompts: z.object({
      portrait: z.string().optional(),
      full_body: z.string().optional(),
      avatar: z.string().optional(),
    }).optional(),
    face: z.string().optional(),
    body: z.string().optional(),
    style: z.string().optional(),
    distinguishing_features: z.array(z.string()).optional(),
  }).optional(),
  psychology: z.object({
    neural_matrix: NeuralMatrixSchema.optional(),
    ocean: OceanSchema.optional(),
    mbti: z.string().optional(),
    moral_alignment: z.string().optional(),
    emotional_profile: z.object({
      baseline_mood: z.string().optional(),
      volatility: z.number().min(0).max(1).optional(),
      triggers: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
  linguistics: z.object({
    text_style: TextStyleSchema.optional(),
    idiolect: IdiolectSchema.optional(),
    voice: z.object({
      tts_engine: z.string().optional(),
      accent: z.string().optional(),
      pitch: z.number().optional(),
      speed: z.number().optional(),
    }).optional(),
    primary_language: z.string().optional(),
  }).optional(),
  history: z.object({
    origin_story: z.string().optional(),
    education: z.array(z.string()).optional(),
    occupation: z.string().optional(),
    key_life_events: z.array(z.string()).optional(),
    family: z.string().optional(),
  }).optional(),
  interests: z.object({
    hobbies: z.array(z.string()).optional(),
    favorites: z.record(z.string()).optional(),
    aversions: z.array(z.string()).optional(),
    lifestyle: z.string().optional(),
  }).optional(),
  motivations: z.object({
    core_drive: z.string().optional(),
    goals: z.array(z.string()).optional(),
    fears: z.array(z.string()).optional(),
    values: z.array(z.string()).optional(),
  }).optional(),
});

/** Validates unknown data against AIEOS v1.1 schema. Throws ZodError on invalid. */
export function validateAieos(data: unknown): AieosEntity {
  return AieosEntitySchema.parse(data) as AieosEntity;
}
