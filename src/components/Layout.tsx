import React, { ReactNode } from 'react';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-primary-bg text-text-main font-sans selection:bg-text-main selection:text-primary-bg selection:text-white">
            <div className="min-h-screen flex flex-col relative w-full">
                {/* Navbar - Refined */}
                <header className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-4 bg-primary-bg/80 backdrop-blur-md border-b border-border-light">
                    <div className="flex-1">
                        <a href="/" className="font-sans font-medium tracking-tight text-sm uppercase">Sitt Min Thar</a>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {[
                            { name: 'About', href: '#about' },
                            { name: 'Arsenal', href: '#experience' },
                            { name: 'Work', href: '#projects' },
                            { name: 'Contact', href: 'mailto:sittminthar005@gmail.com' }
                        ].map((link, i) => (
                            <React.Fragment key={link.name}>
                                <a href={link.href} className="hover:text-text-main transition-colors duration-300">{link.name}</a>
                                {i < 3 && <span className="w-px h-2 bg-border-light"></span>}
                            </React.Fragment>
                        ))}
                    </nav>

                    <div className="flex-1 flex justify-end">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <span className="text-[9px] uppercase tracking-widest text-text-muted group-hover:text-text-main transition-colors">GMT+7</span>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
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
