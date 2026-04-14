from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import create_access_token, decode_access_token, verify_admin_credentials
from app.schemas.auth import AuthMeResponse, LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])
_bearer = HTTPBearer(auto_error=True)


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest) -> TokenResponse:
    if not verify_admin_credentials(body.username, body.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(subject=body.username)
    return TokenResponse(access_token=token, token_type="bearer")


@router.post("/logout")
def logout(response: Response) -> dict[str, bool]:
    response.set_cookie(
        key="studioloft_admin_session",
        value="",
        max_age=0,
        expires=0,
        path="/",
        httponly=True,
        samesite="lax",
    )
    return {"ok": True}


@router.get("/me", response_model=AuthMeResponse)
def me(credentials: Annotated[HTTPAuthorizationCredentials, Depends(_bearer)]) -> AuthMeResponse:
    sub = decode_access_token(credentials.credentials)
    if sub is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return AuthMeResponse(authenticated=True, username=sub)
