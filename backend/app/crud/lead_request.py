import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.lead_request import LeadRequest
from app.schemas.request import LeadRequestCreate


def create_lead_request(db: Session, data: LeadRequestCreate) -> LeadRequest:
    row = LeadRequest(
        name=data.name,
        email=data.email,
        phone_number=data.phone_number,
        description=data.description,
        square_footage=data.square_footage,
        object_type=data.object_type,
        number_of_rooms=data.number_of_rooms,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def list_lead_requests(db: Session) -> list[LeadRequest]:
    stmt = select(LeadRequest).order_by(LeadRequest.created_at.desc())
    return list(db.scalars(stmt).all())


def delete_lead_request(db: Session, request_id: uuid.UUID) -> bool:
    row = db.get(LeadRequest, request_id)
    if row is None:
        return False
    db.delete(row)
    db.commit()
    return True
