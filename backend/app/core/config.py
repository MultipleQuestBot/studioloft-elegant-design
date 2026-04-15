from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "StudioLoft API"
    database_url: str = Field(
        default="sqlite:///./data/studioloft.db",
        description="SQLAlchemy URL; use postgresql+psycopg://... for PostgreSQL later",
        validation_alias="DATABASE_URL",
    )

    cors_origins: str = Field(
        default="http://localhost:3000",
        description="Comma-separated list of allowed browser origins",
        validation_alias="CORS_ORIGINS",
    )

    admin_username: str = Field(default="admin")
    admin_password: str = Field(default="change-me")

    jwt_secret: str = Field(
        default="dev-change-me-to-a-long-random-string-min-32-chars",
        validation_alias="JWT_SECRET",
    )
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 8


@lru_cache
def get_settings() -> Settings:
    return Settings()


def get_cors_origin_list() -> list[str]:
    raw = get_settings().cors_origins
    return [o.strip() for o in raw.split(",") if o.strip()]
