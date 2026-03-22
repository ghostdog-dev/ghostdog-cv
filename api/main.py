from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yaml

from api.cv_loader import load_cv

PDF_PATH = Path(__file__).parent.parent / "data" / "cv.pdf"

app = FastAPI(
    title="GhostDog CV API",
    description="API REST du CV multi-rendu de GhostDog (Arthur Seguret)",
    version="1.0.0",
)

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,https://cv-ghostdog.netlify.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get(
    "/cv",
    summary="CV complet",
    description="Retourne toutes les donnees du CV en JSON.",
    tags=["CV"],
)
def get_cv() -> dict[str, Any]:
    return load_cv()


@app.get(
    "/cv/meta",
    summary="Informations personnelles",
    description="Retourne les meta-donnees : nom, titre, contact, bio.",
    tags=["CV"],
)
def get_meta() -> dict[str, Any]:
    return load_cv()["meta"]


@app.get(
    "/cv/skills",
    summary="Competences",
    description="Retourne toutes les categories de competences.",
    tags=["CV"],
)
def get_skills() -> list[dict[str, Any]]:
    return load_cv()["skills"]


@app.get(
    "/cv/soft_skills",
    summary="Savoir-etre",
    description="Retourne les soft skills.",
    tags=["CV"],
)
def get_soft_skills() -> list[dict[str, Any]]:
    return load_cv().get("soft_skills", [])


@app.get(
    "/cv/experience",
    summary="Experiences professionnelles",
    description="Retourne la liste des experiences.",
    tags=["CV"],
)
def get_experience() -> list[dict[str, Any]]:
    return load_cv()["experience"]


@app.get(
    "/cv/projects",
    summary="Projets",
    description="Retourne la liste des projets personnels et freelance.",
    tags=["CV"],
)
def get_projects() -> list[dict[str, Any]]:
    return load_cv()["projects"]


@app.get(
    "/cv/education",
    summary="Formation",
    description="Retourne le parcours de formation.",
    tags=["CV"],
)
def get_education() -> list[dict[str, Any]]:
    return load_cv()["education"]


@app.get(
    "/cv/languages",
    summary="Langues",
    description="Retourne les langues parlees.",
    tags=["CV"],
)
def get_languages() -> list[dict[str, Any]]:
    return load_cv()["languages"]


@app.get(
    "/cv/interests",
    summary="Centres d'interet",
    description="Retourne les centres d'interet.",
    tags=["CV"],
)
def get_interests() -> list[dict[str, Any]]:
    return load_cv()["interests"]


@app.get(
    "/pdf",
    summary="Telecharger le CV en PDF",
    description="Genere et retourne le CV au format PDF.",
    tags=["PDF"],
)
def get_pdf():
    if not PDF_PATH.exists():
        return JSONResponse(
            status_code=404,
            content={"detail": "PDF non disponible."},
        )
    return FileResponse(
        path=PDF_PATH,
        media_type="application/pdf",
        filename="GhostDog-CV.pdf",
    )


# ── Chat / Agent IA ──────────────────────────────────────────────────────────


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    response: str
    usage: dict[str, int] | None = None


def _build_system_prompt() -> str:
    cv = load_cv()
    cv_yaml = yaml.dump(cv, allow_unicode=True, default_flow_style=False)
    return f"""Tu es GhostDog, l'agent IA du CV d'Arthur Seguret (alias GhostDog).

REGLES STRICTES :
- Tu reponds UNIQUEMENT aux questions qui concernent le CV, le parcours, les competences, l'experience, les projets, la formation, ou le profil professionnel d'Arthur Seguret / GhostDog.
- Si la question n'a AUCUN rapport avec le CV ou le profil professionnel, reponds poliment que tu es uniquement la pour parler du parcours de GhostDog et redirige vers le CV.
- Tu parles en francais par defaut. Si l'utilisateur ecrit en anglais, reponds en anglais.
- Sois concis, professionnel et sympathique.
- Ne reponds jamais avec des informations inventees. Base-toi uniquement sur les donnees du CV ci-dessous.
- Tu peux reformuler, synthetiser, comparer les experiences, mais ne fabrique rien.
- Si on te demande quelque chose que tu ne sais pas (ex: opinion personnelle, hobbies non listes), dis que tu n'as pas cette information dans le CV.

DONNEES DU CV :
```yaml
{cv_yaml}
```"""


@app.post(
    "/chat",
    summary="Discuter avec l'agent IA",
    description="Envoie un message a l'agent IA GhostDog qui repond uniquement sur le CV.",
    tags=["Chat"],
    response_model=ChatResponse,
)
def chat(req: ChatRequest):
    import anthropic

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="Agent IA non configure.")

    client = anthropic.Anthropic(api_key=api_key)

    messages = [{"role": m.role, "content": m.content} for m in req.history[-18:]]
    messages.append({"role": "user", "content": req.message})

    try:
        resp = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=_build_system_prompt(),
            messages=messages,
        )
    except anthropic.APIError as e:
        raise HTTPException(status_code=502, detail=f"Erreur API Claude : {e.message}")

    return ChatResponse(
        response=resp.content[0].text,
        usage={
            "input_tokens": resp.usage.input_tokens,
            "output_tokens": resp.usage.output_tokens,
        },
    )
