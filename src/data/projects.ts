export type Pattern = 'grid' | 'dots' | 'rings' | 'stripes' | 'blocks';

export type ProjectLink = { label: string; href: string };

export type Shot = { src: string; alt: string };

export type BoardKpi = { value: string; label: string };

export type BoardCard = { src: string; alt: string; title: string; takeaway: string };

/** Several real findings shown together inside the preview, instead of one chart. */
export type InsightBoard = { kpis: BoardKpi[]; cards: BoardCard[] };

export type Project = {
    id: string;
    title: string;
    blurb: string;
    desc: string;
    year: string;
    kind: string;
    tech: string[];
    /** Public links only. Source stays off this list when the repo is private. */
    links?: ProjectLink[];
    /** Existing film. HeadRoom only: the original player, not the preview dialog. */
    video?: boolean;
    /** Cover shown on the panel. The first frame of the preview gallery. */
    image?: string;
    imageAlt?: string;
    imageRatio?: number;
    /** More real screenshots, after the cover, inside the preview. */
    gallery?: Shot[];
    /** Dashboard of several findings. Used instead of the single-image gallery. */
    board?: InsightBoard;
    /** Private or internal work: a label, never a source link. */
    internal?: boolean;
    visual: { bg: string; fg: string; accent: string; pattern: Pattern };
};

/** Every image the preview can page through, cover first. */
export const shotsFor = (project: Project): Shot[] => {
    const shots: Shot[] = [];
    if (project.image) shots.push({ src: project.image, alt: project.imageAlt ?? `${project.title}: ${project.blurb}` });
    for (const shot of project.gallery ?? []) shots.push(shot);
    return shots;
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
        image: '/media/byteme.jpg',
        imageAlt: 'ByteMe homepage: AI-powered real estate intelligence for ASEAN secondary markets, with counts for markets, engines, and model accuracy.',
        imageRatio: 1440 / 900,
        gallery: [
            {
                src: '/media/byteme-dashboard.jpg',
                alt: 'ByteMe intelligence hub: a valuation form for state, district, bedrooms, bathrooms, area and property type, beside an empty results panel.',
            },
        ],
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
        internal: true,
        image: '/media/sbs-login.jpg',
        imageAlt: 'SBS Student Serving System sign-in screen: the school campus beside an email and password form, with guest access.',
        imageRatio: 1440 / 900,
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
        links: [{ label: 'Source code', href: 'https://github.com/SmtTheSE/Datathon_Project-Properties-Dataset-' }],
        image: '/media/rental-city.jpg',
        imageAlt: 'Bar chart of average rent by city from the Indian rental analysis. Aurangabad is the highest bar.',
        imageRatio: 1100 / 625,
        board: {
            kpis: [
                { value: '48,396', label: 'Listings sampled from 10M+' },
                { value: '40', label: 'Indian cities' },
                { value: 'Rs 17,814', label: 'Average rent' },
                { value: 'Rs 773–67,747', label: 'Rent range' },
            ],
            cards: [
                {
                    src: '/media/rental-city.jpg',
                    alt: 'Bar chart of average rent for the top 15 Indian cities. Aurangabad leads at Rs 19,098.',
                    title: 'Rent by city',
                    takeaway: 'Aurangabad averages Rs 19,098, then Kalyan-Dombivli at Rs 18,967. Location moves the price.',
                },
                {
                    src: '/media/rental-bhk.jpg',
                    alt: 'Rent by bedroom count. 4-BHK averages Rs 22,576 and 1-BHK averages Rs 17,001.',
                    title: 'Rent by bedrooms',
                    takeaway: '4-BHK averages Rs 22,576 and 1-BHK averages Rs 17,001. The step up is not a straight line.',
                },
                {
                    src: '/media/rental-size.jpg',
                    alt: 'Scatter of property size against rent, with a positive correlation of 0.837.',
                    title: 'Size and rent',
                    takeaway: 'Size and rent move together (r = 0.837), with a wide scatter at every size.',
                },
                {
                    src: '/media/rental-heat.jpg',
                    alt: 'Heatmap of average rent by city and BHK. Darker red cells are the higher rents, concentrated in 4-BHK.',
                    title: 'City and BHK together',
                    takeaway: 'Darker cells are the higher rents. The 4-BHK column is the premium band across these cities.',
                },
            ],
        },
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
        imageAlt: 'Kamisori homepage: a black and white campaign frame with the line All about Kamisori.',
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
        imageAlt: 'UDMM Research Workspace landing page: Blinded assessment, built for rigorous research.',
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
        links: [{ label: 'Source code', href: 'https://github.com/SmtTheSE/Data-Analytics' }],
        image: '/media/momo-monthly.jpg',
        imageAlt: 'Monthly MoMo revenue in 2020. January is 1.41 million VND and December, the peak, is 1.76 million VND.',
        imageRatio: 787 / 484,
        board: {
            kpis: [
                { value: '1,410,427', label: 'January 2020 revenue, VND' },
                { value: '1,764,400', label: 'December, the peak month, VND' },
                { value: '1,495', label: 'Wednesday average revenue, VND' },
                { value: '72', label: 'New users in December 2020' },
            ],
            cards: [
                {
                    src: '/media/momo-monthly.jpg',
                    alt: 'Bar chart of MoMo revenue by month in 2020. December is the tallest bar at 1.76 million VND.',
                    title: 'Revenue through the year',
                    takeaway: 'Revenue finishes the year highest: December is 1,764,400 VND, above January’s 1,410,427 VND.',
                },
                {
                    src: '/media/momo-merchant.jpg',
                    alt: 'Horizontal bars of revenue by telco merchant. Viettel leads at 7,101,400 VND.',
                    title: 'Which merchants pay',
                    takeaway: 'Viettel brings in 7,101,400 VND, ahead of Mobifone at 5,720,527 VND.',
                },
                {
                    src: '/media/momo-age.jpg',
                    alt: 'Revenue by age group. Ages 23 to 27 are the tallest bar at 4.42 million VND.',
                    title: 'Who the revenue comes from',
                    takeaway: 'Ages 23–27 contribute 4,416,000 VND, more than any other age group.',
                },
                {
                    src: '/media/momo-weekday.jpg',
                    alt: 'Average revenue by weekday. Wednesday is highest at 1,495 VND and Sunday is lowest at 1,285 VND.',
                    title: 'Which day earns more',
                    takeaway: 'Wednesday averages 1,495 VND. Sunday is the quiet day, at 1,285 VND.',
                },
            ],
        },
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
        internal: true,
        visual: { bg: '#E9D8BF', fg: '#26140C', accent: '#26140C', pattern: 'grid' },
    },
];
