import { useEffect, useRef, useState } from 'react';

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
    const [open, setOpen] = useState(false);
    const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

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
        if (!open) return;
        firstLinkRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header className="fixed inset-x-0 top-0 z-[100]">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/85 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between h-[68px] px-5 md:px-7">
                <a href="#top" className="flex items-baseline gap-3 py-3 -my-3 text-[13px] uppercase tracking-[-0.01em]">
                    <span className="font-semibold text-fg">Sitt Min Thar</span>
                    <span className="hidden sm:inline text-muted">Software Engineer, '24 &ndash; Now</span>
                </a>

                <nav aria-label="Primary" className="hidden md:block">
                    <ul className="flex items-center gap-8 text-[13px] uppercase font-medium tracking-[-0.01em]">
                        {LINKS.map((link) => {
                            const isActive = !link.download && link.href === `#${active}`;
                            return (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        {...(link.download ? { download: true } : {})}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={`transition-colors ${isActive ? 'text-fg' : 'text-muted hover:text-fg'}`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            );
                        })}
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

            {open && (
                <div id="mobile-menu" className="md:hidden fixed inset-0 top-[68px] bg-bg px-5 pt-6">
                    <ul className="flex flex-col">
                        {LINKS.map((link, i) => (
                            <li key={link.name} className="border-b border-line/70">
                                <a
                                    ref={i === 0 ? firstLinkRef : undefined}
                                    href={link.href}
                                    {...(link.download ? { download: true } : {})}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center justify-between min-h-[64px] font-serif text-[34px] leading-none tracking-tight text-fg"
                                >
                                    {link.name}
                                    <span className="mono-label">{link.download ? 'PDF' : String(i + 1).padStart(2, '0')}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Nav;
