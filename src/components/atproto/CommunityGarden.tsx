import { motion } from 'framer-motion';
import { bskyProfileUrl } from '../../config/atproto';
import { useCommunityGarden } from '../../hooks/useAtproto';
import SectionHeader from '../SectionHeader';

export default function CommunityGarden() {
  const { people, sites } = useCommunityGarden();

  return (
    <section id="garden" className="py-16 md:py-20 px-6 md:px-12 scroll-mt-[52px] w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <SectionHeader label="Community Garden" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-3">
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            People and sites I follow closely. Profiles load live from the Bluesky API: a curated links garden, not an iframe.
          </p>
        </div>

        <div className="md:col-span-8 flex flex-col gap-10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted mb-4 block">People</span>
            <div className="border border-border-light divide-y divide-border-light overflow-hidden">
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
                    className="flex gap-4 p-5 hover:bg-secondary-bg/50 transition-colors"
                  >
                    {person.profile?.avatar ? (
                      <img
                        src={person.profile.avatar}
                        alt=""
                        className="w-10 h-10 object-cover grayscale rounded-full border border-border-light shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-border-light shrink-0" />
                    )}
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-medium tracking-tight text-text-main">
                        {person.profile?.displayName || person.handle}
                      </span>
                      <span className="text-[11px] text-text-muted">@{person.handle}</span>
                      <p className="text-xs text-text-muted font-light leading-relaxed pt-1">{person.note}</p>
                    </div>
                  </motion.a>
                ))}
            </div>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted mb-4 block">Sites</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border-light p-5 flex flex-col gap-2 hover:bg-secondary-bg/40 transition-colors"
                >
                  <span className="text-sm font-medium tracking-tight text-text-main">{site.title}</span>
                  <span className="text-xs text-text-muted font-light leading-relaxed">{site.note}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
