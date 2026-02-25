/** AIEOS Layer 8: Interests — hobbies, favorites, lifestyle */
export interface AieosInterests {
  readonly hobbies?: readonly string[];
  readonly favorites?: Record<string, string>;
  readonly aversions?: readonly string[];
  readonly lifestyle?: string;
}
