import { useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';

/** Workplaces only. */
const PLACES = ['Ad Venture Studio', 'Bravestep', 'Malibu', 'AIOT Inc'];

/** Two identical halves, each long enough to cover a wide screen, so a -50% shift loops seamlessly. */
const TRACK = [...PLACES, ...PLACES, ...PLACES, ...PLACES];

const Intro = () => {
    const rootRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const trackRef = useRef<HTMLUListElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;

            // Statement: words brighten one by one as you scroll through the paragraph.
            if (textRef.current) {
                const split = SplitText.create(textRef.current, { type: 'words' });
                gsap.fromTo(
                    split.words,
                    { opacity: 0.22 },
                    {
                        opacity: 1,
                        ease: 'none',
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 82%',
                            end: 'bottom 48%',
                            scrub: 0.4,
                        },
                    },
                );
            }

            // Marquee: a constant drift that speeds up with scroll velocity and flips with direction.
            const track = trackRef.current;
            if (track) {
                const loop = gsap.to(track, { xPercent: -50, duration: 46, ease: 'none', repeat: -1 });
                ScrollTrigger.create({
                    onUpdate: (self) => {
                        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 7);
                        gsap.timeline({ overwrite: true })
                            .to(loop, { timeScale: self.direction * boost, duration: 0.2 })
                            .to(loop, { timeScale: self.direction, duration: 1.2, ease: 'power2.out' });
                    },
                });
                const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.4 });
                const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.6 });
                track.addEventListener('pointerenter', pause);
                track.addEventListener('pointerleave', resume);
            }
        },
        { scope: rootRef },
    );

    return (
        <section ref={rootRef} aria-label="Summary" className="px-5 md:px-7 pt-10 md:pt-20 pb-20 md:pb-32">
            <div className="mx-auto max-w-[1120px]">
                <p
                    ref={textRef}
                    className="max-w-[760px] text-[28px] md:text-[38px] leading-[1.18] font-light tracking-[-0.03em] text-fg"
                >
                    Currently shipping mobile apps at Ad Venture Studio and building as Founding Engineer at
                    Bravestep, with a love for backend systems, data, and AI that ships. This is a curation of
                    what I&rsquo;ve built &#10023; and where.
                </p>
            </div>

            <div
                className="relative mt-14 md:mt-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
                aria-label="Where I have worked"
            >
                <ul ref={trackRef} className="flex w-max gap-14 md:gap-20 pr-14 md:pr-20">
                    {TRACK.map((name, i) => (
                        <li
                            key={`${name}-${i}`}
                            aria-hidden={i >= PLACES.length ? true : undefined}
                            className="whitespace-nowrap text-[22px] md:text-[30px] font-medium tracking-[-0.03em] text-muted"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Intro;
