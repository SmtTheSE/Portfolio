import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navRef = useRef<HTMLUListElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

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
        <div id="top" className="min-h-screen bg-white text-text-main font-sans selection:bg-text-main selection:text-primary-bg selection:text-white">
            <div className="min-h-screen flex flex-col relative w-full">
                {/* Local nav bar — the intro page's label bar, carrying the section links */}
                <header className="sticky top-0 z-[100] w-full bg-white/85 backdrop-blur-xl border-b border-[#C7C7CC]">
                    <div className="mx-auto w-full max-w-5xl px-6 md:px-12">
                        <div className="h-[52px] flex items-center justify-between gap-6">
                            <Link
                                to="/"
                                className="text-[17px] md:text-[21px] font-semibold tracking-tight text-text-main hover:opacity-70 transition-opacity"
                            >
                                Sitt Min Thar
                            </Link>

                            <nav className="hidden md:block">
                                <ul
                                    ref={navRef}
                                    onMouseLeave={() => moveIndicatorTo(activeIndex)}
                                    className="relative flex items-center gap-1 text-[12px] tracking-tight text-text-muted"
                                >
                                    <span
                                        ref={indicatorRef}
                                        className="absolute inset-y-1 left-0 rounded-full bg-text-main/[0.06]"
                                        style={{ width: 0 }}
                                    />
                                    {NAV_LINKS.map((link, i) => (
                                        <li key={link.name} className="relative z-10">
                                            <a
                                                ref={(el) => { linkRefs.current[i] = el; }}
                                                href={link.href}
                                                {...(link.download ? { download: true } : {})}
                                                onMouseEnter={() => moveIndicatorTo(i)}
                                                className={`relative block px-3 py-1.5 rounded-full transition-colors duration-300 ${
                                                    activeIndex === i ? 'text-text-main' : 'hover:text-text-main'
                                                }`}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <span className="md:hidden text-[11px] tracking-tight text-text-muted">GMT+7</span>
                        </div>
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
