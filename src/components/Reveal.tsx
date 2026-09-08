import { ReactNode, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
    children: ReactNode;
    className?: string;
    /** Stagger delay in seconds, useful when several Reveals sit in the same viewport. */
    delay?: number;
    /** Distance (px) the content travels in from. */
    distance?: number;
    /** Slight scale-in for a softer, "liquid" settle. */
    scale?: boolean;
    as?: 'div' | 'span';
}

/** Scroll-triggered fade + rise reveal, powered by GSAP. */
export default function Reveal({ children, className, delay = 0, distance = 24, scale = false, as = 'div' }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;
            gsap.fromTo(
                ref.current,
                { opacity: 0, y: distance, ...(scale ? { scale: 0.97 } : {}) },
                {
                    opacity: 1,
                    y: 0,
                    ...(scale ? { scale: 1 } : {}),
                    duration: 0.9,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 88%',
                        once: true,
                    },
                },
            );
        },
        { scope: ref },
    );

    const Tag = as;
    return (
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    );
}
