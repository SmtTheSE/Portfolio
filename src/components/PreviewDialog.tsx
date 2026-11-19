import { useEffect, useId, useRef, useState } from 'react';
import { shotsFor, type Project } from '../data/projects';

type Props = {
    project: Project | null;
    onClose: () => void;
};

const PreviewDialog = ({ project, onClose }: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const [index, setIndex] = useState(0);
    const shots = project ? shotsFor(project) : [];
    const shot = shots[index];

    useEffect(() => {
        setIndex(0);
    }, [project?.id]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (project && !dialog.open) dialog.showModal();
        if (!project && dialog.open) dialog.close();
    }, [project]);

    const step = (delta: number) => {
        if (shots.length < 2) return;
        setIndex((current) => (current + delta + shots.length) % shots.length);
    };

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={(event) => {
                if (event.target === dialogRef.current) dialogRef.current?.close();
            }}
            onKeyDown={(event) => {
                if (event.target instanceof HTMLVideoElement) return;
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    step(1);
                } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    step(-1);
                }
            }}
            className="m-auto w-[min(92vw,64rem)] max-h-[92vh] overflow-y-auto border border-line bg-bg p-0 text-fg shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        >
            {project && (
                <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
                        <div className="min-w-0">
                            <p className="mono-label">
                                {project.year}, {project.kind}
                            </p>
                            <h2 id={titleId} className="mt-1 font-serif text-[28px] leading-[1.05] tracking-[-0.03em] md:text-[34px]">
                                {project.title}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => dialogRef.current?.close()}
                            aria-label="Close preview"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-fg hover:bg-fg hover:text-ink"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {shot ? (
                        <div className="relative bg-ink">
                            <img src={shot.src} alt={shot.alt} className="mx-auto block max-h-[min(52vh,520px)] w-full object-contain" />
                            {shots.length > 1 && (
                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-3">
                                    <button
                                        type="button"
                                        onClick={() => step(-1)}
                                        aria-label="Previous screenshot"
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-fg text-ink"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M15 18 9 12l6-6" />
                                        </svg>
                                    </button>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg" aria-live="polite">
                                        {index + 1} / {shots.length}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => step(1)}
                                        aria-label="Next screenshot"
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-fg text-ink"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className="flex min-h-[240px] flex-col items-start justify-end gap-3 px-5 py-8 md:px-8"
                            style={{ backgroundColor: project.visual.bg, color: project.visual.fg }}
                        >
                            <p className="font-mono text-[11px] uppercase tracking-[0.08em]">No public screenshot</p>
                            <p className="max-w-[46ch] font-serif text-[28px] leading-[1.05] tracking-[-0.03em] md:text-[36px]">{project.blurb}</p>
                            <p className="max-w-[52ch] text-[14px] leading-[1.5] opacity-90">
                                There is no live deployment and no screenshot in the repository. This panel is a description of the work, not a picture of it.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-4 px-5 py-5 md:px-6">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
                            {project.links?.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[44px] items-center text-fg underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg"
                                >
                                    {link.label} &#8599;
                                </a>
                            ))}
                            {project.internal && (
                                <span className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="4" y="11" width="16" height="10" rx="1" />
                                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                                    </svg>
                                    Private / internal project
                                </span>
                            )}
                        </div>
                        <p className="max-w-[68ch] text-[14px] leading-[1.55] text-fg/90">{project.desc}</p>
                        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
                            {project.tech.map((item) => (
                                <li key={item} className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </dialog>
    );
};

export default PreviewDialog;
