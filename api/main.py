import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from api.cv_loader import load_cv

PDF_PATH = Path(__file__).parent.parent / "data" / "cv.pdf"

app = FastAPI(
    title="GhostDog CV API",
    description="API REST du CV multi-rendu de GhostDog (Arthur Seguret)",
    version="1.0.0",
)

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

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
def get_cv():
    return load_cv()


@app.get(
    "/cv/meta",
    summary="Informations personnelles",
    description="Retourne les meta-donnees : nom, titre, contact, bio.",
    tags=["CV"],
)
def get_meta():
    return load_cv()["meta"]


@app.get(
    "/cv/skills",
    summary="Competences",
    description="Retourne toutes les categories de competences.",
    tags=["CV"],
)
def get_skills():
    return load_cv()["skills"]


@app.get(
    "/cv/experience",
    summary="Experiences professionnelles",
    description="Retourne la liste des experiences.",
    tags=["CV"],
)
def get_experience():
    return load_cv()["experience"]


@app.get(
    "/cv/projects",
    summary="Projets",
    description="Retourne la liste des projets personnels et freelance.",
    tags=["CV"],
)
def get_projects():
    return load_cv()["projects"]


@app.get(
    "/cv/education",
    summary="Formation",
    description="Retourne le parcours de formation.",
    tags=["CV"],
)
def get_education():
    return load_cv()["education"]


@app.get(
    "/cv/languages",
    summary="Langues",
    description="Retourne les langues parlees.",
    tags=["CV"],
)
def get_languages():
    return load_cv()["languages"]


@app.get(
    "/cv/interests",
    summary="Centres d'interet",
    description="Retourne les centres d'interet.",
    tags=["CV"],
)
def get_interests():
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
