import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-border-light flex justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                {/* Minimalist Side Header */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono">// 01</span>
                        <h2 className="text-xl md:text-2xl font-light tracking-tight uppercase text-text-main">
                            Biographical <br className="hidden md:block" /> Sketch
                        </h2>
                    </div>
                    <div className="w-8 h-px bg-border-light"></div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 flex flex-col gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-lg md:text-xl font-light leading-relaxed tracking-tight text-text-main"
                    >
                        <p>
                            I'm <span className="font-medium">Sitt Min Thar</span>, a backend developer based in Vietnam. 
                            I approach software with a focus on structural integrity and performance, currently 
                            interning in Software Development at <a href="https://www.facebook.com/aiot.global.inc" target="_blank" rel="noopener noreferrer" className="border-b border-border-light hover:border-text-main transition-colors pb-0.5">AIOT Inc</a>.
                        </p>
                    </motion.div>

                    {/* Status Info - Refined Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-light border border-border-light overflow-hidden shadow-sm">
                        <div className="bg-primary-bg p-6 flex flex-col gap-3">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Current Status</span>
                            <span className="text-xs font-medium tracking-wide uppercase text-text-main">Developing intelligent pipelines</span>
                        </div>
                        <div className="bg-primary-bg p-6 flex flex-col gap-3">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-mono">Education</span>
                            <span className="text-xs font-medium tracking-wide uppercase text-text-main">BS Data Science @ SBS</span>
                        </div>
                    </div>
                    
                    <div className="text-xs text-text-muted leading-relaxed font-light max-w-md">
                        <p>
                            My process is driven by the intersection of robust backend systems and modern AI integration, 
                            ensuring every digital solution scale effectively and provides genuine value.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
