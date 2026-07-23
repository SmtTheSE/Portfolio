import { motion } from 'framer-motion';
import { bskyProfileUrl } from '../../config/atproto';
import { useAtprotoFollows } from '../../hooks/useAtproto';
import { hasAtprotoActor } from '../../lib/atproto/client';

export default function AtprotoNetwork() {
  const configured = hasAtprotoActor();
  const { data: follows, loading, error } = useAtprotoFollows();

  if (!configured) return null;

  return (
    <section id="network" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 07</span>
            <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
              Protocol <br className="hidden md:block" /> Network
            </h2>
          </div>
          <div className="w-8 h-px bg-border-light" />
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            Accounts I follow on the AT Protocol — portable social graph, owned at the identity layer rather than a single app.
          </p>
        </div>

        <div className="md:col-span-8">
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-light border border-border-light">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-primary-bg p-4 h-28 animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <p className="text-sm text-text-muted font-light border border-border-light p-6">{error}</p>
          )}

          {!loading && !error && follows.length === 0 && (
            <p className="text-sm text-text-muted font-light border border-border-light p-6">
              Follow graph is empty or private — nothing to display yet.
            </p>
          )}

          {follows.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-light border border-border-light">
              {follows.map((person, i) => (
                <motion.a
                  key={person.did}
                  href={bskyProfileUrl(person.handle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                  className="bg-primary-bg p-4 flex flex-col gap-3 hover:bg-secondary-bg/80 transition-colors group"
                >
                  {person.avatar ? (
                    <img
                      src={person.avatar}
                      alt=""
                      className="w-8 h-8 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-8 h-8 border border-border-light" />
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-medium tracking-tight text-text-main truncate">
                      {person.displayName}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono truncate">@{person.handle}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
