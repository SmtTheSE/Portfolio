import { motion } from 'framer-motion';
import { atprotoConfig, bskyProfileUrl } from '../../config/atproto';
import { useAtprotoFeed, useAtprotoProfile } from '../../hooks/useAtproto';
import { formatCompactCount, formatRelativeTime } from '../../lib/atproto/format';
import { hasAtprotoActor } from '../../lib/atproto/client';
import PostText from './PostText';
import SectionHeader from '../SectionHeader';

function SkeletonRows() {
  return (
    <div className="border border-border-light divide-y divide-border-light overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div key={i} className="p-6 md:p-8 animate-pulse flex flex-col gap-3">
          <div className="h-3 w-24 rounded-full bg-secondary-bg" />
          <div className="h-4 w-full rounded-full bg-secondary-bg" />
          <div className="h-4 w-2/3 rounded-full bg-secondary-bg" />
        </div>
      ))}
    </div>
  );
}

export default function ActivityFeed() {
  const configured = hasAtprotoActor();
  const { data: posts, loading, error } = useAtprotoFeed();
  const { data: profile } = useAtprotoProfile();

  return (
    <section id="activity" className="py-16 md:py-20 px-6 md:px-12 scroll-mt-[52px] w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <SectionHeader label="Live Activity" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
          </div>
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            Posts streamed from my Personal Data Server via the AT Protocol public AppView: no iframes, no locked APIs.
          </p>
          {profile && (
            <a
              href={bskyProfileUrl(profile.handle)}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-pill inline-flex w-fit items-center px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-main hover:opacity-70 transition-opacity"
            >
              Open on Bluesky ↗
            </a>
          )}
        </div>

        <div className="md:col-span-8">
          {!configured && (
            <div className="border border-border-light p-8 md:p-10 flex flex-col gap-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">awaiting_handle</span>
              <p className="text-sm font-light text-text-main leading-relaxed">
                Connect a Bluesky / AT Protocol handle to render a live author feed here. Create an account at{' '}
                <a
                  href="https://bsky.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-border-light hover:border-text-main"
                >
                  bsky.app
                </a>
                , then set <code className="font-mono text-[12px]">VITE_ATPROTO_HANDLE</code> in your environment.
              </p>
            </div>
          )}

          {configured && loading && <SkeletonRows />}

          {configured && error && (
            <div className="border border-border-light p-8 text-sm text-text-muted font-light">
              Feed unavailable right now ({error}). Profile handle: <span className="font-mono">{atprotoConfig.actor}</span>
            </div>
          )}

          {configured && !loading && !error && posts.length === 0 && (
            <div className="border border-border-light p-8 text-sm text-text-muted font-light">
              No public posts yet. The feed will populate as soon as I publish on the network.
            </div>
          )}

          {posts.length > 0 && (
            <div className="border border-border-light divide-y divide-border-light overflow-hidden">
              {posts.map((post, i) => (
                <motion.article
                  key={post.uri}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="p-6 md:p-8 flex flex-col gap-4 hover:bg-secondary-bg/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-text-muted">
                      {post.isRepost && <span>reposted</span>}
                      {post.isRepost && <span className="text-border-light">/</span>}
                      <time dateTime={post.createdAt}>{formatRelativeTime(post.createdAt)}</time>
                    </div>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] uppercase tracking-[0.2em] text-text-muted hover:text-text-main transition-colors"
                    >
                      view ↗
                    </a>
                  </div>

                  <PostText text={post.text} facets={post.facets} />

                  {post.embedImage && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-border-light/70 ">
                      <img src={post.embedImage} alt="" className="w-full max-h-64 object-cover" loading="lazy" />
                    </a>
                  )}

                  <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.15em] text-text-muted pt-1">
                    <span>{formatCompactCount(post.likeCount)} likes</span>
                    <span>{formatCompactCount(post.repostCount)} reposts</span>
                    <span>{formatCompactCount(post.replyCount)} replies</span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
