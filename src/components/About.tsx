import { GroupLabel, Muted, Row, SectionShell, TextLink } from './SectionShell';

const About = () => (
    <SectionShell id="about" title="About" subtitle="Where I've worked">
        <GroupLabel>Experience</GroupLabel>
        <Row label="Ad Venture Studio">
            Software Engineer <Muted>/ 2026 &ndash; Present</Muted>
            <p className="text-muted mt-1">
                Building and shipping mobile apps for the App Store and Google Play: product engineering, store
                releases, and app infrastructure.
            </p>
        </Row>
        <Row label={<TextLink href="https://bravestep.ai/">Bravestep</TextLink>}>
            Founding Engineer <Muted>/ Present</Muted>
            <p className="text-muted mt-1">Founding engineering role covering systems direction and product infrastructure.</p>
        </Row>
        <Row label={<TextLink href="https://malibu.tech/">Malibu</TextLink>}>
            Release-Acceptance Engineer, independent <Muted>/ Present</Muted>
            <p className="text-muted mt-1">
                The physical-hardware validation gate between CI-green and fleet rollout for a macOS
                distributed-compute marketplace.
            </p>
        </Row>
        <Row label={<TextLink href="https://www.facebook.com/aiot.global.inc">AIOT Inc</TextLink>}>
            Software Development Intern <Muted>/ Internship</Muted>
            <p className="text-muted mt-1">
                Backend integration, application structure, and production-minded software practices.
            </p>
        </Row>

        <div className="pt-12">
            <GroupLabel>Education</GroupLabel>
            <Row label="Saigon Business School">
                BS Data Science <Muted>/ Expected 2027</Muted>
            </Row>
            <Row label="University of Computer Studies, Yangon">
                BS Software Engineering <Muted>/ 2022 &ndash; 2024</Muted>
            </Row>
        </div>

        <div className="pt-12">
            <GroupLabel>Stack</GroupLabel>
            <Row label="Backend">Python, Java, Go, Spring Boot, PHP</Row>
            <Row label="Mobile">iOS and Android releases, App Store, Google Play</Row>
            <Row label="Data">Pandas, NumPy, Matplotlib, SQL optimization</Row>
            <Row label="Databases">PostgreSQL, MySQL</Row>
            <Row label="DevOps">Docker, AWS S3, Nginx, Git</Row>
        </div>
    </SectionShell>
);

export default About;
