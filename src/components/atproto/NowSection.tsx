import { motion } from 'framer-motion';
import { useNowStatus } from '../../hooks/useAtproto';
import { formatRelativeTime } from '../../lib/atproto/format';

/** Full Now section — local record with optional PDS override. */
export default function NowSection() {
  const { data, loading } = useNowStatus();

  return (
    <section id="now" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 05</span>
            <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
              Now <br className="hidden md:block" /> Status
            </h2>
          </div>
          <div className="w-8 h-px bg-border-light" />
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            A live status surface. Sourced from local portfolio data
            {data.source === 'pds' ? ', synced from an AT Protocol record on my PDS.' : ', ready to sync from my PDS.'}
          </p>
        </div>

        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-border-light bg-primary-bg"
          >
            <div className="px-6 py-5 border-b border-border-light flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${data.availableForWork ? 'bg-green-500' : 'bg-text-muted'}`} />
                <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">
                  {loading ? 'resolving…' : data.source === 'pds' ? 'pds_record' : 'local_record'}
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">
                updated {formatRelativeTime(data.updatedAt)}
              </span>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-8">
              <p className="text-xl md:text-2xl font-light tracking-tight text-text-main leading-snug">
                {data.status}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border-light border border-border-light">
                <div className="bg-primary-bg p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Focus</span>
                  <span className="text-xs font-medium tracking-wide text-text-main">{data.focus}</span>
                </div>
                <div className="bg-primary-bg p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Location</span>
                  <span className="text-xs font-medium tracking-wide text-text-main">{data.location}</span>
                </div>
                <div className="bg-primary-bg p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Availability</span>
                  <span className="text-xs font-medium tracking-wide text-text-main">
                    {data.availableForWork ? 'Open to opportunities' : 'Not seeking roles'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
