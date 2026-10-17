import { Row, SectionShell, TextLink } from './SectionShell';
import { nowStatus } from '../data/now';

const Contact = () => (
    <SectionShell id="contact" title="Contact" subtitle="Ways to reach out">
        <Row label="Email">
            For work, collaboration, and contract enquiries.
            <p className="mt-1">
                <a
                    href="mailto:sittminthar005@gmail.com"
                    className="inline-block py-2 -my-2 text-muted hover:text-fg transition-colors break-all"
                >
                    sittminthar005@gmail.com
                </a>
            </p>
        </Row>
        <Row label="GitHub">
            The source for most of what&rsquo;s above.
            <p className="mt-1 text-muted">
                <TextLink href="https://github.com/SmtTheSE">github.com/SmtTheSE</TextLink>
            </p>
        </Row>
        <Row label="Bluesky">
            Notes, and the AT Protocol experiments in the Lab.
            <p className="mt-1 text-muted">
                <TextLink href="https://bsky.app/profile/sitt03.bsky.social">@sitt03.bsky.social</TextLink>
            </p>
        </Row>
        <Row label="Resume">
            One page, kept current.
            <p className="mt-1">
                <a
                    href="/Sitt_Min_Thar_Resume.pdf"
                    download
                    className="inline-block py-2 -my-2 text-fg underline decoration-fg/35 underline-offset-[5px] hover:decoration-fg transition-colors"
                >
                    Download PDF
                </a>
            </p>
        </Row>
        <Row label="Availability">
            <span className="inline-flex items-center gap-2">
                <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full ${nowStatus.availableForWork ? 'bg-win-butter animate-pulse' : 'bg-muted'}`}
                />
                {nowStatus.availableForWork ? 'Available for new opportunities' : 'Open to select remote and contract work'}
            </span>
        </Row>
    </SectionShell>
);

export default Contact;
