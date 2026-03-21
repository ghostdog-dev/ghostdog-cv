from pathlib import Path
from typing import Optional
import yaml

_DATA_PATH = Path(__file__).parent.parent / "data" / "cv.yaml"
_cache: Optional[dict] = None


def load_cv() -> dict:
    global _cache
    if _cache is None:
        with open(_DATA_PATH, encoding="utf-8") as f:
            _cache = yaml.safe_load(f)
    return _cache


def reload_cv() -> dict:
    global _cache
    _cache = None
    return load_cv()
