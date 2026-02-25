/** AIEOS Layer 6: Linguistics — voice, text style, idiolect */
export interface AieosTextStyle {
  readonly formality?: number; // 0.0 (casual) - 1.0 (formal)
  readonly verbosity?: number; // 0.0 (terse) - 1.0 (verbose)
  readonly humor?: number;     // 0.0 (serious) - 1.0 (playful)
}

export interface AieosIdiolect {
  readonly vocabulary?: readonly string[];
  readonly catchphrases?: readonly string[];
  readonly forbidden_words?: readonly string[];
  readonly syntax_patterns?: readonly string[];
}

export interface AieosVoiceConfig {
  readonly tts_engine?: string;
  readonly accent?: string;
  readonly pitch?: number;
  readonly speed?: number;
}

export interface AieosLinguistics {
  readonly text_style?: AieosTextStyle;
  readonly idiolect?: AieosIdiolect;
  readonly voice?: AieosVoiceConfig;
  readonly primary_language?: string;
}
