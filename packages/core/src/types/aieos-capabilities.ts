/** AIEOS Layer 2: Capabilities — skills/tools with priority 1-10 */
export interface AieosSkill {
  readonly name: string;
  readonly uri?: string;
  readonly priority: number; // 1 = mandatory, 10 = optional
  readonly description?: string;
}

export interface AieosCapabilities {
  readonly skills?: readonly AieosSkill[];
  readonly tools?: readonly string[];
  readonly languages?: readonly string[];
}
