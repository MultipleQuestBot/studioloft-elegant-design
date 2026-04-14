import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, portfolio, requests
from app.core.config import get_cors_origin_list, get_settings
from app.db.session import init_db

settings = get_settings()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origin_list(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(portfolio.router)
app.include_router(requests.router)


@app.on_event("startup")
def on_startup() -> None:
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base, "data")
    os.makedirs(data_dir, exist_ok=True)
    init_db()
