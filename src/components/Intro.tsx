import { useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';

/** Workplaces only. */
const PLACES = ['BeeKrowd', 'Ad Venture Studio', 'Bravestep', 'Malibu', 'AIOT Inc'];

/** Two identical halves, each long enough to cover a wide screen, so a -50% shift loops seamlessly. */
const TRACK = [...PLACES, ...PLACES, ...PLACES, ...PLACES];

const Intro = () => {
    const rootRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const trackRef = useRef<HTMLUListElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            let split: SplitText | null = null;
            let resetSkewTimer = 0;

            // Statement: words brighten and gently settle into place as you scroll through the paragraph.
            if (textRef.current) {
                split = SplitText.create(textRef.current, { type: 'words', aria: 'auto' });
                gsap.fromTo(
                    split.words,
                    { opacity: 0.2, y: 6 },
                    {
                        opacity: 1,
                        y: 0,
                        ease: 'none',
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 84%',
                            end: 'bottom 48%',
                            scrub: 0.45,
                        },
                    },
                );
            }

            // Marquee: constant drift that boosts, flips, and leans with scroll velocity.
            const track = trackRef.current;
            let loop: gsap.core.Tween | null = null;
            const pause = () => {
                if (loop) gsap.to(loop, { timeScale: 0, duration: 0.45, ease: 'power2.out' });
            };
            const resume = () => {
                if (loop) gsap.to(loop, { timeScale: 1, duration: 0.65, ease: 'power2.out' });
            };

            if (track) {
                loop = gsap.to(track, { xPercent: -50, duration: 46, ease: 'none', repeat: -1 });
                const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.28, ease: 'power2.out' });

                ScrollTrigger.create({
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        const boost = 1 + Math.min(Math.abs(velocity) / 260, 7);
                        gsap.timeline({ overwrite: true })
                            .to(loop, { timeScale: self.direction * boost, duration: 0.2 })
                            .to(loop, { timeScale: self.direction, duration: 1.2, ease: 'power2.out' });

                        const skew = gsap.utils.clamp(-7.5, 7.5, velocity / -220);
                        skewTo(skew);
                        window.clearTimeout(resetSkewTimer);
                        resetSkewTimer = window.setTimeout(() => skewTo(0), 140);
                    },
                });
                track.addEventListener('pointerenter', pause);
                track.addEventListener('pointerleave', resume);
            }

            return () => {
                window.clearTimeout(resetSkewTimer);
                split?.revert();
                if (track) {
                    track.removeEventListener('pointerenter', pause);
                    track.removeEventListener('pointerleave', resume);
                }
            };
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
                    Currently working as a Software Engineer at{" "}
                    <a
                        href="https://beekrowd.com/en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg transition-colors"
                    >
                        BeeKrowd
                    </a>
                    , also shipping mobile apps at Ad Venture Studio, building as Founding Engineer at
                    Bravestep, and validating macOS hardware releases at Malibu, with a love for backend systems,
                    data, and AI that ships. This is a curation of what I&rsquo;ve built &#10023; and where.
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
