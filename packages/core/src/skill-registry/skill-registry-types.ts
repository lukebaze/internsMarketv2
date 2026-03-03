export interface SkillRegistryVersion {
  readonly sha256: string;
  readonly size: number;
}

export interface SkillRegistryEntry {
  readonly latest: string;
  readonly versions: Record<string, SkillRegistryVersion>;
  readonly dependencies?: Record<string, string>;
  readonly runtimes: string[];
  readonly description?: string;
  readonly author?: string;
}

export interface SkillRegistryIndex {
  readonly version: string;
  readonly updated_at: string;
  readonly skills: Record<string, SkillRegistryEntry>;
}
