import { useRef, type ReactNode } from 'react';
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';

type ShellProps = {
    id: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
};

/** Left label column + right content column, matching the Selected Work grid. */
export const SectionShell = ({ id, title, subtitle, children }: ShellProps) => {
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const root = ref.current;
            if (!root || prefersReducedMotion()) return;

            // Masked SplitText editorial line reveal for section headings.
            const heads = gsap.utils.toArray<HTMLElement>('[data-head]', root);
            const splits: SplitText[] = [];
            const lines: Element[] = [];

            heads.forEach((el) => {
                const split = SplitText.create(el, { type: 'lines', mask: 'lines', aria: 'auto' });
                splits.push(split);
                lines.push(...split.lines);
            });

            if (lines.length) {
                gsap.set(lines, { yPercent: 112 });
                ScrollTrigger.create({
                    trigger: root,
                    start: 'top 82%',
                    once: true,
                    onEnter: () =>
                        gsap.to(lines, {
                            yPercent: 0,
                            duration: 0.95,
                            stagger: 0.1,
                            ease: EASE.editorial,
                        }),
                });
            }

            const rows = gsap.utils.toArray<HTMLElement>('[data-row]', root);
            const rules = gsap.utils.toArray<HTMLElement>('[data-rule]', root);
            if (rules.length) {
                gsap.set(rules, { scaleX: 0 });
            }
            if (rows.length) {
                gsap.set(rows, { opacity: 0, y: 24 });
                ScrollTrigger.batch(rows, {
                    start: 'top 92%',
                    once: true,
                    onEnter: (batch) => {
                        gsap.to(batch, { opacity: 1, y: 0, duration: 0.85, stagger: 0.085, ease: EASE.editorial });
                        const batchRules = batch
                            .map((el) => el.querySelector<HTMLElement>('[data-rule]'))
                            .filter((el): el is HTMLElement => Boolean(el));
                        if (batchRules.length) {
                            gsap.to(batchRules, { scaleX: 1, duration: 0.95, stagger: 0.085, ease: EASE.curtain });
                        }
                    },
                });
            }

            return () => {
                splits.forEach((s) => s.revert());
            };
        },
        { scope: ref },
    );

    return (
        <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 px-5 md:px-7 py-20 md:py-32">
            <div className="md:grid md:grid-cols-[minmax(300px,31%)_1fr] md:gap-x-0">
                <header className="mb-10 md:mb-0">
                    <h2 data-head id={`${id}-title`} className="text-[30px] md:text-[34px] leading-[1.08] font-light tracking-[-0.03em] text-fg">
                        {title}
                    </h2>
                    {subtitle && (
                        <p data-head className="text-[30px] md:text-[34px] leading-[1.08] font-light tracking-[-0.03em] text-muted">
                            {subtitle}
                        </p>
                    )}
                </header>
                <div className="min-w-0">{children}</div>
            </div>
        </section>
    );
};

export const GroupLabel = ({ children }: { children: ReactNode }) => (
    <p data-row className="mono-label pb-4 pt-2">({children})</p>
);

type RowProps = {
    label: ReactNode;
    children: ReactNode;
};

/** A hairline-separated row: label on the left, description on the right. */
export const Row = ({ label, children }: RowProps) => (
    <div data-row className="relative grid grid-cols-1 sm:grid-cols-[minmax(130px,32%)_1fr] gap-x-6 gap-y-1.5 py-5">
        <span aria-hidden="true" data-rule className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line origin-left" />
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

/** A more visible in-copy link for featured names such as BeeKrowd. */
export const FeaturedLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-win-sun underline decoration-win-sun underline-offset-[5px] hover:text-fg hover:decoration-fg transition-colors"
    >
        {children}
    </a>
);
