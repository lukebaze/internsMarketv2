/** AIEOS Layer 3: Identity — name, bio, origin, residence */
export interface AieosNames {
  readonly given?: string;
  readonly family?: string;
  readonly display?: string;
  readonly aliases?: readonly string[];
}

export interface AieosIdentity {
  readonly names?: AieosNames;
  readonly bio?: string;
  readonly origin?: string;
  readonly residence?: string;
  readonly age?: number;
  readonly gender?: string;
  readonly pronouns?: string;
}
