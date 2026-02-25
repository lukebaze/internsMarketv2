#!/usr/bin/env tsx
/**
 * Sign an intern package tarball for distribution.
 * Usage: npx tsx scripts/sign-package.ts <tarball.tar.gz> [private-key.pem]
 *
 * Output: prints the hex signature string.
 * Embed this as dist.signature in the intern's release manifest.json.
 */
import { createPrivateKey, sign, createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const [tarballPath, keyPath = 'signing-private.pem'] = process.argv.slice(2);

if (!tarballPath) {
  console.error('Usage: npx tsx scripts/sign-package.ts <tarball.tar.gz> [private-key.pem]');
  process.exit(1);
}

// Read tarball and compute SHA-256 integrity
const tarball = readFileSync(tarballPath);
const sha256hex = createHash('sha256').update(tarball).digest('hex');

// Parse name@version from filename: content-marketing-intern-1.0.0.tar.gz
const filename = tarballPath.split('/').at(-1) ?? tarballPath;
const match = filename.match(/^(.+)-(\d+\.\d+\.\d+)\.tar\.gz$/);
if (!match) {
  console.error('Filename must be: <intern-id>-<version>.tar.gz');
  process.exit(1);
}
const [, name, version] = match;

// Integrity string — this is what gets signed (not raw bytes)
const integrityString = `${name}@${version}:${sha256hex}`;

// Sign with Ed25519 (null = PureEdDSA, no pre-hashing)
const privateKeyPem = readFileSync(keyPath, 'utf8');
const privateKey = createPrivateKey({ key: privateKeyPem, format: 'pem' });
const signature = sign(null, Buffer.from(integrityString, 'utf8'), privateKey);
const signatureHex = signature.toString('hex');

console.log('\n=== Package Signature ===\n');
console.log(`Intern:    ${name}@${version}`);
console.log(`SHA-256:   ${sha256hex}`);
console.log(`Integrity: ${integrityString}`);
console.log(`\nSignature (hex):\n${signatureHex}\n`);
console.log('Embed in release manifest.json:');
console.log(JSON.stringify({
  dist: { sha256: sha256hex, signature: signatureHex },
}, null, 2));
