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

/**
 * A flat square that trails the real cursor, with a small label for what's under it.
 * The native cursor stays (grab hand on windows, pointer on links); this only adds to it.
 */
const Cursor = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const chipRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            const dot = dotRef.current;
            const chip = chipRef.current;
            const ripple = rippleRef.current;
            if (!root || !dot || !chip || !ripple) return;
            if (!hasFinePointer() || prefersReducedMotion()) return;

            gsap.set(root, { autoAlpha: 0 });
            gsap.set(chip, { autoAlpha: 0, scale: 0.8, transformOrigin: '0% 0%' });
            gsap.set(ripple, { autoAlpha: 0 });

            const xTo = gsap.quickTo(root, 'x', { duration: 0.32, ease: 'power3' });
            const yTo = gsap.quickTo(root, 'y', { duration: 0.32, ease: 'power3' });

            let label = '';
            let interactive = false;
            let pressed = false;
            let shown = false;

            const render = () => {
                const showChip = label !== '';
                chip.textContent = pressed && label === 'Drag' ? 'Dragging' : label;
                gsap.to(chip, { autoAlpha: showChip ? 1 : 0, scale: showChip ? 1 : 0.8, duration: 0.22, ease: 'power3.out', overwrite: 'auto' });
                const dotScale = pressed ? 0.7 : showChip ? 1.25 : interactive ? 2.4 : 1;
                gsap.to(dot, { scale: dotScale, opacity: interactive && !showChip ? 0.55 : 1, duration: 0.25, ease: 'power3.out', overwrite: 'auto' });
            };

            const onMove = (e: PointerEvent) => {
                if (e.pointerType !== 'mouse') return;
                if (!shown) {
                    shown = true;
                    gsap.set(root, { x: e.clientX, y: e.clientY });
                    gsap.to(root, { autoAlpha: 1, duration: 0.25 });
                }
                xTo(e.clientX);
                yTo(e.clientY);
            };

            const onOver = (e: PointerEvent) => {
                const target = e.target as Element | null;
                const tagged = target?.closest('[data-cursor]');
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
                gsap.to(root, { autoAlpha: 0, duration: 0.2 });
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
            };
        },
        { scope: rootRef },
    );

    return (
        <>
            <div ref={rippleRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[299] -ml-3 -mt-3 w-6 h-6 border border-win-sun" />
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
