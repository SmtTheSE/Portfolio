import { useRef, useState } from 'react';
import { projects, type Project } from '../data/projects';
import ProjectPanel from './ProjectPanel';
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';
import { useMediaQuery } from '../hooks/useMediaQuery';

const VIDEO_SRC = '/media/headroom-presentation.mp4';
const VIDEO_POSTER = '/media/headroom-poster.jpg';

const ProjectInfo = ({ project, onPlay }: { project: Project; onPlay: () => void }) => (
    <div className="flex flex-col gap-5">
        <p data-in className="text-[14px] leading-[1.55] text-fg/90 max-w-[44ch]">
            {project.desc}
        </p>

        <ul data-in className="flex flex-wrap gap-1.5" aria-label="Built with">
            {project.tech.map((t) => (
                <li key={t} className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted border border-line px-2 py-1">
                    {t}
                </li>
            ))}
        </ul>

        <div data-in className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
            {project.video && (
                <button
                    type="button"
                    data-cursor="Play"
                    onClick={onPlay}
                    className="inline-flex items-center gap-2 min-h-[44px] -my-2 text-fg underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg transition-colors"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
                    </svg>
                    Watch the product we built
                </button>
            )}
            {project.links?.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[44px] -my-2 text-fg underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg transition-colors"
                >
                    {link.label} &#8599;
                </a>
            ))}
            {project.nda && (
                <span className="inline-flex items-center gap-2 min-h-[44px] -my-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="4" y="11" width="16" height="10" rx="1" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    Under NDA
                </span>
            )}
        </div>
    </div>
);

const SelectedWork = () => {
    const rootRef = useRef<HTMLElement>(null);
    const textRefs = useRef<Array<HTMLDivElement | null>>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [active, setActive] = useState(0);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    // Which project is in the middle of the screen, plus parallax on each panel's visuals.
    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            const reduced = prefersReducedMotion();
            const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', root);

            panels.forEach((panel, i) => {
                ScrollTrigger.create({
                    trigger: panel,
                    start: 'top 55%',
                    end: 'bottom 55%',
                    onToggle: (self) => {
                        if (self.isActive) setActive(i);
                    },
                });

                if (reduced) return;
                panel.querySelectorAll('[data-media]').forEach((media) => {
                    gsap.fromTo(
                        media,
                        { yPercent: -5, scale: 1.1 },
                        {
                            yPercent: 5,
                            ease: 'none',
                            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
                        },
                    );
                });
                panel.querySelectorAll('[data-float]').forEach((el) => {
                    gsap.fromTo(
                        el,
                        { y: 26 },
                        {
                            y: -26,
                            ease: 'none',
                            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
                        },
                    );
                });
            });
        },
        { scope: rootRef },
    );

    // Swap the sticky text and dim the panels that aren't current (desktop only).
    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', root);
            const blocks = textRefs.current;

            if (!isDesktop) {
                gsap.set(panels, { clearProps: 'opacity' });
                return;
            }

            // Kill everything still pending first. overwrite:'auto' ignores a fade-in that is still waiting out its
            // delay, so a fast scroll would otherwise leave an earlier project's text un-hidden on top of the current one.
            gsap.killTweensOf(blocks.flatMap((b) => (b ? [b, ...Array.from(b.querySelectorAll('[data-in]'))] : [])));

            blocks.forEach((block, i) => {
                if (!block) return;
                if (i === active) {
                    gsap.set(block, { autoAlpha: 0 });
                    gsap.to(block, {
                        autoAlpha: 1,
                        duration: 0.3,
                        delay: 0.16,
                        overwrite: 'auto',
                        onComplete: () => {
                            blocks.forEach((other, k) => {
                                if (other && k !== active) gsap.set(other, { autoAlpha: 0 });
                            });
                        },
                    });
                    gsap.fromTo(
                        block.querySelectorAll('[data-in]'),
                        { y: 22, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, delay: 0.16, ease: 'power3.out', overwrite: 'auto' },
                    );
                } else {
                    gsap.to(block, { autoAlpha: 0, duration: 0.16, overwrite: 'auto' });
                }
            });

            panels.forEach((panel, i) => {
                gsap.to(panel, { opacity: i === active ? 1 : 0.4, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
            });
        },
        { dependencies: [active, isDesktop], scope: rootRef },
    );

    const openVideo = () => {
        dialogRef.current?.showModal();
        videoRef.current?.play().catch(() => {});
    };
    const closeVideo = () => dialogRef.current?.close();

    return (
        <section ref={rootRef} id="work" aria-label="Selected work" className="relative scroll-mt-0 md:grid md:grid-cols-[minmax(300px,31%)_1fr]">
            {/* Desktop: sticky text column that swaps with the active project */}
            <div className="hidden md:block">
                <div className="sticky top-0 h-screen px-7 pt-[110px] pb-10 flex flex-col">
                    <div className="flex items-baseline justify-between">
                        <h2 className="text-[30px] leading-none font-light tracking-[-0.03em] text-fg">Selected work</h2>
                        <span className="mono-label" aria-hidden="true">
                            {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </span>
                    </div>

                    <div className="relative mt-5 flex-1">
                        {projects.map((p, i) => (
                            <div
                                key={p.id}
                                ref={(el) => {
                                    textRefs.current[i] = el;
                                }}
                                aria-hidden={active !== i}
                                className={`absolute inset-0 flex flex-col justify-between ${i === 0 ? '' : 'invisible opacity-0'}`}
                            >
                                <h3 data-in className="text-[30px] leading-[1.08] font-light tracking-[-0.03em] text-muted max-w-[16ch]">
                                    {p.title}
                                </h3>
                                <ProjectInfo project={p} onPlay={openVideo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Panels: one column on every size; on mobile each carries its own text */}
            <div className="px-5 md:px-0 md:pr-3 pt-24 md:pt-[68px] pb-10 flex flex-col gap-10 md:gap-2">
                <h2 className="md:hidden text-[30px] leading-none font-light tracking-[-0.03em] text-fg -mb-4">
                    Selected work
                </h2>
                {projects.map((p, i) => (
                    <div key={p.id} data-panel data-index={i} className={i === 0 ? '' : 'md:opacity-40'}>
                        <ProjectPanel project={p} index={i} total={projects.length} onPlay={openVideo} />
                        <div className="md:hidden pt-5 flex flex-col gap-4">
                            {p.image && (
                                <span className="mono-label">
                                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}, {p.year}, {p.kind}
                                </span>
                            )}
                            <h3 className="text-[26px] leading-[1.1] font-light tracking-[-0.03em] text-muted">{p.title}</h3>
                            <ProjectInfo project={p} onPlay={openVideo} />
                        </div>
                    </div>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                aria-label="HeadRoom presentation video"
                onClose={() => videoRef.current?.pause()}
                onClick={(e) => {
                    if (e.target === dialogRef.current) closeVideo();
                }}
                className="m-auto w-[92vw] max-w-5xl overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
            >
                <div className="relative">
                    <button
                        type="button"
                        onClick={closeVideo}
                        aria-label="Close video"
                        className="absolute -top-12 right-0 flex items-center justify-center w-10 h-10 rounded-full bg-fg text-ink hover:opacity-80 transition-opacity"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        poster={VIDEO_POSTER}
                        controls
                        playsInline
                        preload="none"
                        className="block w-full aspect-video bg-black"
                    />
                </div>
            </dialog>
        </section>
    );
};

export default SelectedWork;
