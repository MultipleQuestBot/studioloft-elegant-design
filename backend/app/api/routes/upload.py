import imghdr
import uuid
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile, status
from pydantic import BaseModel

from app.api.deps import AdminUser

router = APIRouter(prefix="/upload-images", tags=["upload"])

ALLOWED_IMAGE_TYPES = {"jpeg": ".jpg", "png": ".png", "webp": ".webp", "gif": ".gif"}


class UploadImagesResponse(BaseModel):
    paths: list[str]


def _detect_image_extension(content: bytes) -> str | None:
    kind = imghdr.what(None, h=content)
    if kind is None:
        return None
    return ALLOWED_IMAGE_TYPES.get(kind)


@router.post("", response_model=UploadImagesResponse, status_code=status.HTTP_201_CREATED)
async def upload_images(
    _admin: AdminUser,
    files: list[UploadFile] = File(...),
) -> UploadImagesResponse:
    if not files:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No files provided")

    base_dir = Path(__file__).resolve().parents[2]
    upload_dir = base_dir / "static" / "images"
    upload_dir.mkdir(parents=True, exist_ok=True)

    saved_paths: list[str] = []
    for file in files:
        raw = await file.read()
        if not raw:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File '{file.filename or 'unknown'}' is empty",
            )

        extension = _detect_image_extension(raw)
        if extension is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File '{file.filename or 'unknown'}' is not a supported image",
            )

        filename = f"{uuid.uuid4().hex}{extension}"
        target_path = upload_dir / filename
        with target_path.open("wb") as buffer:
            buffer.write(raw)

        saved_paths.append(f"/static/images/{filename}")

    return UploadImagesResponse(paths=saved_paths)
