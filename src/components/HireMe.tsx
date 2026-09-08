import Reveal from './Reveal';
import { nowStatus } from '../data/now';

const OFFERINGS = ['Backend Systems', 'Mobile Shipping', 'AI Integration', 'Remote / Contract'];

const HireMe = () => {
    return (
        <section id="hire" className="px-6 md:px-12 w-full flex justify-center pb-24 md:pb-32">
            <div className="w-full max-w-5xl">
                <Reveal
                    scale
                    className="relative overflow-hidden liquid-card rounded-[2rem] md:rounded-[2.5rem] shadow-liquid-lg px-8 py-14 md:px-16 md:py-20 flex flex-col items-start gap-8"
                >
                    {/* Ambient liquid glow, matches the Hero treatment */}
                    <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-indigo-200/40 via-fuchsia-100/25 to-transparent blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-3">
                            <span className="liquid-pill inline-flex w-fit items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-widest text-text-muted">
                                <span className={`w-1.5 h-1.5 rounded-full ${nowStatus.availableForWork ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
                                {nowStatus.availableForWork ? 'Available for new opportunities' : 'Open to select remote & contract work'}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-text-main leading-[1.05] max-w-2xl">
                            Let's build something worth shipping.
                        </h2>

                        <p className="text-sm md:text-base font-light leading-relaxed text-text-muted max-w-xl">
                            I build backend systems, mobile apps, and AI-integrated products, currently shipping at{' '}
                            <span className="text-text-main font-medium">Ad Venture Studio</span> and{' '}
                            <span className="text-text-main font-medium">Bravestep</span>, with room for select remote or
                            contract work on the side. If you're building something that needs solid engineering, I'd
                            like to hear about it.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {OFFERINGS.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full bg-secondary-bg px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-text-main/80 font-medium"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a
                                href="mailto:sittminthar005@gmail.com"
                                className="rounded-full px-8 py-4 bg-text-main text-primary-bg text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-text-main/90 transition-colors shadow-liquid"
                            >
                                Email Me ↗
                            </a>
                            <a
                                href="/Sitt_Min_Thar_Resume.pdf"
                                download
                                className="liquid-pill inline-flex items-center gap-1.5 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-medium text-text-main hover:opacity-70 transition-opacity"
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
