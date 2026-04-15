from pathlib import Path


def get_app_dir() -> Path:
    return Path(__file__).resolve().parents[1]


def get_static_dir() -> Path:
    return get_app_dir() / "static"


def get_static_images_dir() -> Path:
    return get_static_dir() / "images"
