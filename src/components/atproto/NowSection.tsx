import { motion } from 'framer-motion';
import { useNowStatus, useTealListening } from '../../hooks/useAtproto';
import { formatRelativeTime } from '../../lib/atproto/format';

/** Full Now section — status from PDS/local, plus Teal listening when available. */
export default function NowSection() {
  const { data, loading } = useNowStatus();
  const { data: listening, loading: listeningLoading } = useTealListening();

  return (
    <section id="now" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 05</span>
            <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
              Now
            </h2>
          </div>
          <div className="w-8 h-px bg-border-light" />
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            What I am working on right now
            {data.source === 'pds' ? ', read from my PDS.' : '.'}
            {listening ? ' Listening data comes from Teal records when present.' : ''}
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
                  {loading ? 'loading…' : data.source === 'pds' ? 'from pds' : 'local'}
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
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Work</span>
                  <span className="text-xs font-medium tracking-wide text-text-main">
                    {data.availableForWork ? 'Open to opportunities' : 'Not seeking roles'}
                  </span>
                </div>
              </div>

              {(listening || listeningLoading) && (
                <div className="border border-border-light p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Listening</span>
                  {listeningLoading && !listening && (
                    <span className="text-xs text-text-muted">Checking Teal…</span>
                  )}
                  {listening && (
                    <>
                      <span className="text-sm font-medium tracking-tight text-text-main">
                        {listening.trackName}
                        {listening.artists.length > 0 ? ` — ${listening.artists.join(', ')}` : ''}
                      </span>
                      {listening.releaseName && (
                        <span className="text-xs text-text-muted">{listening.releaseName}</span>
                      )}
                      {listening.playedTime && (
                        <span className="text-[9px] uppercase tracking-[0.15em] font-mono text-text-muted">
                          {formatRelativeTime(listening.playedTime)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
