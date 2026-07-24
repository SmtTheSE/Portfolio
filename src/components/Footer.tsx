const Footer = () => {
    return (
        <footer id="contact" className="relative bg-primary-bg px-6 md:px-12 py-24 md:py-32 border-t border-border-light flex flex-col items-center scroll-mt-24">
            <div className="w-full max-w-5xl flex flex-col items-start gap-16">
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 08</span>
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
                            Contact
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-end">
                        <a
                            href="mailto:sittminthar005@gmail.com"
                            className="text-2xl md:text-4xl font-light tracking-tighter text-text-main border-b border-text-main/10 hover:border-text-main transition-colors pb-2"
                        >
                            sittminthar005@gmail.com
                        </a>
                        <div className="flex flex-col gap-2">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Links</span>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://github.com/SmtTheSE" target="_blank" rel="noreferrer" className="text-xs font-medium uppercase tracking-widest text-text-main hover:opacity-50 transition-opacity">Github</a>
                                <span className="text-border-light">/</span>
                                <a href="https://bsky.app/profile/sitt03.bsky.social" target="_blank" rel="noreferrer" className="text-xs font-medium uppercase tracking-widest text-text-main hover:opacity-50 transition-opacity">Bluesky</a>
                                <span className="text-border-light">/</span>
                                <a href="/Sitt_Min_Thar_CV.pdf" download className="text-xs font-medium uppercase tracking-widest text-text-main hover:opacity-50 transition-opacity">CV</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full pt-16 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">
                    <span>© {new Date().getFullYear()} Sitt Min Thar</span>
                    <span>Ho Chi Minh City, Vietnam</span>
                    <a href="#top" className="hover:text-text-main transition-colors">Back to top</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
