/** AIEOS v1.1 — Top-level entity combining all 9 layers */
import type { AieosMetadata } from './aieos-metadata.js';
import type { AieosCapabilities } from './aieos-capabilities.js';
import type { AieosIdentity } from './aieos-identity.js';
import type { AieosPhysicality } from './aieos-physicality.js';
import type { AieosPsychology } from './aieos-psychology.js';
import type { AieosLinguistics } from './aieos-linguistics.js';
import type { AieosHistory } from './aieos-history.js';
import type { AieosInterests } from './aieos-interests.js';
import type { AieosMotivations } from './aieos-motivations.js';

export interface AieosStandard {
  readonly protocol: string;
  readonly version: string;
  readonly schema_url?: string;
}

export interface AieosEntity {
  readonly standard: AieosStandard;
  readonly metadata?: AieosMetadata;
  readonly capabilities?: AieosCapabilities;
  readonly identity?: AieosIdentity;
  readonly physicality?: AieosPhysicality;
  readonly psychology?: AieosPsychology;
  readonly linguistics?: AieosLinguistics;
  readonly history?: AieosHistory;
  readonly interests?: AieosInterests;
  readonly motivations?: AieosMotivations;
}
