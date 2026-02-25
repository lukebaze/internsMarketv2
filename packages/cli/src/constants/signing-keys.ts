/**
 * Trusted Ed25519 public keys for package verification (hex-encoded, 32 bytes each).
 * Array allows key rotation: add new key, keep old key active for N months.
 * Bump CLI major version when dropping an old key.
 *
 * HOW TO GET THIS VALUE:
 *   npx tsx scripts/generate-signing-keypair.ts
 *   Copy the printed PUBLIC_KEY_HEX value here.
 */
export const TRUSTED_PUBLIC_KEYS: readonly string[] = [
  // 'REPLACE_WITH_REAL_64_CHAR_HEX_PUBLIC_KEY',
];

// Build-time guard — prevent shipping with empty keys (only skip in test env)
if (process.env.NODE_ENV !== 'test' && TRUSTED_PUBLIC_KEYS.length === 0) {
  throw new Error(
    'TRUSTED_PUBLIC_KEYS is empty — package signature verification cannot proceed. ' +
    'Run `npx tsx scripts/generate-signing-keypair.ts` and add the public key.',
  );
}
