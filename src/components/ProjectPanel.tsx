import { useRef, type CSSProperties } from 'react';
import type { Pattern, Project } from '../data/projects';
import { EASE, gsap, hasFinePointer, prefersReducedMotion, useGSAP } from '../lib/gsap';

const patternStyle = (pattern: Pattern, color: string): CSSProperties => {
    switch (pattern) {
        case 'grid':
            return {
                backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
                backgroundSize: '36px 36px',
            };
        case 'dots':
            return {
                backgroundImage: `radial-gradient(${color} 1.6px, transparent 1.8px)`,
                backgroundSize: '24px 24px',
            };
        case 'rings':
            return {
                backgroundImage: `repeating-radial-gradient(circle at 82% 18%, ${color} 0 1px, transparent 1px 26px)`,
            };
        case 'stripes':
            return {
                backgroundImage: `repeating-linear-gradient(135deg, ${color} 0 1px, transparent 1px 16px)`,
            };
        case 'blocks':
            return {
                backgroundImage: `linear-gradient(${color} 0 0), linear-gradient(${color} 0 0)`,
                backgroundSize: '28% 40%, 18% 26%',
                backgroundPosition: '92% 12%, 78% 88%',
                backgroundRepeat: 'no-repeat',
            };
    }
};

const PlayGlyph = ({ size = 22 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
);

const LockGlyph = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="11" width="16" height="10" rx="1" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
);

/** What hovering a panel says. Clicking always opens the in-site preview. */
const actionFor = (project: Project): { label: string; icon: 'play' | 'arrow' } => {
    if (project.video) return { label: 'Watch the film', icon: 'play' };
    return { label: 'Preview', icon: 'arrow' };
};

type Props = {
    project: Project;
    index: number;
    total: number;
    onPlay: () => void;
    onPreview: () => void;
};

const ProjectPanel = ({ project, index, total, onPlay, onPreview }: Props) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const { visual } = project;
    const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    const action = actionFor(project);
    const hasImage = Boolean(project.image);
    const coverAlt = project.imageAlt ?? `${project.title}: ${project.blurb}`;

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root || !hasFinePointer() || prefersReducedMotion()) return;
            const visualEl = root.querySelector<HTMLElement>('[data-panel-visual]');
            const playBtn = root.querySelector<HTMLElement>('[data-play-btn]');

            const playX = playBtn ? gsap.quickTo(playBtn, 'x', { duration: 0.35, ease: 'power3.out' }) : null;
            const playY = playBtn ? gsap.quickTo(playBtn, 'y', { duration: 0.35, ease: 'power3.out' }) : null;
            const tiltX = gsap.quickTo(root, 'rotateX', { duration: 0.45, ease: 'power3.out' });
            const tiltY = gsap.quickTo(root, 'rotateY', { duration: 0.45, ease: 'power3.out' });
            gsap.set(root, { transformPerspective: 1100, transformStyle: 'preserve-3d' });

            const onEnter = () => {
                if (hasImage) {
                    gsap.to(root, {
                        y: -4,
                        boxShadow: '0 22px 44px -16px rgba(38, 20, 12, 0.45)',
                        duration: 0.55,
                        ease: EASE.editorial,
                        overwrite: 'auto',
                    });
                } else if (visualEl) {
                    gsap.to(visualEl, { scale: 1.03, duration: 0.75, ease: EASE.editorial, overwrite: 'auto' });
                }
                if (playBtn) {
                    gsap.to(playBtn, { scale: 1.1, duration: 0.38, ease: EASE.editorial, overwrite: 'auto' });
                }
            };

            const onMove = (e: PointerEvent) => {
                const rect = root.getBoundingClientRect();
                const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
                const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
                tiltY(relX * 2.4);
                tiltX(-relY * 2.4);
                if (playBtn && playX && playY) {
                    playX(relX * 16);
                    playY(relY * 16);
                }
            };

            const onLeave = () => {
                tiltX(0);
                tiltY(0);
                if (hasImage) {
                    gsap.to(root, {
                        y: 0,
                        boxShadow: '0 0px 0px 0px rgba(38, 20, 12, 0)',
                        duration: 0.65,
                        ease: EASE.editorial,
                        overwrite: 'auto',
                    });
                } else if (visualEl) {
                    gsap.to(visualEl, { scale: 1, duration: 0.75, ease: EASE.editorial, overwrite: 'auto' });
                }
                if (playBtn) {
                    gsap.to(playBtn, { x: 0, y: 0, scale: 1, duration: 0.65, ease: EASE.settle, overwrite: 'auto' });
                }
            };

            root.addEventListener('pointerenter', onEnter);
            root.addEventListener('pointermove', onMove, { passive: true });
            root.addEventListener('pointerleave', onLeave);
            return () => {
                root.removeEventListener('pointerenter', onEnter);
                root.removeEventListener('pointermove', onMove);
                root.removeEventListener('pointerleave', onLeave);
            };
        },
        { scope: rootRef },
    );

    const frame = `relative block w-full overflow-hidden text-left ${hasImage ? '' : 'aspect-[4/3] sm:aspect-[16/10]'}`;
    const frameStyle = {
        backgroundColor: visual.bg,
        color: visual.fg,
        ...(hasImage ? { aspectRatio: String(project.imageRatio ?? 16 / 9) } : {}),
    };
    const pill = action ? { 'data-cursor-pill': action.label, 'data-cursor-icon': action.icon } : {};
    // The text link in the pinned column is the accessible one; the panel is a mouse and touch shortcut.
    const shortcut = { tabIndex: -1, 'aria-hidden': true as const };

    const inner = (
        <>
            {project.image ? (
                <img
                    src={project.image}
                    alt={coverAlt}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain"
                />
            ) : (
                <>
                    <div
                        aria-hidden="true"
                        data-media
                        className="absolute inset-0 opacity-[0.16]"
                        style={patternStyle(visual.pattern, visual.accent)}
                    />
                    {project.internal ? (
                        <>
                            <div data-panel-visual className="absolute inset-0 flex items-center justify-center px-6 will-change-transform">
                                <h3 className="font-serif text-[40px] sm:text-[52px] md:text-[64px] leading-[1] tracking-[-0.02em] text-center">
                                    {project.title}
                                </h3>
                            </div>
                            <span className="absolute bottom-4 left-4 md:bottom-5 md:left-5 inline-flex items-center gap-2 border border-current px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em]">
                                <LockGlyph />
                                Private / internal
                            </span>
                        </>
                    ) : (
                        <div data-float className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex flex-col gap-3">
                            <h3 className="font-serif text-[34px] sm:text-[44px] md:text-[56px] leading-[0.98] tracking-[-0.02em] max-w-[14ch]">
                                {project.title}
                            </h3>
                            <p className="text-[13px] md:text-[14px] leading-snug opacity-90 max-w-[44ch]">{project.blurb}</p>
                        </div>
                    )}
                </>
            )}

            {/* Screenshot panels stay completely clear so the whole product is visible. */}
            {!hasImage && (
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em]">
                    <span>{counter}</span>
                    <span>
                        {project.year}, {project.kind}
                    </span>
                </div>
            )}

            {project.video && (
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span
                        data-play-btn
                        className="flex items-center justify-center w-[68px] h-[68px] rounded-full bg-white/90 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)] will-change-transform"
                    >
                        <span className="ml-0.5">
                            <PlayGlyph />
                        </span>
                    </span>
                </span>
            )}
        </>
    );

    return (
        <div ref={rootRef} data-curtain className="will-change-[clip-path]">
            <button type="button" onClick={project.video ? onPlay : onPreview} className={frame} style={frameStyle} {...pill} {...shortcut}>
                {inner}
            </button>
        </div>
    );
};

export default ProjectPanel;
