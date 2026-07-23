/**
 * AT Protocol / Bluesky portfolio config.
 * Set VITE_ATPROTO_HANDLE in `.env` (e.g. sittminthar.bsky.social or a custom domain handle).
 */
export const atprotoConfig = {
  /** Handle or DID. Empty disables live PDS fetches (Now still works from local data). */
  actor:
    (import.meta.env.VITE_ATPROTO_HANDLE as string | undefined)?.trim() ||
    'sitt03.bsky.social',
  /** Public AppView — CORS-friendly for browser clients. */
  service: 'https://api.bsky.app',
  feedLimit: 6,
  followsLimit: 16,
  /** Optional custom "now" record collection on your PDS (falls back to local data). */
  nowCollection: 'com.sittminthar.status.now',
} as const;

export function bskyProfileUrl(actor: string) {
  return `https://bsky.app/profile/${actor}`;
}

export function bskyPostUrl(actor: string, rkey: string) {
  return `https://bsky.app/profile/${actor}/post/${rkey}`;
}

export function parseAtUri(uri: string): { did: string; collection: string; rkey: string } | null {
  const match = uri.match(/^at:\/\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  return { did: match[1], collection: match[2], rkey: match[3] };
}
