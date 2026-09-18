import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const Experience = () => {
    const roles = [
        {
            org: 'AD VENTURE STUDIO',
            title: 'SOFTWARE ENGINEER',
            year: '2026 - PRESENT',
            detail: 'Building and shipping mobile apps for App Store and Google Play: product engineering, store releases, and infrastructure.',
        },
        {
            org: 'VNG',
            href: 'https://www.vng.com.vn/',
            title: 'BUSINESS ANALYST (ONSITE)',
            year: '2026 - PRESENT',
            detail: 'Onsite Business Analyst on an AI-enabled Legal Operations platform at VNG, one of Vietnam’s largest technology corporations, working on requirements and delivery coordination for the Legal & Compliance function. Platform and process details are internal to VNG.',
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
        <section id="experience" className="py-16 md:py-20 px-6 md:px-12 w-full flex justify-center scroll-mt-[52px]">
            <div className="w-full max-w-5xl flex flex-col gap-16 md:gap-20">

                {/* Roles */}
                <div>
                    <SectionHeader label="Experience" />
                    <div className="flex flex-col">
                        {roles.map((role, idx) => (
                            <Reveal key={idx} delay={idx * 0.06} className="grid grid-cols-1 md:grid-cols-2 gap-x-[81px] gap-y-2 py-7 border-b border-border-light">
                                <div className="flex flex-col gap-1">
                                    {role.href ? (
                                        <a
                                            href={role.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[21px] leading-[26px] font-medium tracking-tight text-[#0066CC] underline decoration-[#0066CC]/40 underline-offset-[3px] hover:decoration-[#0066CC] transition-colors w-fit"
                                        >
                                            {role.org}
                                        </a>
                                    ) : (
                                        <h3 className="text-[21px] leading-[26px] font-medium tracking-tight text-text-main">{role.org}</h3>
                                    )}
                                    <span className="text-[13px] tracking-tight text-text-muted">{role.year}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[17px] leading-[26px] font-light text-text-main">{role.title}</p>
                                    <p className="text-[17px] leading-[26px] font-light text-text-muted">{role.detail}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <SectionHeader label="Technical Arsenal" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[81px] gap-y-8">
                        {skills.map((skill, i) => (
                            <Reveal key={i} delay={i * 0.05} className="flex flex-col gap-3">
                                <h3 className="text-[11px] uppercase tracking-[0.15em] text-text-muted">
                                    {skill.cat}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, idx) => (
                                        <span key={idx} className="liquid-pill px-3 py-1.5 text-[12px] font-light tracking-tight text-text-main">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <SectionHeader label="Education" />
                    <div className="flex flex-col">
                        {education.map((edu, idx) => (
                            <Reveal key={idx} delay={idx * 0.06} className="grid grid-cols-1 md:grid-cols-2 gap-x-[81px] gap-y-2 py-7 border-b border-border-light">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[21px] leading-[26px] font-medium tracking-tight text-text-main">{edu.school}</h3>
                                    <span className="text-[13px] tracking-tight text-text-muted">{edu.year}</span>
                                </div>
                                <p className="text-[17px] leading-[26px] font-light text-text-muted">{edu.degree}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
