/** Composite type representing a fully loaded skill package with manifest and SKILL.md content */
import type { SkillManifest } from './skill-manifest.js';

export interface SkillPackage {
  readonly manifest: SkillManifest;
  readonly skillMdContent: string;  // raw SKILL.md content
  readonly packageDir: string;      // absolute path to skill directory
}
