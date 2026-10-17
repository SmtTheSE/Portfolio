import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable, InertiaPlugin, SplitText, useGSAP);

export { gsap, ScrollTrigger, Draggable, SplitText, useGSAP };

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Eased scroll to an in-page #hash. Returns true when it handled the navigation. */
export const goToHash = (href: string): boolean => {
    if (!href.startsWith('#')) return false;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return false;
    const offsetY = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    if (prefersReducedMotion()) {
        target.scrollIntoView();
    } else {
        gsap.to(window, { scrollTo: { y: target, offsetY, autoKill: true }, duration: 1.25, ease: 'power3.inOut' });
    }
    history.pushState(null, '', href);
    return true;
};
