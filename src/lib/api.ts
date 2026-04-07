const BACKEND_URL = process.env.NEXT_PUBLIC_PATH_BACKEND || "http://localhost:8000";

export type PortfolioProject = {
  id?: string | number;
  category?: string;
  image?: string;
  title?: string;
  description?: string;
  summary?: string;
  area?: string;
  duration?: string;
  two_d_images?: string[];
  viz_3d_images?: string[];
  result_images?: string[];
};

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/portfolio`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPortfolioProjectById(id: string): Promise<PortfolioProject | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/portfolio/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === "object" ? (data as PortfolioProject) : null;
  } catch {
    return null;
  }
}
