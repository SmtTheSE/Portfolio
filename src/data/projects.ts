export type Pattern = 'grid' | 'dots' | 'rings' | 'stripes' | 'blocks';

export type ProjectLink = { label: string; href: string };

export type Project = {
    id: string;
    title: string;
    blurb: string;
    desc: string;
    year: string;
    kind: string;
    tech: string[];
    /** Shown in the pinned text; the first one is what clicking the panel opens. */
    links?: ProjectLink[];
    video?: boolean;
    /** A real screenshot. imageRatio is its width / height, so the panel fits it with no cropping. */
    image?: string;
    imageRatio?: number;
    /** Covered by an NDA: no visuals or links, just the name and a note. */
    nda?: boolean;
    visual: { bg: string; fg: string; accent: string; pattern: Pattern };
};

/** Order matters: it is the order of the Selected Work stack. */
export const projects: Project[] = [
    {
        id: 'headroom',
        title: 'HeadRoom',
        blurb: 'An inclusive workspace for different ways of working',
        desc: "Built in three days at RMIT's ADC Hackathon 2026, under the Neurodivergence track. Each employee gets a weekly workload estimate that learns from their own history, and any overflow becomes an editable, negotiable request to their manager instead of a silent overrun. Its centerpiece is Focus Mode, an ADHD-first view that shows a single step at a time in calm 25-minute blocks, with Gemini-powered task breakdown behind it. It passed a 10-route axe-core audit at WCAG 2.2 AA with zero violations. We didn't place, and we're proud of it anyway.",
        year: '2026',
        kind: 'Hackathon',
        tech: ['React', 'TypeScript', 'Supabase', 'Gemini', 'WCAG 2.2 AA'],
        links: [{ label: 'Source code', href: 'https://github.com/SmtTheSE/HeadRoom' }],
        video: true,
        image: '/media/headroom-poster.jpg',
        imageRatio: 16 / 9,
        visual: { bg: '#2F6F55', fg: '#FFF6EA', accent: '#C8E6A0', pattern: 'blocks' },
    },
    {
        id: 'byteme',
        title: 'Ultimate ByteMe',
        blurb: 'Pan-Asian real estate intelligence',
        desc: 'A computational intelligence web app for bridging information asymmetry in emerging real estate markets, built for the 1st Synergia International Conference 2026. Four AI modules: a LightGBM valuation engine, an investment opportunity scanner using transfer learning, a RAG-grounded cultural and legal assistant on Qwen2.5 and Gemini, and an automated data curation lab.',
        year: '2026',
        kind: 'AI, Full stack',
        tech: ['Next.js', 'Python', 'Flask', 'LightGBM', 'Ollama'],
        links: [{ label: 'Source code', href: 'https://github.com/SmtTheSE/Conference' }],
        visual: { bg: '#F6C945', fg: '#26140C', accent: '#26140C', pattern: 'rings' },
    },
    {
        id: 'sbs',
        title: 'SBS Student Serving System',
        blurb: 'Academic platform for Saigon Business School',
        desc: 'A full-stack management platform that streamlines academic activity, personal information, and communication for students, lecturers, and administrators. A Spring Boot 3 REST API on Java 21 and a React 18 frontend, with JWT authentication, role-based access control, Docker, and AWS S3. Still in active development.',
        year: 'Active',
        kind: 'Full stack',
        tech: ['Java 21', 'Spring Boot 3', 'React 18', 'Docker', 'AWS S3'],
        visual: { bg: '#2F6F55', fg: '#FFF6EA', accent: '#FFF6EA', pattern: 'grid' },
    },
    {
        id: 'rental',
        title: 'Rental Property AI',
        blurb: 'Demand forecasting and gap analysis',
        desc: 'A market analysis platform built on a 10-million-listing dataset covering rental properties across 40 Indian cities, forecasting demand and surfacing gaps between supply and what people are looking for.',
        year: '2026',
        kind: 'Data, Full stack',
        tech: ['Python', 'Flask', 'Scikit-learn', 'Next.js'],
        visual: { bg: '#3563E9', fg: '#FFF6EA', accent: '#FFF6EA', pattern: 'dots' },
    },
    {
        id: 'kamisori',
        title: 'Kamisori',
        blurb: 'E-commerce for a local brand in Myanmar',
        desc: '"Embrace the Future." The commerce platform for a local clothing brand in Myanmar, with a secure, scalable backend designed around data integrity on PostgreSQL, Supabase, and Edge Functions.',
        year: '2024',
        kind: 'E-commerce',
        tech: ['PostgreSQL', 'Supabase', 'Edge Functions'],
        links: [{ label: 'Visit website', href: 'https://www.kamisorism.com/' }],
        image: '/media/kamisori.jpg',
        imageRatio: 1440 / 900,
        visual: { bg: '#1B1B1F', fg: '#FFF6EA', accent: '#F6C945', pattern: 'stripes' },
    },
    {
        id: 'dental',
        title: 'Dental Blinding & Age Estimation',
        blurb: 'A research tool for pediatric dental age estimation',
        desc: 'A web application for estimating pediatric dental age (5 to 12 years) from panoramic X-rays, implementing the AlQahtani and Demirjian methods. A role-based blinding workflow between supervisors and principal investigators keeps patient data separate from estimates, so the analysis stays free of bias.',
        year: '2026',
        kind: 'Research tool',
        tech: ['Python', 'Flask', 'PostgreSQL'],
        links: [
            { label: 'Live preview', href: 'https://dental-blinding-process-project.vercel.app/' },
            { label: 'Source code', href: 'https://github.com/SmtTheSE/Dental-Blinding-Process-Project' },
        ],
        image: '/media/dental.jpg',
        imageRatio: 1440 / 900,
        visual: { bg: '#C8E6A0', fg: '#26140C', accent: '#26140C', pattern: 'stripes' },
    },
    {
        id: 'momo',
        title: 'MoMo Service Analytics',
        blurb: 'Service performance and demographic trends',
        desc: 'A data analytics solution for tracking service performance and demographic trends, built as an interactive Plotly Dash application for a hackathon.',
        year: '2025',
        kind: 'Data, Hackathon',
        tech: ['Python', 'Pandas', 'Plotly'],
        visual: { bg: '#A82D63', fg: '#FFF6EA', accent: '#FFF6EA', pattern: 'dots' },
    },
    {
        id: 'namecard',
        title: 'Name Card Plugin',
        blurb: 'Digital identity for WordPress',
        desc: 'A WordPress plugin for digital identity management, with NFC writing and real-time analytics.',
        year: '2024',
        kind: 'Plugin',
        tech: ['PHP', 'MySQL', 'JavaScript', 'NFC'],
        visual: { bg: '#E9D8BF', fg: '#26140C', accent: '#26140C', pattern: 'grid' },
    },
    {
        id: 'ad-venture',
        title: 'Ad Venture Studio',
        blurb: 'Mobile apps for the App Store and Google Play',
        desc: "I build and ship mobile apps for a venture studio: product engineering, store releases, and app infrastructure. The work is covered by an NDA, so there's nothing I can show here. I'm happy to talk through how I approach it.",
        year: '2026',
        kind: 'Mobile, NDA',
        tech: ['Mobile', 'App Store', 'Google Play', 'Store releases'],
        nda: true,
        visual: { bg: '#E07A4A', fg: '#26140C', accent: '#26140C', pattern: 'rings' },
    },
    {
        id: 'bravestep',
        title: 'Bravestep',
        blurb: 'Founding engineering',
        desc: "Founding Engineer: systems direction and product infrastructure. The product work is covered by an NDA, so there's nothing public to show. I'm happy to talk through it in conversation.",
        year: 'Now',
        kind: 'Founding engineer, NDA',
        tech: ['Systems direction', 'Product infrastructure'],
        nda: true,
        visual: { bg: '#18707A', fg: '#FFF6EA', accent: '#FFF6EA', pattern: 'grid' },
    },
];
