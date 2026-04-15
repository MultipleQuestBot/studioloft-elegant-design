export type ProjectType = "apartment" | "house" | "commercial" | "renovation";

export type Project = {
  id: string;
  name: string;
  type: ProjectType;
  rooms: number;
  area: number;
  style: string;
  description: string;
  mainImages: string[];
  images: string[];
  createdAt: string;
};

export type ProjectsQuery = {
  type?: ProjectType;
  page?: number;
  limit?: number;
};

export type ProjectsResponse = {
  items: Project[];
  hasMore: boolean;
};
