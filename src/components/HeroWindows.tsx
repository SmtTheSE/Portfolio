import { ReactNode, RefObject, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import profilePortrait from '../assets/profile-portrait.webp';
import { useMediaQuery } from '../hooks/useMediaQuery';

type WinId = 'about' | 'work' | 'focus' | 'title';

type WinProps = {
    id: WinId;
    title: string;
    tone: string;
    className: string;
    z: number;
    delay: number;
    draggable: boolean;
    constraints: RefObject<HTMLDivElement>;
    onFront: (id: WinId) => void;
    onClose: (id: WinId) => void;
    children: ReactNode;
};

const Win = ({ id, title, tone, className, z, delay, draggable, constraints, onFront, onClose, children }: WinProps) => (
    <motion.div
        layout={false}
        drag={draggable}
        dragConstraints={constraints}
        dragMomentum={false}
        dragElastic={0.08}
        onPointerDown={() => onFront(id)}
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ zIndex: z }}
        className={`${tone} text-ink ${draggable ? 'cursor-grab active:cursor-grabbing touch-none' : ''} ${className}`}
    >
        <div className="flex items-center justify-between pl-2.5 pr-1 py-1 text-[13px] leading-none select-none">
            <span>{title}</span>
            <button
                type="button"
                aria-label={`Close the ${title} window`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => onClose(id)}
                className="flex items-center justify-center w-10 h-10 -my-[10px] -mr-2.5 text-[16px] leading-none hover:opacity-60"
            >
                &times;
            </button>
        </div>
        {children}
    </motion.div>
);

const HeroWindows = () => {
    const stageRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [closed, setClosed] = useState<WinId[]>([]);
    const [order, setOrder] = useState<WinId[]>(['about', 'work', 'focus', 'title']);

    const front = (id: WinId) => setOrder((o) => [...o.filter((x) => x !== id), id]);
    const close = (id: WinId) => setClosed((c) => [...c, id]);
    const z = (id: WinId) => 10 + order.indexOf(id);
    const isOpen = (id: WinId) => !closed.includes(id);

    const shared = { constraints: stageRef, onFront: front, onClose: close, draggable: isDesktop } as const;

    return (
        <section id="top" aria-label="Introduction" className="relative pt-[84px] md:pt-[96px] px-5 md:px-7 pb-16 md:pb-8">
            <h1 className="sr-only">Sitt Min Thar, software engineer</h1>

            <div ref={stageRef} className="relative mx-auto max-w-[1120px] md:h-[660px] flex flex-col gap-4 md:block">
                <AnimatePresence>
                    {isOpen('about') && (
                        <Win
                            key="about"
                            id="about"
                            title="About"
                            tone="bg-win-butter"
                            z={z('about')}
                            delay={0.05}
                            className="w-[78%] max-w-[360px] md:absolute md:left-[6%] md:top-[28px] md:w-[40%] md:max-w-[440px]"
                            {...shared}
                        >
                            <div className="px-2 pb-1">
                                <div className="relative aspect-[4/5] overflow-hidden bg-win-butter">
                                    <img
                                        src={profilePortrait}
                                        alt="Portrait of Sitt Min Thar"
                                        draggable={false}
                                        className="absolute inset-0 w-full h-full object-cover object-[50%_30%] select-none"
                                    />
                                </div>
                                <p className="font-serif text-[19px] md:text-[20px] leading-[1.25] px-0.5 pt-2.5 pb-2">
                                    Hello, I&rsquo;m Sitt Min Thar. A software engineer based in Ho Chi Minh City.
                                </p>
                            </div>
                        </Win>
                    )}

                    {isOpen('work') && (
                        <Win
                            key="work"
                            id="work"
                            title="Work"
                            tone="bg-win-coral"
                            z={z('work')}
                            delay={0.15}
                            className="w-[86%] max-w-[380px] self-end md:absolute md:left-[36%] md:top-[56px] md:w-[34%] md:max-w-[370px]"
                            {...shared}
                        >
                            <p className="px-3 pt-2 pb-3.5 text-[14px] leading-[1.45]">
                                Currently shipping mobile apps at Ad Venture Studio, and building as Founding
                                Engineer at Bravestep.
                            </p>
                        </Win>
                    )}

                    {isOpen('focus') && (
                        <Win
                            key="focus"
                            id="focus"
                            title="Focus"
                            tone="bg-win-sky"
                            z={z('focus')}
                            delay={0.25}
                            className="w-[90%] max-w-[420px] md:absolute md:left-[43%] md:top-[215px] md:w-[40%] md:max-w-[430px]"
                            {...shared}
                        >
                            <p className="px-3 pt-2 pb-3.5 text-[14px] leading-[1.45]">
                                I care most about systems that have to be right: data you can trust, releases you
                                can ship, and AI that earns its place.
                            </p>
                        </Win>
                    )}

                    {isOpen('title') && (
                        <Win
                            key="title"
                            id="title"
                            title="Title"
                            tone="bg-win-lilac"
                            z={z('title')}
                            delay={0.35}
                            className="w-[72%] max-w-[360px] self-center md:absolute md:left-[30%] md:top-[362px] md:w-[40%] md:max-w-[440px]"
                            {...shared}
                        >
                            <p className="font-serif text-[28px] md:text-[32px] leading-none px-3 pt-2 pb-3.5">
                                Software engineer
                            </p>
                        </Win>
                    )}
                </AnimatePresence>

                {closed.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setClosed([])}
                        className="mono-label hover:text-fg transition-colors md:absolute md:left-0 md:bottom-0 w-fit"
                    >
                        (restore windows)
                    </button>
                )}
            </div>
        </section>
    );
};

export default HeroWindows;
