/** HTTP client for InternsMarket package registry — fetches manifest from GitHub Releases */
import got from 'got';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import fs from 'node:fs';
import { join } from 'node:path';
import { GITHUB_MANIFEST_URL } from './license-constants.js';

export interface RegistryEntryDist {
  sha256: string;
  signature: string;
}

export interface RegistryEntry {
  id: string;
  name: string;
  version: string;
  tier_required: string;
  description: string;
  tags: string[];
  download_url: string;
  dist?: RegistryEntryDist;
}

export interface RegistryIndex {
  version: string;
  updated_at: string;
  interns: RegistryEntry[];
}

const HTTP_OPTS = { timeout: { request: 30_000 }, retry: { limit: 2 } };

// In-process cache with 5-min TTL — prevents stale data in long sessions
let cachedIndex: RegistryIndex | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

/** Fetches the registry manifest from GitHub Releases (TTL-cached per session) */
export async function fetchRegistryIndex(force = false): Promise<RegistryIndex> {
  if (!force && cachedIndex && (Date.now() - cachedAt) < CACHE_TTL_MS) return cachedIndex;
  cachedIndex = await got.get(GITHUB_MANIFEST_URL, HTTP_OPTS).json<RegistryIndex>();
  cachedAt = Date.now();
  return cachedIndex;
}

/** Finds a single intern entry from the registry manifest */
export async function fetchInternEntry(id: string): Promise<RegistryEntry> {
  const index = await fetchRegistryIndex();
  const entry = index.interns.find(i => i.id === id);
  if (!entry) throw new Error(`Intern "${id}" not found in registry`);
  return entry;
}

/** Downloads a bundle tarball to destDir, reporting progress 0-100 */
export async function downloadBundle(
  url: string,
  destDir: string,
  onProgress: (pct: number) => void,
): Promise<string> {
  fs.mkdirSync(destDir, { recursive: true });
  const tarPath = join(destDir, '_bundle.tar.gz');
  const stream = got.stream(url, HTTP_OPTS);
  let downloaded = 0;
  let total = 0;

  stream.on('downloadProgress', ({ transferred, total: t }) => {
    downloaded = transferred;
    if (t) {
      total = t;
      onProgress(Math.floor((downloaded / total) * 100));
    }
  });

  await pipeline(stream, createWriteStream(tarPath));
  onProgress(100);
  return tarPath;
}
