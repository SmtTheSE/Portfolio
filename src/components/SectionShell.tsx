import type { ReactNode } from 'react';

type ShellProps = {
    id: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
};

/** Left label column + right content column, matching the Selected Work grid. */
export const SectionShell = ({ id, title, subtitle, children }: ShellProps) => (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 px-5 md:px-7 py-20 md:py-32">
        <div className="md:grid md:grid-cols-[minmax(300px,31%)_1fr] md:gap-x-0">
            <header className="mb-10 md:mb-0">
                <h2 id={`${id}-title`} className="text-[30px] md:text-[34px] leading-[1.05] font-light tracking-[-0.03em] text-fg">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-[30px] md:text-[34px] leading-[1.05] font-light tracking-[-0.03em] text-muted">{subtitle}</p>
                )}
            </header>
            <div className="min-w-0">{children}</div>
        </div>
    </section>
);

export const GroupLabel = ({ children }: { children: ReactNode }) => (
    <p className="mono-label pb-4 pt-2">({children})</p>
);

type RowProps = {
    label: ReactNode;
    children: ReactNode;
};

/** A hairline-separated row: label on the left, description on the right. */
export const Row = ({ label, children }: RowProps) => (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(130px,32%)_1fr] gap-x-6 gap-y-1.5 border-t border-line py-5">
        <div className="text-[14px] leading-[1.4] text-fg">{label}</div>
        <div className="text-[14px] leading-[1.55] text-fg/90 min-w-0">{children}</div>
    </div>
);

export const Muted = ({ children }: { children: ReactNode }) => <span className="text-muted">{children}</span>;

export const TextLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block py-2 -my-2 text-fg underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg transition-colors"
    >
        {children}
    </a>
);
