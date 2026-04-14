import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator


class LeadRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: str | None = Field(default=None, max_length=255)
    phone_number: str | None = Field(default=None, max_length=64)
    description: str = Field(min_length=1)
    square_footage: int | None = Field(default=None, ge=0)
    object_type: str | None = Field(default=None, max_length=128)
    number_of_rooms: int | None = Field(default=None, ge=0)

    @model_validator(mode="after")
    def require_email_or_phone(self) -> "LeadRequestCreate":
        if not self.email and not self.phone_number:
            raise ValueError("Either email or phone_number is required")
        return self


class LeadRequestPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: str | None
    phone_number: str | None
    description: str
    square_footage: int | None
    object_type: str | None
    number_of_rooms: int | None
    created_at: datetime
