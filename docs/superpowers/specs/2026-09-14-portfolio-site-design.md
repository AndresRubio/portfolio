# Portfolio Site — Design Spec

Date: 2026-09-14

## Purpose

Andrés needs a personal portfolio site to use during job interviews / job search. Source content
comes from his existing Wix site (https://andresrubiosaz.wixsite.com/portfolio), rebuilt as a
static site hosted on GitHub Pages at the repo `AndresRubio/portfolio`
(https://andresrubio.github.io/portfolio).

## Source content (extracted from Wix site)

- **Home**: tagline "I build AI systems that ship software"; intro paragraph about
  autonomous AI systems, multi-agent orchestration, RAG pipelines, full-stack GenAI on
  Azure/Kubernetes; mentions GenAI R&D at Artificial Solutions, an agentic AI engine for video
  games, ML infra for a large e-commerce platform.
- **Resume**: professional summary (10+ years, AI engineer & software architect, AI-driven SDLC
  automation, multi-agent systems, conversational AI); work experience at Artificial Solutions,
  PirateLink AI Engine (personal project), Narrativa, Zooplus, Exceltic; tech skill groups (AI &
  ML, Languages, Cloud & Infra, CI/CD & DevOps, Data & Messaging, SDLC); education/studies list.
- **Projects**: Conversational AI SaaS Platform (teneo.ai), PirateLink AI Engine
  (pirateblood.com), Narrativa NLP SaaS, Zooplus e-commerce/data ops, Interaction airport
  management.
- **Contact**: LinkedIn (linkedin.com/in/andresrubiodelsaz), email
  (andres.rubio.saz@gmail.com).

Typos in the source (e.g. "experence") will be fixed; all facts/claims are preserved as-is.

## Structure

Single scrolling page (`index.html`) with anchor navigation:

1. **Hero** — name, title, tagline, links to GitHub/LinkedIn/email.
2. **About** — short intro paragraph, tightened from Wix home + resume summary.
3. **Experience** — reverse-chronological cards/timeline: Artificial Solutions → PirateLink AI
   Engine → Narrativa → Zooplus → Exceltic, each with dates and 1–2 tightened bullets.
4. **Skills** — grouped tag clusters matching the resume's tech categories.
5. **Projects** — cards for the 5 projects above, with stack tags and outbound links where
   available (teneo.ai, pirateblood.com, narrativa.com, zooplus.com, interaction-aero.eu).
6. **Education** — compact list of bootcamp/courses/degrees.
7. **Contact** — direct `mailto:` and LinkedIn links. No backend contact form (GitHub Pages
   serves static files only; a real form would need a third-party service, which was explicitly
   descoped for v1).

## Visual design

- Dark, technical theme: dark background, one accent color (violet/teal, chosen to fit an
  AI/ML engineering brand), monospace touches on headings/tags to evoke a code editor.
- Generous spacing, clear section separation, subtle fade-in-on-scroll for section reveals.
- Fully responsive (mobile-first breakpoints); no layout should break under ~375px width.

## Tech approach

- Plain HTML/CSS/JS. No framework, no build step — keeps GitHub Pages deploy trivial (serve
  straight from `main` branch root).
- Single `index.html`, `styles.css`, `script.js` (scroll reveal + nav highlighting only — no
  heavier JS needed).
- No analytics, no external JS dependencies beyond a Google Font (optional) for the monospace
  accent.

## Repository / deploy

- Existing repo: `AndresRubio/portfolio` (already has an MIT `LICENSE` file, otherwise empty).
- Local clone lives at `~/Desktop/projects/portfolio` (persists across sessions, unlike the
  scratch workspace).
- Git identity already correctly configured locally to Andrés's GitHub-matching identity.
- GitHub Pages will be configured to serve from `main` branch root once pushed — live at
  `https://andresrubio.github.io/portfolio`.
- Pushing to the remote requires explicit user confirmation before it happens (per standing
  safety rules around actions visible to others / affecting shared state).

## Out of scope (v1)

- Downloadable PDF resume (explicitly declined).
- Working contact form / backend of any kind.
- CMS or dynamic content — all content is hardcoded in the HTML, editable directly.
- Multi-page structure (explicitly declined in favor of one-page scroll).
