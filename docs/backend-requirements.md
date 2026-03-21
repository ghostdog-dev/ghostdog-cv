# Backend Requirements for Frontend

Ce document decrit ce que le backend (API FastAPI) doit fournir pour que le frontend fonctionne.

## Base URL

Configuree cote front via `VITE_API_URL` (variable d'env au build time).

## CORS

Le backend doit autoriser les requetes depuis le domaine du front (Netlify).

---

## Endpoints requis

### `GET /cv`

Retourne le CV complet.

**Response `200`** :
```json
{
  "meta": {
    "name": "Arthur Seguret",
    "alias": "GhostDog",
    "title": "Developpeur Python",
    "contact": {
      "email": "contact@ghostdog.dev",
      "github": "https://github.com/Laseguue",
      "linkedin": "https://linkedin.com/in/arthur-seguret"
    }
  },
  "skills": {
    "backend": [
      {
        "name": "Python",
        "level": "expert",
        "years": 2,
        "frameworks": ["FastAPI", "Django", "Flask"]
      }
    ],
    "frontend": [
      {
        "name": "React",
        "level": "junior",
        "tools": ["TypeScript", "Vite.js"]
      }
    ],
    "infra": [
      {
        "name": "Docker"
      },
      {
        "name": "GCP",
        "details": ["Cloud Run", "Cloud Functions"]
      }
    ]
  },
  "experience": [
    {
      "title": "Developpeur Python",
      "company": "Entreprise",
      "period": "2024 - present",
      "description": "Description du poste...",
      "tags": ["python", "microservices"]
    }
  ],
  "projects": [
    {
      "name": "Nom du projet",
      "stack": ["Python", "React"],
      "description": "Description du projet..."
    }
  ],
  "education": [
    {
      "school": "Ecole",
      "degree": "Diplome",
      "year": "2024",
      "description": "Description..."
    }
  ]
}
```

**Types TS correspondants** : voir `web/src/types/cv.ts`

---

### `GET /cv/skills`

Retourne uniquement la section `skills` du CV.

**Response `200`** : objet `Skills` (meme structure que `skills` dans `/cv`)

---

### `GET /cv/experience`

Retourne uniquement les experiences.

**Response `200`** : tableau `Experience[]`

---

### `GET /cv/projects`

Retourne uniquement les projets.

**Response `200`** : tableau `Project[]`

---

### `GET /pdf`

Retourne le fichier PDF en telechargement.

**Response** : `application/pdf` avec header `Content-Disposition: attachment; filename="cv-ghostdog.pdf"`

---

### `POST /chat`

Envoie un message a l'agent IA.

**Request body** :
```json
{
  "message": "Quelles sont tes competences en Python ?",
  "history": [
    { "role": "user", "content": "Salut" },
    { "role": "assistant", "content": "Salut ! Je suis GhostDog..." }
  ]
}
```

- `message` (string, requis) : le message de l'utilisateur
- `history` (array, optionnel) : historique des messages precedents, max 20 items
- Chaque item : `{ "role": "user" | "assistant", "content": string }`

**Response `200`** :
```json
{
  "response": "En Python, j'ai 2 ans d'experience...",
  "usage": {
    "input_tokens": 500,
    "output_tokens": 150
  }
}
```

- `response` (string) : la reponse de l'agent
- `usage` (object, optionnel) : stats de tokens

**Types TS correspondants** : voir `web/src/types/chat.ts`

---

## Comportement attendu

| Scenario | Comportement front |
|----------|--------------------|
| API indisponible | Loader puis message d'erreur avec bouton "Reessayer" |
| Reponse lente (>15s) | Le front attend (pas de timeout cote front sur GET) |
| Chat timeout | Message "Agent temporairement indisponible" |
| Erreur 4xx/5xx | Message d'erreur generique |

## Variables d'environnement front

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de base de l'API (sans trailing slash) | `https://api.ghostdog.dev` |
