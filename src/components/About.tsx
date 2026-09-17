import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import ExternalLink from './ExternalLink';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-20 px-6 md:px-12 w-full flex justify-center scroll-mt-[52px]">
            <div className="w-full max-w-5xl">
                <SectionHeader label="Biographical Sketch" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[81px] gap-y-6 text-[17px] leading-[26px] text-text-main font-light">
                    <Reveal className="flex flex-col gap-6">
                        <p>
                            Sitt Min Thar is a software engineer based in Ho Chi Minh City, Vietnam, building
                            with a focus on structure and performance.
                        </p>
                        <p>
                            He is a Software Engineer at Ad Venture Studio, a venture studio shipping mobile apps
                            to the App Store and Google Play, where he owns product engineering, store releases,
                            and app infrastructure.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1} className="flex flex-col gap-6">
                        <p>
                            He is also a Founding Engineer at{' '}
                            <ExternalLink href="https://bravestep.ai/">Bravestep</ExternalLink>
                            . His process is driven by the intersection of robust backend systems and modern AI
                            integration, so that every solution scales and provides genuine value.
                        </p>
                        <p>
                            Sitt is studying for a BS in Data Science at SBS, alongside the engineering work.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-x-[81px] gap-y-8 mt-12 pt-10 border-t border-border-light">
                    <div className="flex flex-col gap-2">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">Current role</span>
                        <span className="text-[17px] leading-[26px] font-light text-text-main">
                            Software Engineer, Ad Venture Studio
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">Education</span>
                        <span className="text-[17px] leading-[26px] font-light text-text-main">
                            BS Data Science, SBS
                        </span>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default About;
