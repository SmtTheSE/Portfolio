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
            tl.fromTo('.hero-headline, .hero-role', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 })
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
        <section ref={rootRef} className="relative min-h-[80vh] w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 pt-36 pb-20">
            {/* Ambient liquid glow - centered behind the portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-indigo-200/40 via-fuchsia-100/30 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none z-0 opacity-[0.03]"
                 style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-6">
                    {/* Name */}
                    <div className="hero-headline order-1 flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted font-light">Hello, I'm</span>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-none text-text-main">
                            SITT MIN THAR
                        </h1>
                    </div>

                    {/* Profile Image - background-trimmed cutout, floating directly on the page */}
                    <div className="hero-portrait order-3 md:order-2 relative w-64 sm:w-80 md:w-[22rem] shrink-0 mx-auto">
                        <img
                            src={profileCutout}
                            alt="Sitt Min Thar"
                            className="relative w-full h-auto object-contain"
                        />
                    </div>

                    {/* Role */}
                    <div className="hero-role order-2 md:order-3 flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted font-light">Software Engineer</span>
                        <p className="text-2xl md:text-3xl font-light tracking-tight leading-none text-text-main">
                            Ad Venture Studio
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-10 max-w-md">
                    <p className="hero-copy text-sm md:text-base text-text-main/90 font-light leading-relaxed text-center">
                        Founding Engineer at{' '}
                        <a
                            href="https://bravestep.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-border-light hover:border-text-main transition-colors"
                        >
                            Bravestep
                        </a>
                        . Data Science student.
                    </p>
                    <div className="hero-meta flex flex-wrap justify-center items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-light">
                        <span className="liquid-pill inline-flex items-center gap-1.5 px-3 py-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${nowStatus.availableForWork ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
                            {nowStatus.availableForWork ? 'Available for Work' : 'SWE · Ad Venture Studio'}
                        </span>
                    </div>
                    <div className="hero-meta flex flex-wrap justify-center items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-light">
                        <span className="liquid-pill inline-flex px-3 py-1.5">Ho Chi Minh City, VN</span>
                        <a href="/Sitt_Min_Thar_Resume.pdf" download className="liquid-pill inline-flex items-center gap-1.5 px-3 py-1.5 hover:text-text-main transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download Resume
                        </a>
                        <a href="#activity" className="liquid-pill inline-flex px-3 py-1.5 hover:text-text-main transition-colors duration-300">
                            AT Protocol Feed
                        </a>
                    </div>
                </div>
            </div>

            {/* Subtle Scroll Indicator */}
            <div className="hero-scroll absolute bottom-12 flex flex-col items-center gap-2 opacity-0">
                <span className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-mono">Scroll</span>
                <div className="w-px h-8 bg-border-light overflow-hidden relative rounded-full">
                    <div className="hero-scroll-track w-full h-full bg-text-main absolute top-[-100%]" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
