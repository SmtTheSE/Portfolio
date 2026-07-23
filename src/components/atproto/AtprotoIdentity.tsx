import { motion } from 'framer-motion';
import { atprotoConfig, bskyProfileUrl } from '../../config/atproto';
import { useAtprotoProfile } from '../../hooks/useAtproto';
import { formatCompactCount, shortenDid } from '../../lib/atproto/format';
import { hasAtprotoActor } from '../../lib/atproto/client';

export default function AtprotoIdentity() {
  const { data: profile, loading, error } = useAtprotoProfile();
  const configured = hasAtprotoActor();

  return (
    <section id="identity" className="px-6 md:px-12 w-full border-t border-border-light flex justify-center bg-secondary-bg/40">
      <div className="w-full max-w-5xl py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">at://protocol</span>
            <h2 className="text-sm uppercase tracking-[0.15em] font-medium text-text-main">Decentralized Identity</h2>
          </div>

          {!configured && (
            <p className="text-xs text-text-muted font-light max-w-md leading-relaxed">
              Set <code className="font-mono text-[11px]">VITE_ATPROTO_HANDLE</code> to your Bluesky handle to unlock
              live profile, feed, and network data from your PDS.
            </p>
          )}

          {configured && loading && (
            <p className="text-xs text-text-muted font-mono uppercase tracking-widest">Resolving DID…</p>
          )}

          {configured && error && (
            <p className="text-xs text-text-muted font-light">
              Could not resolve <span className="font-mono">{atprotoConfig.actor}</span>. Check the handle and try again.
            </p>
          )}

          {profile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row sm:items-center gap-5"
            >
              <div className="flex items-center gap-3">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.displayName}
                    className="w-10 h-10 object-cover border border-border-light grayscale"
                  />
                ) : (
                  <div className="w-10 h-10 border border-border-light bg-primary-bg" />
                )}
                <div className="flex flex-col gap-0.5">
                  <a
                    href={bskyProfileUrl(profile.handle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium tracking-tight hover:opacity-60 transition-opacity"
                  >
                    @{profile.handle}
                  </a>
                  <span className="text-[10px] font-mono text-text-muted" title={profile.did}>
                    {shortenDid(profile.did)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.15em] text-text-muted font-mono">
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-main text-sm font-sans font-medium tracking-normal normal-case">
                    {formatCompactCount(profile.followersCount)}
                  </span>
                  <span>followers</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-main text-sm font-sans font-medium tracking-normal normal-case">
                    {formatCompactCount(profile.followsCount)}
                  </span>
                  <span>following</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-main text-sm font-sans font-medium tracking-normal normal-case">
                    {formatCompactCount(profile.postsCount)}
                  </span>
                  <span>posts</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
