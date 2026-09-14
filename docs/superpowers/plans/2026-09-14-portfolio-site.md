# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page, dark-themed, static HTML/CSS/JS portfolio site for Andrés Rubio del Saz, deployable on GitHub Pages from `AndresRubio/portfolio`, replacing the content currently on his Wix site.

**Architecture:** Single `index.html` with anchor-linked sections (Hero, About, Experience, Skills, Projects, Education, Contact), one `styles.css` for all styling (CSS custom properties for the color system, mobile-first responsive rules), and one `script.js` for two small progressive-enhancement behaviors (scroll-reveal on sections, active-nav-link highlighting). No build step, no framework, no external JS dependencies. Optional Google Font loaded via `<link>` for the monospace accent.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox/grid, `prefers-reduced-motion`-aware), vanilla JS (`IntersectionObserver`), static hosting on GitHub Pages.

## Global Constraints

- Content facts/claims must match the source spec exactly (`docs/superpowers/specs/2026-09-14-portfolio-site-design.md`) — only wording/typos may be tightened, not facts, dates, or company names.
- No backend, no contact form, no PDF download (out of scope per spec).
- No framework or build tooling — plain HTML/CSS/JS only, served straight from repo root.
- Dark, technical visual theme with one accent color, monospace touches on headings/tags.
- Fully responsive down to ~375px width, no horizontal scroll at any breakpoint.
- Every task's HTML/CSS/JS changes must be verified by loading the page in the Browser tool and checking: (a) no console errors, (b) the new content is visible and readable, (c) no layout overflow at mobile width (375px) and desktop width (1440px).
- Git identity is already configured correctly (`Andrés Rubio del Saz` / `andres.rubio.saz@gmail.com`); remote `origin` already points at `https://github.com/AndresRubio/portfolio.git` with `main` checked out from it.
- Do not `git push` until the final task's explicit user-confirmation step.

---

### Task 1: Project scaffold, design system, and page shell

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `README.md`

**Interfaces:**
- Produces: CSS custom properties consumed by every later task: `--bg`, `--bg-alt`, `--text`, `--text-dim`, `--accent`, `--accent-dim`, `--border`, `--font-sans`, `--font-mono`, `--space-1`..`--space-6`, `--max-width`.
- Produces: page shell consumed by later tasks — `<header class="site-header">` with `<nav>`, `<main>` containing one `<section id="...">` per later task, `<footer>`.
- Produces: `script.js` exposes no globals; later tasks don't need to touch it except Task 9.

- [ ] **Step 1: Create the HTML shell with nav and empty section placeholders**

Write `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Andrés Rubio del Saz — AI Engineer &amp; Software Architect</title>
  <meta name="description" content="AI Engineer & Software Architect building autonomous multi-agent systems, RAG pipelines, and full-stack GenAI platforms.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="#top" class="logo">AR<span class="accent">.</span></a>
      <nav class="site-nav" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main id="top">
    <section id="hero" class="section hero"></section>
    <section id="about" class="section"></section>
    <section id="experience" class="section"></section>
    <section id="skills" class="section"></section>
    <section id="projects" class="section"></section>
    <section id="education" class="section"></section>
    <section id="contact" class="section"></section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 Andrés Rubio del Saz</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write the design-system base in `styles.css`**

```css
:root {
  --bg: #0b0d12;
  --bg-alt: #12151c;
  --text: #e7e9ee;
  --text-dim: #9aa3b2;
  --accent: #7c9cff;
  --accent-dim: #4d63a3;
  --border: #232838;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;
  --max-width: 960px;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation: none !important; transition: none !important; }
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-3);
}

.accent { color: var(--accent); }

.section {
  padding: var(--space-6) 0;
  border-bottom: 1px solid var(--border);
}

.section:last-of-type { border-bottom: none; }

h1, h2, h3 {
  font-family: var(--font-mono);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 var(--space-3);
}

h2 {
  font-size: 1.75rem;
  color: var(--accent);
}

p { color: var(--text-dim); }

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
```

- [ ] **Step 3: Style the header/nav and footer**

Append to `styles.css`:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(11, 13, 18, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
}

.logo {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
}

.site-nav {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.site-nav a {
  color: var(--text-dim);
  font-size: 0.9rem;
}

.site-nav a:hover,
.site-nav a.active {
  color: var(--accent);
  text-decoration: none;
}

.site-footer {
  padding: var(--space-3) 0;
  text-align: center;
}

.site-footer p {
  margin: 0;
  font-size: 0.85rem;
}

@media (max-width: 480px) {
  .header-inner { flex-direction: column; gap: var(--space-1); align-items: flex-start; }
  .site-nav { gap: var(--space-2); font-size: 0.85rem; }
}
```

- [ ] **Step 4: Create an empty `script.js` placeholder and a short `README.md`**

`script.js`:

```js
// Progressive enhancement only — the page is fully usable without JS.
```

`README.md`:

```markdown
# Andrés Rubio del Saz — Portfolio

Personal portfolio site, built as plain HTML/CSS/JS and served via GitHub Pages.

Live at: https://andresrubio.github.io/portfolio

## Development

Open `index.html` directly in a browser — no build step required.
```

- [ ] **Step 5: Verify the shell renders with no errors**

Open `index.html` in the Browser tool (`file://` path or a static server), then:
- Check `read_console_messages` — expect zero errors.
- Check `read_page` — nav links `About/Experience/Skills/Projects/Education/Contact` are present and clickable.
- Resize to 375px width — header must not overflow horizontally.

Expected: dark page, sticky header with nav, all seven empty `<section>` elements present, no console errors.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css script.js README.md
git commit -m "Scaffold portfolio page shell and design system"
```

---

### Task 2: Hero section

**Files:**
- Modify: `index.html` (fill `#hero` section)
- Modify: `styles.css` (append hero styles)

**Interfaces:**
- Consumes: `.container`, `--space-*`, `--accent`, `--font-mono` from Task 1.
- Produces: `.hero`, `.hero-links`, `.hero-links a.icon-link` classes — not reused by later tasks.

- [ ] **Step 1: Fill in the hero markup**

Replace `<section id="hero" class="section hero"></section>` in `index.html` with:

```html
<section id="hero" class="section hero">
  <div class="container">
    <p class="eyebrow">Hi, I'm</p>
    <h1>Andrés Rubio del Saz</h1>
    <p class="hero-title">AI Engineer &amp; Software Architect</p>
    <p class="hero-tagline">I build AI systems that ship software.</p>
    <p class="hero-sub">Multi-agent orchestration, RAG pipelines, and full-stack GenAI platforms — from architecture to production.</p>
    <div class="hero-links">
      <a href="https://github.com/AndresRubio" class="icon-link" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/andresrubiodelsaz" class="icon-link" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:andres.rubio.saz@gmail.com" class="icon-link">Email</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the hero**

Append to `styles.css`:

```css
.hero {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
}

.eyebrow {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 0.9rem;
  margin: 0 0 var(--space-1);
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.25rem);
  color: var(--text);
  margin-bottom: var(--space-1);
}

.hero-title {
  font-family: var(--font-mono);
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--text-dim);
  margin: 0 0 var(--space-3);
}

.hero-tagline {
  font-size: 1.4rem;
  color: var(--text);
  margin: 0 0 var(--space-2);
  max-width: 32ch;
}

.hero-sub {
  max-width: 48ch;
  margin: 0 0 var(--space-4);
}

.hero-links {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.icon-link {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
}

.icon-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  text-decoration: none;
}
```

- [ ] **Step 3: Verify**

Load the page in the Browser tool:
- `get_page_text` includes "Andrés Rubio del Saz", "AI Engineer & Software Architect", "I build AI systems that ship software."
- Screenshot at 1440px and 375px — tagline and links visible, no overflow, links are clickable (`find` locates "GitHub", "LinkedIn", "Email").
- Console has no new errors.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add hero section"
```

---

### Task 3: About section

**Files:**
- Modify: `index.html` (fill `#about`)
- Modify: `styles.css` (append about styles)

**Interfaces:**
- Consumes: `.section`, `h2`, `.container` from Task 1.
- Produces: `.about-text` — not reused elsewhere.

- [ ] **Step 1: Fill in the about markup**

Replace `<section id="about" class="section"></section>` with:

```html
<section id="about" class="section">
  <div class="container">
    <h2>01. About</h2>
    <p class="about-text">
      I design and build systems where AI doesn't just assist — it autonomously generates,
      reviews, and ships code. My work sits at the intersection of software architecture and
      applied AI, spanning multi-agent orchestration, RAG pipelines, and full-stack GenAI
      platforms deployed on Azure and Kubernetes.
    </p>
    <p class="about-text">
      I've led GenAI R&amp;D at Artificial Solutions, built an agentic AI engine for video games
      from scratch, and delivered machine learning infrastructure for one of Europe's largest
      e-commerce platforms.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Style the about text width**

Append to `styles.css`:

```css
.about-text {
  max-width: 65ch;
}
```

- [ ] **Step 3: Verify**

- `get_page_text` includes "multi-agent orchestration, RAG pipelines" and "Artificial Solutions".
- Screenshot at 375px — paragraph text wraps cleanly, no overflow.
- Console has no new errors.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add about section"
```

---

### Task 4: Experience section

**Files:**
- Modify: `index.html` (fill `#experience`)
- Modify: `styles.css` (append experience styles)

**Interfaces:**
- Consumes: `.section`, `h2`, `--border`, `--font-mono` from Task 1.
- Produces: `.timeline`, `.timeline-item`, `.timeline-role`, `.timeline-meta` — not reused elsewhere.

- [ ] **Step 1: Fill in the experience markup**

Replace `<section id="experience" class="section"></section>` with:

```html
<section id="experience" class="section">
  <div class="container">
    <h2>02. Experience</h2>
    <ol class="timeline">
      <li class="timeline-item">
        <p class="timeline-meta">March 2023 – Present · Barcelona, remote</p>
        <h3 class="timeline-role">SW Engineer &amp; AI Engineer — Artificial Solutions</h3>
        <ul>
          <li>SaaS platform for conversational AI; led GenAI R&amp;D covering RAG, LLM evaluation, and synthetic data generation.</li>
          <li>Built Python analytics modules with LlamaIndex and LangChain, deployed on Azure and Kubernetes.</li>
        </ul>
      </li>
      <li class="timeline-item">
        <p class="timeline-meta">2023 – Present · Personal project</p>
        <h3 class="timeline-role">ML/AI Director — PirateLink AI Engine</h3>
        <ul>
          <li>Agentic AI event engine for video games, built from scratch, using LLaMA-based reasoning.</li>
          <li>TTS/ASR via Groq inference, async event orchestration, and agentic coding workflows.</li>
        </ul>
      </li>
      <li class="timeline-item">
        <p class="timeline-meta">July 2022 – January 2023 · Remote</p>
        <h3 class="timeline-role">SW Engineer &amp; DevOps — Narrativa</h3>
        <ul>
          <li>SaaS NLP platform built on a microservice architecture.</li>
          <li>CI/CD with Argo and GitLab; Java 17 / Micronaut.</li>
        </ul>
      </li>
      <li class="timeline-item">
        <p class="timeline-meta">June 2016 – June 2022 · Madrid</p>
        <h3 class="timeline-role">Java Engineer &amp; Data Ops — Zooplus</h3>
        <ul>
          <li>E-commerce features and ML pipelines with PySpark on AWS/Mesos.</li>
          <li>Microservice infrastructure with multi-database management.</li>
        </ul>
      </li>
      <li class="timeline-item">
        <p class="timeline-meta">March 2015 – May 2016 · Madrid</p>
        <h3 class="timeline-role">Software Engineer — Exceltic</h3>
        <ul>
          <li>A-CDM system for air traffic control, using Java, Spring, MongoDB, and RabbitMQ.</li>
        </ul>
      </li>
    </ol>
  </div>
</section>
```

- [ ] **Step 2: Style the timeline**

Append to `styles.css`:

```css
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline-item {
  padding: var(--space-3) 0;
  border-top: 1px solid var(--border);
}

.timeline-item:first-child { border-top: none; }

.timeline-meta {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  margin: 0 0 var(--space-1);
}

.timeline-role {
  font-size: 1.1rem;
  color: var(--text);
  margin: 0 0 var(--space-1);
}

.timeline-item ul {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--text-dim);
}

.timeline-item li { margin-bottom: 0.3rem; }
```

- [ ] **Step 3: Verify**

- `get_page_text` includes "Artificial Solutions", "PirateLink AI Engine", "Narrativa", "Zooplus", "Exceltic" in that order.
- Screenshot at 375px — dates/roles stack cleanly, no overflow.
- Console has no new errors.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add experience timeline section"
```

---

### Task 5: Skills section

**Files:**
- Modify: `index.html` (fill `#skills`)
- Modify: `styles.css` (append skills styles)

**Interfaces:**
- Consumes: `.section`, `h2`, `--border`, `--font-mono` from Task 1.
- Produces: `.skills-grid`, `.skill-group`, `.tag-list`, `.tag` — not reused elsewhere.

- [ ] **Step 1: Fill in the skills markup**

Replace `<section id="skills" class="section"></section>` with:

```html
<section id="skills" class="section">
  <div class="container">
    <h2>03. Skills</h2>
    <div class="skills-grid">
      <div class="skill-group">
        <h3>AI &amp; ML</h3>
        <ul class="tag-list">
          <li class="tag">Conversational AI</li>
          <li class="tag">Multi-agent systems</li>
          <li class="tag">RAG</li>
          <li class="tag">LLMs</li>
          <li class="tag">Prompt engineering</li>
          <li class="tag">LlamaIndex</li>
          <li class="tag">LangChain</li>
          <li class="tag">Pydantic AI</li>
          <li class="tag">Synthetic data generation</li>
          <li class="tag">Agentic SDLC workflows</li>
        </ul>
      </div>
      <div class="skill-group">
        <h3>Languages</h3>
        <ul class="tag-list">
          <li class="tag">Python</li>
          <li class="tag">Java 11-21</li>
          <li class="tag">PySpark</li>
        </ul>
      </div>
      <div class="skill-group">
        <h3>Cloud &amp; Infra</h3>
        <ul class="tag-list">
          <li class="tag">Azure</li>
          <li class="tag">AWS</li>
          <li class="tag">Kubernetes</li>
          <li class="tag">Docker</li>
          <li class="tag">Mesos</li>
        </ul>
      </div>
      <div class="skill-group">
        <h3>CI/CD &amp; DevOps</h3>
        <ul class="tag-list">
          <li class="tag">GitLab CI/CD</li>
          <li class="tag">Jenkins</li>
          <li class="tag">Argo</li>
          <li class="tag">Dropwizard</li>
          <li class="tag">Micronaut</li>
          <li class="tag">Spring</li>
        </ul>
      </div>
      <div class="skill-group">
        <h3>Data &amp; Messaging</h3>
        <ul class="tag-list">
          <li class="tag">PostgreSQL</li>
          <li class="tag">Cassandra</li>
          <li class="tag">DynamoDB</li>
          <li class="tag">Oracle</li>
          <li class="tag">Redis</li>
          <li class="tag">Kafka</li>
          <li class="tag">ELK</li>
          <li class="tag">RabbitMQ</li>
        </ul>
      </div>
      <div class="skill-group">
        <h3>SDLC</h3>
        <ul class="tag-list">
          <li class="tag">Agile</li>
          <li class="tag">Microservices</li>
          <li class="tag">API design</li>
          <li class="tag">Code review</li>
          <li class="tag">Automated testing</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the skills grid and tags**

Append to `styles.css`:

```css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
}

.skill-group h3 {
  font-size: 0.95rem;
  color: var(--text);
  margin-bottom: var(--space-2);
}

.tag-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-dim);
  background: var(--bg-alt);
}
```

- [ ] **Step 3: Verify**

- `get_page_text` includes "Conversational AI", "Kubernetes", "PostgreSQL", "Agile".
- Screenshot at 375px — tag groups stack to a single column, no horizontal overflow; at 1440px they form a multi-column grid.
- Console has no new errors.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add skills section"
```

---

### Task 6: Projects section

**Files:**
- Modify: `index.html` (fill `#projects`)
- Modify: `styles.css` (append project card styles)

**Interfaces:**
- Consumes: `.section`, `h2`, `.tag`, `.tag-list` from Tasks 1 and 5 (reused for project stack tags).
- Produces: `.project-grid`, `.project-card` — not reused elsewhere.

- [ ] **Step 1: Fill in the projects markup**

Replace `<section id="projects" class="section"></section>` with:

```html
<section id="projects" class="section">
  <div class="container">
    <h2>04. Projects</h2>
    <div class="project-grid">
      <article class="project-card">
        <h3>Conversational AI SaaS Platform</h3>
        <p>
          Full-cycle design and implementation of a SaaS platform for low-code conversational
          flow interaction — from architecture to production deployment on Azure and Kubernetes.
          Led GenAI R&amp;D including RAG patterns, private LLM evaluation, and synthetic data
          generation for testing; built Python analytics modules with LlamaIndex and LangChain.
        </p>
        <ul class="tag-list">
          <li class="tag">Conversational AI</li>
          <li class="tag">RAG</li>
          <li class="tag">LlamaIndex</li>
          <li class="tag">LangChain</li>
          <li class="tag">Azure</li>
          <li class="tag">K8s</li>
          <li class="tag">Java 11-21</li>
          <li class="tag">Kafka</li>
        </ul>
        <a href="https://www.teneo.ai" target="_blank" rel="noopener">teneo.ai →</a>
      </article>

      <article class="project-card">
        <h3>PirateLink AI Engine <span class="project-tag-inline">Personal project</span></h3>
        <p>
          An agentic AI event engine for video games, built from scratch as a personal R&amp;D
          project. LLaMA-based agents handle game event reasoning, coordinated with TTS/ASR
          models via Groq inference for real-time voice interaction, with async event handling
          and an agentic coding workflow for AI-assisted code generation and review.
        </p>
        <ul class="tag-list">
          <li class="tag">Python</li>
          <li class="tag">Pydantic AI</li>
          <li class="tag">LLaMA</li>
          <li class="tag">Groq</li>
          <li class="tag">TTS/ASR</li>
          <li class="tag">Async events</li>
        </ul>
        <a href="https://www.pirateblood.com" target="_blank" rel="noopener">pirateblood.com →</a>
      </article>

      <article class="project-card">
        <h3>Narrativa NLP Platform <span class="project-tag-inline">Past</span></h3>
        <p>Design and implementation of a SaaS platform bringing NLP functionality on demand.</p>
        <a href="https://www.narrativa.com" target="_blank" rel="noopener">narrativa.com →</a>
      </article>

      <article class="project-card">
        <h3>Zooplus</h3>
        <p>Improving and developing features across the shop and data operations for one of Europe's largest e-commerce platforms.</p>
        <a href="https://www.zooplus.com" target="_blank" rel="noopener">zooplus.com →</a>
      </article>

      <article class="project-card">
        <h3>Interaction</h3>
        <p>Improving airport management systems.</p>
        <a href="http://www.interaction-aero.eu" target="_blank" rel="noopener">interaction-aero.eu →</a>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the project cards**

Append to `styles.css`:

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-3);
}

.project-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-3);
  background: var(--bg-alt);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.project-card h3 {
  font-size: 1.05rem;
  margin: 0;
  color: var(--text);
}

.project-tag-inline {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--text-dim);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  margin-left: 0.4rem;
  vertical-align: middle;
}

.project-card p {
  font-size: 0.92rem;
  margin: 0;
}

.project-card .tag-list { margin: var(--space-1) 0; }

.project-card > a {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  margin-top: auto;
}
```

- [ ] **Step 3: Verify**

- `get_page_text` includes "teneo.ai", "pirateblood.com", "Narrativa", "Zooplus", "Interaction".
- `find` on "teneo.ai →" resolves to a clickable link with `target="_blank"`.
- Screenshot at 375px — cards stack to one column; at 1440px they form a multi-column grid, no overflow.
- Console has no new errors.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add projects section"
```

---

### Task 7: Education section

**Files:**
- Modify: `index.html` (fill `#education`)
- Modify: `styles.css` (append education list styles)

**Interfaces:**
- Consumes: `.section`, `h2`, `--font-mono` from Task 1.
- Produces: `.education-list` — not reused elsewhere.

- [ ] **Step 1: Fill in the education markup**

Replace `<section id="education" class="section"></section>` with:

```html
<section id="education" class="section">
  <div class="container">
    <h2>05. Education</h2>
    <ul class="education-list">
      <li><span class="edu-year">2024</span> AI Engineer Bootcamp — AI Makerspace</li>
      <li><span class="edu-year">2023</span> LLM-Powered Applications with LangChain — Udemy</li>
      <li><span class="edu-year">2021</span> Machine Learning Engineer Nanodegree — Udacity</li>
      <li><span class="edu-year">2019</span> Statistics with Python Specialization — Coursera</li>
      <li><span class="edu-year">2017–18</span> Deep Learning Specialization — Coursera</li>
      <li><span class="edu-year">2015</span> Statistical Learning &amp; Data Mining — UNED</li>
      <li><span class="edu-year">2011</span> Master's in Software Engineering &amp; Web — Universidad de Alcalá</li>
      <li><span class="edu-year">2010</span> Degree in Computer Science — Universidad de Alcalá</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Style the education list**

Append to `styles.css`:

```css
.education-list {
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--text-dim);
}

.education-list li {
  padding: 0.5rem 0;
  border-top: 1px solid var(--border);
}

.education-list li:first-child { border-top: none; }

.edu-year {
  font-family: var(--font-mono);
  color: var(--accent);
  margin-right: var(--space-2);
  display: inline-block;
  min-width: 4.5rem;
}
```

- [ ] **Step 3: Verify**

- `get_page_text` includes "AI Engineer Bootcamp" and "Universidad de Alcalá".
- Screenshot at 375px — year + text wrap without overlapping.
- Console has no new errors.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add education section"
```

---

### Task 8: Contact section

**Files:**
- Modify: `index.html` (fill `#contact`)
- Modify: `styles.css` (append contact styles)

**Interfaces:**
- Consumes: `.section`, `h2`, `.icon-link` from Tasks 1 and 2 (reused for contact links).
- Produces: `.contact-links` — not reused elsewhere.

- [ ] **Step 1: Fill in the contact markup**

Replace `<section id="contact" class="section"></section>` with:

```html
<section id="contact" class="section">
  <div class="container">
    <h2>06. Contact</h2>
    <p>I'm currently exploring new opportunities — feel free to reach out.</p>
    <div class="contact-links">
      <a href="mailto:andres.rubio.saz@gmail.com" class="icon-link">andres.rubio.saz@gmail.com</a>
      <a href="https://www.linkedin.com/in/andresrubiodelsaz" class="icon-link" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://github.com/AndresRubio" class="icon-link" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style the contact links row**

Append to `styles.css`:

```css
.contact-links {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-top: var(--space-3);
}
```

- [ ] **Step 3: Verify**

- `get_page_text` includes "andres.rubio.saz@gmail.com" and "exploring new opportunities".
- `find` on "LinkedIn" in the contact section resolves to `https://www.linkedin.com/in/andresrubiodelsaz`.
- Screenshot at 375px — links wrap without overflow.
- Console has no new errors.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add contact section"
```

---

### Task 9: Scroll-reveal, active-nav-link JS, and full responsive pass

**Files:**
- Modify: `script.js`
- Modify: `styles.css` (append reveal + final responsive rules)

**Interfaces:**
- Consumes: `.section` (Task 1), `.site-nav a` (Task 1) — attaches behavior, adds no new markup.
- Produces: `.is-visible` class toggled on `.section` elements; `.active` class toggled on `.site-nav a` elements (already styled in Task 1's `.site-nav a.active` rule).

- [ ] **Step 1: Add the reveal-on-scroll base CSS**

Append to `styles.css`:

```css
.section {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.section.is-visible {
  opacity: 1;
  transform: none;
}

.hero {
  opacity: 1;
  transform: none;
}
```

- [ ] **Step 2: Write the scroll-reveal and active-nav-link JS**

Replace the contents of `script.js`:

```js
// Progressive enhancement only — the page is fully usable without JS.

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main .section');
  const navLinks = document.querySelectorAll('.site-nav a');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach((section) => revealObserver.observe(section));

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach((section) => navObserver.observe(section));
  } else {
    sections.forEach((section) => section.classList.add('is-visible'));
  }
});
```

- [ ] **Step 3: Verify scroll behavior and full responsive pass**

Open the page in the Browser tool:
- Scroll down slowly; sections fade/slide into view; the corresponding nav link gains `.active` (verify via `read_page` showing the class, or a screenshot showing the accent-colored active link).
- `read_console_messages` — zero errors.
- Resize to 375px, 768px, and 1440px and screenshot each — no section overflows horizontally, text remains readable, project/skill grids reflow to fewer columns at narrow widths.
- Reduced-motion check: this is CSS-only (`prefers-reduced-motion`) and needs no separate JS test — confirm the media query from Task 1 still wraps the transition-disabling rule (visually inspect `styles.css`).

- [ ] **Step 4: Commit**

```bash
git add script.js styles.css
git commit -m "Add scroll-reveal and active nav-link behavior"
```

---

### Task 10: Final content QA, GitHub Pages deploy

**Files:**
- Modify: `index.html` (only if QA finds a discrepancy)

**Interfaces:**
- Consumes: the finished page from Tasks 1–9.
- Produces: nothing consumed by later tasks — this is the terminal task.

- [ ] **Step 1: Cross-check content against the spec**

Open `docs/superpowers/specs/2026-09-14-portfolio-site-design.md` side by side with `index.html` and confirm every fact (company names, dates, project names, tech tags, contact details) matches. Fix any mismatch directly in `index.html`.

- [ ] **Step 2: Full-page verification pass**

In the Browser tool:
- `get_page_text` on the full page and confirm it contains every company name (Artificial Solutions, PirateLink AI Engine, Narrativa, Zooplus, Exceltic), every project name, and the contact email.
- Click every nav link (`find` + `computer` click) and confirm it scrolls to the matching section.
- Click every outbound link's `href` value via `read_page` (don't need to actually navigate to third-party sites) and confirm each URL matches the spec: teneo.ai, pirateblood.com, narrativa.com, zooplus.com, interaction-aero.eu, linkedin.com/in/andresrubiodelsaz, github.com/AndresRubio, mailto:andres.rubio.saz@gmail.com.
- `read_console_messages` — zero errors across the whole session.

- [ ] **Step 3: Commit any QA fixes (skip if none needed)**

```bash
git add index.html
git commit -m "Fix content discrepancies found in final QA"
```

- [ ] **Step 4: Ask the user for explicit confirmation, then push**

This is the first action that touches the shared GitHub repo. Ask the user in chat:

> "Ready to push these N commits to `AndresRubio/portfolio` (`main` branch)? This will make the code visible on GitHub immediately (Pages won't be live until you also flip the Pages setting in step 5)."

Only after an explicit yes:

```bash
git push origin main
```

- [ ] **Step 5: Tell the user how to enable GitHub Pages**

No `gh` CLI or API token is available in this environment, so Pages must be enabled manually. Tell the user:

> "Go to https://github.com/AndresRubio/portfolio/settings/pages, under 'Build and deployment' set Source to 'Deploy from a branch', pick branch `main` and folder `/ (root)`, then Save. The site will be live at https://andresrubio.github.io/portfolio within a minute or two."

- [ ] **Step 6: Final live verification (after user confirms Pages is enabled)**

Once the user confirms the site is live, navigate the Browser tool to `https://andresrubio.github.io/portfolio` and repeat the checks from Step 2 against the live URL instead of the local file.
