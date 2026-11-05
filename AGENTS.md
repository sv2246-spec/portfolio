# Repository Guide

## Site overview

This repository contains Solomiia Valihunda's responsive biomedical engineering and design portfolio.

- `index.html` is the single-page portfolio: introduction, About Me, project timeline, Skills Summary, and Contact Me.
- `project.html` provides detail pages for the machining, Python, and prosthetics projects. The Bloomino and PID Lab links lead to dedicated project pages.
- `bloomino-option-3-desktop.html` and `pid-lab-option-2.html` are the selected Bloomino and PID Lab project pages.
- Other HTML files are design explorations and mockups for campus backgrounds, the project timeline, project descriptions, Bloomino, and PID Lab. The main navigation is in `index.html`.

## Design

The main portfolio has a warm, editorial style with olive and lime accents, dark olive text, generous whitespace, and responsive project cards.

- Palette: olive `#636b2f`, sand `#bac095`, lime `#d4de95`, ink `#3d4127`, paper `#f4f2e9`, and off-white `#fbfaf5`.
- Main fonts: Plus Jakarta Sans for body text and headings; Space Mono for labels and metadata. Preserve established serif accents on project pages that use them.
- Preserve each page's visual identity. Do not add colors, fonts, or layout patterns unless the requested work or an accessibility fix requires it.
- Keep layouts responsive and respect `prefers-reduced-motion`.
- Update this guide when the site's pages, palette, fonts, or overall design change.

## Implementation rules

- Use plain HTML, CSS, and JavaScript only. Do not add frameworks, libraries, build tools, or dependencies.
- Use relative paths for local pages, stylesheets, scripts, and assets. External URLs are appropriate for intended destinations and the existing font service.
- Use semantic HTML, one `<h1>` per page, descriptive image alt text, keyboard-accessible controls, and sufficient color contrast.
- Keep changes focused on the requested task and preserve existing interactions unless the requested work requires a change.

## Git workflow

- After each completed task, commit its changes with a clear, specific message and push to GitHub (`origin`, `main`).
- Stage only files relevant to the task. Leave unrelated and untracked user files untouched.
- If GitHub has newer commits, fetch and integrate them without overwriting remote work before pushing.
