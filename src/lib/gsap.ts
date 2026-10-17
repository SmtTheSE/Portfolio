import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText, useGSAP);

export { gsap, ScrollTrigger, Draggable, SplitText, useGSAP };

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let stopActiveScroll: (() => void) | null = null;

/**
 * Eased scroll to an in-page #hash. Returns true when it handled the navigation.
 *
 * The destination is re-read from the live layout on every frame, and for a few seconds after landing, because
 * the page below the Lab is still growing while its lazy content loads. A one-shot target would land far short.
 * Any wheel, touch, key or pointer input from the user stops it immediately.
 */
export const goToHash = (href: string): boolean => {
    if (!href.startsWith('#')) return false;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return false;

    stopActiveScroll?.();

    const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const dest = () => Math.max(0, Math.min(Math.round(target.getBoundingClientRect().top + window.scrollY - offset), maxY()));

    const from = window.scrollY;
    const progress = { p: 0 };
    let tween: gsap.core.Tween | null = null;
    let observer: ResizeObserver | null = null;
    let giveUp = 0;

    const interrupts = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    const stop = () => {
        tween?.kill();
        observer?.disconnect();
        window.clearTimeout(giveUp);
        interrupts.forEach((type) => window.removeEventListener(type, stop));
        if (stopActiveScroll === stop) stopActiveScroll = null;
    };
    stopActiveScroll = stop;
    interrupts.forEach((type) => window.addEventListener(type, stop, { passive: true }));

    // After landing, keep correcting if late content shifts the section, until the page settles or the user acts.
    const settle = () => {
        const correct = () => {
            if (Math.abs(window.scrollY - dest()) > 2) window.scrollTo(0, dest());
        };
        correct();
        observer = new ResizeObserver(correct);
        observer.observe(document.body);
        giveUp = window.setTimeout(stop, 12000);
    };

    if (prefersReducedMotion()) {
        window.scrollTo(0, dest());
        settle();
    } else {
        tween = gsap.to(progress, {
            p: 1,
            duration: 1.25,
            ease: 'power3.inOut',
            onUpdate: () => window.scrollTo(0, from + (dest() - from) * progress.p),
            onComplete: settle,
        });
    }

    history.pushState(null, '', href);
    return true;
};
