import { motion } from 'framer-motion';
import { useRef } from 'react';
import profile from '/profile.jpeg';
import { nowStatus } from '../data/now';

const Hero = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="relative min-h-[80vh] w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 pt-40 pb-20">
            {/* Grid Background Pattern */}
            <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none z-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start gap-8 flex-1"
                >
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-none text-text-main">
                            SITT MIN THAR
                        </h1>
                    </div>

                    <div className="flex flex-col gap-4 max-w-md">
                        <p className="text-sm md:text-base text-text-main/90 font-light leading-relaxed">
                            Software Engineer at Ad Venture Studio. <br className="hidden md:block" />
                            Founding Engineer at Bravestep. Data Science student.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest text-text-muted font-light">
                            <span className="inline-flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${nowStatus.availableForWork ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
                                {nowStatus.availableForWork ? 'Available for Work' : 'SWE · Ad Venture Studio'}
                            </span>
                            <span className="w-1 h-1 bg-border-light rounded-full hidden sm:block" />
                            <a href="#now" className="hover:text-text-main transition-colors max-w-[16rem] truncate">
                                Now: {nowStatus.status}
                            </a>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest text-text-muted font-light">
                            <span>Ho Chi Minh City, VN</span>
                            <span className="w-1 h-1 bg-border-light rounded-full hidden sm:block"></span>
                            <a href="/Sitt_Min_Thar_CV.pdf" download className="flex items-center gap-1.5 hover:text-text-main transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download CV
                            </a>
                            <span className="w-1 h-1 bg-border-light rounded-full hidden sm:block"></span>
                            <a href="#activity" className="hover:text-text-main transition-colors duration-300">
                                AT Protocol Feed
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Profile Image - Refined */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="w-48 h-60 md:w-64 md:h-80 overflow-hidden relative group border border-border-light shadow-sm"
                >
                    <img
                        src={profile}
                        alt="Sitt Min Thar"
                        className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                    />
                </motion.div>
            </div>

            {/* Subtle Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-12 flex flex-col items-center gap-2"
            >
                <span className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-mono">Scroll</span>
                <div className="w-px h-8 bg-border-light overflow-hidden relative">
                    <motion.div
                        animate={{ y: [0, 32] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-full h-full bg-text-main absolute top-[-100%]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
