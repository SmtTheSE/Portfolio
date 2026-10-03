import { useRef } from 'react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const VIDEO_SRC = '/media/headroom-presentation.mp4';
const POSTER_SRC = '/media/headroom-poster.jpg';

const PlayIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
);

const HeadroomShowcase = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const open = () => {
        dialogRef.current?.showModal();
        videoRef.current?.play().catch(() => {});
    };

    const close = () => dialogRef.current?.close();

    return (
        <section id="showcase" className="py-16 md:py-20 px-6 md:px-12 w-full flex justify-center scroll-mt-[52px]">
            <div className="w-full max-w-5xl">
                <SectionHeader label="Showcase" />

                <Reveal className="border-y border-border-light py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-x-[81px] gap-y-10 items-center">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">
                                ADC Hackathon 2026 &middot; Neurodivergence
                            </span>
                            <span className="w-8 h-px bg-border-light" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-[28px] md:text-[32px] leading-[35px] font-light tracking-tight text-text-main">
                                HeadRoom
                            </h3>
                            <p className="text-[17px] leading-[26px] font-light text-text-muted">
                                &ldquo;An inclusive workspace for different ways of working.&rdquo; Our team, You Don&rsquo;t
                                Know Us, built HeadRoom in three days at RMIT&rsquo;s Accessibility Design Competition. It is a
                                workload tool designed ADHD-first, with calm single-step focus sessions and a workload
                                negotiation flow between employee and manager. This is the five-minute presentation of what we
                                built. We didn&rsquo;t place, but we&rsquo;re proud of it.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <button
                                type="button"
                                onClick={open}
                                className="liquid-pill inline-flex items-center gap-2 px-6 py-3 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity"
                            >
                                <PlayIcon size={12} />
                                Watch the product we built
                            </button>
                            <a
                                href="https://github.com/SmtTheSE/HeadRoom"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="liquid-pill inline-flex px-6 py-3 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity"
                            >
                                View on GitHub ↗
                            </a>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={open}
                        aria-label="Play the HeadRoom presentation, about five minutes"
                        className="group relative block w-full aspect-video overflow-hidden rounded-2xl border border-border-light bg-[#02205A] shadow-liquid"
                    >
                        <img
                            src={POSTER_SRC}
                            alt="HeadRoom presentation title slide: an inclusive workspace for different ways of working"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <span className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 text-text-main shadow-liquid-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                <span className="ml-0.5">
                                    <PlayIcon size={22} />
                                </span>
                            </span>
                        </span>
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] tracking-tight text-white">
                            4:59
                        </span>
                    </button>
                </Reveal>
            </div>

            <dialog
                ref={dialogRef}
                aria-label="HeadRoom presentation video"
                onClose={() => videoRef.current?.pause()}
                onClick={(e) => {
                    if (e.target === dialogRef.current) close();
                }}
                className="m-auto w-[92vw] max-w-5xl overflow-visible rounded-2xl bg-transparent p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm"
            >
                <div className="relative">
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close video"
                        className="absolute -top-12 right-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-text-main hover:bg-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        poster={POSTER_SRC}
                        controls
                        playsInline
                        preload="none"
                        className="block w-full aspect-video rounded-2xl bg-black"
                    />
                </div>
            </dialog>
        </section>
    );
};

export default HeadroomShowcase;
