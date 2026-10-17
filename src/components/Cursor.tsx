import { useRef } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion, useGSAP } from '../lib/gsap';

/** Label for a link or button that doesn't set data-cursor itself. */
const autoLabel = (el: Element): string => {
    if (el instanceof HTMLAnchorElement) {
        if (el.hasAttribute('download')) return 'Download';
        if (el.href.startsWith('mailto:')) return 'Email';
        if (el.target === '_blank') return 'Open';
    }
    return '';
};

const ICONS: Record<string, string> = {
    play: '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"/></svg>',
    arrow: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    lock: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
};

/**
 * A flat square that trails the real cursor, with a small label for what's under it.
 * The native cursor stays (grab hand on windows, pointer on links); this only adds to it.
 * Over a product (data-cursor-pill) the native cursor is hidden and a frosted pill takes its place.
 */
const Cursor = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const chipRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const pillIconRef = useRef<HTMLSpanElement>(null);
    const pillLabelRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            const dot = dotRef.current;
            const chip = chipRef.current;
            const ripple = rippleRef.current;
            const pill = pillRef.current;
            const pillIcon = pillIconRef.current;
            const pillLabel = pillLabelRef.current;
            if (!root || !dot || !chip || !ripple || !pill || !pillIcon || !pillLabel) return;
            if (!hasFinePointer() || prefersReducedMotion()) return;

            gsap.set(root, { autoAlpha: 0 });
            gsap.set(chip, { autoAlpha: 0, scale: 0.8, transformOrigin: '0% 0%' });
            gsap.set(ripple, { autoAlpha: 0 });
            gsap.set(pill, { autoAlpha: 0, xPercent: -50, yPercent: -50, scale: 0.85 });

            const xTo = gsap.quickTo(root, 'x', { duration: 0.32, ease: 'power3' });
            const yTo = gsap.quickTo(root, 'y', { duration: 0.32, ease: 'power3' });
            const pillXTo = gsap.quickTo(pill, 'x', { duration: 0.16, ease: 'power3' });
            const pillYTo = gsap.quickTo(pill, 'y', { duration: 0.16, ease: 'power3' });

            let label = '';
            let interactive = false;
            let pressed = false;
            let shown = false;
            let inPill = false;
            let lastX = 0;
            let lastY = 0;

            const setPill = (el: Element | null) => {
                const on = Boolean(el);
                if (on) {
                    pillLabel.textContent = el!.getAttribute('data-cursor-pill') ?? '';
                    pillIcon.innerHTML = ICONS[el!.getAttribute('data-cursor-icon') ?? ''] ?? '';
                }
                if (on === inPill) return;
                inPill = on;
                document.documentElement.classList.toggle('pill-cursor', on);
                if (on) {
                    gsap.set(pill, { x: lastX, y: lastY });
                    gsap.to(pill, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'power3.out', overwrite: 'auto' });
                    gsap.to(root, { autoAlpha: 0, duration: 0.15, overwrite: 'auto' });
                } else {
                    gsap.to(pill, { autoAlpha: 0, scale: 0.85, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });
                    if (shown) gsap.to(root, { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
                }
            };

            const render = () => {
                const showChip = label !== '';
                chip.textContent = pressed && label === 'Drag' ? 'Dragging' : label;
                gsap.to(chip, { autoAlpha: showChip ? 1 : 0, scale: showChip ? 1 : 0.8, duration: 0.22, ease: 'power3.out', overwrite: 'auto' });
                const dotScale = pressed ? 0.7 : showChip ? 1.25 : interactive ? 2.4 : 1;
                gsap.to(dot, { scale: dotScale, opacity: interactive && !showChip ? 0.55 : 1, duration: 0.25, ease: 'power3.out', overwrite: 'auto' });
            };

            const onMove = (e: PointerEvent) => {
                if (e.pointerType !== 'mouse') return;
                lastX = e.clientX;
                lastY = e.clientY;
                if (!shown) {
                    shown = true;
                    gsap.set(root, { x: e.clientX, y: e.clientY });
                    if (!inPill) gsap.to(root, { autoAlpha: 1, duration: 0.25 });
                }
                xTo(e.clientX);
                yTo(e.clientY);
                if (inPill) {
                    pillXTo(e.clientX);
                    pillYTo(e.clientY);
                }
            };

            const onOver = (e: PointerEvent) => {
                const target = e.target as Element | null;
                const tagged = target?.closest('[data-cursor]');
                setPill(target?.closest('[data-cursor-pill]') ?? null);
                const control = target?.closest('a, button, summary, [role="button"]');
                label = tagged ? tagged.getAttribute('data-cursor') ?? '' : control ? autoLabel(control) : '';
                interactive = Boolean(control) || Boolean(tagged);
                render();
            };

            const onDown = (e: PointerEvent) => {
                if (e.pointerType !== 'mouse') return;
                pressed = true;
                render();
            };

            const onUp = (e: PointerEvent) => {
                if (e.pointerType !== 'mouse') return;
                pressed = false;
                render();
                gsap.fromTo(
                    ripple,
                    { x: e.clientX, y: e.clientY, scale: 0.3, autoAlpha: 0.75 },
                    { scale: 2.6, autoAlpha: 0, duration: 0.55, ease: 'power2.out' },
                );
            };

            const onLeave = () => {
                shown = false;
                setPill(null);
                gsap.to(root, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
            };

            window.addEventListener('pointermove', onMove, { passive: true });
            document.addEventListener('pointerover', onOver, { passive: true });
            document.addEventListener('pointerdown', onDown, { passive: true });
            document.addEventListener('pointerup', onUp, { passive: true });
            document.documentElement.addEventListener('pointerleave', onLeave);

            return () => {
                window.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerover', onOver);
                document.removeEventListener('pointerdown', onDown);
                document.removeEventListener('pointerup', onUp);
                document.documentElement.removeEventListener('pointerleave', onLeave);
                document.documentElement.classList.remove('pill-cursor');
            };
        },
        { scope: rootRef },
    );

    return (
        <>
            <div ref={rippleRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[299] -ml-3 -mt-3 w-6 h-6 border border-win-sun" />
            <div
                ref={pillRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[301] invisible inline-flex items-center gap-1.5 whitespace-nowrap rounded-[15px] border border-white/25 bg-black/40 py-1.5 pl-2.5 pr-3 font-sans text-[12px] uppercase leading-none tracking-[0.02em] text-white backdrop-blur-md"
            >
                <span ref={pillIconRef} className="inline-flex items-center" />
                <span ref={pillLabelRef} />
            </div>
            <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[300] invisible">
                <div ref={dotRef} className="-ml-1 -mt-1 w-2 h-2 bg-win-sun" />
                <div
                    ref={chipRef}
                    className="absolute left-3 top-3 whitespace-nowrap bg-win-sun text-ink font-mono text-[11px] uppercase tracking-[0.06em] leading-none px-1.5 py-1"
                />
            </div>
        </>
    );
};

export default Cursor;
