from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

_DATA_PATH = Path(__file__).parent.parent / "data" / "cv.yaml"
_cache: dict[str, Any] | None = None


def load_cv() -> dict[str, Any]:
    global _cache
    if _cache is None:
        try:
            with open(_DATA_PATH, encoding="utf-8") as f:
                _cache = yaml.safe_load(f)
        except FileNotFoundError:
            raise RuntimeError(f"Fichier CV introuvable : {_DATA_PATH}")
        except yaml.YAMLError as e:
            raise RuntimeError(f"Fichier CV invalide : {e}")
    return _cache


def reload_cv() -> dict[str, Any]:
    global _cache
    _cache = None
    return load_cv()
