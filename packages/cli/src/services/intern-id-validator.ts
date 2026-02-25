/** Shared intern id validation — prevents path traversal */
const INTERN_ID_RE = /^[a-z0-9-]+$/;

export function validateInternId(id: string): void {
  if (!INTERN_ID_RE.test(id)) {
    throw new Error(`Invalid intern id "${id}" — must be lowercase alphanumeric with hyphens`);
  }
}

export function isValidInternId(id: string): boolean {
  return INTERN_ID_RE.test(id);
}
