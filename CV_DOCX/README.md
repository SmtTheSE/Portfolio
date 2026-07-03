# CV — Sitt Min Thar

Professional CV generated from portfolio content, styled after the provided Word template (dark blue headings, gray section bars, executive summary, competencies grid, experience blocks).

## Files

| File | Description |
|------|-------------|
| `Sitt_Min_Thar_CV.docx` | Primary editable CV (Word) |
| `Sitt_Min_Thar_CV.pdf` | PDF version for sharing |
| `generate_cv.py` | Regenerate both formats |

## Regenerate

```bash
cd CV_DOCX
python3 -m venv .venv
.venv/bin/pip install python-docx fpdf2
.venv/bin/python generate_cv.py
```

## Source data

Content is drawn from the portfolio site: Hero, About, Experience, Projects, Live Servers, and Footer (`sittminthar005@gmail.com`, GitHub `SmtTheSE`, domain `sittminthar.from-mm.dev`).

## PDF note

The PDF is built with the same content as the DOCX. For pixel-perfect PDF matching Word layout, open `Sitt_Min_Thar_CV.docx` in Microsoft Word and use **File → Export → PDF**.
