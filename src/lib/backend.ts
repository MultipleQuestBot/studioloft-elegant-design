/**
 * Server-side backend base URL (FastAPI). Prefer BACKEND_URL in API routes;
 * falls back to the public env used by the browser for portfolio fetches.
 */
export function getBackendBaseUrl(): string {
  return process.env.BACKEND_URL || process.env.NEXT_PUBLIC_PATH_BACKEND || "http://localhost:8000";
}
