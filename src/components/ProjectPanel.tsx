import type { CSSProperties } from 'react';
import type { Pattern, Project } from '../data/projects';

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

const PlayGlyph = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
);

type Props = {
    project: Project;
    index: number;
    total: number;
    onPlay: () => void;
};

const ProjectPanel = ({ project, index, total, onPlay }: Props) => {
    const { visual } = project;
    const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

    return (
        <div
            className={`relative overflow-hidden sm:aspect-[16/10] ${project.image ? 'aspect-video' : 'aspect-[4/3]'}`}
            style={{ backgroundColor: visual.bg, color: visual.fg }}
        >
            {project.image ? (
                <img
                    src={project.image}
                    alt={`${project.title}: ${project.blurb}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <>
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-[0.16]"
                        style={patternStyle(visual.pattern, visual.accent)}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex flex-col gap-3">
                        <h3 className="font-serif text-[34px] sm:text-[44px] md:text-[56px] leading-[0.98] tracking-[-0.02em] max-w-[14ch]">
                            {project.title}
                        </h3>
                        <p className="text-[13px] md:text-[14px] leading-snug opacity-90 max-w-[44ch]">{project.blurb}</p>
                    </div>
                </>
            )}

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em]">
                <span className={project.image ? 'bg-black/55 text-white px-2 py-1' : ''}>{counter}</span>
                <span className={project.image ? 'bg-black/55 text-white px-2 py-1' : ''}>
                    {project.year}, {project.kind}
                </span>
            </div>

            {project.video && (
                <button
                    type="button"
                    onClick={onPlay}
                    aria-label="Play the HeadRoom presentation, about five minutes"
                    className="group absolute inset-0 flex items-center justify-center"
                >
                    <span className="flex items-center justify-center w-[68px] h-[68px] rounded-full bg-white/90 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
                        <span className="ml-0.5">
                            <PlayGlyph />
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
};

export default ProjectPanel;
