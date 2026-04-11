import type { Metadata } from "next";
import PortfolioView from "@/views/PortfolioView";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Реализованные проекты интерьеров studioloft.",
};

export const revalidate = 300;

export default async function Page() {
  const { items, hasMore } = await getProjects({ page: 1, limit: 12 });
  return <PortfolioView initialProjects={items} initialHasMore={hasMore} />;
}
