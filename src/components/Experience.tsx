import React from 'react';

const Experience = () => {
    const skills = [
        { cat: "BACKEND", items: ["Python", "Java", "Go", "Spring Boot", "PHP"] },
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
        <section id="experience" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-24">
                
                {/* Arsenal Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 02</span>
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">Technical <br className="hidden md:block" /> Arsenal</h2>
                    </div>
                    
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                        {skills.map((skill, i) => (
                            <div key={i} className="flex flex-col gap-3 group">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-muted border-b border-border-light pb-2 group-hover:border-text-main transition-colors duration-500">
                                    {skill.cat}
                                </h4>
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {skill.items.map((item, idx) => (
                                        <span key={idx} className="text-xs font-light tracking-tight text-text-main/80">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quest Log / Education */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-24 border-t border-border-light/50 border-dashed">
                    <div className="md:col-span-4 flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 03</span>
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">Quest <br className="hidden md:block" /> Log</h2>
                    </div>

                    <div className="md:col-span-8 flex flex-col gap-12">
                        {education.map((edu, idx) => (
                            <div key={idx} className="flex flex-col gap-2 group">
                                <div className="flex justify-between items-baseline border-b border-border-light pb-2 group-hover:border-text-main transition-colors duration-500">
                                    <h4 className="text-sm font-medium tracking-tight uppercase text-text-main">{edu.school}</h4>
                                    <span className="text-[10px] font-mono text-text-muted">{edu.year}</span>
                                </div>
                                <p className="text-xs font-light text-text-muted tracking-wide">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
