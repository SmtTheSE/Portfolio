import { useEffect, useRef, useState } from 'react';
import { projects, type Project } from '../data/projects';
import ProjectPanel from './ProjectPanel';

const VIDEO_SRC = '/media/headroom-presentation.mp4';
const VIDEO_POSTER = '/media/headroom-poster.jpg';

const ProjectInfo = ({ project, onPlay }: { project: Project; onPlay: () => void }) => (
    <div className="flex flex-col gap-5">
        <p className="text-[14px] leading-[1.55] text-fg/90 max-w-[44ch]">{project.desc}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
            {project.tech.map((t) => (
                <li key={t} className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted border border-line px-2 py-1">
                    {t}
                </li>
            ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
            {project.video && (
                <button
                    type="button"
                    onClick={onPlay}
                    className="inline-flex items-center gap-2 min-h-[44px] -my-2 text-fg underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg transition-colors"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
                    </svg>
                    Watch the product we built
                </button>
            )}
            {project.link && (
                <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[44px] -my-2 text-fg underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg transition-colors"
                >
                    {project.link.label} &#8599;
                </a>
            )}
        </div>
    </div>
);

const SelectedWork = () => {
    const [active, setActive] = useState(0);
    const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
                }
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
        );
        panelRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const openVideo = () => {
        dialogRef.current?.showModal();
        videoRef.current?.play().catch(() => {});
    };
    const closeVideo = () => dialogRef.current?.close();

    return (
        <section id="work" aria-label="Selected work" className="relative scroll-mt-0 md:grid md:grid-cols-[minmax(300px,31%)_1fr]">
            {/* Desktop: sticky text column that swaps with the active project */}
            <div className="hidden md:block">
                <div className="sticky top-0 h-screen px-7 pt-[110px] pb-10 flex flex-col">
                    <h2 className="text-[30px] leading-none font-light tracking-[-0.03em] text-fg">Selected work</h2>

                    <div className="relative mt-5 flex-1">
                        {projects.map((p, i) => (
                            <div
                                key={p.id}
                                aria-hidden={active !== i}
                                className={`absolute inset-0 flex flex-col justify-between transition-[opacity,visibility] ${
                                    active === i ? 'opacity-100 visible duration-500 delay-200' : 'opacity-0 invisible duration-200'
                                }`}
                            >
                                <h3 className="text-[30px] leading-[1.08] font-light tracking-[-0.03em] text-muted max-w-[16ch]">
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
                    <div
                        key={p.id}
                        ref={(el) => {
                            panelRefs.current[i] = el;
                        }}
                        data-index={i}
                        className={`transition-opacity duration-500 ${active === i ? 'md:opacity-100' : 'md:opacity-40'}`}
                    >
                        <ProjectPanel project={p} index={i} total={projects.length} onPlay={openVideo} />
                        <div className="md:hidden pt-5 flex flex-col gap-4">
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
