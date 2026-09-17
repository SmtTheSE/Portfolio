import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import profile from '/profile.jpeg';
import { nowStatus } from '../data/now';

type ProfileGateProps = {
    onEnter: () => void;
};

/**
 * Mobile-only entry card shown before the full site mounts.
 * Reveals the portfolio only after the visitor taps through.
 */
const ProfileGate = ({ onEnter }: ProfileGateProps) => {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.gate-card',
                { opacity: 0, y: 24, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.8)' },
            );
        },
        { scope: rootRef },
    );

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10 bg-primary-bg"
        >
            <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-indigo-200/30 via-fuchsia-100/20 to-transparent blur-3xl pointer-events-none"
                aria-hidden="true"
            />

            <div className="gate-card liquid-card relative z-10 w-full max-w-xs overflow-hidden rounded-3xl">
                <div className="w-full aspect-[4/5] overflow-hidden">
                    <img src={profile} alt="Sitt Min Thar" className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col gap-4 p-5">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-lg font-medium tracking-tight text-text-main">Sitt Min Thar</h1>
                        <p className="text-xs text-text-muted font-light leading-relaxed">
                            Software Engineer at Ad Venture Studio, building mobile apps and backend systems.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-light">
                        <span className="liquid-pill inline-flex items-center gap-1.5 px-3 py-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${nowStatus.availableForWork ? 'bg-green-500 animate-pulse' : 'bg-green-500'}`} />
                            {nowStatus.availableForWork ? 'Available for Work' : 'SWE · Ad Venture Studio'}
                        </span>
                        <span className="liquid-pill inline-flex px-3 py-1.5">{nowStatus.location}</span>
                    </div>

                    <button
                        type="button"
                        onClick={onEnter}
                        className="liquid-pill mt-1 flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-text-main hover:text-text-main transition-colors"
                    >
                        View Portfolio
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileGate;
