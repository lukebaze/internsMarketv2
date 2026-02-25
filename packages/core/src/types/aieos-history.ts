/** AIEOS Layer 7: History — origin story, education, occupation */
export interface AieosHistory {
  readonly origin_story?: string;
  readonly education?: readonly string[];
  readonly occupation?: string;
  readonly key_life_events?: readonly string[];
  readonly family?: string;
}
