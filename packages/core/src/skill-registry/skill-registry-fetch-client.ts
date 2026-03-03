/**
 * Skill registry client — fetches the remote index, caches it (in-process + disk),
 * and provides helpers for searching skills and downloading tarballs.
 *
 * Uses Node 18+ native fetch (globalThis.fetch). No `got` dependency.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import os from 'node:os';
import type { SkillRegistryIndex, SkillRegistryEntry } from './skill-registry-types.js';

// Config

const DEFAULT_REGISTRY_URL =
  'https://github.com/lukebaze/skills-registry/releases/download/v1/index.json';

const REGISTRY_URL =
  process.env['INTERNSMARKET_SKILL_REGISTRY_URL'] ?? DEFAULT_REGISTRY_URL;

/** All registry content (tarballs, index) must share this URL prefix. */
const ALLOWED_PREFIX = 'https://github.com/lukebaze/skills-registry/';

const FETCH_TIMEOUT_MS = 30_000;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Disk cache

const CACHE_DIR = join(os.homedir(), '.internsmarket');
const CACHE_PATH = join(CACHE_DIR, 'skill-registry-cache.json');

function writeDiskCache(index: SkillRegistryIndex): void {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(CACHE_PATH, JSON.stringify(index), 'utf-8');
  } catch {
    // Non-fatal — disk cache is best-effort only
  }
}

function readDiskCache(): SkillRegistryIndex | undefined {
  if (!existsSync(CACHE_PATH)) return undefined;
  try {
    return JSON.parse(readFileSync(CACHE_PATH, 'utf-8')) as SkillRegistryIndex;
  } catch {
    return undefined;
  }
}

// In-process TTL cache

let inProcessCache: { index: SkillRegistryIndex; fetchedAt: number } | undefined;

// URL helpers

/**
 * Validates a URL against the allowed prefix to prevent redirect-based bypasses.
 * Normalises the URL via the URL constructor first (resolves dot-segments, etc.).
 */
function validateRegistryUrl(raw: string): string {
  const normalised = new URL(raw).href;
  if (!normalised.startsWith(ALLOWED_PREFIX)) {
    throw new Error(
      `URL "${normalised}" is not allowed. Must start with "${ALLOWED_PREFIX}".`,
    );
  }
  return normalised;
}

// Core fetch helper with timeout + retry

async function fetchWithRetry(url: string, attempts = 2): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const response = await globalThis.fetch(url, {
        redirect: 'error', // Prevent redirect-based URL-allowlist bypasses
        signal: controller.signal,
      });
      clearTimeout(timer);
      return response;
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
    }
  }
  throw lastError;
}

// Public API

/**
 * Fetches the registry index.
 *
 * - Returns in-process cache when < 5 min old (unless `force` is true).
 * - Writes a disk cache on every successful network fetch.
 * - Falls back to disk cache when the network is unavailable.
 */
export async function fetchSkillRegistryIndex(
  force = false,
): Promise<SkillRegistryIndex> {
  const now = Date.now();

  // In-process TTL cache
  if (!force && inProcessCache && now - inProcessCache.fetchedAt < CACHE_TTL_MS) {
    return inProcessCache.index;
  }

  const url = validateRegistryUrl(REGISTRY_URL);

  try {
    const response = await fetchWithRetry(url);
    if (!response.ok) {
      throw new Error(`Registry fetch failed: HTTP ${response.status}`);
    }
    const index = (await response.json()) as SkillRegistryIndex;

    // Persist caches
    inProcessCache = { index, fetchedAt: now };
    writeDiskCache(index);

    return index;
  } catch (err) {
    // Network error — try disk cache fallback
    const cached = readDiskCache();
    if (cached) {
      console.warn('Network unavailable — using cached skill registry');
      inProcessCache = { index: cached, fetchedAt: now };
      return cached;
    }
    throw err;
  }
}

/**
 * Looks up a single skill entry from the registry index by exact name.
 */
export async function fetchSkillEntry(
  name: string,
): Promise<SkillRegistryEntry | undefined> {
  const index = await fetchSkillRegistryIndex();
  return index.skills[name];
}

/**
 * Simple full-text search across skill names and descriptions.
 * Returns skills whose name or description contains the query string (case-insensitive).
 */
export async function searchSkills(
  query: string,
): Promise<Array<{ name: string; entry: SkillRegistryEntry }>> {
  const index = await fetchSkillRegistryIndex();
  const lower = query.toLowerCase();
  return Object.entries(index.skills)
    .filter(
      ([name, entry]) =>
        name.toLowerCase().includes(lower) ||
        (entry.description ?? '').toLowerCase().includes(lower),
    )
    .map(([name, entry]) => ({ name, entry }));
}

/**
 * Constructs the tarball download URL for a specific skill version.
 * Follows the convention: `{ALLOWED_PREFIX}releases/download/{version}/{name}.tgz`
 */
export function getSkillDownloadUrl(name: string, version: string): string {
  const url = `${ALLOWED_PREFIX}releases/download/${version}/${name}.tgz`;
  return validateRegistryUrl(url);
}

/**
 * Downloads a skill tarball from `url` and writes it to `destPath`.
 * URL is validated against the allowlist before any network request is made.
 */
export async function downloadSkillTgz(url: string, destPath: string): Promise<void> {
  const safeUrl = validateRegistryUrl(url);
  const response = await fetchWithRetry(safeUrl);
  if (!response.ok) {
    throw new Error(`Failed to download skill tarball: HTTP ${response.status}`);
  }
  if (!response.body) {
    throw new Error('Response body is null — cannot write tarball');
  }
  const dest = createWriteStream(destPath);
  await pipeline(Readable.fromWeb(response.body as Parameters<typeof Readable.fromWeb>[0]), dest);
}
