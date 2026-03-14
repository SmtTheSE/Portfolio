import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        id: '01',
        title: 'RENTAL PROPERTY AI',
        role: 'LEAD ENG',
        year: '2026',
        status: 'ACTIVE',
        link: 'https://github.com/SmtTheSE/Rental-Property-AI-Platform',
        desc: '10M Dataset-Powered Demand Forecasting & Gap Analysis. Engineered a market analysis platform processing 10 million rental listings across 40 Indian cities.',
        tech: ['Python', 'Flask', 'Scikit', 'Next.js'],
        category: 'SE'
    },
    {
        id: '02',
        title: 'MOMO SERVICE',
        role: 'DATA ENG',
        year: '2025',
        status: 'HACKATHON',
        link: 'https://github.com/SmtTheSE/MoMo-Service-Analytics',
        desc: 'Comprehensive data analytics solution for tracking service performance and demographic trends. Built an interactive Plotly Dash application.',
        tech: ['Python', 'Pandas', 'Plotly'],
        category: 'SE'
    },
    {
        id: '03',
        title: 'KAMISORI E-COM',
        role: 'ARCHITECT',
        year: '2024',
        status: 'ACTIVE',
        link: 'https://github.com/SmtTheSE/Kamisori',
        desc: '"Embrace the Future" - Local Brand in Myanmar. Architected a secure, scalable e-commerce backend ensuring data integrity.',
        tech: ['PostgreSQL', 'Supabase', 'Edge Functions'],
        category: 'SE'
    },
    {
        id: '04',
        title: 'NAME CARD PLUGIN',
        role: 'FULL STACK',
        year: '2024',
        status: 'IN DEV',
        link: 'https://github.com/SmtTheSE/Name-Card-Plugin',
        desc: 'Comprehensive WordPress plugin for digital identity management with NFC writing capabilities and real-time analytics.',
        tech: ['PHP', 'MySQL', 'JavaScript', 'NFC'],
        category: 'SE'
    },
    {
        id: '05',
        title: 'DENTAL BRIDGE',
        role: 'FULL STACK',
        year: '2024',
        status: 'ACTIVE',
        link: 'https://github.com/SmtTheSE/DentalBridge',
        desc: 'AI-powered treatment coordinator using Google Gemini 1.5 Pro to translate dental jargon into patient-friendly language.',
        tech: ['FastAPI', 'Gemini AI', 'Next.js'],
        category: 'SE'
    },
    {
        id: '06',
        title: 'DENTAL BLINDING & AGE ESTIMATION',
        role: 'FULL STACK',
        year: '2026',
        status: 'COMPLETED',
        link: 'https://github.com/SmtTheSE/Dental-Blinding-Process-Project',
        desc: 'A specialized web application engineered for pediatric dental age estimation (5-12 years) utilizing OPG (panoramic dental X-ray) imaging. The platform strictly implements the AlQahtani and Demirjian scientific methods. It enforces a robust, role-based blinding workflow between Supervisors and Principal Investigators to guarantee absolute scientific rigor, separating patient data from age estimations to eliminate bias during analysis.',
        tech: ['Python', 'Flask', 'PostgreSQL'],
        category: 'SE'
    },
    {
        id: '07',
        title: 'SBS STUDENT SERVING SYSTEM',
        role: 'FULL STACK',
        year: 'ACTIVE',
        status: 'ACTIVE',
        link: 'https://github.com/SmtTheSE/docker_SBS',
        desc: 'A comprehensive full-stack management platform developed for Saigon Business School to streamline academic activities, personal information, and institutional communication. Engineered with a client-server architecture featuring a Spring Boot 3 REST API and a React 18 frontend. It implements secure JWT-based authentication and Role-Based Access Control (RBAC) to provide tailored functionality for students, lecturers, and administrators, alongside robust Docker containerization and AWS S3 integration.',
        tech: ['Java 21', 'Spring Boot 3', 'React 18', 'Docker', 'AWS S3'],
        category: 'SE'
    },
    {
        id: '08',
        title: 'SCHOLARSHIP ANNOUNCEMENT WEB',
        role: 'FULL STACK',
        year: '2024',
        status: 'COMPLETED',
        link: 'https://github.com/SmtTheSE/Scholarship_Announcement_Web',
        desc: 'A targeted web-based platform dedicated to publishing and managing scholarship opportunities for specific student demographics. Designed to streamline the discovery and application process for educational funding.',
        tech: ['Python', 'Django', 'HTML', 'CSS'],
        category: 'SE'
    },
    {
        id: '09',
        title: 'DATACLEANR',
        role: 'FULL STACK',
        year: '2025',
        status: 'COMPLETED',
        link: 'https://github.com/SmtTheSE/Data-Cleanr',
        desc: 'A full-stack web application for automated dataset cleaning and harmonization. It features an advanced AI-powered industry detection system capable of classifying datasets into 12 major industries to provide specific cleaning suggestions. Users can upload raw CSV/Excel files and instantly apply operations like duplicate removal, column harmonization, and missing value handling.',
        tech: ['Python', 'C++', 'Cython', 'C', 'JavaScript', 'Fortran'],
        category: 'SE'
    },
    {
        id: '10',
        title: 'ULTIMATE BYTEME: PAN-ASIAN REAL ESTATE INTELLIGENCE',
        role: 'AI / FULL STACK',
        year: '2026',
        status: 'COMPLETED',
        link: 'https://github.com/SmtTheSE/Conference',
        desc: 'A computational intelligence web-based solution for bridging information asymmetry in emerging real estate markets. Developed for the 1st Synergia International Conference 2026. Architected with four AI modules: a LightGBM valuation engine, an investment opportunity scanner using Transfer Learning, a RAG-grounded cultural & legal AI assistant with Qwen2.5 / Gemini, and an automated data curation lab. Designed to establish computational ground truth for equitable investment.',
        tech: ['Next.js', 'Python', 'Flask', 'LightGBM', 'Ollama'],
        category: 'SE'
    }
];

const Projects = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'SE' | 'DATA'>('SE');

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredProjects = projects.filter(p => p.category === activeTab);

    return (
        <section id="projects" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-12">
                {/* Minimalist Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 04</span>
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
                            Selected <br className="hidden md:block" /> Works
                        </h2>
                    </div>
                    
                    {/* Tab Switcher */}
                    <div className="flex items-center gap-8 border-b border-border-light/30 pb-1">
                        <button 
                            onClick={() => setActiveTab('SE')}
                            className={`text-[10px] uppercase tracking-[0.2em] font-mono pb-2 transition-all duration-300 relative ${activeTab === 'SE' ? 'text-text-main' : 'text-text-muted hover:text-text-main/70'}`}
                        >
                            Software Eng
                            {activeTab === 'SE' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-px bg-text-main" />}
                        </button>
                        <button 
                            onClick={() => setActiveTab('DATA')}
                            className={`text-[10px] uppercase tracking-[0.2em] font-mono pb-2 transition-all duration-300 relative ${activeTab === 'DATA' ? 'text-text-main' : 'text-text-muted hover:text-text-main/70'}`}
                        >
                            Data Analysis
                            {activeTab === 'DATA' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-px bg-text-main" />}
                        </button>
                    </div>

                    <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-mono bg-secondary-bg px-3 py-1 border border-border-light">
                        Count: {activeTab === 'SE' ? filteredProjects.length.toString().padStart(2, '0') : '01'}
                    </div>
                </div>

                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Featured Kaggle Link for Data Analysis Tab */}
                            {activeTab === 'DATA' ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-8 md:p-12 border border-border-light bg-secondary-bg/30 relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="text-5xl font-mono">KAGGLE</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                        <div className="flex flex-col gap-4 max-w-xl">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">Archive Showcase</span>
                                                <span className="w-8 h-px bg-border-light"></span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-light tracking-tight text-text-main uppercase">
                                                Kaggle Analytics <br /> & Findings
                                            </h3>
                                            <p className="text-sm font-light leading-relaxed text-text-muted">
                                                A comprehensive showcase of data analysis projects and findings from Kaggle. 
                                                Features interactive Streamlit dashboards exploring various datasets, from demographic trends to predictive modeling.
                                            </p>
                                        </div>
                                        <a 
                                            href="https://kaggleanalysissittminthar.streamlit.app/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-8 py-4 bg-text-main text-primary-bg text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-text-main/90 transition-colors"
                                        >
                                            View Showcase ↗
                                        </a>
                                    </div>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Header Row - Only for standard projects */}
                                    <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border-light text-[9px] text-text-muted uppercase tracking-[0.2em] mb-2 px-2 font-mono">
                                        <div className="col-span-1 hidden md:block">ID</div>
                                        <div className="col-span-8 md:col-span-7">Project Title</div>
                                        <div className="hidden md:block col-span-2 text-right">Role / Year</div>
                                        <div className="col-span-4 md:col-span-2 text-right">Expansion</div>
                                    </div>

                                    {/* Project List */}
                                    <div className="flex flex-col">
                                        {filteredProjects.map((project, idx) => (
                                            <motion.div
                                                key={project.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="border-b border-border-light last:border-b-0 group"
                                            >
                                                <div
                                                    onClick={() => toggleExpand(project.id)}
                                                    className="grid grid-cols-12 gap-4 py-6 items-center cursor-pointer px-2 transition-colors duration-300 group-hover:bg-secondary-bg/50"
                                                >
                                                    <div className="col-span-1 hidden md:block font-mono text-[10px] text-text-muted">{project.id}</div>

                                                    <div className="col-span-8 md:col-span-7">
                                                        <h3 className="text-sm md:text-base font-medium tracking-tight uppercase text-text-main group-hover:pl-2 transition-all duration-300">
                                                            {project.title}
                                                        </h3>
                                                    </div>

                                                    <div className="hidden md:block col-span-2 text-right">
                                                        <span className="block text-[9px] uppercase tracking-widest text-text-muted mb-0.5">{project.role}</span>
                                                        <span className="text-[10px] font-mono text-text-main">{project.year}</span>
                                                    </div>

                                                    <div className="col-span-4 md:col-span-2 flex justify-end items-center gap-6">
                                                        <span className="text-[8px] tracking-[0.2em] uppercase hidden md:inline-block border border-border-light px-2 py-0.5 text-text-muted group-hover:border-text-main group-hover:text-text-main transition-colors">
                                                            {project.status}
                                                        </span>
                                                        <div className={`text-[10px] transform transition-transform duration-500 opacity-30 group-hover:opacity-100 ${expandedId === project.id ? 'rotate-180' : ''}`}>
                                                            ↓
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Expanded Description */}
                                                <AnimatePresence>
                                                    {expandedId === project.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                                            className="overflow-hidden bg-secondary-bg/20"
                                                        >
                                                            <div className="pb-10 pl-2 md:pl-[8.33%] pr-4 grid grid-cols-1 md:grid-cols-12 gap-8 py-6 border-t border-border-light/50">
                                                                <div className="md:col-span-7 flex flex-col gap-4">
                                                                    <p className="text-xs md:text-sm font-light leading-relaxed text-text-main/90 max-w-xl">
                                                                        {project.desc}
                                                                    </p>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {project.tech.map((t, i) => (
                                                                            <span key={i} className="text-[8px] uppercase tracking-[0.1em] border border-border-light px-2 py-0.5 text-text-muted font-mono">
                                                                                {t}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="md:col-span-5 flex flex-col justify-end items-end gap-4">
                                                                    <a
                                                                        href={project.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-[9px] uppercase tracking-[0.2em] font-medium text-text-main border-b border-text-main/20 hover:border-text-main transition-colors pb-1"
                                                                    >
                                                                        Source Code ↗
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center mt-12">
                    <a
                        href="https://github.com/SmtTheSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-[0.3em] font-medium text-text-muted border border-border-light px-10 py-4 hover:border-text-main hover:text-text-main transition-all duration-500 hover:tracking-[0.4em]"
                    >
                        Archive Repository
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
