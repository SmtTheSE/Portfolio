const Footer = () => {
    return (
        <footer className="relative bg-primary-bg px-6 md:px-12 py-32 border-t border-border-light flex flex-col items-center">
            <div className="w-full max-w-5xl flex flex-col items-start gap-16">
                
                {/* Minimalist Contact Area */}
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 05</span>
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">Connection <br className="hidden md:block" /> Protocol</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-end">
                        <a 
                            href="mailto:sittminthar005@gmail.com"
                            className="text-2xl md:text-4xl font-light tracking-tighter text-text-main border-b border-text-main/10 hover:border-text-main transition-colors pb-2"
                        >
                            sittminthar005@gmail.com
                        </a>
                        <div className="flex flex-col gap-2">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">social_links</span>
                            <div className="flex gap-4">
                                <a href="https://github.com/SmtTheSE" target="_blank" rel="noreferrer" className="text-xs font-medium uppercase tracking-widest text-text-main hover:opacity-50 transition-opacity">Github</a>
                                <span className="text-border-light">/</span>
                                <a href="https://www.facebook.com/aiot.global.inc" target="_blank" rel="noreferrer" className="text-xs font-medium uppercase tracking-widest text-text-main hover:opacity-50 transition-opacity">AIOT</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meta Information - Refined */}
                <div className="w-full pt-16 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">
                    <div className="flex items-center gap-2">
                        <span>© {new Date().getFullYear()} SMT SYSTEM</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>LCL: HCMC, VN</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Crafted with precision</span>
                        <span className="w-1 h-1 bg-border-light rounded-full"></span>
                        <a href="#" className="hover:text-text-main transition-colors">Top ↗</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
