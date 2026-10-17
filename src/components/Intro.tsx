import Reveal from './Reveal';

const PLACES = [
    'Ad Venture Studio',
    'Bravestep',
    'Malibu',
    'AIOT Inc',
    'Saigon Business School',
    'RMIT ADC Hackathon',
];

const Intro = () => (
    <section aria-label="Summary" className="px-5 md:px-7 pt-10 md:pt-20 pb-20 md:pb-32">
        <div className="mx-auto max-w-[1120px]">
            <Reveal>
                <p className="max-w-[760px] text-[28px] md:text-[38px] leading-[1.18] font-light tracking-[-0.03em] text-fg">
                    Currently shipping mobile apps at Ad Venture Studio and building as Founding Engineer at
                    Bravestep, with a love for backend systems, data, and AI that ships. This is a curation of
                    what I&rsquo;ve built <span aria-hidden="true">&#10023;</span> and where.
                </p>
            </Reveal>
        </div>

        <div
            className="relative mt-14 md:mt-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            aria-label="Places I have worked and built with"
        >
            <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-14 md:gap-20 pr-14 md:pr-20">
                {[...PLACES, ...PLACES].map((name, i) => (
                    <li
                        key={`${name}-${i}`}
                        aria-hidden={i >= PLACES.length ? true : undefined}
                        className="whitespace-nowrap text-[22px] md:text-[30px] font-medium tracking-[-0.03em] text-muted"
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Intro;
