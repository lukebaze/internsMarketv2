/** AIEOS Layer 1: Metadata — UUID, versioning, timestamps */
export interface AieosMetadata {
  readonly instance_id?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly author?: string;
  readonly license?: string;
  readonly tags?: readonly string[];
}
