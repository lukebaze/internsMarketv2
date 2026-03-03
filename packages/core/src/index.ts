export const VERSION = '0.1.0';

// AIEOS types (all 9 layers)
export type { AieosMetadata } from './types/aieos-metadata.js';
export type { AieosSkill, AieosCapabilities } from './types/aieos-capabilities.js';
export type { AieosNames, AieosIdentity } from './types/aieos-identity.js';
export type { AieosImagePrompts, AieosPhysicality } from './types/aieos-physicality.js';
export type {
  NeuralMatrix, OceanTraits, EmotionalProfile, AieosPsychology,
} from './types/aieos-psychology.js';
export type {
  AieosTextStyle, AieosIdiolect, AieosVoiceConfig, AieosLinguistics,
} from './types/aieos-linguistics.js';
export type { AieosHistory } from './types/aieos-history.js';
export type { AieosInterests } from './types/aieos-interests.js';
export type { AieosMotivations } from './types/aieos-motivations.js';
export type { AieosStandard, AieosEntity } from './types/aieos-entity.js';

// Intern package types
export type { SupportedRuntime, TierRequired, InternManifest } from './types/intern-manifest.js';
export { InternManifestSchema } from './types/intern-manifest.js';
export type { SkillFile, InternPackage } from './types/intern-package.js';

// Skill package types
export type { SkillRuntime, SkillManifest } from './types/skill-manifest.js';
export { SkillManifestSchema, SLUG_REGEX } from './types/skill-manifest.js';
export type { SkillPackage } from './types/skill-package-composite-type.js';

// Validators
export { AieosEntitySchema, validateAieos } from './validators/aieos-zod-schema.js';

// Compilers
export { compileNeuralMatrix } from './compiler/neural-matrix-compiler.js';
export { compileLinguistics } from './compiler/linguistics-compiler.js';
export { compilePersonaPrompt } from './compiler/persona-prompt-compiler.js';
export { compileIdentityMd, compileSoulMd } from './compiler/openclaw-identity-compiler.js';

// Package I/O
export { readInternPackage } from './package-io/intern-package-reader.js';
export { writeInternPackage } from './package-io/intern-package-writer.js';
export { validateInternPackage } from './package-io/intern-package-validator.js';
export type { ValidationResult } from './package-io/intern-package-validator.js';

// Skill packaging
export { readSkillPackage } from './skill-packaging/skill-reader.js';
export { packSkill } from './skill-packaging/skill-directory-to-tgz-packer.js';
export type { PackResult } from './skill-packaging/skill-directory-to-tgz-packer.js';
export { installSkillFromTgz } from './skill-packaging/skill-tgz-to-directory-installer.js';

// Skill registry
export type {
  SkillRegistryVersion,
  SkillRegistryEntry,
  SkillRegistryIndex,
} from './skill-registry/skill-registry-types.js';
export {
  fetchSkillRegistryIndex,
  fetchSkillEntry,
  searchSkills,
  getSkillDownloadUrl,
  downloadSkillTgz,
} from './skill-registry/skill-registry-fetch-client.js';
export type {
  ResolvedSkill,
  ResolutionResult,
} from './skill-registry/skill-dependency-resolver.js';
export {
  VersionConflictError,
  SkillNotFoundError,
  resolveSkillDependencies,
} from './skill-registry/skill-dependency-resolver.js';

// Skill adapters
export {
  deployResolvedSkills,
  cleanStaleRegistrySkills,
} from './skill-adapters/skill-deployer-zeroclaw.js';
