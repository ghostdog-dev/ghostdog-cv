from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

import yaml

_YAML_PATH = Path(__file__).parent / "data" / "cv.yaml"


def load_cv() -> dict[str, Any]:
    try:
        with open(_YAML_PATH, encoding="utf-8") as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        print(f"Erreur: fichier CV introuvable ({_YAML_PATH})", file=sys.stderr)
        raise SystemExit(1)
    except yaml.YAMLError as e:
        print(f"Erreur: YAML invalide dans {_YAML_PATH}: {e}", file=sys.stderr)
        raise SystemExit(1)
