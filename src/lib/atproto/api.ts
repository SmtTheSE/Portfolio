import type { AppBskyActorDefs, AppBskyFeedDefs, AppBskyRichtextFacet } from '@atproto/api';
import { atprotoConfig, bskyPostUrl, parseAtUri } from '../../config/atproto';
import { publicAgent, hasAtprotoActor } from './client';
import type { NowStatus } from '../../data/now';
import { nowStatus as localNow } from '../../data/now';
import { localNotes } from '../../data/notes';

export type PortfolioProfile = {
  did: string;
  handle: string;
  displayName: string;
  description: string;
  avatar?: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
};

export type PortfolioPost = {
  uri: string;
  cid: string;
  text: string;
  createdAt: string;
  likeCount: number;
  repostCount: number;
  replyCount: number;
  url: string;
  facets?: AppBskyRichtextFacet.Main[];
  embedImage?: string;
  isRepost: boolean;
};

export type PortfolioFollow = {
  did: string;
  handle: string;
  displayName: string;
  avatar?: string;
  description?: string;
};

function mapProfile(p: AppBskyActorDefs.ProfileViewDetailed): PortfolioProfile {
  return {
    did: p.did,
    handle: p.handle,
    displayName: p.displayName || p.handle,
    description: p.description || '',
    avatar: p.avatar,
    followersCount: p.followersCount ?? 0,
    followsCount: p.followsCount ?? 0,
    postsCount: p.postsCount ?? 0,
  };
}

function mapPost(item: AppBskyFeedDefs.FeedViewPost, fallbackHandle: string): PortfolioPost | null {
  const post = item.post;
  const record = post.record as { text?: string; createdAt?: string; facets?: AppBskyRichtextFacet.Main[] };
  if (!record?.text || !record.createdAt) return null;

  const authorHandle = post.author.handle || fallbackHandle;
  const parsed = parseAtUri(post.uri);
  const url = parsed ? bskyPostUrl(authorHandle, parsed.rkey) : bskyPostUrl(authorHandle, '');

  let embedImage: string | undefined;
  const embed = post.embed as { $type?: string; images?: { thumb?: string }[]; media?: { images?: { thumb?: string }[] } } | undefined;
  if (embed?.$type?.includes('images') && embed.images?.[0]?.thumb) {
    embedImage = embed.images[0].thumb;
  } else if (embed?.media?.images?.[0]?.thumb) {
    embedImage = embed.media.images[0].thumb;
  }

  return {
    uri: post.uri,
    cid: post.cid,
    text: record.text,
    createdAt: record.createdAt,
    likeCount: post.likeCount ?? 0,
    repostCount: post.repostCount ?? 0,
    replyCount: post.replyCount ?? 0,
    url,
    facets: record.facets,
    embedImage,
    isRepost: Boolean(item.reason && (item.reason as { $type?: string }).$type?.includes('reasonRepost')),
  };
}

export async function fetchProfile(actor = atprotoConfig.actor): Promise<PortfolioProfile | null> {
  if (!actor) return null;
  const { data } = await publicAgent.getProfile({ actor });
  return mapProfile(data);
}

export async function fetchAuthorFeed(actor = atprotoConfig.actor, limit = atprotoConfig.feedLimit): Promise<PortfolioPost[]> {
  if (!actor) return [];
  const { data } = await publicAgent.getAuthorFeed({
    actor,
    limit,
    filter: 'posts_and_author_threads',
  });

  const posts: PortfolioPost[] = [];
  for (const item of data.feed) {
    // Prefer original posts over pure replies for a cleaner portfolio surface
    const reply = (item.post.record as { reply?: unknown }).reply;
    if (reply && !item.reason) continue;
    const mapped = mapPost(item, actor);
    if (mapped) posts.push(mapped);
    if (posts.length >= limit) break;
  }
  return posts;
}

export async function fetchFollows(actor = atprotoConfig.actor, limit = atprotoConfig.followsLimit): Promise<PortfolioFollow[]> {
  if (!actor) return [];
  const { data } = await publicAgent.getFollows({ actor, limit });
  return data.follows.map((f) => ({
    did: f.did,
    handle: f.handle,
    displayName: f.displayName || f.handle,
    avatar: f.avatar,
    description: f.description,
  }));
}

export type TealPlay = {
  trackName: string;
  artists: string[];
  releaseName?: string;
  playedTime?: string;
  originUrl?: string;
};

export type DigestItem = PortfolioPost & {
  authorHandle: string;
  authorName: string;
  authorAvatar?: string;
};

/**
 * Prefer a custom PDS "now" record when present; otherwise use local portfolio data.
 */
export async function resolveNowStatus(actor = atprotoConfig.actor): Promise<NowStatus & { source: 'pds' | 'local' }> {
  if (!hasAtprotoActor() || !actor) {
    return { ...localNow, source: 'local' };
  }

  try {
    const profile = await publicAgent.getProfile({ actor });
    const { data } = await publicAgent.com.atproto.repo.listRecords({
      repo: profile.data.did,
      collection: atprotoConfig.nowCollection,
      limit: 1,
    });

    const record = data.records[0]?.value as Partial<NowStatus> | undefined;
    if (record?.status && record?.updatedAt) {
      return {
        status: record.status,
        focus: record.focus || localNow.focus,
        location: record.location || localNow.location,
        availableForWork: record.availableForWork ?? localNow.availableForWork,
        updatedAt: record.updatedAt,
        source: 'pds',
      };
    }
  } catch {
    // Collection may not exist yet — local fallback is expected.
  }

  return { ...localNow, source: 'local' };
}

/** Latest Teal.fm play from the actor's PDS, if any. */
export async function fetchLatestTealPlay(actor = atprotoConfig.actor): Promise<TealPlay | null> {
  if (!actor) return null;
  try {
    const profile = await publicAgent.getProfile({ actor });
    const { data } = await publicAgent.com.atproto.repo.listRecords({
      repo: profile.data.did,
      collection: atprotoConfig.tealPlayCollection,
      limit: 1,
    });
    const value = data.records[0]?.value as {
      trackName?: string;
      artists?: { name?: string }[] | string[];
      releaseName?: string;
      playedTime?: string;
      originUrl?: string;
    } | undefined;
    if (!value?.trackName) return null;
    const artists = (value.artists || [])
      .map((a) => (typeof a === 'string' ? a : a.name || ''))
      .filter(Boolean);
    return {
      trackName: value.trackName,
      artists,
      releaseName: value.releaseName,
      playedTime: value.playedTime,
      originUrl: value.originUrl,
    };
  } catch {
    return null;
  }
}

/** Digital garden notes from PDS, falling back to local seed notes. */
export async function fetchGardenNotes(actor = atprotoConfig.actor) {
  if (!actor) return { notes: localNotes, source: 'local' as const };

  try {
    const profile = await publicAgent.getProfile({ actor });
    const { data } = await publicAgent.com.atproto.repo.listRecords({
      repo: profile.data.did,
      collection: atprotoConfig.notesCollection,
      limit: 20,
    });
    if (!data.records.length) return { notes: localNotes, source: 'local' as const };

    const notes = data.records.map((rec) => {
      const v = rec.value as {
        title?: string;
        body?: string;
        tags?: string[];
        updatedAt?: string;
        id?: string;
      };
      const rkey = parseAtUri(rec.uri)?.rkey || 'note';
      return {
        id: v.id || rkey,
        title: v.title || 'Untitled',
        body: v.body || '',
        tags: v.tags || [],
        updatedAt: v.updatedAt || new Date().toISOString(),
      };
    });
    return { notes, source: 'pds' as const };
  } catch {
    return { notes: localNotes, source: 'local' as const };
  }
}

/** Enrich garden people with live Bluesky profiles. */
export async function fetchGardenPeople(handles: string[]) {
  const results = await Promise.all(
    handles.map(async (handle) => {
      try {
        const profile = await fetchProfile(handle);
        return { handle, profile };
      } catch {
        return { handle, profile: null };
      }
    }),
  );
  return results;
}

/**
 * Atmosphere digest — recent posts from curated garden handles + own feed.
 * Bailey-inspired aggregation without a Firehose backend.
 */
export async function fetchAtmosphereDigest(
  handles: string[],
  options?: { includeSelf?: boolean; perAuthor?: number },
): Promise<DigestItem[]> {
  const perAuthor = options?.perAuthor ?? atprotoConfig.digestPerAuthor;
  const actors = [...handles];
  if (options?.includeSelf !== false && atprotoConfig.actor) {
    actors.unshift(atprotoConfig.actor);
  }
  const unique = [...new Set(actors)];

  const batches = await Promise.all(
    unique.map(async (actor) => {
      try {
        const { data } = await publicAgent.getAuthorFeed({
          actor,
          limit: perAuthor + 2,
          filter: 'posts_no_replies',
        });
        const items: DigestItem[] = [];
        for (const entry of data.feed) {
          const mapped = mapPost(entry, actor);
          if (!mapped) continue;
          items.push({
            ...mapped,
            authorHandle: entry.post.author.handle,
            authorName: entry.post.author.displayName || entry.post.author.handle,
            authorAvatar: entry.post.author.avatar,
          });
          if (items.length >= perAuthor) break;
        }
        return items;
      } catch {
        return [] as DigestItem[];
      }
    }),
  );

  return batches
    .flat()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 12);
}
