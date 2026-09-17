import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { nowStatus } from '../data/now';

const OFFERINGS = ['Backend Systems', 'Mobile Shipping', 'AI Integration', 'Remote / Contract'];

const HireMe = () => {
    return (
        <section id="hire" className="px-6 md:px-12 w-full flex justify-center py-16 md:py-20 scroll-mt-[52px]">
            <div className="w-full max-w-5xl">
                <SectionHeader label="Hire Me" />

                <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-x-[81px] gap-y-8">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[28px] md:text-[32px] leading-[35px] font-light tracking-tight text-text-main">
                            Let's build something worth shipping.
                        </h3>

                        <span className="inline-flex w-fit items-center gap-2 text-[13px] tracking-tight text-text-muted">
                            <span className={`w-1.5 h-1.5 rounded-full ${nowStatus.availableForWork ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
                            {nowStatus.availableForWork ? 'Available for new opportunities' : 'Open to select remote and contract work'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-6">
                        <p className="text-[17px] leading-[26px] font-light text-text-main">
                            I build backend systems, mobile apps, and AI-integrated products, currently shipping at{' '}
                            Ad Venture Studio and Bravestep, with room for select remote or contract work on the
                            side. If you're building something that needs solid engineering, I'd like to hear about it.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {OFFERINGS.map((item) => (
                                <span
                                    key={item}
                                    className="liquid-pill px-3 py-1.5 text-[12px] font-light tracking-tight text-text-main"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <a
                                href="mailto:sittminthar005@gmail.com"
                                className="liquid-pill inline-flex px-6 py-3 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity"
                            >
                                Email Me ↗
                            </a>
                            <a
                                href="/Sitt_Min_Thar_Resume.pdf"
                                download
                                className="liquid-pill inline-flex items-center gap-1.5 px-6 py-3 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default HireMe;
