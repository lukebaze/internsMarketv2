/** HTTP client for the InternsMarket registry — fetch index, manifests, download bundles */
import got from 'got';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import fs from 'node:fs';
import { join } from 'node:path';
import { configStore } from './config-store.js';

export interface RegistryEntry {
  id: string;
  name: string;
  version: string;
  tier_required: string;
  description: string;
  tags: string[];
  download_url: string;
  manifest_url: string;
}

export interface RegistryIndex {
  version: string;
  updated_at: string;
  interns: RegistryEntry[];
}

function getRegistryBase(): string {
  return configStore.get('apiEndpoint') ?? 'https://registry.internsmarket.com';
}

const HTTP_OPTS = { timeout: { request: 30_000 }, retry: { limit: 2 } };

/** Fetches the full registry index */
export async function fetchRegistryIndex(): Promise<RegistryIndex> {
  const url = `${getRegistryBase()}/index.json`;
  const data = await got.get(url, HTTP_OPTS).json<RegistryIndex>();
  return data;
}

/** Finds a single intern entry from the registry index */
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
