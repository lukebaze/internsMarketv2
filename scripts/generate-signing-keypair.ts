#!/usr/bin/env tsx
/**
 * One-time Ed25519 keypair generation for InternsMarket package signing.
 * Run once: npx tsx scripts/generate-signing-keypair.ts
 *
 * Output:
 *   signing-private.pem  — KEEP SECRET, never commit (gitignored)
 *   signing-public.pem   — Reference copy (optional, public key is embedded in CLI)
 *
 * Copy PUBLIC_KEY_HEX into packages/cli/src/constants/signing-keys.ts
 */
import { generateKeyPairSync } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const { privateKey, publicKey } = generateKeyPairSync('ed25519');

// Private key as PEM — store securely, never commit
const privateKeyPem = privateKey.export({ format: 'pem', type: 'pkcs8' }) as string;
writeFileSync('signing-private.pem', privateKeyPem, { mode: 0o600 });

// Public key: extract raw 32 bytes from SPKI DER (last 32 bytes)
const spkiDer = publicKey.export({ format: 'der', type: 'spki' }) as Buffer;
const publicKeyHex = spkiDer.subarray(-32).toString('hex');

// Reference PEM copy
const publicKeyPem = publicKey.export({ format: 'pem', type: 'spki' }) as string;
writeFileSync('signing-public.pem', publicKeyPem);

console.log('\n=== InternsMarket Package Signing Keypair ===\n');
console.log('Private key saved to: signing-private.pem (mode 0600, DO NOT COMMIT)');
console.log('Public key PEM saved to: signing-public.pem\n');
console.log('Add this to packages/cli/src/constants/signing-keys.ts:');
console.log(`\nexport const TRUSTED_PUBLIC_KEYS = ['${publicKeyHex}'];\n`);
