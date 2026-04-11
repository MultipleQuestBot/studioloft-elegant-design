import type { Project, ProjectsQuery, ProjectsResponse } from "@/types/project";

const BACKEND_URL = process.env.NEXT_PUBLIC_PATH_BACKEND || "http://localhost:8000";

type RawProject = Record<string, unknown>;

const stringOrEmpty = (value: unknown) => (typeof value === "string" ? value : "");
const numberOrZero = (value: unknown) => (typeof value === "number" ? value : 0);

function normalizeProject(raw: RawProject): Project {
  const rawMainImages = raw.mainImages;
  const rawImages = raw.images;

  const mainImages = Array.isArray(rawMainImages)
    ? rawMainImages.filter((item): item is string => typeof item === "string")
    : [];

  const images = Array.isArray(rawImages)
    ? rawImages.filter((item): item is string => typeof item === "string")
    : [];

  return {
    id:
      stringOrEmpty(raw.id) ||
      `${stringOrEmpty(raw.name || raw.title)}-${stringOrEmpty(raw.createdAt || raw.created_at)}`,
    name: stringOrEmpty(raw.name || raw.title),
    type: (stringOrEmpty(raw.type || raw.category) as Project["type"]) || "apartment",
    rooms: numberOrZero(raw.rooms),
    area: numberOrZero(raw.area),
    style: stringOrEmpty(raw.style),
    description: stringOrEmpty(raw.description || raw.summary),
    mainImages: mainImages.length > 0 ? mainImages : images.slice(0, 1),
    images,
    createdAt: stringOrEmpty(raw.createdAt || raw.created_at),
  };
}

export async function getProjects(query: ProjectsQuery = {}): Promise<ProjectsResponse> {
  const page = query.page ?? 1;
  const limit = query.limit ?? 12;

  try {
    const params = new URLSearchParams();
    if (query.type) params.set("type", query.type);
    params.set("page", String(page));
    params.set("limit", String(limit));

    const res = await fetch(`${BACKEND_URL}/portfolio?${params.toString()}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return { items: [], hasMore: false };

    const data = (await res.json()) as unknown;

    // Backend-ready shape: { items, hasMore }.
    if (
      typeof data === "object" &&
      data !== null &&
      Array.isArray((data as { items?: unknown[] }).items)
    ) {
      const payload = data as { items: RawProject[]; hasMore?: boolean };
      return {
        items: payload.items.map(normalizeProject),
        hasMore: Boolean(payload.hasMore),
      };
    }

    // Fallback for current backend shape: raw array.
    if (Array.isArray(data)) {
      const allItems = data.map((item) => normalizeProject(item as RawProject));
      const filtered = query.type ? allItems.filter((item) => item.type === query.type) : allItems;
      const start = (page - 1) * limit;
      const sliced = filtered.slice(start, start + limit);
      return {
        items: sliced,
        hasMore: start + limit < filtered.length,
      };
    }

    return { items: [], hasMore: false };
  } catch {
    return { items: [], hasMore: false };
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/portfolio/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as unknown;
    if (!data || typeof data !== "object") return null;
    return normalizeProject(data as RawProject);
  } catch {
    return null;
  }
}
