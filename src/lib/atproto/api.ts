import type { AppBskyActorDefs, AppBskyFeedDefs, AppBskyRichtextFacet } from '@atproto/api';
import { atprotoConfig, bskyPostUrl, parseAtUri } from '../../config/atproto';
import { publicAgent, hasAtprotoActor } from './client';
import type { NowStatus } from '../../data/now';
import { nowStatus as localNow } from '../../data/now';

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
