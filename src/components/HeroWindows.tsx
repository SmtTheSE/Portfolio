import { ReactNode, useRef, useState } from 'react';
import profilePortrait from '../assets/profile-portrait.webp';
import { Draggable, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';
import { useMediaQuery } from '../hooks/useMediaQuery';

type WinProps = {
    id: string;
    draggable: boolean;
    title: string;
    tone: string;
    className: string;
    zIndex: number;
    onClose: (id: string) => void;
    children: ReactNode;
};

const Win = ({ id, draggable, title, tone, className, zIndex, onClose, children }: WinProps) => (
    <div
        data-win={id}
        data-cursor={draggable ? 'Drag' : undefined}
        style={{ zIndex }}
        className={`${tone} will-change-transform md:cursor-grab md:active:cursor-grabbing ${className}`}
    >
        <div className="flex items-center justify-between pl-2.5 pr-1 py-1 text-[13px] leading-none select-none">
            <span>{title}</span>
            <button
                type="button"
                data-cursor="Close"
                aria-label={`Close the ${title} window`}
                onClick={() => onClose(id)}
                className="flex items-center justify-center w-10 h-10 -my-[10px] -mr-2.5 text-[16px] leading-none hover:opacity-60"
            >
                &times;
            </button>
        </div>
        {children}
    </div>
);

const HeroWindows = () => {
    const stageRef = useRef<HTMLDivElement>(null);
    const [closed, setClosed] = useState<string[]>([]);
    const draggable = useMediaQuery('(min-width: 768px)');

    useGSAP(
        () => {
            const stage = stageRef.current;
            if (!stage) return;
            const wins = gsap.utils.toArray<HTMLElement>('[data-win]', stage);
            // Enter in visual order, top to bottom, whichever layout is active.
            const visual = [...wins].sort((x, y) => x.getBoundingClientRect().top - y.getBoundingClientRect().top);
            const reduced = prefersReducedMotion();

            // Entrance: windows fade in one after another, staying perfectly straight.
            if (!reduced) {
                gsap.from(visual, {
                    autoAlpha: 0,
                    scale: 0.97,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.1,
                    delay: 0.05,
                });
            }

            // Dragging is a desktop interaction; on phones the windows stay in a stack.
            const mm = gsap.matchMedia();
            mm.add('(min-width: 768px)', () => {
                const draggables = Draggable.create(wins, {
                    type: 'x,y',
                    bounds: stage,
                    inertia: !reduced,
                    edgeResistance: 0.9,
                    zIndexBoost: true,
                    onPress() {
                        gsap.to(this.target, { scale: 1.015, duration: 0.18, ease: 'power2.out' });
                    },
                    onRelease() {
                        gsap.to(this.target, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
                    },
                });
                return () => draggables.forEach((d) => d.kill());
            });
        },
        { scope: stageRef },
    );

    const close = (id: string) => {
        const el = stageRef.current?.querySelector<HTMLElement>(`[data-win="${id}"]`);
        if (!el) return;
        gsap.to(el, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.22,
            ease: 'power2.in',
            onComplete: () => setClosed((c) => (c.includes(id) ? c : [...c, id])),
        });
    };

    const restore = () => {
        const els = closed
            .map((id) => stageRef.current?.querySelector<HTMLElement>(`[data-win="${id}"]`))
            .filter((el): el is HTMLElement => Boolean(el));
        gsap.to(els, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.6)',
            stagger: 0.1,
        });
        setClosed([]);
    };

    return (
        <section id="top" aria-label="Introduction" className="relative pt-[84px] md:pt-[96px] px-5 md:px-7 pb-16 md:pb-8">
            <h1 className="sr-only">Sitt Min Thar, software engineer</h1>

            <div ref={stageRef} className="relative mx-auto max-w-[1120px] md:h-[660px] flex flex-col gap-3 md:block">
                <Win
                    draggable={draggable}
                    id="about"
                    title="About"
                    tone="bg-win-green text-ink"
                    zIndex={10}
                    className="w-full order-2 md:order-none md:absolute md:left-[6%] md:top-[28px] md:w-[40%] md:max-w-[440px]"
                    onClose={close}
                >
                    <div className="px-2 pb-1">
                        <div className="relative aspect-[4/5] overflow-hidden bg-win-green">
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

                <Win
                    draggable={draggable}
                    id="work"
                    title="Work"
                    tone="bg-win-forest text-fg"
                    zIndex={11}
                    className="w-full order-3 md:order-none md:absolute md:left-[36%] md:top-[56px] md:w-[34%] md:max-w-[370px]"
                    onClose={close}
                >
                    <p className="px-3 pt-2 pb-3.5 text-[14px] leading-[1.45]">
                        Currently shipping mobile apps at Ad Venture Studio, and building as Founding Engineer at
                        Bravestep.
                    </p>
                </Win>

                <Win
                    draggable={draggable}
                    id="focus"
                    title="Focus"
                    tone="bg-win-blue text-fg"
                    zIndex={12}
                    className="w-full order-4 md:order-none md:absolute md:left-[43%] md:top-[215px] md:w-[40%] md:max-w-[430px]"
                    onClose={close}
                >
                    <p className="px-3 pt-2 pb-3.5 text-[14px] leading-[1.45]">
                        I care most about systems that have to be right: data you can trust, releases you can ship,
                        and AI that earns its place.
                    </p>
                </Win>

                <Win
                    draggable={draggable}
                    id="title"
                    title="Title"
                    tone="bg-win-sun text-ink"
                    zIndex={13}
                    className="w-full order-1 md:order-none md:absolute md:left-[30%] md:top-[362px] md:w-[40%] md:max-w-[440px]"
                    onClose={close}
                >
                    <p className="font-serif text-[28px] md:text-[32px] leading-none px-3 pt-2 pb-3.5">Software engineer</p>
                </Win>

                {closed.length > 0 && (
                    <button
                        type="button"
                        data-cursor="Restore"
                        onClick={restore}
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
