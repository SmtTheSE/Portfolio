import { ReactNode } from 'react';

type ExternalLinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
};

/** Inline link to somewhere off-site: Apple's link blue, underlined, with an outbound arrow. */
const ExternalLink = ({ href, children, className = '' }: ExternalLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[#0066CC] underline decoration-[#0066CC]/40 underline-offset-[3px] hover:decoration-[#0066CC] transition-colors ${className}`}
    >
        {children}
    </a>
);

export default ExternalLink;
