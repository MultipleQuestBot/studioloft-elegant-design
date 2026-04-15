# StudioLoft

Production-ready fullstack setup:

- Frontend: Next.js (App Router, TypeScript, Tailwind, shadcn/ui)
- Backend: FastAPI + SQLAlchemy + Pydantic + SQLite
- Reverse proxy: Nginx (TLS termination, HTTP -> HTTPS redirect)

## Local Development

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Deployment Guide

### 1. Domain setup

- Point your DNS A/AAAA record for `your-domain.com` to your server IP.
- Ensure inbound firewall rules allow ports `80` and `443`.

### 2. Configure environment files

- Copy `.env.example` to `.env` and set:
  - `NEXT_PUBLIC_PATH_BACKEND=https://your-domain.com/api`
  - `BACKEND_URL=http://backend:8000`
  - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
- Copy `backend/.env.example` to `backend/.env` and set:
  - `CORS_ORIGINS=https://your-domain.com`
  - Strong values for `ADMIN_PASSWORD` and `JWT_SECRET`

### 3. Run project

```bash
docker-compose up --build -d
```

### 4. Setup SSL

```bash
certbot --nginx -d your-domain.com
```

Nginx expects certificates at:

- `/etc/letsencrypt/live/your-domain.com/fullchain.pem`
- `/etc/letsencrypt/live/your-domain.com/privkey.pem`

Auto-renewal support:

```bash
certbot renew --dry-run
```

Run renewal via cron/systemd on the host.

### 5. Access

- https://your-domain.com

### 6. Notes

- Ports `3000` and `8000` are internal-only in Docker.
- Nginx is the only public entrypoint (`80/443`).
- `/` and frontend routes -> Next.js service.
- `/api/*` (except `/api/admin/*` preserved for Next auth proxy) -> FastAPI.
- `/static/*` -> FastAPI static files (`backend/app/static`).

## Validation Checklist

- Access
  - Site opens via `https://your-domain.com`.
- HTTPS
  - SSL certificate is valid.
  - No mixed-content warnings in browser console.
- Routing
  - Frontend routes render correctly.
  - API endpoints work under `/api/*`.
  - Images load from `/static/images/*`.
- Auth
  - Admin login/logout works.
  - `httpOnly` admin cookie remains functional.
- Docker
  - All three services (`frontend`, `backend`, `nginx`) are healthy.
