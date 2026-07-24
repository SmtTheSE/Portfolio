import { motion } from 'framer-motion';
import { bskyProfileUrl } from '../../config/atproto';
import { useCommunityGarden } from '../../hooks/useAtproto';

export default function CommunityGarden() {
  const { people, sites } = useCommunityGarden();

  return (
    <section id="garden" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 09</span>
            <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
              Community <br className="hidden md:block" /> Garden
            </h2>
          </div>
          <div className="w-8 h-px bg-border-light" />
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            People and sites I follow closely. Profiles load live from the Bluesky API — a curated links garden, not an iframe.
          </p>
        </div>

        <div className="md:col-span-8 flex flex-col gap-10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono mb-4 block">People</span>
            <div className="border border-border-light divide-y divide-border-light">
              {people.loading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-5 h-24 animate-pulse bg-secondary-bg/30" />
                ))}
              {!people.loading &&
                people.data.map((person, i) => (
                  <motion.a
                    key={person.handle}
                    href={bskyProfileUrl(person.handle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="flex gap-4 p-5 bg-primary-bg hover:bg-secondary-bg/50 transition-colors"
                  >
                    {person.profile?.avatar ? (
                      <img
                        src={person.profile.avatar}
                        alt=""
                        className="w-10 h-10 object-cover grayscale border border-border-light shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 border border-border-light shrink-0" />
                    )}
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-medium tracking-tight text-text-main">
                        {person.profile?.displayName || person.handle}
                      </span>
                      <span className="text-[11px] font-mono text-text-muted">@{person.handle}</span>
                      <p className="text-xs text-text-muted font-light leading-relaxed pt-1">{person.note}</p>
                    </div>
                  </motion.a>
                ))}
            </div>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono mb-4 block">Sites</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-light border border-border-light">
              {sites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-bg p-5 flex flex-col gap-2 hover:bg-secondary-bg/50 transition-colors"
                >
                  <span className="text-sm font-medium tracking-tight text-text-main">{site.title}</span>
                  <span className="text-xs text-text-muted font-light leading-relaxed">{site.note}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
