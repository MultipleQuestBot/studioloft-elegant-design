import type { Metadata } from "next";
import PortfolioView from "@/views/PortfolioView";
import { getPortfolioProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Реализованные проекты интерьеров studioloft.",
};

export const revalidate = 300;

export default async function Page() {
  const projects = await getPortfolioProjects();
  return <PortfolioView initialProjects={projects} />;
}
