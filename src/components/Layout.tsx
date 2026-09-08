import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const NAV_LINKS: { name: string; href: string; download?: boolean }[] = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Now', href: '#now' },
    { name: 'Garden', href: '#garden' },
    { name: 'Notes', href: '#notes' },
    { name: 'Resume', href: '/Sitt_Min_Thar_Resume.pdf', download: true },
    { name: 'Hire Me', href: '#hire' },
    { name: 'Contact', href: '#contact' },
];

const SCROLL_LINKS = NAV_LINKS.filter((l) => !l.download);

function handleGlassMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navRef = useRef<HTMLUListElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const moveIndicatorTo = (index: number, animate = true) => {
        const el = linkRefs.current[index];
        const nav = navRef.current;
        const indicator = indicatorRef.current;
        if (!el || !nav || !indicator) return;
        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const vars = { x: elRect.left - navRect.left, width: elRect.width };
        if (animate) {
            gsap.to(indicator, { ...vars, duration: 0.55, ease: 'elastic.out(1, 0.75)' });
        } else {
            gsap.set(indicator, vars);
        }
    };

    useLayoutEffect(() => {
        moveIndicatorTo(0, false);
    }, []);

    useEffect(() => {
        moveIndicatorTo(activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        // Re-sync the indicator once the pill's compact/expanded padding transition settles.
        const t = setTimeout(() => moveIndicatorTo(activeIndex), 260);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrolled]);

    useEffect(() => {
        const sections = SCROLL_LINKS.map((l) => ({
            href: l.href,
            el: document.querySelector(l.href) as HTMLElement | null,
        })).filter((s) => s.el);

        if (!sections.length) return;

        const onScroll = () => {
            const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
            const probe = window.scrollY + window.innerHeight * 0.3;
            let activeHref = sections[0].href;
            for (const s of sections) {
                if (s.el && (atBottom || s.el.offsetTop <= probe)) activeHref = s.href;
            }
            const idx = NAV_LINKS.findIndex((l) => l.href === activeHref);
            if (idx !== -1) setActiveIndex(idx);
            setScrolled(window.scrollY > 24);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div id="top" className="min-h-screen bg-primary-bg text-text-main font-sans selection:bg-text-main selection:text-primary-bg selection:text-white">
            <div className="min-h-screen flex flex-col relative w-full">
                {/* Floating liquid-glass header — compacts and deepens its blur on scroll */}
                <header
                    className={`fixed left-0 w-full z-[100] flex justify-between items-center gap-3 px-4 md:px-8 pointer-events-none transition-[top] duration-300 ease-spring ${
                        scrolled ? 'top-2 md:top-3' : 'top-4 md:top-6'
                    }`}
                >
                    <a
                        href="#top"
                        onMouseMove={handleGlassMove}
                        className={`glass pointer-events-auto rounded-full shadow-liquid font-sans font-medium tracking-tight text-sm text-text-main transition-all duration-300 ease-spring hover:scale-[1.03] active:scale-[0.96] ${
                            scrolled ? 'px-4 py-2' : 'px-5 py-2.5'
                        }`}
                    >
                        Sitt Min Thar
                    </a>

                    <nav className="hidden md:block pointer-events-auto">
                        <div
                            onMouseMove={handleGlassMove}
                            className={`glass rounded-full shadow-liquid transition-[padding] duration-300 ease-spring ${scrolled ? 'p-1' : 'p-1.5'}`}
                        >
                            <ul
                                ref={navRef}
                                onMouseLeave={() => moveIndicatorTo(activeIndex)}
                                className="relative flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-text-muted"
                            >
                                <span
                                    ref={indicatorRef}
                                    className="absolute inset-y-0 left-0 rounded-full bg-text-main/[0.06] ring-1 ring-text-main/[0.06]"
                                    style={{ width: 0 }}
                                />
                                {NAV_LINKS.map((link, i) => (
                                    <li key={link.name} className="relative z-10">
                                        <a
                                            ref={(el) => { linkRefs.current[i] = el; }}
                                            href={link.href}
                                            {...(link.download ? { download: true } : {})}
                                            onMouseEnter={() => moveIndicatorTo(i)}
                                            className={`relative block px-4 py-2.5 rounded-full transition-colors duration-300 ${
                                                activeIndex === i ? 'text-text-main' : 'hover:text-text-main'
                                            }`}
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    <div
                        onMouseMove={handleGlassMove}
                        className={`glass pointer-events-auto flex items-center gap-2 rounded-full shadow-liquid transition-all duration-300 ease-spring ${
                            scrolled ? 'px-3 py-2' : 'px-4 py-2.5'
                        }`}
                    >
                        <span className="text-[9px] uppercase tracking-widest text-text-muted">GMT+7</span>
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    </div>
                </header>

                <main className="flex-1 w-full relative">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Layout;
