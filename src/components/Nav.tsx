import { useCallback, useEffect, useRef, useState } from 'react';
import { EASE, goToHash, gsap, hasFinePointer, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const scrambleLabel = (el: HTMLElement | null, text: string) => {
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    gsap.to(el, {
        duration: 0.36,
        scrambleText: {
            text,
            chars: SCRAMBLE_CHARS,
            speed: 0.5,
            tweenLength: false,
        },
        overwrite: 'auto',
    });
};

type NavLink = { name: string; href: string; download?: boolean };

const LINKS: NavLink[] = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Lab', href: '#lab' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '/Sitt_Min_Thar_Resume.pdf', download: true },
];

const SCROLL_IDS = LINKS.filter((l) => !l.download).map((l) => l.href.slice(1));

const Nav = () => {
    const [active, setActive] = useState<string>('');
    const [hovered, setHovered] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);
    const progressRef = useRef<HTMLSpanElement | null>(null);
    const navListRef = useRef<HTMLUListElement | null>(null);
    const indicatorRef = useRef<HTMLSpanElement | null>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const scrollLockRef = useRef<number | null>(null);

    const unlockScroll = useCallback(() => {
        if (scrollLockRef.current === null) return;
        const y = scrollLockRef.current;
        scrollLockRef.current = null;
        const html = document.documentElement;
        const body = document.body;
        html.style.overflow = '';
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        window.scrollTo(0, y);
    }, []);

    const syncIndicator = useCallback((targetKey: string, immediate = false) => {
        const list = navListRef.current;
        const indicator = indicatorRef.current;
        if (!list || !indicator) return;

        const el = targetKey ? linkRefs.current[targetKey] : null;
        if (!el) {
            gsap.to(indicator, {
                autoAlpha: 0,
                scaleX: 0.5,
                duration: immediate || prefersReducedMotion() ? 0 : 0.25,
                ease: 'power2.out',
                overwrite: 'auto',
            });
            return;
        }

        const listRect = list.getBoundingClientRect();
        const linkRect = el.getBoundingClientRect();

        gsap.to(indicator, {
            x: linkRect.left - listRect.left,
            width: linkRect.width,
            scaleX: 1,
            autoAlpha: 1,
            duration: immediate || prefersReducedMotion() ? 0 : 0.42,
            ease: EASE.editorial,
            overwrite: 'auto',
        });
    }, []);

    useGSAP(
        () => {
            if (!headerRef.current || prefersReducedMotion()) return;
            gsap.from(headerRef.current, {
                y: -14,
                autoAlpha: 0,
                duration: 0.75,
                ease: EASE.editorial,
                // A leftover transform would make this header the containing block
                // for position:fixed descendants and collapse the mobile menu.
                clearProps: 'transform',
            });

            if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: 0 });
                ScrollTrigger.create({
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.2,
                    animation: gsap.to(progressRef.current, { scaleX: 1, ease: 'none' }),
                });
            }
        },
        { scope: headerRef },
    );

    useEffect(() => {
        const onScroll = () => {
            const probe = window.scrollY + window.innerHeight * 0.4;
            let current = '';
            for (const id of SCROLL_IDS) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= probe) current = id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    useEffect(() => {
        const targetKey = hovered ?? (active ? `#${active}` : '');
        syncIndicator(targetKey);
    }, [active, hovered, syncIndicator]);

    useEffect(() => {
        const onResize = () => {
            const targetKey = hovered ?? (active ? `#${active}` : '');
            syncIndicator(targetKey, true);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [active, hovered, syncIndicator]);

    useEffect(() => {
        if (!open) return;
        firstLinkRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKey);

        const html = document.documentElement;
        const body = document.body;
        scrollLockRef.current = window.scrollY;
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        // iOS Safari often ignores overflow:hidden on body alone.
        body.style.position = 'fixed';
        body.style.top = `-${scrollLockRef.current}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';

        return () => {
            document.removeEventListener('keydown', onKey);
            unlockScroll();
        };
    }, [open, unlockScroll]);

    useGSAP(
        () => {
            if (!open || !mobileMenuRef.current || prefersReducedMotion()) return;
            const items = gsap.utils.toArray<HTMLElement>('[data-mobile-item]', mobileMenuRef.current);
            const rules = gsap.utils.toArray<HTMLElement>('[data-mobile-rule]', mobileMenuRef.current);
            gsap.fromTo(
                items,
                { yPercent: 100, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.65, stagger: 0.06, ease: EASE.editorial },
            );
            gsap.fromTo(
                rules,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.75, stagger: 0.06, ease: EASE.curtain },
            );
        },
        { dependencies: [open], scope: mobileMenuRef },
    );

    return (
        <>
        <header ref={headerRef} className="fixed inset-x-0 top-0 z-[210]">
            <span
                ref={progressRef}
                aria-hidden="true"
                className="pointer-events-none fixed inset-x-0 top-0 z-[101] h-[2px] bg-win-sun/80 origin-left will-change-transform"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/85 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between h-[68px] px-5 md:px-7">
                <a
                    href="#top"
                    onPointerEnter={(e) => scrambleLabel(e.currentTarget.querySelector<HTMLElement>('[data-brand]'), 'Sitt Min Thar')}
                    onClick={(e) => {
                        if (goToHash('#top')) e.preventDefault();
                    }}
                    className="flex items-baseline gap-3 py-3 -my-3 text-[13px] uppercase tracking-[-0.01em]"
                >
                    <span data-brand className="font-semibold text-fg">Sitt Min Thar</span>
                    <span className="hidden sm:inline text-muted">Software Engineer, '24 &ndash; Now</span>
                </a>

                <nav aria-label="Primary" className="hidden md:block">
                    <ul
                        ref={navListRef}
                        onPointerLeave={() => setHovered(null)}
                        className="relative flex items-center gap-8 text-[13px] uppercase font-medium tracking-[-0.01em]"
                    >
                        {LINKS.map((link) => {
                            const isActive = !link.download && link.href === `#${active}`;
                            return (
                                <li key={link.name}>
                                    <a
                                        ref={(el) => {
                                            linkRefs.current[link.href] = el;
                                        }}
                                        href={link.href}
                                        {...(link.download ? { download: true } : {})}
                                        onPointerEnter={(e) => {
                                            setHovered(link.href);
                                            scrambleLabel(e.currentTarget, link.name);
                                        }}
                                        onFocus={() => setHovered(link.href)}
                                        onBlur={() => setHovered(null)}
                                        onClick={(e) => {
                                            if (goToHash(link.href)) e.preventDefault();
                                        }}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={`py-1 transition-colors ${isActive ? 'text-fg' : 'text-muted hover:text-fg'}`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            );
                        })}
                        <span
                            ref={indicatorRef}
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-fg opacity-0 origin-center"
                        />
                    </ul>
                </nav>

                <button
                    type="button"
                    className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-fg"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        {open ? (
                            <>
                                <line x1="5" y1="5" x2="19" y2="19" />
                                <line x1="19" y1="5" x2="5" y2="19" />
                            </>
                        ) : (
                            <>
                                <line x1="4" y1="8" x2="20" y2="8" />
                                <line x1="4" y1="16" x2="20" y2="16" />
                            </>
                        )}
                    </svg>
                </button>
            </div>
        </header>

            {open && (
                <div
                    ref={mobileMenuRef}
                    id="mobile-menu"
                    className="md:hidden fixed inset-x-0 top-[68px] bottom-0 z-[200] bg-bg px-5 pt-6 pb-[env(safe-area-inset-bottom)] overflow-y-auto overscroll-none"
                >
                    <ul className="flex flex-col">
                        {LINKS.map((link, i) => (
                            <li key={link.name} className="relative overflow-hidden">
                                <a
                                    ref={i === 0 ? firstLinkRef : undefined}
                                    data-mobile-item
                                    href={link.href}
                                    {...(link.download ? { download: true } : {})}
                                    onClick={(e) => {
                                        // Release the scroll lock before the tween starts, or GSAP's auto-kill cancels it.
                                        unlockScroll();
                                        setOpen(false);
                                        window.setTimeout(() => goToHash(link.href), 60);
                                        if (link.href.startsWith('#')) e.preventDefault();
                                    }}
                                    className="flex items-center justify-between min-h-[64px] font-serif text-[34px] leading-none tracking-tight text-fg"
                                >
                                    {link.name}
                                    <span className="mono-label">{link.download ? 'PDF' : String(i + 1).padStart(2, '0')}</span>
                                </a>
                                <span
                                    aria-hidden="true"
                                    data-mobile-rule
                                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line/70 origin-left"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Nav;
