import uuid
from collections.abc import Sequence
from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def list_projects(
    db: Session,
    *,
    project_type: str | None,
    page: int,
    limit: int,
) -> tuple[Sequence[Project], bool]:
    data_stmt = select(Project).order_by(Project.project_publication_date.desc())
    if project_type:
        data_stmt = data_stmt.where(Project.project_type == project_type)

    offset = (page - 1) * limit
    data_stmt = data_stmt.offset(offset).limit(limit + 1)
    rows = list(db.scalars(data_stmt).all())

    has_more = len(rows) > limit
    items = rows[:limit]
    return items, has_more


def get_project(db: Session, project_id: uuid.UUID) -> Project | None:
    return db.get(Project, project_id)


def create_project(db: Session, data: ProjectCreate) -> Project:
    row = Project(
        project_name=data.name,
        project_type=data.type,
        number_of_rooms=data.rooms,
        square_footage=data.area,
        project_style=data.style,
        description=data.description,
        main_project_images=data.mainImages,
        all_images=data.images,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def update_project(db: Session, project_id: uuid.UUID, data: ProjectUpdate) -> Project | None:
    row = get_project(db, project_id)
    if row is None:
        return None
    payload = data.model_dump(exclude_unset=True)
    mapping = {
        "name": "project_name",
        "type": "project_type",
        "rooms": "number_of_rooms",
        "area": "square_footage",
        "style": "project_style",
        "mainImages": "main_project_images",
        "images": "all_images",
    }
    for key, val in payload.items():
        attr = mapping.get(key, key)
        setattr(row, attr, val)
    row.project_modification_date = datetime.now(UTC)
    db.commit()
    db.refresh(row)
    return row


def delete_project(db: Session, project_id: uuid.UUID) -> bool:
    row = get_project(db, project_id)
    if row is None:
        return False
    db.delete(row)
    db.commit()
    return True
