#!/usr/bin/env tsx
/**
 * Publish a signed intern package to GitHub Releases.
 * Usage: npx tsx scripts/publish-to-github-releases.ts <tarball.tar.gz> <signature-hex>
 *
 * Prerequisites:
 *   - GH_TOKEN env var with repo write access
 *   - GitHub release "packages-v1" must exist
 *   - tarball named: <intern-id>-<version>.tar.gz
 *
 * Steps:
 *   1. Upload tarball as release asset (replace if exists)
 *   2. Download current manifest.json from release
 *   3. Upsert intern entry with new version, download_url, dist fields
 *   4. Upload updated manifest.json back to release
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const OWNER = 'internsmarket';
const REPO = 'packages';
const TAG = 'packages-v1';
const GH_API = 'https://api.github.com';
const GH_UPLOADS = 'https://uploads.github.com';
const GH_TOKEN = process.env.GH_TOKEN;

if (!GH_TOKEN) { console.error('GH_TOKEN env var required'); process.exit(1); }

const [tarballPath, signatureHex] = process.argv.slice(2);
if (!tarballPath || !signatureHex) {
  console.error('Usage: npx tsx scripts/publish-to-github-releases.ts <tarball.tar.gz> <signature-hex>');
  process.exit(1);
}

const headers: Record<string, string> = {
  'Authorization': `Bearer ${GH_TOKEN}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function ghJson<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...opts, headers: { ...headers, ...opts?.headers } });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

async function getReleaseId(): Promise<number> {
  const release = await ghJson<{ id: number }>(
    `${GH_API}/repos/${OWNER}/${REPO}/releases/tags/${TAG}`
  );
  return release.id;
}

async function uploadAsset(releaseId: number, filename: string, data: Buffer): Promise<string> {
  // Delete existing asset with same name first (GitHub doesn't allow overwrite)
  const release = await ghJson<{ assets: Array<{ id: number; name: string }> }>(
    `${GH_API}/repos/${OWNER}/${REPO}/releases/${releaseId}`
  );
  const existing = release.assets.find(a => a.name === filename);
  if (existing) {
    await fetch(`${GH_API}/repos/${OWNER}/${REPO}/releases/assets/${existing.id}`, {
      method: 'DELETE', headers,
    });
  }

  const asset = await ghJson<{ browser_download_url: string }>(
    `${GH_UPLOADS}/repos/${OWNER}/${REPO}/releases/${releaseId}/assets?name=${filename}`,
    { method: 'POST', headers: { ...headers, 'Content-Type': 'application/octet-stream' }, body: data }
  );
  return asset.browser_download_url;
}

// Main
const tarball = readFileSync(tarballPath);
const sha256hex = createHash('sha256').update(tarball).digest('hex');
const filename = tarballPath.split('/').at(-1)!;
const match = filename.match(/^(.+)-(\d+\.\d+\.\d+)\.tar\.gz$/);
if (!match) {
  console.error('Filename must be: <intern-id>-<version>.tar.gz');
  process.exit(1);
}
const [, internId, version] = match;

console.log(`Publishing ${internId}@${version}...`);
const releaseId = await getReleaseId();

// Upload tarball
const downloadUrl = await uploadAsset(releaseId, filename, tarball);
console.log(`Tarball uploaded: ${downloadUrl}`);

// Fetch current manifest (may 404 on first publish)
interface ManifestShape { version: string; updated_at: string; interns: Array<Record<string, unknown>> }
let manifest: ManifestShape;
try {
  const manifestUrl = `https://github.com/${OWNER}/${REPO}/releases/download/${TAG}/manifest.json`;
  const res = await fetch(manifestUrl);
  manifest = res.ok
    ? await res.json() as ManifestShape
    : { version: '1', updated_at: '', interns: [] };
} catch {
  manifest = { version: '1', updated_at: '', interns: [] };
}

// Merge new fields over existing entry — preserve name, tier_required, tags
const existingEntry = manifest.interns.find(i => i.id === internId) ?? {};
const entry = {
  ...existingEntry,
  id: internId,
  version,
  download_url: downloadUrl,
  dist: { sha256: sha256hex, signature: signatureHex },
};
manifest.interns = [
  ...manifest.interns.filter(i => i.id !== internId),
  entry,
];
manifest.updated_at = new Date().toISOString();

// Upload updated manifest
const manifestBytes = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');
await uploadAsset(releaseId, 'manifest.json', manifestBytes);
console.log('manifest.json updated');
console.log('Done.');
