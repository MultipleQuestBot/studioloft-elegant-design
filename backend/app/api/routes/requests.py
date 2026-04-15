import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import AdminUser, DbSession
from app.crud import lead_request as lead_crud
from app.schemas.request import LeadRequestCreate, LeadRequestPublic

router = APIRouter(prefix="/requests", tags=["requests"])


@router.post("", response_model=LeadRequestPublic, status_code=status.HTTP_201_CREATED)
def create_request(db: DbSession, body: LeadRequestCreate) -> LeadRequestPublic:
    row = lead_crud.create_lead_request(db, body)
    return LeadRequestPublic.model_validate(row)


@router.get("", response_model=list[LeadRequestPublic])
def list_requests(db: DbSession, _admin: AdminUser) -> list[LeadRequestPublic]:
    rows = lead_crud.list_lead_requests(db)
    return [LeadRequestPublic.model_validate(r) for r in rows]


@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request(
    db: DbSession,
    _admin: AdminUser,
    request_id: uuid.UUID,
) -> None:
    ok = lead_crud.delete_lead_request(db, request_id)
    if not ok:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request not found")
