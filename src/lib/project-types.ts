import type { ProjectType } from "@/types/project";

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  apartment: "Квартира",
  house: "Дом",
  commercial: "Коммерческое помещение",
  renovation: "Ремонт/реконструкция",
};

export function getProjectTypeLabel(type: string | null | undefined): string {
  if (!type) return "—";
  return (PROJECT_TYPE_LABELS as Record<string, string>)[type] ?? type;
}

