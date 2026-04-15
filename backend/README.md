# StudioLoft FastAPI backend

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Set JWT_SECRET and ADMIN_PASSWORD in .env (must match Next.js ADMIN_JWT_SECRET)
```

## Run

```bash
# from backend/, with venv active
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

SQLite file is created at `backend/data/studioloft.db` on first startup.

## API

- Public: `GET /portfolio`, `GET /portfolio/{uuid}`, `POST /requests`
- Auth: `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` (Bearer)
- Admin (Bearer): `POST /portfolio`, `PUT /portfolio/{id}`, `DELETE /portfolio/{id}`, `GET /requests`, `DELETE /requests/{id}`

## PostgreSQL later

Set `DATABASE_URL` to e.g. `postgresql+psycopg://user:pass@host:5432/dbname` and install `psycopg[binary]`.
