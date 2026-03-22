# >_ GhostDog CV

CV multi-rendu de **GhostDog** (Arthur Seguret) — une seule source de donnees, 5 rendus differents.

## Rendus disponibles

| Rendu | Description |
|-------|-------------|
| **Web** | Site React avec dark theme dev-modern |
| **API REST** | FastAPI avec Swagger auto-generee |
| **CLI** | Affichage terminal avec rich/typer |
| **PDF** | Meme design que le web, telechargeable |
| **Agent IA** | Chatbot conversationnel (a venir) |

## CLI — Installation

```bash
pip install git+https://github.com/ghostdog-dev/ghostdog-cv.git
```

### Commandes

```bash
ghostdog-cv              # CV complet
ghostdog-cv skills       # Competences
ghostdog-cv experience   # Experiences
ghostdog-cv projects     # Projets
ghostdog-cv education    # Formation
ghostdog-cv chat         # Agent IA (necessite connexion)
```

## API — Endpoints

| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/cv` | CV complet en JSON |
| GET | `/cv/meta` | Informations personnelles |
| GET | `/cv/skills` | Competences |
| GET | `/cv/experience` | Experiences |
| GET | `/cv/projects` | Projets |
| GET | `/cv/education` | Formation |
| GET | `/cv/languages` | Langues |
| GET | `/cv/interests` | Centres d'interet |
| GET | `/pdf` | Telecharge le CV en PDF |
| POST | `/chat` | Discuter avec l'agent IA |

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Donnees | YAML (single source of truth) |
| API | Python, FastAPI, Uvicorn |
| CLI | Python, Typer, Rich |
| Front | React, TypeScript, Vite.js |
| Style | CSS pur (pas de framework) |
| Deploy front | Netlify |
| Deploy API | GCP Cloud Run |

## Dev local

```bash
# API
pip install -r api/requirements.txt
uvicorn api.main:app --port 8000 --reload

# Front
cd web && npm install && npm run dev
```

## Auteur

**Arthur Seguret** aka **GhostDog**
- GitHub : [ghostdog-dev](https://github.com/ghostdog-dev)
- LinkedIn : [arthur-seguret](https://www.linkedin.com/in/arthur-seguret-052bb5288)
- Email : ghostdogthe1@gmail.com
