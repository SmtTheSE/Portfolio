import Reveal from '../Reveal';
import { useNowStatus, useTealListening } from '../../hooks/useAtproto';
import { formatRelativeTime } from '../../lib/atproto/format';
import SectionHeader from '../SectionHeader';

/** Full Now section — status from PDS/local, plus Teal listening when available. */
export default function NowSection() {
  const { data, loading } = useNowStatus();
  const { data: listening, loading: listeningLoading } = useTealListening();

  return (
    <section id="now" className="py-16 md:py-20 px-6 md:px-12 scroll-mt-[52px] w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <SectionHeader label="Now" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-3">
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            What I am working on right now
            {data.source === 'pds' ? ', read from my PDS.' : '.'}
            {listening ? ' Listening data comes from Teal records when present.' : ''}
          </p>
        </div>

        <div className="md:col-span-8">
          <Reveal className="bg-white border border-border-light overflow-hidden">
            <div className="px-6 py-5 border-b border-border-light/70 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${data.availableForWork ? 'bg-green-500' : 'bg-text-muted'}`} />
                <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">
                  {loading ? 'loading…' : data.source === 'pds' ? 'from pds' : 'local'}
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">
                updated {formatRelativeTime(data.updatedAt)}
              </span>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-6">
              <p className="text-xl md:text-2xl font-light tracking-tight text-text-main leading-snug">
                {data.status}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-secondary-bg/70 p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">Focus</span>
                  <span className="text-xs font-medium tracking-wide text-text-main">{data.focus}</span>
                </div>
                <div className="rounded-2xl bg-secondary-bg/70 p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">Location</span>
                  <span className="text-xs font-medium tracking-wide text-text-main">{data.location}</span>
                </div>
                <div className="rounded-2xl bg-secondary-bg/70 p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">Work</span>
                  <span className="text-xs font-medium tracking-wide text-text-main">
                    {data.availableForWork ? 'Open to opportunities' : 'Software Engineer · Ad Venture Studio'}
                  </span>
                </div>
              </div>

              {(listening || listeningLoading) && (
                <div className="rounded-2xl bg-secondary-bg/70 p-5 flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">Listening</span>
                  {listeningLoading && !listening && (
                    <span className="text-xs text-text-muted">Checking Teal…</span>
                  )}
                  {listening && (
                    <>
                      <span className="text-sm font-medium tracking-tight text-text-main">
                        {listening.trackName}
                        {listening.artists.length > 0 ? ` · ${listening.artists.join(', ')}` : ''}
                      </span>
                      {listening.releaseName && (
                        <span className="text-xs text-text-muted">{listening.releaseName}</span>
                      )}
                      {listening.playedTime && (
                        <span className="text-[9px] uppercase tracking-[0.15em] text-text-muted">
                          {formatRelativeTime(listening.playedTime)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
      </div>
    </section>
  );
}
