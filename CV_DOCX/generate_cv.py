#!/usr/bin/env python3
"""Generate Sitt Min Thar CV (DOCX + PDF) styled like the provided template."""

from __future__ import annotations

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor
from fpdf import FPDF

OUT_DIR = Path(__file__).resolve().parent
DOCX_PATH = OUT_DIR / "Sitt_Min_Thar_CV.docx"
PDF_PATH = OUT_DIR / "Sitt_Min_Thar_CV.pdf"

DARK_BLUE = RGBColor(0x2F, 0x55, 0x97)
GRAY_BG = "E7E6E6"
FONT = "Arial"


def set_cell_shading(cell, fill_hex: str) -> None:
    shading = OxmlElement("w:shd")
    shading.set(qn("w:fill"), fill_hex)
    shading.set(qn("w:val"), "clear")
    cell._tc.get_or_add_tcPr().append(shading)


def add_paragraph_border(paragraph, style: str = "single", color: str = "2F5597", size: int = 6) -> None:
    p = paragraph._p
    p_pr = p.get_or_add_pPr()
    p_bdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), style)
    bottom.set(qn("w:sz"), str(size))
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), color)
    p_bdr.append(bottom)
    p_pr.append(p_bdr)


def add_dashed_border(paragraph) -> None:
    p = paragraph._p
    p_pr = p.get_or_add_pPr()
    p_bdr = OxmlElement("w:pBdr")
    for side in ("top", "bottom"):
        el = OxmlElement(f"w:{side}")
        el.set(qn("w:val"), "dashed")
        el.set(qn("w:sz"), "6")
        el.set(qn("w:space"), "4")
        el.set(qn("w:color"), "2F5597")
        p_bdr.append(el)
    p_pr.append(p_bdr)


def section_heading(doc: Document, text: str) -> None:
    table = doc.add_table(rows=1, cols=1)
    table.autofit = True
    cell = table.rows[0].cells[0]
    set_cell_shading(cell, GRAY_BG)
    p = cell.paragraphs[0]
    run = p.add_run(text.upper())
    run.bold = True
    run.font.name = FONT
    run.font.size = Pt(11)
    run.font.color.rgb = DARK_BLUE
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.left_indent = Inches(0.05)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)


def add_bullets(doc: Document, items: list[str]) -> None:
    for item in items:
        p = doc.add_paragraph(item, style="List Bullet")
        p.paragraph_format.space_after = Pt(2)
        for run in p.runs:
            run.font.name = FONT
            run.font.size = Pt(10.5)


def build_docx() -> None:
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)

    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(10.5)

    # --- Name ---
    name = doc.add_paragraph()
    name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    nr = name.add_run("SITT MIN THAR")
    nr.bold = True
    nr.font.name = FONT
    nr.font.size = Pt(26)
    nr.font.color.rgb = DARK_BLUE

    # --- Contact ---
    contact = doc.add_paragraph()
    contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cr = contact.add_run(
        "sittminthar005@gmail.com   |   github.com/SmtTheSE   |   sittminthar.from-mm.dev   |   Ho Chi Minh City, Vietnam"
    )
    cr.font.name = FONT
    cr.font.size = Pt(9.5)

    line = doc.add_paragraph()
    add_paragraph_border(line)

    # --- Title tagline ---
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    t1 = title.add_run("BACKEND DEVELOPER / DATA SCIENCE STUDENT")
    t1.bold = True
    t1.font.name = FONT
    t1.font.size = Pt(11)
    t1.font.color.rgb = DARK_BLUE
    t2 = title.add_run(" – building intelligent infrastructure, data pipelines, and production-grade systems")
    t2.italic = True
    t2.font.name = FONT
    t2.font.size = Pt(11)
    t2.font.color.rgb = DARK_BLUE

    doc.add_paragraph()

    # --- Executive Summary ---
    exec_p1 = doc.add_paragraph()
    add_dashed_border(exec_p1)
    exec_p1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    exec_p1.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    exec_p1.paragraph_format.line_spacing = 1.15
    exec_p1.paragraph_format.space_before = Pt(6)
    exec_p1.paragraph_format.space_after = Pt(6)
    r1 = exec_p1.add_run(
        "Results-driven Backend Developer and Data Science student with hands-on experience architecting "
        "REST APIs, full-stack platforms, and AI-integrated applications deployed on real production infrastructure. "
        "Proven ability to deliver end-to-end solutions—from database design and secure authentication to Dockerized "
        "deployment, AWS integration, and data engineering at scale (10M+ record pipelines)."
    )
    r1.font.name = FONT
    r1.font.size = Pt(10.5)

    exec_p2 = doc.add_paragraph()
    exec_p2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    exec_p2.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    exec_p2.paragraph_format.line_spacing = 1.15
    exec_p2.paragraph_format.space_after = Pt(8)
    r2 = exec_p2.add_run(
        "Technically proficient across Python, Java/Spring Boot, Go, PostgreSQL, MySQL, React, Next.js, Flask, "
        "FastAPI, Docker, Nginx, AWS S3, and modern AI stacks (Gemini, RAG, LightGBM). Combines rigorous software "
        "engineering with data science fundamentals (Pandas, Scikit-learn, visualization) to build systems that are "
        "secure, observable, and built to scale. Available for backend, full-stack, and data engineering roles."
    )
    r2.font.name = FONT
    r2.font.size = Pt(10.5)

    exec_close = doc.add_paragraph()
    add_dashed_border(exec_close)

    # --- Profile Summary ---
    section_heading(doc, "Profile Summary")
    add_bullets(
        doc,
        [
            "Backend and full-stack engineer specializing in API design, RBAC/JWT security, and cloud-ready deployments.",
            "Designed and shipped production systems for education, healthcare, e-commerce, and real-estate intelligence.",
            "Strong data engineering background: large-scale ingestion, cleaning pipelines, forecasting, and analytics dashboards.",
            "Experienced with containerization (Docker), reverse proxies (Nginx), VPS hosting, SSL, and CI/CD workflows.",
            "Comfortable integrating LLM/RAG modules and ML models into user-facing products with measurable business value.",
            "Collaborative, documentation-minded developer; internship experience in software development at AIOT Inc.",
        ],
    )

    # --- Core Competencies (3 columns) ---
    section_heading(doc, "Core Competencies")
    competencies = [
        ["Backend APIs & Services", "Spring Boot / Java", "Python / Flask / FastAPI"],
        ["Full-Stack Development", "React / Next.js", "REST & JWT / RBAC"],
        ["Databases & SQL", "PostgreSQL / MySQL", "Schema Design & Optimization"],
        ["Data Engineering", "Pandas / NumPy", "ETL & Dataset Harmonization"],
        ["Machine Learning & AI", "Scikit-learn / LightGBM", "RAG / Gemini Integration"],
        ["DevOps & Deployment", "Docker / Nginx", "AWS S3 / VPS / SSL"],
        ["Data Visualization", "Plotly / Dash", "Matplotlib / Streamlit"],
        ["Languages", "Python, Java, Go, PHP", "JavaScript, SQL, C/C++"],
        ["Tools & Practices", "Git / GitHub", "Agile Delivery / Code Review"],
    ]
    table = doc.add_table(rows=3, cols=3)
    table.autofit = True
    idx = 0
    for row in table.rows:
        for cell in row.cells:
            cell.text = ""
            for item in competencies[idx]:
                p = cell.add_paragraph(item, style="List Bullet")
                for run in p.runs:
                    run.font.name = FONT
                    run.font.size = Pt(10)
            idx += 1

    doc.add_paragraph()

    # --- Professional Experience ---
    section_heading(doc, "Professional Experience")

    experiences = [
        {
            "org": "Independent Engineering & Portfolio Projects, Ho Chi Minh City, Vietnam",
            "dates": "2024 – Present",
            "role": "Backend / Full Stack Developer",
            "bullets": [
                "Architected Rental Property AI Platform processing 10M+ rental listings across 40 cities with demand forecasting and gap analysis (Python, Flask, Scikit-learn, Next.js).",
                "Built Ultimate ByteMe: Pan-Asian Real Estate Intelligence for Synergia International Conference 2026—LightGBM valuation, investment scanner, RAG assistant (Qwen2.5/Gemini), and data curation lab.",
                "Delivered production deployments showcased via live server infrastructure (Docker, Nginx, VPS, SSL, CI/CD) at dev-domainservershowcase.vercel.app.",
                "Developed DataCleanr: full-stack dataset cleaning with AI industry detection across 12 sectors and automated CSV/Excel harmonization.",
                "Created Kamisori e-commerce backend and Name Card WordPress plugin (NFC, analytics) with emphasis on security and data integrity.",
            ],
        },
        {
            "org": "Saigon Business School (SBS), Ho Chi Minh City, Vietnam",
            "dates": "2025 – Present",
            "role": "Full Stack Developer – Academic Platform",
            "bullets": [
                "Engineered SBS Student Serving System: Spring Boot 3 REST API, React 18 frontend, JWT authentication, and RBAC for students, lecturers, and administrators.",
                "Implemented Docker containerization and AWS S3 integration for scalable file and media handling.",
                "Built Scholarship Announcement Web (Django) to publish and manage funding opportunities for targeted student demographics.",
            ],
        },
        {
            "org": "Healthcare & Research Engineering Projects",
            "dates": "2024 – 2026",
            "role": "Full Stack Developer",
            "bullets": [
                "Developed DentalBridge: AI treatment coordinator using Google Gemini 1.5 Pro to translate clinical terminology into patient-friendly guidance (FastAPI, Next.js).",
                "Built Dental Blinding & Age Estimation platform for pediatric OPG analysis using AlQahtani and Demirjian methods with supervisor/PI blinding workflow (Flask, PostgreSQL).",
            ],
        },
        {
            "org": "AIOT Inc., Vietnam",
            "dates": "Internship",
            "role": "Software Development Intern",
            "bullets": [
                "Contributed to software development initiatives focused on robust backend integration and production-quality code practices.",
                "Collaborated with engineering teams on application structure, performance, and maintainable service design.",
            ],
        },
        {
            "org": "Analytics & Hackathon Projects",
            "dates": "2025",
            "role": "Data Engineer",
            "bullets": [
                "MoMo Service Analytics: Plotly Dash application for service performance and demographic trend analysis (Python, Pandas, Plotly).",
                "Maintained Kaggle analytics showcase (Streamlit) covering exploratory analysis, visualization, and predictive modeling workflows.",
            ],
        },
    ]

    for exp in experiences:
        hdr_table = doc.add_table(rows=1, cols=2)
        hdr_table.autofit = True
        left_cell, right_cell = hdr_table.rows[0].cells
        lp = left_cell.paragraphs[0]
        lr = lp.add_run(exp["org"])
        lr.bold = True
        lr.font.name = FONT
        lr.font.size = Pt(10.5)
        rp = right_cell.paragraphs[0]
        rp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        rr = rp.add_run(exp["dates"])
        rr.bold = True
        rr.font.name = FONT
        rr.font.size = Pt(10.5)

        role_p = doc.add_paragraph()
        role_r = role_p.add_run(exp["role"])
        role_r.bold = True
        role_r.font.name = FONT
        role_r.font.size = Pt(10.5)
        role_r.font.color.rgb = DARK_BLUE

        add_bullets(doc, exp["bullets"])

    doc.add_page_break()

    # --- Education ---
    section_heading(doc, "Education")
    education = [
        ("SAIGON BUSINESS SCHOOL, Ho Chi Minh City, Vietnam", "Expected 2027", "Bachelor of Data Science"),
        ("UNIVERSITY OF COMPUTER STUDIES, YANGON, Myanmar", "2022 – 2024", "BSc Software Engineering"),
    ]
    for school, year, degree in education:
        edu_table = doc.add_table(rows=1, cols=2)
        edu_table.autofit = True
        lc, rc = edu_table.rows[0].cells
        lp = lc.paragraphs[0]
        sr = lp.add_run(school)
        sr.bold = True
        sr.font.name = FONT
        sr.font.size = Pt(10.5)
        rp = rc.paragraphs[0]
        rp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        yr = rp.add_run(year)
        yr.bold = True
        yr.font.name = FONT
        yr.font.size = Pt(10.5)
        d = doc.add_paragraph(degree)
        for run in d.runs:
            run.font.name = FONT
            run.font.size = Pt(10.5)
            run.italic = True

    # --- Selected Technical Projects ---
    section_heading(doc, "Selected Technical Projects")
    projects = [
        "Rental Property AI Platform – 10M dataset demand forecasting (Python, Flask, Scikit-learn, Next.js)",
        "SBS Student Serving System – Spring Boot 3, React 18, JWT/RBAC, Docker, AWS S3",
        "Ultimate ByteMe Real Estate Intelligence – LightGBM, RAG, Next.js, Flask, Ollama",
        "DentalBridge – Gemini 1.5 Pro patient communication (FastAPI, Next.js)",
        "DataCleanr – AI-powered multi-industry dataset cleaning (Python, Cython, JavaScript)",
    ]
    add_bullets(doc, projects)

    # --- Footer ---
    footer = doc.add_paragraph()
    footer.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    fr = footer.add_run("Sitt Min Thar Resume | Confidential")
    fr.font.name = FONT
    fr.font.size = Pt(8)
    fr.font.color.rgb = RGBColor(0x80, 0x80, 0x80)

    doc.save(DOCX_PATH)


class CVPdf(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=15)
        self.blue = (47, 85, 151)
        self.gray = (231, 230, 230)

    def section_bar(self, title: str) -> None:
        self.set_fill_color(*self.gray)
        self.set_text_color(*self.blue)
        self.set_font("Helvetica", "B", 11)
        self.cell(0, 8, pdf_text(f"  {title.upper()}"), new_x="LMARGIN", new_y="NEXT", fill=True)
        self.ln(2)
        self.set_text_color(0, 0, 0)

    def bullet(self, text: str) -> None:
        self.set_font("Helvetica", "", 10)
        self.set_x(self.l_margin + 4)
        self.multi_cell(0, 5, pdf_text(f"- {text}"))

    def experience_block(self, org: str, dates: str, role: str, bullets: list[str]) -> None:
        self.set_font("Helvetica", "B", 10.5)
        self.cell(0, 6, pdf_text(org), new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "B", 10.5)
        self.set_text_color(*self.blue)
        self.cell(0, 5, pdf_text(f"{role}    ({dates})"), new_x="LMARGIN", new_y="NEXT")
        self.set_text_color(0, 0, 0)
        for b in bullets:
            self.bullet(b)
        self.ln(2)


def pdf_text(text: str) -> str:
    """fpdf core fonts are latin-1 only."""
    return (
        text.replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2019", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
    )


def build_pdf() -> None:
    pdf = CVPdf()
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*pdf.blue)
    pdf.cell(0, 12, "SITT MIN THAR", new_x="LMARGIN", new_y="NEXT", align="C")

    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(
        0,
        5,
        "sittminthar005@gmail.com  |  github.com/SmtTheSE  |  sittminthar.from-mm.dev  |  HCMC, Vietnam",
        new_x="LMARGIN",
        new_y="NEXT",
        align="C",
    )
    pdf.ln(2)
    pdf.set_draw_color(*pdf.blue)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(4)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*pdf.blue)
    pdf.multi_cell(
        0,
        5,
        pdf_text(
            "BACKEND DEVELOPER / DATA SCIENCE STUDENT - building intelligent infrastructure, data pipelines, and production-grade systems"
        ),
        align="C",
    )
    pdf.ln(4)
    pdf.set_text_color(0, 0, 0)

    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(
        0,
        5,
        pdf_text(
            "Results-driven Backend Developer and Data Science student with hands-on experience architecting REST APIs, "
            "full-stack platforms, and AI-integrated applications on production infrastructure. Proven delivery of secure, "
            "Dockerized systems with AWS integration and large-scale data pipelines (10M+ records)."
        ),
        align="J",
    )
    pdf.ln(2)
    pdf.multi_cell(
        0,
        5,
        pdf_text(
            "Proficient in Python, Java/Spring Boot, Go, PostgreSQL, MySQL, React, Next.js, Flask, FastAPI, Docker, Nginx, "
            "AWS S3, Pandas, Scikit-learn, LightGBM, and LLM/RAG integrations. Available for backend, full-stack, and data engineering roles."
        ),
        align="J",
    )
    pdf.ln(4)

    pdf.section_bar("Profile Summary")
    for item in [
        "Backend and full-stack engineer specializing in API design, RBAC/JWT security, and cloud-ready deployments.",
        "Shipped production systems for education, healthcare, e-commerce, and real-estate intelligence.",
        "Strong data engineering: large-scale ingestion, cleaning pipelines, forecasting, and analytics dashboards.",
        "DevOps: Docker, Nginx, VPS, SSL, CI/CD; live production showcase at dev-domainservershowcase.vercel.app.",
        "Integrates LLM/RAG and ML models into products with measurable impact; AIOT Inc. software development intern.",
    ]:
        pdf.bullet(item)

    pdf.ln(2)
    pdf.section_bar("Core Competencies")
    cols = [
        "Backend: Python, Java, Spring Boot, Flask, FastAPI, Go",
        "Frontend: React, Next.js, JavaScript",
        "Data: Pandas, NumPy, Scikit-learn, Plotly, Streamlit",
        "DB: PostgreSQL, MySQL, SQL optimization",
        "AI/ML: LightGBM, RAG, Gemini, Ollama",
        "DevOps: Docker, Nginx, AWS S3, Git",
    ]
    pdf.set_font("Helvetica", "", 9.5)
    for c in cols:
        pdf.bullet(c)

    pdf.ln(2)
    pdf.section_bar("Professional Experience")

    pdf.experience_block(
        "Independent Engineering & Portfolio Projects, Ho Chi Minh City, Vietnam",
        "2024 – Present",
        "Backend / Full Stack Developer",
        [
            "Rental Property AI: 10M+ listings, demand forecasting (Python, Flask, Scikit-learn, Next.js).",
            "Ultimate ByteMe real-estate intelligence: LightGBM, RAG, Next.js, Flask for Synergia Conference 2026.",
            "Production deployments: Docker, Nginx, VPS, SSL—live showcase on real infrastructure.",
            "DataCleanr, Kamisori e-commerce, Name Card WordPress plugin (NFC, analytics).",
        ],
    )
    pdf.experience_block(
        "Saigon Business School (SBS), Ho Chi Minh City, Vietnam",
        "2025 – Present",
        "Full Stack Developer – Academic Platform",
        [
            "SBS Student Serving System: Spring Boot 3, React 18, JWT, RBAC, Docker, AWS S3.",
            "Scholarship Announcement Web (Django) for funding discovery and management.",
        ],
    )
    pdf.experience_block(
        "Healthcare & Research Engineering Projects",
        "2024 – 2026",
        "Full Stack Developer",
        [
            "DentalBridge: Gemini 1.5 Pro patient-friendly clinical communication (FastAPI, Next.js).",
            "Dental Blinding & Age Estimation: OPG analysis with AlQahtani/Demirjian methods (Flask, PostgreSQL).",
        ],
    )

    pdf.add_page()
    pdf.experience_block(
        "AIOT Inc., Vietnam",
        "Internship",
        "Software Development Intern",
        [
            "Software development focused on backend integration and maintainable service design.",
        ],
    )
    pdf.experience_block(
        "Analytics & Hackathon Projects",
        "2025",
        "Data Engineer",
        [
            "MoMo Service Analytics: Plotly Dash for performance and demographic trends.",
            "Kaggle analytics showcase (Streamlit): EDA, visualization, predictive modeling.",
        ],
    )

    pdf.section_bar("Education")
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 6, pdf_text("SAIGON BUSINESS SCHOOL, Ho Chi Minh City, Vietnam (Expected 2027)"), new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "I", 10)
    pdf.cell(0, 5, "Bachelor of Data Science", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 6, pdf_text("UNIVERSITY OF COMPUTER STUDIES, YANGON (2022 - 2024)"), new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "I", 10)
    pdf.cell(0, 5, "BSc Software Engineering", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(4)
    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(128, 128, 128)
    pdf.cell(0, 5, "Sitt Min Thar Resume | Confidential", new_x="LMARGIN", new_y="NEXT", align="R")

    pdf.output(PDF_PATH)


def main() -> None:
    build_docx()
    build_pdf()
    print(f"Created: {DOCX_PATH}")
    print(f"Created: {PDF_PATH}")


if __name__ == "__main__":
    main()
