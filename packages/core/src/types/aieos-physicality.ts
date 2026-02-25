/** AIEOS Layer 4: Physicality — face, body, style, image prompts */
export interface AieosImagePrompts {
  readonly portrait?: string;
  readonly full_body?: string;
  readonly avatar?: string;
}

export interface AieosPhysicality {
  readonly image_prompts?: AieosImagePrompts;
  readonly face?: string;
  readonly body?: string;
  readonly style?: string;
  readonly distinguishing_features?: readonly string[];
}
