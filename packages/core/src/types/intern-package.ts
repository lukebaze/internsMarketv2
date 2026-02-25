/** Composite type representing a fully loaded .intern package */
import type { InternManifest } from './intern-manifest.js';
import type { AieosEntity } from './aieos-entity.js';

export interface SkillFile {
  readonly name: string;
  readonly content: string;
}

export interface InternPackage {
  readonly manifest: InternManifest;
  readonly aieos: AieosEntity;
  readonly skills: SkillFile[];
  readonly memorySeedPaths: string[];
  readonly hasProfile: boolean;
  readonly packageDir: string;
}
