import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ExternalLink from './ExternalLink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import profilePortrait from '../assets/profile-portrait.webp';
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
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                    '-=0.7',
                );
        },
        { scope: rootRef },
    );

    return (
        <section ref={rootRef} className="relative w-full">
            <div className="relative">
                {/* Portrait band: the cutout's single bottom cut lands on the band's bottom edge */}
                <div
                    className="relative w-full h-[316px] md:h-[442px] border-b border-[#D2D2D7]"
                    style={{ backgroundImage: 'linear-gradient(to bottom, #E6E6E8, #F2F2F4)' }}
                >
                    {/* Page label, sitting over the top of the band with a hairline under it */}
                    <div className="absolute inset-x-0 top-0">
                        <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
                            <div className="h-[52px] flex items-center border-b border-[#C7C7CC]">
                                <span className="text-[17px] md:text-[21px] font-semibold tracking-tight text-text-main">
                                    Engineering Profile
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Same grid as the bio below, so the portrait sits in the second column */}
                    <div className="mx-auto w-full max-w-5xl px-6 md:px-12 h-full grid grid-cols-1 md:grid-cols-2 md:gap-x-[81px]">
                        <div className="md:col-start-2 h-full flex items-end justify-center md:justify-start">
                            <img
                                src={profilePortrait}
                                alt="Sitt Min Thar"
                                className="hero-portrait block h-[220px] w-auto md:h-auto md:w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Name and title: below the band on mobile, inset into it on desktop */}
                <div className="mx-auto w-full max-w-5xl px-6 md:px-12 pt-10 md:pt-0 md:absolute md:inset-x-0 md:top-[200px]">
                    <div className="hero-headline md:w-1/2">
                        <h1 className="text-[28px] md:text-[40px] leading-[31px] md:leading-[42px] tracking-[0.32px] font-medium text-text-main">
                            Sitt Min Thar
                        </h1>
                        <p className="text-[24px] md:text-[32px] leading-[29px] md:leading-[35px] font-light text-text-main mt-2">
                            Software Engineer
                        </p>
                    </div>
                </div>
            </div>

            {/* Bio below the band, in two columns */}
            <div className="mx-auto w-full max-w-5xl px-6 md:px-12 pt-10 md:pt-8 pb-12">
                <div className="hero-copy grid grid-cols-1 md:grid-cols-2 gap-x-[81px] gap-y-8 text-[17px] leading-[26px] text-text-main font-light">
                    {/* Left column: bio, then where to go next */}
                    <div className="flex flex-col gap-6 order-1">
                        <p>I'm a software engineer based in {nowStatus.location}.</p>
                        <p>
                            At Ad Venture Studio I build and ship mobile apps for the App Store and Google
                            Play, owning product engineering, store releases, and app infrastructure. I work
                            alongside design and monetization leads on UX, performance, and retention.
                        </p>
                    </div>

                    <div className="hero-meta flex flex-col gap-4 pt-6 border-t border-border-light order-3">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">Explore</span>
                        <div className="flex flex-wrap gap-2 text-[12px] tracking-tight text-text-muted">
                                <Link to="/portfolio#projects" className="liquid-pill inline-flex px-4 py-2 hover:text-text-main transition-colors duration-300">
                                    Selected Work
                                </Link>
                                <Link to="/portfolio#experience" className="liquid-pill inline-flex px-4 py-2 hover:text-text-main transition-colors duration-300">
                                    Experience
                                </Link>
                                <Link to="/portfolio#notes" className="liquid-pill inline-flex px-4 py-2 hover:text-text-main transition-colors duration-300">
                                    Notes
                                </Link>
                                <a href="/Sitt_Min_Thar_Resume.pdf" download className="liquid-pill inline-flex items-center gap-1.5 px-4 py-2 hover:text-text-main transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Resume
                                </a>
                        </div>
                    </div>

                    {/* Right column: bio, then contact */}
                    <div className="flex flex-col gap-6 order-2">
                        <p>
                            I'm also a Founding Engineer at{' '}
                            <ExternalLink href="https://bravestep.ai/">Bravestep</ExternalLink>
                            , and work independently as a release-acceptance engineer for{' '}
                            <ExternalLink href="https://malibu.tech/">Malibu</ExternalLink>
                            , a macOS distributed-compute marketplace, serving as the physical-hardware
                            validation gate between CI-green and fleet rollout.
                        </p>
                        <p>
                            My work centers on the intersection of robust backend systems and modern AI
                            integration. I previously interned at AIOT Inc, and I'm studying for a BS in
                            Data Science at SBS.
                        </p>
                    </div>

                    <div className="hero-meta flex flex-col gap-2 pt-6 border-t border-border-light order-4">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">Contact</span>
                            <a
                                href="mailto:sittminthar005@gmail.com"
                                className="text-[17px] leading-[26px] font-light text-text-main border-b border-text-main/10 hover:border-text-main transition-colors w-fit break-all"
                            >
                                sittminthar005@gmail.com
                            </a>
                            <div className="flex flex-wrap gap-x-5 gap-y-1">
                                <a
                                    href="https://github.com/SmtTheSE"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[17px] leading-[26px] font-light text-text-muted hover:text-text-main transition-colors"
                                >
                                    GitHub ↗
                                </a>
                                <a
                                    href="https://bsky.app/profile/sitt03.bsky.social"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[17px] leading-[26px] font-light text-text-muted hover:text-text-main transition-colors"
                                >
                                    Bluesky ↗
                                </a>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
