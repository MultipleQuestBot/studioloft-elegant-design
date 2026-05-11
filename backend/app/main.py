import os
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import auth, portfolio, requests, upload
from app.core.config import get_cors_origin_list, get_settings
from app.core.paths import get_static_dir, get_static_images_dir
from app.db.session import init_db

settings = get_settings()

logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("studioloft.api")

app = FastAPI(title=settings.app_name, debug=settings.debug)

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
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(get_static_images_dir(), exist_ok=True)
    init_db()
    logger.info("FastAPI startup complete; static dir=%s", str(get_static_dir()))


app.mount("/static", StaticFiles(directory=str(get_static_dir())), name="static")
