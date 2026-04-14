from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.session import get_db

security = HTTPBearer(auto_error=False)


def get_current_admin(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> str:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    sub = decode_access_token(credentials.credentials)
    if sub is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return sub


DbSession = Annotated[Session, Depends(get_db)]
AdminUser = Annotated[str, Depends(get_current_admin)]
