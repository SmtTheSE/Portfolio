import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const Footer = () => {
    return (
        <footer
            id="contact"
            className="relative px-6 md:px-12 py-16 md:py-20 flex flex-col items-center scroll-mt-[52px] border-t border-[#D2D2D7]"
            style={{ backgroundImage: 'linear-gradient(to bottom, #F2F2F4, #E6E6E8)' }}
        >
            <div className="w-full max-w-5xl flex flex-col items-start">
                <SectionHeader label="Contact" />

                <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-x-[81px] gap-y-8 w-full">
                    <a
                        href="mailto:sittminthar005@gmail.com"
                        className="text-[28px] md:text-[32px] leading-[35px] font-light tracking-tight text-text-main border-b border-text-main/10 hover:border-text-main transition-colors pb-2 w-fit break-all"
                    >
                        sittminthar005@gmail.com
                    </a>

                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">Links</span>
                        <div className="flex flex-wrap gap-2">
                            <a href="https://github.com/SmtTheSE" target="_blank" rel="noreferrer" className="liquid-pill px-4 py-2 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity">Github</a>
                            <a href="https://bsky.app/profile/sitt03.bsky.social" target="_blank" rel="noreferrer" className="liquid-pill px-4 py-2 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity">Bluesky</a>
                            <a href="/Sitt_Min_Thar_Resume.pdf" download className="liquid-pill px-4 py-2 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity">Resume</a>
                        </div>
                    </div>
                </Reveal>

                <div className="w-full mt-14 pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] tracking-tight text-text-muted">
                    <span>© {new Date().getFullYear()} Sitt Min Thar</span>
                    <span>Ho Chi Minh City, Vietnam</span>
                    <a href="#top" className="hover:text-text-main transition-colors">Back to top</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
