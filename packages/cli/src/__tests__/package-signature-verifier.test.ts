import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateKeyPairSync, sign, createHash } from 'node:crypto';

// Mock the signing keys module — we inject test keys per test
const mockKeys: string[] = [];
vi.mock('../constants/signing-keys.js', () => ({
  get TRUSTED_PUBLIC_KEYS() { return mockKeys; },
}));

import { verifyPackageSignature } from '../services/package-signature-verifier.js';

describe('verifyPackageSignature', () => {
  let publicKeyHex: string;
  let privateKeyObj: ReturnType<typeof generateKeyPairSync>['privateKey'];

  beforeEach(() => {
    mockKeys.length = 0;
    const { privateKey, publicKey } = generateKeyPairSync('ed25519');
    privateKeyObj = privateKey;
    const spki = publicKey.export({ format: 'der', type: 'spki' }) as Buffer;
    publicKeyHex = spki.subarray(-32).toString('hex');
  });

  function signBundle(tarball: Buffer, id: string, version: string): string {
    const sha256 = createHash('sha256').update(tarball).digest('hex');
    const integrity = `${id}@${version}:${sha256}`;
    return sign(null, Buffer.from(integrity, 'utf8'), privateKeyObj).toString('hex');
  }

  it('returns true for valid signature with trusted key', () => {
    mockKeys.push(publicKeyHex);
    const tarball = Buffer.from('fake tarball content');
    const sig = signBundle(tarball, 'test-intern', '1.0.0');

    expect(verifyPackageSignature({
      tarballBytes: tarball,
      internId: 'test-intern',
      version: '1.0.0',
      signatureHex: sig,
    })).toBe(true);
  });

  it('returns false for tampered tarball', () => {
    mockKeys.push(publicKeyHex);
    const tarball = Buffer.from('original content');
    const sig = signBundle(tarball, 'test-intern', '1.0.0');

    expect(verifyPackageSignature({
      tarballBytes: Buffer.from('tampered content'),
      internId: 'test-intern',
      version: '1.0.0',
      signatureHex: sig,
    })).toBe(false);
  });

  it('returns false for wrong key', () => {
    mockKeys.push(publicKeyHex);
    const { privateKey: otherPriv } = generateKeyPairSync('ed25519');
    const tarball = Buffer.from('content');
    const sha256 = createHash('sha256').update(tarball).digest('hex');
    const integrity = `test-intern@1.0.0:${sha256}`;
    const wrongSig = sign(null, Buffer.from(integrity, 'utf8'), otherPriv).toString('hex');

    expect(verifyPackageSignature({
      tarballBytes: tarball,
      internId: 'test-intern',
      version: '1.0.0',
      signatureHex: wrongSig,
    })).toBe(false);
  });

  it('returns true with warning when TRUSTED_PUBLIC_KEYS is empty', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(verifyPackageSignature({
      tarballBytes: Buffer.from('x'),
      internId: 'test',
      version: '1.0.0',
      signatureHex: 'deadbeef',
    })).toBe(true);

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('signing not configured'),
    );
    warnSpy.mockRestore();
  });

  it('returns false for mismatched version', () => {
    mockKeys.push(publicKeyHex);
    const tarball = Buffer.from('content');
    const sig = signBundle(tarball, 'test-intern', '1.0.0');

    expect(verifyPackageSignature({
      tarballBytes: tarball,
      internId: 'test-intern',
      version: '2.0.0',
      signatureHex: sig,
    })).toBe(false);
  });
});
