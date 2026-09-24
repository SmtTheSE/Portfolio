import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const STACK = ['Electron', 'TypeScript', 'MCP Server', 'macOS', 'Windows', 'Linux'];

const OpenSource = () => {
    return (
        <section id="opensource" className="py-16 md:py-20 px-6 md:px-12 w-full flex justify-center scroll-mt-[52px]">
            <div className="w-full max-w-5xl">
                <SectionHeader label="Open Source" />

                <Reveal className="border-y border-border-light py-10 md:py-14 relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                        <span className="text-5xl font-light tracking-tight">OSS</span>
                    </div>

                    <div className="relative z-10 flex flex-col gap-6 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] uppercase tracking-[0.15em] text-text-muted">
                                25 releases &middot; MIT licensed
                            </span>
                            <span className="w-8 h-px bg-border-light" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-[28px] md:text-[32px] leading-[35px] font-light tracking-tight text-text-main">
                                BuddyUsage
                            </h3>
                            <p className="text-[17px] leading-[26px] font-light text-text-muted">
                                A menu-bar island that tracks Claude, Codex, Gemini, Cursor and GitHub Copilot usage
                                without alt-tabbing into each provider's site. It watches the CLI sessions running on
                                your machine, warns you before a limit hits based on your current pace, and can stop
                                or nudge a session directly. It also runs as a local MCP server, so Claude Code and
                                Codex can check their own budget before starting something expensive.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {STACK.map((item) => (
                                <span
                                    key={item}
                                    className="liquid-pill px-3 py-1.5 text-[12px] font-light tracking-tight text-text-main"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <a
                                href="https://github.com/SmtTheSE/BuddyUsage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="liquid-pill inline-flex px-6 py-3 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity"
                            >
                                View on GitHub ↗
                            </a>
                            <a
                                href="https://smtthese.github.io/BuddyUsage/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="liquid-pill inline-flex px-6 py-3 text-[12px] tracking-tight text-text-main hover:opacity-70 transition-opacity"
                            >
                                Website &amp; Install Guide ↗
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default OpenSource;
