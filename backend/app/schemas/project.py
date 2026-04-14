import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.project import Project as ProjectORM


class ProjectPublic(BaseModel):
    """JSON keys match frontend `Project` / `normalizeProject` expectations."""

    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    type: str
    rooms: int
    area: int
    style: str
    description: str
    mainImages: list[str] = Field(serialization_alias="mainImages")
    images: list[str]
    createdAt: datetime = Field(serialization_alias="createdAt")

    @classmethod
    def from_orm_project(cls, p: ProjectORM) -> "ProjectPublic":
        return cls(
            id=str(p.id),
            name=p.project_name,
            type=p.project_type,
            rooms=p.number_of_rooms,
            area=p.square_footage,
            style=p.project_style,
            description=p.description,
            mainImages=list(p.main_project_images or []),
            images=list(p.all_images or []),
            createdAt=p.project_publication_date,
        )


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    type: str = Field(min_length=1, max_length=64)
    rooms: int = Field(ge=0)
    area: int = Field(ge=0)
    style: str = Field(default="", max_length=255)
    description: str = ""
    mainImages: list[str] = Field(default_factory=list)
    images: list[str] = Field(default_factory=list)


class ProjectUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    type: str | None = Field(default=None, min_length=1, max_length=64)
    rooms: int | None = Field(default=None, ge=0)
    area: int | None = Field(default=None, ge=0)
    style: str | None = Field(default=None, max_length=255)
    description: str | None = None
    mainImages: list[str] | None = None
    images: list[str] | None = None


class PortfolioListResponse(BaseModel):
    items: list[ProjectPublic]
    hasMore: bool
