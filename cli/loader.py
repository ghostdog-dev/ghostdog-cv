from pathlib import Path
import yaml

_YAML_PATH = Path(__file__).parent.parent / "data" / "cv.yaml"


def load_cv() -> dict:
    with open(_YAML_PATH, encoding="utf-8") as f:
        return yaml.safe_load(f)
