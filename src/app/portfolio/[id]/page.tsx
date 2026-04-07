import type { Metadata } from "next";
import ProjectDetailView from "@/views/ProjectDetailView";
import { getPortfolioProjectById } from "@/lib/api";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = await getPortfolioProjectById(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studioloft.ru";
  const title = project?.title || `Проект ${id}`;
  const description = project?.description || project?.summary || "Детали дизайн-проекта и этапы реализации.";
  const image = project?.image || "/images/og-default.jpg";
  const canonical = `${siteUrl}/portfolio/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: image }],
    },
  };
}

export const revalidate = 300;

export default async function Page({ params }: Params) {
  const { id } = await params;
  const project = await getPortfolioProjectById(id);
  return <ProjectDetailView id={id} initialProject={project} />;
}
