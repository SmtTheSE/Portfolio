import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import profileCutout from '/profile-cutout.webp';
import { nowStatus } from '../data/now';

const Hero = () => {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo('.hero-headline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 })
                .fromTo('.hero-copy', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
                .fromTo('.hero-meta > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
                .fromTo(
                    '.hero-portrait',
                    { opacity: 0, scale: 0.94, y: 16 },
                    { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.8)' },
                    '-=0.7',
                )
                .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 0.6, duration: 0.6 }, '-=0.3');

            gsap.to('.hero-scroll-track', { y: 32, repeat: -1, duration: 2, ease: 'none' });
        },
        { scope: rootRef },
    );

    return (
        <section ref={rootRef} className="relative w-full overflow-hidden pt-28 md:pt-32">
            {/* Portrait band - the cutout stands on the band's bottom edge */}
            <div
                className="relative w-full"
                style={{ backgroundImage: 'linear-gradient(to bottom, #EAEAEA, #FAFAFA)' }}
            >
                <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 md:gap-12 md:min-h-[24rem]">
                        <div className="hero-headline flex flex-col gap-2 self-center pt-12 pb-4 md:py-16">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-light">
                                {nowStatus.location}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-none text-text-main">
                                Sitt Min Thar
                            </h1>
                            <p className="text-base md:text-lg font-light tracking-tight text-text-muted">
                                Software Engineer, Ad Venture Studio
                            </p>
                        </div>

                        <div className="hero-portrait self-end flex justify-center md:justify-end">
                            <img
                                src={profileCutout}
                                alt="Sitt Min Thar"
                                className="block w-48 sm:w-56 md:w-80 h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bio below the band, in a narrow editorial column */}
            <div className="mx-auto w-full max-w-5xl px-6 md:px-12 pt-12 md:pt-16 pb-24 md:pb-28">
                <div className="flex flex-col items-start gap-7 max-w-md">
                    <p className="hero-copy text-sm md:text-base text-text-main/90 font-light leading-relaxed">
                        I build with a focus on structure and performance, currently shipping mobile apps to
                        the App Store and Google Play at Ad Venture Studio, and as Founding Engineer at{' '}
                        <a
                            href="https://bravestep.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-border-light hover:border-text-main transition-colors"
                        >
                            Bravestep
                        </a>
                        . Studying data science alongside the work.
                    </p>

                    <div className="hero-meta flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-light">
                        <a href="/Sitt_Min_Thar_Resume.pdf" download className="liquid-pill inline-flex items-center gap-1.5 px-4 py-2 hover:text-text-main transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download Resume
                        </a>
                    </div>
                </div>
            </div>

            {/* Subtle Scroll Indicator */}
            <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
                <span className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-mono">Scroll</span>
                <div className="w-px h-8 bg-border-light overflow-hidden relative rounded-full">
                    <div className="hero-scroll-track w-full h-full bg-text-main absolute top-[-100%]" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
