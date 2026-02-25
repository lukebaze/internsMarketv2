/** AIEOS Layer 5: Psychology — neural matrix, OCEAN, MBTI, moral compass */

/** Six cognitive axes, all 0.0-1.0 */
export interface NeuralMatrix {
  readonly creativity: number;
  readonly empathy: number;
  readonly logic: number;
  readonly adaptability: number;
  readonly charisma: number;
  readonly reliability: number;
}

/** Big Five personality traits, all 0.0-1.0 */
export interface OceanTraits {
  readonly openness?: number;
  readonly conscientiousness?: number;
  readonly extraversion?: number;
  readonly agreeableness?: number;
  readonly neuroticism?: number;
}

export interface EmotionalProfile {
  readonly baseline_mood?: string;
  readonly volatility?: number; // 0.0-1.0
  readonly triggers?: readonly string[];
}

export interface AieosPsychology {
  readonly neural_matrix?: NeuralMatrix;
  readonly ocean?: OceanTraits;
  readonly mbti?: string;
  readonly moral_alignment?: string;
  readonly emotional_profile?: EmotionalProfile;
}
