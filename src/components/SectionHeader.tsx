import { useRef } from 'react';
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';

/** Sub-heading used inside the Lab: a light title over a hairline. */
const SectionHeader = ({ label }: { label: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = ref.current;
            if (!root || prefersReducedMotion()) return;
            const title = root.querySelector<HTMLElement>('[data-sh-title]');
            const rule = root.querySelector<HTMLElement>('[data-sh-rule]');
            const split = title ? SplitText.create(title, { type: 'lines', mask: 'lines', aria: 'auto' }) : null;

            if (split) gsap.set(split.lines, { yPercent: 112 });
            if (rule) gsap.set(rule, { scaleX: 0 });

            ScrollTrigger.create({
                trigger: root,
                start: 'top 88%',
                once: true,
                onEnter: () => {
                    if (split) gsap.to(split.lines, { yPercent: 0, duration: 0.85, ease: EASE.editorial });
                    if (rule) gsap.to(rule, { scaleX: 1, duration: 0.95, ease: EASE.curtain });
                },
            });

            return () => split?.revert();
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className="relative flex items-baseline justify-between pb-3 mb-8 md:mb-10">
            <h2 data-sh-title className="text-[22px] md:text-[26px] font-light tracking-[-0.03em] text-fg">
                {label}
            </h2>
            <span aria-hidden="true" data-sh-rule className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line origin-left" />
        </div>
    );
};

export default SectionHeader;
