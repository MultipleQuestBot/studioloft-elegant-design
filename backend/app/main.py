import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import auth, portfolio, requests, upload
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
app.include_router(upload.router)


@app.on_event("startup")
def on_startup() -> None:
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base, "data")
    static_images_dir = os.path.join(base, "static", "images")
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(static_images_dir, exist_ok=True)
    init_db()


base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app.mount("/static", StaticFiles(directory=os.path.join(base, "static")), name="static")
