import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.api.deps import AdminUser, DbSession
from app.crud import project as project_crud
from app.schemas.project import PortfolioListResponse, ProjectCreate, ProjectPublic, ProjectUpdate

router = APIRouter(prefix="/portfolio", tags=["portfolio"])


@router.get("", response_model=PortfolioListResponse)
def list_portfolio(
    db: DbSession,
    page: Annotated[int, Query(ge=1)] = 1,
    limit: Annotated[int, Query(ge=1, le=100)] = 12,
    type: Annotated[str | None, Query(alias="type")] = None,
) -> PortfolioListResponse:
    items, has_more = project_crud.list_projects(db, project_type=type, page=page, limit=limit)
    return PortfolioListResponse(
        items=[ProjectPublic.from_orm_project(p) for p in items],
        hasMore=has_more,
    )


@router.get("/{project_id}", response_model=ProjectPublic)
def get_portfolio_item(db: DbSession, project_id: uuid.UUID) -> ProjectPublic:
    row = project_crud.get_project(db, project_id)
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return ProjectPublic.from_orm_project(row)


@router.post("", response_model=ProjectPublic)
def create_portfolio_item(
    db: DbSession,
    _admin: AdminUser,
    body: ProjectCreate,
) -> ProjectPublic:
    row = project_crud.create_project(db, body)
    return ProjectPublic.from_orm_project(row)


@router.put("/{project_id}", response_model=ProjectPublic)
def update_portfolio_item(
    db: DbSession,
    _admin: AdminUser,
    project_id: uuid.UUID,
    body: ProjectUpdate,
) -> ProjectPublic:
    row = project_crud.update_project(db, project_id, body)
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return ProjectPublic.from_orm_project(row)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_portfolio_item(
    db: DbSession,
    _admin: AdminUser,
    project_id: uuid.UUID,
) -> None:
    ok = project_crud.delete_project(db, project_id)
    if not ok:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
