import { motion } from 'framer-motion';
import { useRef } from 'react';
import profile from '/profile.jpeg';

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
                            Backend Developer / Data Science Student. <br className="hidden md:block" />
                            Building intelligent infrastructure and data-driven solutions.
                        </p>
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-text-muted font-light">
                            <span>Ho Chi Minh City, VN</span>
                            <span className="w-1 h-1 bg-border-light rounded-full"></span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Available for Work
                            </span>
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
