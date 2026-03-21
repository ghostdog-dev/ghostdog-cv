# GhostDog CV — Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete frontend for the GhostDog CV multi-render hub — a React/TypeScript app with pure CSS, dark dev-modern design, serving as the central access point to all CV rendus.

**Architecture:** Single-page app with React Router. Landing page acts as a hub dispatching to 5 rendus (CV web, API doc, CLI readme, PDF download, agent chat). Each page has its own CSS file. No component library, no Tailwind — pure handcrafted CSS with CSS custom properties for theming. Vite for build, Netlify for deploy.

**Tech Stack:** React 18, TypeScript, React Router v6, Vite, pure CSS (custom properties, grid, flexbox)

**Spec:** `docs/superpowers/specs/2026-03-20-ghostdog-cv-multi-render-design.md`

---

## File Structure

```
web/
  index.html
  vite.config.ts
  package.json
  tsconfig.json
  src/
    main.tsx                    → React entry point
    App.tsx                     → Router setup
    pages/
      Home.tsx                  → Landing page hub (5 cartes d'acces)
      CvView.tsx                → CV visuel complet
      Chat.tsx                  → Interface chat agent IA (UI shell, pas de backend)
      ApiDoc.tsx                → Page info/redirection Swagger
    components/
      Header.tsx                → Navigation + branding GhostDog
      Footer.tsx                → Liens + credits
      Card.tsx                  → Carte reutilisable pour le hub
      ChatBubble.tsx            → Bulle message (user/assistant)
    styles/
      reset.css                 → CSS reset minimal
      variables.css             → Custom properties (couleurs, typo, spacing)
      global.css                → Styles globaux (body, liens, typo)
      header.css
      footer.css
      home.css
      card.css
      cv.css
      chat.css
      apidoc.css
    data/
      cv.json                   → Donnees CV (genere depuis data/cv.yaml via script build)
    types/
      cv.ts                     → Types TypeScript pour les donnees CV
```

---

### Task 1: Project scaffolding (Vite + React + TS + Router)

**Files:**
- Create: `web/package.json`
- Create: `web/vite.config.ts`
- Create: `web/tsconfig.json`
- Create: `web/index.html`
- Create: `web/src/main.tsx`
- Create: `web/src/App.tsx`

- [ ] **Step 1: Init Vite project**

```bash
cd /Users/ghostdog/Documents/Python/CV
npm create vite@latest web -- --template react-ts
```

- [ ] **Step 2: Install React Router**

```bash
cd /Users/ghostdog/Documents/Python/CV/web
npm install react-router-dom
```

- [ ] **Step 3: Clean up scaffolded files**

Remove all default Vite styles and boilerplate content. Delete `src/App.css`, `src/index.css`, `src/assets/`. Clean `App.tsx` and `main.tsx` to blank slate.

- [ ] **Step 4: Set up App.tsx with Router**

```tsx
// web/src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CvView from "./pages/CvView";
import Chat from "./pages/Chat";
import ApiDoc from "./pages/ApiDoc";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CvView />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/api" element={<ApiDoc />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 5: Create placeholder pages and components**

Create minimal placeholder components for `Home.tsx`, `CvView.tsx`, `Chat.tsx`, `ApiDoc.tsx`, `Header.tsx`, `Footer.tsx` — each returning a simple `<div>` with the page name so the router works.

- [ ] **Step 6: Set up main.tsx**

```tsx
// web/src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 7: Verify dev server runs**

```bash
cd /Users/ghostdog/Documents/Python/CV/web
npm run dev
```

Expected: App runs on localhost, router works, all 4 routes display their placeholder.

- [ ] **Step 8: Commit**

```bash
git add web/
git commit -m "feat(web): scaffold Vite + React + TS + Router"
```

---

### Task 2: CSS foundation (reset, variables, global styles)

**Files:**
- Create: `web/src/styles/reset.css`
- Create: `web/src/styles/variables.css`
- Create: `web/src/styles/global.css`

- [ ] **Step 1: Write reset.css**

Minimal CSS reset — box-sizing, margin/padding reset, consistent font rendering.

```css
/* web/src/styles/reset.css */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

img, svg {
  display: block;
  max-width: 100%;
}

button, input, textarea {
  font: inherit;
  color: inherit;
  border: none;
  background: none;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}
```

- [ ] **Step 2: Write variables.css**

Design tokens — dark theme, monospace-first typography, dev-modern palette.

```css
/* web/src/styles/variables.css */
:root {
  /* Colors — dark dev theme */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #16161f;
  --bg-hover: #1e1e2a;

  --text-primary: #e4e4e8;
  --text-secondary: #8888a0;
  --text-muted: #55556a;

  --accent: #6c63ff;
  --accent-hover: #7f78ff;
  --accent-subtle: rgba(108, 99, 255, 0.12);

  --border: #1e1e2a;
  --border-hover: #2a2a3a;

  --success: #4ade80;
  --error: #f87171;

  /* Typography */
  --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", "Cascadia Code", monospace;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;

  --leading-tight: 1.25;
  --leading-normal: 1.6;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Layout */
  --max-width: 1100px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

- [ ] **Step 3: Write global.css**

Body defaults, link styles, typography base, page layout.

```css
/* web/src/styles/global.css */
html, body, #root {
  height: 100%;
}

body {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
}

a {
  color: var(--accent);
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-hover);
}

::selection {
  background-color: var(--accent-subtle);
  color: var(--text-primary);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-hover);
  border-radius: 3px;
}
```

- [ ] **Step 4: Verify visual result**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run dev
```

Expected: Dark background, monospace font, clean scrollbar, accent color on links.

- [ ] **Step 5: Commit**

```bash
git add web/src/styles/
git commit -m "feat(web): CSS foundation — reset, variables, global styles"
```

---

### Task 3: Header and Footer components

**Files:**
- Create: `web/src/components/Header.tsx`
- Create: `web/src/components/Footer.tsx`
- Create: `web/src/styles/header.css`
- Create: `web/src/styles/footer.css`

- [ ] **Step 1: Write Header**

```tsx
// web/src/components/Header.tsx
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";

const navItems = [
  { path: "/", label: "Hub" },
  { path: "/cv", label: "CV" },
  { path: "/chat", label: "Agent" },
  { path: "/api", label: "API" },
];

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-symbol">&gt;_</span>
          <span className="header__logo-text">GhostDog</span>
        </Link>
        <nav className="header__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__link${pathname === item.path ? " header__link--active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
```

- [ ] **Step 2: Write header.css**

```css
/* web/src/styles/header.css */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
}

.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.header__logo:hover {
  color: var(--text-primary);
}

.header__logo-symbol {
  color: var(--accent);
}

.header__nav {
  display: flex;
  gap: var(--space-lg);
}

.header__link {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.header__link:hover {
  color: var(--text-primary);
  background-color: var(--bg-hover);
}

.header__link--active {
  color: var(--accent);
}
```

- [ ] **Step 3: Write Footer**

```tsx
// web/src/components/Footer.tsx
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__text">
          <span className="footer__symbol">&gt;_</span> GhostDog — Arthur Seguret
        </p>
        <div className="footer__links">
          <a href="https://github.com/Laseguue" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/arthur-seguret" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 4: Write footer.css**

```css
/* web/src/styles/footer.css */
.footer {
  border-top: 1px solid var(--border);
  background-color: var(--bg-secondary);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
}

.footer__text {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.footer__symbol {
  color: var(--accent);
}

.footer__links {
  display: flex;
  gap: var(--space-md);
}

.footer__links a {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.footer__links a:hover {
  color: var(--accent);
}
```

- [ ] **Step 5: Verify Header and Footer render correctly**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run dev
```

Expected: Sticky header with ">_ GhostDog" logo, nav links with active state, footer with credits.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/Header.tsx web/src/components/Footer.tsx web/src/styles/header.css web/src/styles/footer.css
git commit -m "feat(web): Header + Footer components with CSS"
```

---

### Task 4: Card component + Landing page (Hub)

**Files:**
- Create: `web/src/components/Card.tsx`
- Create: `web/src/styles/card.css`
- Modify: `web/src/pages/Home.tsx`
- Create: `web/src/styles/home.css`

- [ ] **Step 1: Write Card component**

```tsx
// web/src/components/Card.tsx
import { Link } from "react-router-dom";
import "../styles/card.css";

interface CardProps {
  title: string;
  description: string;
  icon: string;
  to?: string;
  href?: string;
  download?: boolean;
}

function Card({ title, description, icon, to, href, download }: CardProps) {
  const content = (
    <>
      <span className="card__icon">{icon}</span>
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{description}</p>
      <span className="card__arrow">-&gt;</span>
    </>
  );

  if (href) {
    return (
      <a
        className="card"
        href={href}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        download={download ? "" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="card" to={to || "/"}>
      {content}
    </Link>
  );
}

export default Card;
```

- [ ] **Step 2: Write card.css**

```css
/* web/src/styles/card.css */
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-xl);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-base), transform var(--transition-base), background-color var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.card:hover {
  border-color: var(--border-hover);
  background-color: var(--bg-hover);
  transform: translateY(-2px);
}

.card:hover::before {
  transform: scaleX(1);
}

.card__icon {
  font-size: var(--text-2xl);
  line-height: 1;
}

.card__title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.card__description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

.card__arrow {
  font-size: var(--text-sm);
  color: var(--text-muted);
  transition: color var(--transition-fast), transform var(--transition-fast);
  margin-top: auto;
}

.card:hover .card__arrow {
  color: var(--accent);
  transform: translateX(4px);
}
```

- [ ] **Step 3: Write Home page**

```tsx
// web/src/pages/Home.tsx
import Card from "../components/Card";
import "../styles/home.css";

const API_DOC_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/docs`
  : "#";

const GITHUB_URL = "https://github.com/Laseguue/ghostdog-cv";

function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <p className="home__prefix">$&gt; whoami</p>
        <h1 className="home__title">GhostDog</h1>
        <p className="home__subtitle">
          Developpeur Python — Microservices, Automatisation, IA
        </p>
      </section>

      <section className="home__grid">
        <Card
          icon="{ }"
          title="CV Web"
          description="Version interactive et visuelle du CV"
          to="/cv"
        />
        <Card
          icon="/*/"
          title="API REST"
          description="Endpoints JSON, Swagger, exemples"
          href={API_DOC_URL}
        />
        <Card
          icon="$_"
          title="CLI"
          description="pip install depuis GitHub, affichage terminal"
          href={GITHUB_URL}
        />
        <Card
          icon="pdf"
          title="PDF"
          description="Format classique, telechargement direct"
          href="/cv.pdf"
          download
        />
        <Card
          icon="[>]"
          title="Agent IA"
          description="Discutez avec GhostDog, posez vos questions"
          to="/chat"
        />
      </section>
    </div>
  );
}

export default Home;
```

- [ ] **Step 4: Write home.css**

```css
/* web/src/styles/home.css */
.home {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xl);
  padding-top: var(--space-3xl);
}

.home__hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.home__prefix {
  font-size: var(--text-sm);
  color: var(--accent);
  font-family: var(--font-mono);
}

.home__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

.home__subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 500px;
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}

@media (max-width: 640px) {
  .home {
    padding-top: var(--space-2xl);
  }

  .home__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify landing page**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run dev
```

Expected: Hero section with terminal-style "$> whoami" prefix, title "GhostDog", 5 cards in a responsive grid. Cards have hover effects (border glow, slight lift, accent line animating in from left).

- [ ] **Step 6: Commit**

```bash
git add web/src/components/Card.tsx web/src/styles/card.css web/src/pages/Home.tsx web/src/styles/home.css
git commit -m "feat(web): landing page hub with 5 render cards"
```

---

### Task 5: Types et donnees CV

**Files:**
- Create: `web/src/types/cv.ts`
- Create: `web/src/data/cv.json`

- [ ] **Step 1: Write TypeScript types**

```ts
// web/src/types/cv.ts
export interface CvData {
  meta: Meta;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export interface Meta {
  name: string;
  alias: string;
  title: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export interface Skills {
  backend: Skill[];
  frontend: Skill[];
  infra: Skill[];
}

export interface Skill {
  name: string;
  level?: string;
  years?: number;
  frameworks?: string[];
  tools?: string[];
  details?: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Project {
  name: string;
  stack: string[];
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  description: string;
}
```

- [ ] **Step 2: Create data/cv.yaml (source of truth) and conversion script**

Create `data/cv.yaml` with placeholder data and a Python script `scripts/yaml2json.py` that converts it to `web/src/data/cv.json`.

```yaml
# data/cv.yaml
meta:
  name: "Arthur Seguret"
  alias: "GhostDog"
  title: "Developpeur Python"
  contact:
    email: "contact@ghostdog.dev"
    github: "https://github.com/Laseguue"
    linkedin: "https://linkedin.com/in/arthur-seguret"

skills:
  backend:
    - name: "Python"
      level: "expert"
      years: 2
      frameworks: ["FastAPI", "Django", "Flask"]
    - name: "Microservices"
      level: "expert"
  frontend:
    - name: "React"
      level: "junior"
      tools: ["TypeScript", "Vite.js", "Vike", "React Router"]
  infra:
    - name: "Docker"
    - name: "GCP"
      details: ["Cloud Run", "Cloud Functions"]
    - name: "GitHub"

experience:
  - title: "Developpeur Python"
    company: "---"
    period: "2024 - present"
    description: "Automatisation de taches internes, creation de microservices integres a l'application principale pour la rendre autonome."
    tags: ["python", "microservices", "automatisation", "fastapi"]

projects:
  - name: "Site Web IA"
    stack: ["Python", "React", "TypeScript"]
    description: "Application full stack avec integration IA"
  - name: "Site E-commerce"
    stack: ["React", "Django", "PostgreSQL"]
    description: "Plateforme e-commerce complete"
  - name: "GhostDog CV"
    stack: ["FastAPI", "React", "Claude API", "Rich"]
    description: "CV multi-rendu : API, CLI, Web, PDF, Agent IA"

education:
  - school: "---"
    degree: "---"
    year: "---"
    description: "---"
```

```python
# scripts/yaml2json.py
import json
import yaml
from pathlib import Path

root = Path(__file__).parent.parent
yaml_path = root / "data" / "cv.yaml"
json_path = root / "web" / "src" / "data" / "cv.json"

json_path.parent.mkdir(parents=True, exist_ok=True)

with open(yaml_path) as f:
    data = yaml.safe_load(f)

with open(json_path, "w") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Converted {yaml_path} -> {json_path}")
```

- [ ] **Step 2b: Run the conversion**

```bash
pip install pyyaml
python scripts/yaml2json.py
```

- [ ] **Step 2c: Add prebuild script to package.json**

Add to `web/package.json` scripts:
```json
"prebuild": "python ../scripts/yaml2json.py",
"predev": "python ../scripts/yaml2json.py"
```

- [ ] **Step 3: Commit**

```bash
git add web/src/types/cv.ts web/src/data/cv.json
git commit -m "feat(web): CV types and sample data"
```

---

### Task 6: CV View page

**Files:**
- Modify: `web/src/pages/CvView.tsx`
- Create: `web/src/styles/cv.css`

- [ ] **Step 1: Write CvView page**

```tsx
// web/src/pages/CvView.tsx
import cvData from "../data/cv.json";
import type { CvData } from "../types/cv";
import "../styles/cv.css";

const cv = cvData as CvData;

function CvView() {
  return (
    <div className="cv">
      <section className="cv__header">
        <h1 className="cv__name">{cv.meta.alias}</h1>
        <p className="cv__real-name">{cv.meta.name}</p>
        <p className="cv__title">{cv.meta.title}</p>
        <div className="cv__contact">
          <a href={`mailto:${cv.meta.contact.email}`}>{cv.meta.contact.email}</a>
          <span className="cv__separator">|</span>
          <a href={cv.meta.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="cv__separator">|</span>
          <a href={cv.meta.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>

      <section className="cv__section">
        <h2 className="cv__section-title">
          <span className="cv__section-prefix">#</span> Competences
        </h2>
        <div className="cv__skills">
          {Object.entries(cv.skills).map(([category, skills]) => (
            <div key={category} className="cv__skill-group">
              <h3 className="cv__skill-category">{category}</h3>
              <div className="cv__skill-list">
                {skills.map((skill) => (
                  <div key={skill.name} className="cv__skill">
                    <span className="cv__skill-name">{skill.name}</span>
                    {skill.level && <span className="cv__skill-level">{skill.level}</span>}
                    {skill.frameworks && (
                      <span className="cv__skill-detail">{skill.frameworks.join(", ")}</span>
                    )}
                    {skill.tools && (
                      <span className="cv__skill-detail">{skill.tools.join(", ")}</span>
                    )}
                    {skill.details && (
                      <span className="cv__skill-detail">{skill.details.join(", ")}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cv__section">
        <h2 className="cv__section-title">
          <span className="cv__section-prefix">#</span> Experience
        </h2>
        {cv.experience.map((exp, i) => (
          <div key={i} className="cv__entry">
            <div className="cv__entry-header">
              <h3 className="cv__entry-title">{exp.title}</h3>
              <span className="cv__entry-period">{exp.period}</span>
            </div>
            <p className="cv__entry-company">{exp.company}</p>
            <p className="cv__entry-description">{exp.description}</p>
            <div className="cv__tags">
              {exp.tags.map((tag) => (
                <span key={tag} className="cv__tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="cv__section">
        <h2 className="cv__section-title">
          <span className="cv__section-prefix">#</span> Projets
        </h2>
        <div className="cv__projects">
          {cv.projects.map((project, i) => (
            <div key={i} className="cv__project">
              <h3 className="cv__project-name">{project.name}</h3>
              <p className="cv__project-description">{project.description}</p>
              <div className="cv__tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="cv__tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cv__section">
        <h2 className="cv__section-title">
          <span className="cv__section-prefix">#</span> Formation
        </h2>
        {cv.education.map((edu, i) => (
          <div key={i} className="cv__entry">
            <div className="cv__entry-header">
              <h3 className="cv__entry-title">{edu.degree}</h3>
              <span className="cv__entry-period">{edu.year}</span>
            </div>
            <p className="cv__entry-company">{edu.school}</p>
            <p className="cv__entry-description">{edu.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CvView;
```

- [ ] **Step 2: Write cv.css**

```css
/* web/src/styles/cv.css */
.cv {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  padding-top: var(--space-2xl);
}

/* Header */
.cv__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--border);
}

.cv__name {
  font-size: var(--text-3xl);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cv__real-name {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.cv__title {
  font-size: var(--text-lg);
  color: var(--accent);
}

.cv__contact {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: var(--space-sm);
}

.cv__separator {
  color: var(--text-muted);
}

/* Sections */
.cv__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.cv__section-title {
  font-size: var(--text-xl);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.cv__section-prefix {
  color: var(--accent);
  font-weight: 400;
}

/* Skills */
.cv__skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
}

.cv__skill-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.cv__skill-category {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cv__skill-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.cv__skill {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  font-size: var(--text-sm);
}

.cv__skill-name {
  font-weight: 600;
  color: var(--text-primary);
}

.cv__skill-level {
  color: var(--accent);
  font-size: var(--text-xs);
}

.cv__skill-detail {
  color: var(--text-secondary);
  font-size: var(--text-xs);
}

/* Entries (experience, education) */
.cv__entry {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-lg);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.cv__entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.cv__entry-title {
  font-size: var(--text-base);
  font-weight: 600;
}

.cv__entry-period {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.cv__entry-company {
  font-size: var(--text-sm);
  color: var(--accent);
}

.cv__entry-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

/* Tags */
.cv__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
}

.cv__tag {
  font-size: var(--text-xs);
  color: var(--accent);
  background-color: var(--accent-subtle);
  padding: 2px var(--space-sm);
  border-radius: var(--radius-sm);
}

/* Projects */
.cv__projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.cv__project {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-lg);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.cv__project-name {
  font-size: var(--text-base);
  font-weight: 600;
}

.cv__project-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .cv__skills {
    grid-template-columns: 1fr;
  }

  .cv__projects {
    grid-template-columns: 1fr;
  }

  .cv__entry-header {
    flex-direction: column;
  }
}
```

- [ ] **Step 3: Verify CV page**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run dev
```

Navigate to `/cv`. Expected: Clean CV layout with sections (competences in grid, experience in cards, projects in grid, tags with accent color pills).

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/CvView.tsx web/src/styles/cv.css
git commit -m "feat(web): CV view page with full layout"
```

---

### Task 7: Chat page (UI shell)

**Files:**
- Modify: `web/src/pages/Chat.tsx`
- Create: `web/src/components/ChatBubble.tsx`
- Create: `web/src/styles/chat.css`

- [ ] **Step 1: Write ChatBubble component**

```tsx
// web/src/components/ChatBubble.tsx

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

function ChatBubble({ role, content }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble chat-bubble--${role}`}>
      <span className="chat-bubble__author">
        {role === "user" ? "vous" : ">_ ghostdog"}
      </span>
      <p className="chat-bubble__content">{content}</p>
    </div>
  );
}

export default ChatBubble;
```

- [ ] **Step 2: Write Chat page**

```tsx
// web/src/pages/Chat.tsx
import { useState, useRef, useEffect } from "react";
import ChatBubble from "../components/ChatBubble";
import "../styles/chat.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Salut ! Je suis GhostDog, developpeur Python. Posez-moi vos questions sur mon parcours, mes competences ou mes projets.",
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Agent indisponible — API non configuree." },
      ]);
      setLoading(false);
      return;
    }

    try {
      const history = [...messages, userMessage]
        .slice(1)
        .slice(-20)
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history }),
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      const msg =
        err instanceof DOMException && err.name === "TimeoutError"
          ? "L'agent demarre, patientez et reessayez..."
          : "Agent temporairement indisponible.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="chat-bubble chat-bubble--assistant chat-bubble--loading">
            <span className="chat-bubble__author">&gt;_ ghostdog</span>
            <p className="chat-bubble__content">
              <span className="chat__typing">...</span>
            </p>
          </div>
        )}
        {error && <p className="chat__error">{error}</p>}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat__form" onSubmit={handleSubmit}>
        <input
          className="chat__input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez une question..."
          disabled={loading}
        />
        <button className="chat__send" type="submit" disabled={loading || !input.trim()}>
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Chat;
```

- [ ] **Step 3: Write chat.css**

```css
/* web/src/styles/chat.css */
.chat {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  gap: var(--space-md);
}

.chat__messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-md) 0;
}

/* Bubbles */
.chat-bubble {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  max-width: 75%;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
}

.chat-bubble--user {
  align-self: flex-end;
  background-color: var(--accent-subtle);
  border: 1px solid var(--accent);
}

.chat-bubble--assistant {
  align-self: flex-start;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
}

.chat-bubble__author {
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-weight: 600;
}

.chat-bubble__content {
  color: var(--text-primary);
  line-height: var(--leading-normal);
  white-space: pre-wrap;
}

.chat-bubble--loading .chat__typing {
  display: inline-block;
  animation: blink 1s steps(3) infinite;
  color: var(--text-muted);
  letter-spacing: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Error */
.chat__error {
  font-size: var(--text-sm);
  color: var(--error);
  text-align: center;
  padding: var(--space-sm);
}

/* Form */
.chat__form {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md) 0;
  border-top: 1px solid var(--border);
}

.chat__input {
  flex: 1;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
  outline: none;
  transition: border-color var(--transition-fast);
}

.chat__input::placeholder {
  color: var(--text-muted);
}

.chat__input:focus {
  border-color: var(--accent);
}

.chat__send {
  padding: var(--space-md) var(--space-xl);
  background-color: var(--accent);
  color: var(--bg-primary);
  font-weight: 600;
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.chat__send:hover:not(:disabled) {
  background-color: var(--accent-hover);
}

.chat__send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .chat-bubble {
    max-width: 90%;
  }
}
```

- [ ] **Step 4: Verify chat page**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run dev
```

Navigate to `/chat`. Expected: Full-height chat with welcome message, input form at bottom, typing indicator animation. Sans API configuree, envoyer un message affiche "Agent indisponible".

- [ ] **Step 5: Commit**

```bash
git add web/src/pages/Chat.tsx web/src/components/ChatBubble.tsx web/src/styles/chat.css
git commit -m "feat(web): chat page UI shell with message handling"
```

---

### Task 8: API Doc page

**Files:**
- Modify: `web/src/pages/ApiDoc.tsx`
- Create: `web/src/styles/apidoc.css`

- [ ] **Step 1: Write ApiDoc page**

```tsx
// web/src/pages/ApiDoc.tsx
import "../styles/apidoc.css";

const API_URL = import.meta.env.VITE_API_URL || "https://api.ghostdog.dev";

const endpoints = [
  { method: "GET", path: "/cv", description: "CV complet en JSON" },
  { method: "GET", path: "/cv/skills", description: "Competences" },
  { method: "GET", path: "/cv/experience", description: "Experiences" },
  { method: "GET", path: "/cv/projects", description: "Projets" },
  { method: "GET", path: "/pdf", description: "Telecharge le PDF" },
  { method: "POST", path: "/chat", description: "Discuter avec l'agent IA" },
];

function ApiDoc() {
  return (
    <div className="apidoc">
      <section className="apidoc__header">
        <h1 className="apidoc__title">API REST</h1>
        <p className="apidoc__subtitle">
          Acces programmatique au CV de GhostDog
        </p>
        <a
          className="apidoc__swagger-link"
          href={`${API_URL}/docs`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ouvrir Swagger UI -&gt;
        </a>
      </section>

      <section className="apidoc__section">
        <h2 className="apidoc__section-title">
          <span className="apidoc__prefix">#</span> Base URL
        </h2>
        <code className="apidoc__code-block">{API_URL}</code>
      </section>

      <section className="apidoc__section">
        <h2 className="apidoc__section-title">
          <span className="apidoc__prefix">#</span> Endpoints
        </h2>
        <div className="apidoc__endpoints">
          {endpoints.map((ep) => (
            <div key={ep.path} className="apidoc__endpoint">
              <span className={`apidoc__method apidoc__method--${ep.method.toLowerCase()}`}>
                {ep.method}
              </span>
              <code className="apidoc__path">{ep.path}</code>
              <span className="apidoc__desc">{ep.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="apidoc__section">
        <h2 className="apidoc__section-title">
          <span className="apidoc__prefix">#</span> Exemple rapide
        </h2>
        <pre className="apidoc__code-block">
{`$ curl ${API_URL}/cv | jq .meta

{
  "name": "Arthur Seguret",
  "alias": "GhostDog",
  "title": "Developpeur Python"
}`}
        </pre>
      </section>
    </div>
  );
}

export default ApiDoc;
```

- [ ] **Step 2: Write apidoc.css**

```css
/* web/src/styles/apidoc.css */
.apidoc {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  padding-top: var(--space-2xl);
}

.apidoc__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.apidoc__title {
  font-size: var(--text-3xl);
  font-weight: 800;
}

.apidoc__subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

.apidoc__swagger-link {
  display: inline-block;
  margin-top: var(--space-sm);
  font-size: var(--text-sm);
  color: var(--accent);
  font-weight: 600;
}

.apidoc__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.apidoc__section-title {
  font-size: var(--text-xl);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.apidoc__prefix {
  color: var(--accent);
  font-weight: 400;
}

.apidoc__code-block {
  display: block;
  padding: var(--space-lg);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-primary);
  overflow-x: auto;
  white-space: pre;
}

/* Endpoints */
.apidoc__endpoints {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.apidoc__endpoint {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
}

.apidoc__method {
  font-weight: 700;
  font-size: var(--text-xs);
  padding: 2px var(--space-sm);
  border-radius: var(--radius-sm);
  min-width: 50px;
  text-align: center;
}

.apidoc__method--get {
  color: var(--success);
  background-color: rgba(74, 222, 128, 0.1);
}

.apidoc__method--post {
  color: var(--accent);
  background-color: var(--accent-subtle);
}

.apidoc__path {
  font-family: var(--font-mono);
  color: var(--text-primary);
  font-weight: 600;
}

.apidoc__desc {
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .apidoc__endpoint {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
}
```

- [ ] **Step 3: Verify API doc page**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run dev
```

Navigate to `/api`. Expected: Clean page listing all endpoints with method badges (GET green, POST accent), code block with curl example, link to Swagger.

- [ ] **Step 4: Commit**

```bash
git add web/src/pages/ApiDoc.tsx web/src/styles/apidoc.css
git commit -m "feat(web): API documentation page"
```

---

### Task 9: PDF copy script + Vite config

**Files:**
- Modify: `web/vite.config.ts`
- Modify: `web/package.json` (add copy script)

- [ ] **Step 1: Install vite-plugin-static-copy**

```bash
cd /Users/ghostdog/Documents/Python/CV/web
npm install -D vite-plugin-static-copy
```

- [ ] **Step 2: Update vite.config.ts**

```ts
// web/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "../data/cv.pdf",
          dest: ".",
        },
      ],
    }),
  ],
});
```

- [ ] **Step 3: Create a placeholder PDF**

```bash
cd /Users/ghostdog/Documents/Python/CV
mkdir -p data
echo "placeholder" > data/cv.pdf
```

- [ ] **Step 4: Verify build works**

```bash
cd /Users/ghostdog/Documents/Python/CV/web
npm run build
ls dist/cv.pdf
```

Expected: `cv.pdf` exists in `dist/`.

- [ ] **Step 5: Commit**

```bash
git add web/vite.config.ts data/cv.pdf
git commit -m "feat(web): PDF copy from data/ to build output"
```

---

### Task 10: Responsive polish + final verification

**Files:**
- Modify: `web/src/styles/header.css` (mobile nav)
- Modify: various CSS files if needed

- [ ] **Step 1: Add mobile-friendly header**

Add a hamburger menu or simplified nav for small screens in `header.css`:

```css
/* Append to web/src/styles/header.css */
@media (max-width: 640px) {
  .header__inner {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .header__nav {
    gap: var(--space-md);
  }
}
```

- [ ] **Step 2: Full visual walkthrough**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run dev
```

Test all 4 routes on desktop and simulate mobile (DevTools responsive mode):
- `/` — Hub with 5 cards
- `/cv` — Full CV display
- `/chat` — Chat UI with welcome message
- `/api` — API doc with endpoints

- [ ] **Step 3: Build check**

```bash
cd /Users/ghostdog/Documents/Python/CV/web && npm run build
```

Expected: Clean build, no errors, no warnings.

- [ ] **Step 4: Commit**

```bash
git add -A web/
git commit -m "feat(web): responsive polish and final adjustments"
```
