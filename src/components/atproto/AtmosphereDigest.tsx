import { motion } from 'framer-motion';
import { useAtmosphereDigest } from '../../hooks/useAtproto';
import { formatRelativeTime } from '../../lib/atproto/format';
import { bskyProfileUrl } from '../../config/atproto';
import PostText from './PostText';

export default function AtmosphereDigest() {
  const { data: items, loading, error } = useAtmosphereDigest();

  return (
    <section id="digest" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center bg-secondary-bg/30">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 11</span>
            <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
              Atmosphere <br className="hidden md:block" /> Digest
            </h2>
          </div>
          <div className="w-8 h-px bg-border-light" />
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            A small personal newspaper: recent posts from me and the people in my garden, pulled through the public AppView.
          </p>
        </div>

        <div className="md:col-span-8">
          {loading && (
            <div className="border border-border-light divide-y divide-border-light">
              {[0, 1, 2].map((i) => (
                <div key={i} className="p-6 h-28 animate-pulse bg-primary-bg" />
              ))}
            </div>
          )}

          {error && (
            <p className="text-sm text-text-muted font-light border border-border-light p-6 bg-primary-bg">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-sm text-text-muted font-light border border-border-light p-6 bg-primary-bg">
              No digest items yet — check back after garden profiles publish.
            </p>
          )}

          {items.length > 0 && (
            <div className="border border-border-light divide-y divide-border-light">
              {items.map((item, i) => (
                <motion.article
                  key={item.uri}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.24) }}
                  className="p-5 md:p-6 bg-primary-bg flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={bskyProfileUrl(item.authorHandle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 min-w-0 hover:opacity-70 transition-opacity"
                    >
                      {item.authorAvatar ? (
                        <img src={item.authorAvatar} alt="" className="w-6 h-6 object-cover grayscale border border-border-light" />
                      ) : (
                        <div className="w-6 h-6 border border-border-light" />
                      )}
                      <span className="text-xs font-medium truncate">{item.authorName}</span>
                      <span className="text-[10px] font-mono text-text-muted truncate">@{item.authorHandle}</span>
                    </a>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] uppercase tracking-[0.15em] font-mono text-text-muted hover:text-text-main shrink-0"
                    >
                      {formatRelativeTime(item.createdAt)}
                    </a>
                  </div>
                  <PostText text={item.text} facets={item.facets} />
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
