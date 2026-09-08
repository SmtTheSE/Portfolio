import Reveal from './Reveal';

const Experience = () => {
    const roles = [
        {
            org: 'AD VENTURE STUDIO',
            title: 'SOFTWARE ENGINEER',
            year: '2026 - PRESENT',
            detail: 'Building and shipping mobile apps for App Store and Google Play: product engineering, store releases, and infrastructure.',
        },
        {
            org: 'BRAVESTEP',
            href: 'https://bravestep.ai/',
            title: 'FOUNDING ENGINEER',
            year: 'PRESENT',
            detail: 'Founding engineering role: systems direction and product infrastructure.',
        },
        {
            org: 'MALIBU',
            href: 'https://malibu.tech/',
            title: 'RELEASE-ACCEPTANCE ENGINEER',
            year: 'PRESENT',
            detail: 'Independent release-acceptance engineer for a macOS distributed-compute marketplace, the mandatory physical-hardware validation gate between CI-green and fleet rollout.',
        },
        {
            org: 'AIOT INC',
            href: 'https://www.facebook.com/aiot.global.inc',
            title: 'SOFTWARE DEVELOPMENT INTERN',
            year: 'INTERNSHIP',
            detail: 'Internship focused on backend integration, application structure, and production-minded software practices.',
        },
    ];

    const skills = [
        { cat: "BACKEND", items: ["Python", "Java", "Go", "Spring Boot", "PHP"] },
        { cat: "MOBILE", items: ["iOS / Android release", "ASO-ready builds", "App Store", "Google Play"] },
        { cat: "DATA ENG", items: ["Pandas", "Numpy", "Matplotlib", "DataViz"] },
        { cat: "DATABASE", items: ["MySQL", "SQL Optimization", "Postgres"] },
        { cat: "DEVOPS", items: ["Docker", "AWS S3", "Nginx", "Git"] }
    ];

    const education = [
        {
            school: 'SAIGON BUSINESS SCHOOL',
            degree: 'BACHELOR OF DATA SCIENCE',
            year: 'EXPECTED 2027'
        },
        {
            school: 'UNIV OF COMPUTER STUDIES, YANGON',
            degree: 'BSC SOFTWARE ENG',
            year: '2022 - 2024'
        }
    ];

    return (
        <section id="experience" className="py-24 md:py-32 px-6 md:px-12 w-full flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-24">

                {/* Roles */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">Experience</h2>
                        <div className="w-8 h-px bg-border-light" />
                    </div>

                    <div className="md:col-span-8 flex flex-col gap-5">
                        {roles.map((role, idx) => (
                            <Reveal key={idx} delay={idx * 0.06} className="liquid-card flex flex-col gap-2 p-6 group transition-shadow duration-300 hover:shadow-liquid-lg">
                                <div className="flex justify-between items-baseline gap-4">
                                    {role.href ? (
                                        <a
                                            href={role.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium tracking-tight uppercase text-text-main border-b border-transparent hover:border-text-main transition-colors"
                                        >
                                            {role.org}
                                        </a>
                                    ) : (
                                        <h4 className="text-sm font-medium tracking-tight uppercase text-text-main">{role.org}</h4>
                                    )}
                                    <span className="text-[10px] font-mono text-text-muted shrink-0">{role.year}</span>
                                </div>
                                <p className="text-xs font-medium tracking-wide text-text-main">{role.title}</p>
                                <p className="text-xs font-light text-text-muted leading-relaxed">{role.detail}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Arsenal Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">Technical <br className="hidden md:block" /> Arsenal</h2>
                        <div className="w-8 h-px bg-border-light" />
                    </div>

                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {skills.map((skill, i) => (
                            <Reveal key={i} delay={i * 0.05} className="liquid-card flex flex-col gap-3 p-5">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-muted">
                                    {skill.cat}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, idx) => (
                                        <span key={idx} className="rounded-full bg-secondary-bg px-2.5 py-1 text-[10px] font-light tracking-tight text-text-main/80">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">Education</h2>
                        <div className="w-8 h-px bg-border-light" />
                    </div>

                    <div className="md:col-span-8 flex flex-col gap-4">
                        {education.map((edu, idx) => (
                            <Reveal key={idx} delay={idx * 0.06} className="liquid-card flex flex-col gap-2 p-6">
                                <div className="flex justify-between items-baseline gap-4">
                                    <h4 className="text-sm font-medium tracking-tight uppercase text-text-main">{edu.school}</h4>
                                    <span className="text-[10px] font-mono text-text-muted">{edu.year}</span>
                                </div>
                                <p className="text-xs font-light text-text-muted tracking-wide">{edu.degree}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
