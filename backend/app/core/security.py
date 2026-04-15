import secrets
from datetime import UTC, datetime, timedelta
from typing import Any

from jose import JWTError, jwt

from app.core.config import get_settings


def verify_admin_credentials(username: str, password: str) -> bool:
    settings = get_settings()
    user_ok = secrets.compare_digest(username.encode("utf-8"), settings.admin_username.encode("utf-8"))
    pass_ok = secrets.compare_digest(password.encode("utf-8"), settings.admin_password.encode("utf-8"))
    return user_ok and pass_ok


def create_access_token(*, subject: str) -> str:
    settings = get_settings()
    expire = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)
    payload: dict[str, Any] = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> str | None:
    settings = get_settings()
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        sub = payload.get("sub")
        if isinstance(sub, str) and sub:
            return sub
    except JWTError:
        return None
    return None
