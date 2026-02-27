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

// Warn at startup if no keys configured — verifier will skip signature checks gracefully
if (TRUSTED_PUBLIC_KEYS.length === 0 && process.env.NODE_ENV !== 'test') {
  console.warn('[warn] No signing keys configured — package signature verification disabled');
}
