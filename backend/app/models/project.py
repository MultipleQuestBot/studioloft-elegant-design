import uuid
from datetime import datetime

from sqlalchemy import JSON, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    project_name: Mapped[str] = mapped_column(String(255), nullable=False)
    project_type: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    number_of_rooms: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    square_footage: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    project_style: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    main_project_images: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    all_images: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    project_publication_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    project_modification_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
