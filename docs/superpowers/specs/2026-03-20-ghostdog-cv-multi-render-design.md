# GhostDog CV — Multi-Render Application Design

## Overview

Application CV multi-rendu pour Arthur Seguret aka GhostDog. Une seule source de donnees (YAML) alimente 5 rendus differents adaptes a chaque audience : API REST, CLI, site web, PDF, agent IA conversationnel.

Architecture monorepo. Deploy front sur Netlify (gratuit), API sur GCP Cloud Run (free tier), CLI installable via GitHub.

---

## 1. Donnees (Single Source of Truth)

### Structure

```
data/
  cv.yaml      → toutes les donnees du CV
  cv.pdf       → PDF statique cree manuellement
  loader.py    → parse YAML, expose des objets Python types
```

### Schema YAML

```yaml
meta:
  name: "Arthur Seguret"
  alias: "GhostDog"
  title: "Developpeur Python"
  contact:
    email: "..."
    github: "..."
    linkedin: "..."

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
  - title: "..."
    company: "..."
    period: "..."
    description: "..."
    tags: ["microservices", "automatisation", "python"]

projects:
  - name: "..."
    stack: ["Python", "React"]
    description: "..."

education:
  - school: "..."
    degree: "..."
    year: "..."
    description: "..."
```

### Loader

`data/loader.py` — parse le YAML et retourne des dataclasses ou modeles Pydantic. Importe par l'API, le CLI et l'agent. Pas de base de donnees.

---

## 2. API REST (FastAPI)

### Structure

```
api/
  main.py
  routers/
    cv.py
    agent.py
    pdf.py
  dependencies.py
```

### Endpoints

| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/cv` | CV complet en JSON |
| GET | `/cv/skills` | Competences |
| GET | `/cv/experience` | Experiences |
| GET | `/cv/projects` | Projets |
| GET | `/pdf` | Telecharge le PDF statique |
| POST | `/chat` | Message a l'agent IA, retourne la reponse |

### Schema `POST /chat`

**Request body :**
```json
{
  "message": "Quelles sont tes competences en Python ?",
  "history": [
    {"role": "user", "content": "Salut"},
    {"role": "assistant", "content": "Salut ! Je suis GhostDog..."}
  ]
}
```

**Response :**
```json
{
  "response": "En Python, j'ai 2 ans d'experience expert...",
  "usage": {"input_tokens": 500, "output_tokens": 150}
}
```

`history` est optionnel (vide au premier message). Max 20 messages.

### Specifications

- Swagger/OpenAPI auto-generee avec descriptions detaillees et exemples sur chaque endpoint
- CORS configure pour le domaine Netlify du front
- Pas d'authentification (CV public)
- Rate limiting sur `POST /chat` : 10 requetes/minute par IP pour proteger le budget API Claude
- Deploiement : GCP Cloud Run free tier
- Variables d'env : `ANTHROPIC_API_KEY`, `CORS_ORIGINS` (domaine Netlify)

---

## 3. CLI (Package Python)

### Structure

```
cli/
  __init__.py
  main.py       → point d'entree (typer)
  display.py    → rendu terminal (rich)
  chat.py       → mode interactif agent IA
```

### Commandes

| Commande | Description |
|----------|-------------|
| `ghostdog-cv` | CV complet en terminal (rich) |
| `ghostdog-cv skills` | Competences |
| `ghostdog-cv experience` | Experiences |
| `ghostdog-cv projects` | Projets |
| `ghostdog-cv chat` | Mode chat interactif avec l'agent |

### Specifications

- Installation : `pip install git+https://github.com/Laseguue/ghostdog-cv.git` (pas PyPI)
- Lit le YAML embarque dans le package (fonctionne offline)
- Le chat appelle l'API deployee (endpoint `/chat`) — necessite connexion
- Rendu avec `rich` : tableaux, panels, couleurs
- Parsing commandes avec `typer`

---

## 4. Agent IA

### Structure

```
agent/
  __init__.py
  core.py       → logique agent (appel Claude API, contexte CV)
  prompts.py    → system prompt et templates
```

### Fonctionnement

- Module partage importe par les 3 canaux (API, CLI, web via API)
- Charge le CV depuis le YAML comme contexte pour Claude
- System prompt : l'agent represente GhostDog, connait le CV, repond aux questions sur le profil
- Decline poliment les questions hors sujet CV
- Historique de conversation : le client (front ou CLI) maintient l'historique des messages et envoie le tableau complet a chaque requete `POST /chat`. Max 20 messages pour controler les couts en tokens. Pas de persistence cote serveur.
- LLM : Claude (Anthropic API)

### Integration

| Canal | Methode |
|-------|---------|
| API | `POST /chat` importe `agent.core` directement cote serveur |
| CLI | `ghostdog-cv chat` appelle `POST /chat` sur l'API deployee |
| Web | Front envoie au `POST /chat` sur l'API deployee |

- Cle API Claude stockee cote serveur uniquement (variable d'env)

---

## 5. Frontend (React/TypeScript)

### Structure

```
web/
  src/
    pages/
      Home.tsx        → landing page hub
      CvView.tsx      → CV visuel
      ApiDoc.tsx       → redirection Swagger / quick start
      Chat.tsx         → interface chat agent
    components/
      Header.tsx
      Footer.tsx
      ChatWidget.tsx
    styles/
      global.css
      home.css
      cv.css
      chat.css
    App.tsx
    main.tsx
  public/
  vite.config.ts
  package.json
```

Le PDF est stocke uniquement dans `data/cv.pdf`. Le build Vite copie le fichier dans `public/` via un script de build (pas de duplication manuelle).

### Landing Page (Hub)

5 cartes d'acces :

| Carte | Action |
|-------|--------|
| CV Web | Navigue vers `/cv` |
| API REST | Lien vers Swagger API deployee |
| CLI | Lien vers repo GitHub + instructions |
| PDF | Telecharge `cv.pdf` |
| Parler a GhostDog | Navigue vers `/chat` |

### Design

- CSS pur, fichiers separes par page/composant — PAS de Tailwind ni framework CSS
- Style dev moderne, clair, epure, sombre — design unique non generique
- Typo monospace, accents de couleur subtils
- Responsive mobile
- React Router pour navigation
- Vite.js pour build
- Deploy Netlify (statique)

---

## 6. Structure Monorepo Finale

```
ghostdog-cv/
  data/
    cv.yaml
    cv.pdf
    loader.py
  agent/
    __init__.py
    core.py
    prompts.py
  api/
    main.py
    routers/
      cv.py
      agent.py
      pdf.py
    dependencies.py
  cli/
    __init__.py
    main.py
    display.py
    chat.py
  web/
    src/
      pages/
      components/
      styles/
    public/
    vite.config.ts
    package.json
  pyproject.toml
  README.md
  Dockerfile
```

---

## 7. Deploiement

| Composant | Plateforme | Methode |
|-----------|-----------|---------|
| Front | Netlify | Build Vite → statique, deploy auto GitHub |
| API | GCP Cloud Run free tier | Docker, variable d'env ANTHROPIC_API_KEY + CORS_ORIGINS |
| CLI | GitHub | `pip install git+https://...` |
| PDF | Netlify (`public/`) | Statique avec le front |

### Flux utilisateur

1. L'utilisateur arrive sur le site Netlify (hub)
2. Choisit son rendu prefere
3. Le front appelle l'API GCP pour le chat et donnees dynamiques
4. Le CLI est autonome (YAML embarque) sauf chat (appelle l'API)

---

## 8. Stack technique

| Couche | Technologie |
|--------|-------------|
| Donnees | YAML + Pydantic/dataclasses |
| API | Python, FastAPI |
| CLI | Python, Typer, Rich |
| Agent | Python, Anthropic SDK (Claude) |
| Front | React, TypeScript, Vite.js, React Router |
| Style | CSS pur (pas de framework) |
| Deploy front | Netlify |
| Deploy API | GCP Cloud Run (free tier) |
| Conteneur | Docker (pour API) |
| VCS | GitHub |

## 9. Branding

- Pseudo **GhostDog** utilise partout en priorite
- Nom reel **Arthur Seguret** utilise avec parcimonie (section contact, mentions legales)

---

## 10. Packaging

### CLI (pyproject.toml)

Le package CLI inclut : `cli/`, `agent/`, `data/loader.py` et `data/cv.yaml`. Le YAML est embarque dans le package (fonctionne offline). Les sous-commandes hors chat n'ont besoin que du YAML + rich + typer. La commande chat appelle l'API distante.

### API (Dockerfile)

Le conteneur Docker inclut : `api/`, `agent/`, `data/`. Il sert l'API FastAPI avec uvicorn.

### Front (web/)

Projet Node independant avec son propre `package.json`. Build Vite produit un dossier statique deploye sur Netlify. Un script de build copie `data/cv.pdf` dans `public/` avant le build.

---

## 11. Gestion des erreurs (frontend)

- **Pages CV, Home** : autonomes, pas de dependance API. Fonctionnent toujours.
- **Page Chat** : affiche un message d'erreur si l'API est indisponible ou en cold start. Timeout de 15s avec message "L'agent demarre, patientez..."
- **Telechargement PDF** : servi en statique depuis Netlify, pas de dependance API.

---

## 12. Variables d'environnement

| Variable | Ou | Description |
|----------|----|-------------|
| `ANTHROPIC_API_KEY` | Cloud Run | Cle API Claude |
| `CORS_ORIGINS` | Cloud Run | Domaines autorises (URL Netlify) |
| `VITE_API_URL` | Netlify (build time) | URL de l'API Cloud Run |
