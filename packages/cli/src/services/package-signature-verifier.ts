/**
 * Ed25519 package signature verification using Node.js built-in crypto.
 * Zero npm dependencies. Public keys hardcoded in signing-keys.ts.
 *
 * What gets verified:
 *   The integrity string "${name}@${version}:${sha256hex}" is verified against
 *   the Ed25519 signature stored in manifest.dist.signature.
 *   This ensures the tarball content matches what the publisher signed.
 */
import { createPublicKey, verify, createHash } from 'node:crypto';
import { TRUSTED_PUBLIC_KEYS } from '../constants/signing-keys.js';

// Static DER SPKI prefix for Ed25519 — always 12 bytes, never changes
const SPKI_PREFIX = Buffer.from('302a300506032b6570032100', 'hex');

function buildPublicKey(hexKey: string) {
  const rawKey = Buffer.from(hexKey, 'hex');
  const derKey = Buffer.concat([SPKI_PREFIX, rawKey]);
  return createPublicKey({ format: 'der', type: 'spki', key: derKey });
}

export interface VerifyInput {
  tarballBytes: Buffer;
  internId: string;
  version: string;
  signatureHex: string;
}

/**
 * Verify an intern package signature against all trusted public keys.
 * Returns true if any trusted key validates the signature.
 * Returns true (with warning) if TRUSTED_PUBLIC_KEYS is empty (dev mode).
 */
export function verifyPackageSignature(input: VerifyInput): boolean {
  if (TRUSTED_PUBLIC_KEYS.length === 0) {
    console.warn('[warn] Package signing not configured — skipping signature check');
    return true;
  }

  const sha256hex = createHash('sha256').update(input.tarballBytes).digest('hex');
  const integrityString = `${input.internId}@${input.version}:${sha256hex}`;
  const data = Buffer.from(integrityString, 'utf8');
  const sig = Buffer.from(input.signatureHex, 'hex');

  for (const keyHex of TRUSTED_PUBLIC_KEYS) {
    try {
      const publicKey = buildPublicKey(keyHex);
      if (verify(null, data, publicKey, sig)) return true;
    } catch {
      // Malformed key — skip and try next
    }
  }

  return false;
}
