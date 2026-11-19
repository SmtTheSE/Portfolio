import { useRef } from 'react';
import { EASE, goToHash, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';

const Footer = () => {
    const rootRef = useRef<HTMLElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root || prefersReducedMotion()) return;
            const rule = root.querySelector<HTMLElement>('[data-footer-rule]');
            const items = gsap.utils.toArray<HTMLElement>('[data-footer-item]', root);

            if (rule) gsap.set(rule, { scaleX: 0 });
            if (items.length) gsap.set(items, { opacity: 0, y: 14 });

            ScrollTrigger.create({
                trigger: root,
                start: 'top 96%',
                once: true,
                onEnter: () => {
                    if (rule) gsap.to(rule, { scaleX: 1, duration: 0.95, ease: EASE.curtain });
                    if (items.length) {
                        gsap.to(items, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.08, ease: EASE.editorial });
                    }
                },
            });
        },
        { scope: rootRef },
    );

    const nudgeArrow = (up: boolean) => {
        if (!arrowRef.current || prefersReducedMotion()) return;
        gsap.to(arrowRef.current, {
            y: up ? -4 : 0,
            duration: 0.28,
            ease: EASE.editorial,
            overwrite: 'auto',
        });
    };

    return (
        <footer ref={rootRef} className="px-5 md:px-7 pb-8 pt-4">
            <div className="relative pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mono-label">
                <span aria-hidden="true" data-footer-rule className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line origin-left" />
                <span data-footer-item>&copy; {new Date().getFullYear()} Sitt Min Thar</span>
                <span data-footer-item>Ho Chi Minh City, Vietnam</span>
                <a
                    data-footer-item
                    href="#top"
                    onPointerEnter={() => nudgeArrow(true)}
                    onPointerLeave={() => nudgeArrow(false)}
                    onFocus={() => nudgeArrow(true)}
                    onBlur={() => nudgeArrow(false)}
                    onClick={(e) => {
                        if (goToHash('#top')) e.preventDefault();
                    }}
                    className="inline-flex items-center gap-1 py-3 -my-3 hover:text-fg transition-colors w-fit"
                >
                    <span>Back to top</span>
                    <span ref={arrowRef} aria-hidden="true" className="inline-block will-change-transform">
                        &uarr;
                    </span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
