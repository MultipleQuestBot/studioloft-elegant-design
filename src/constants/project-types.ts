import type { ProjectType } from "@/types/project";

export const PROJECT_TYPES: Array<{ id: ProjectType; label: string }> = [
  { id: "apartment", label: "Квартиры" },
  { id: "house", label: "Дома" },
  { id: "commercial", label: "Коммерческие" },
  { id: "renovation", label: "Ремонт" },
];
