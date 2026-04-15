import type { Metadata } from "next";
import ProjectDetailView from "@/views/ProjectDetailView";
import { getProjectById } from "@/lib/api";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studioloft.ru";
  const title = project?.name || `Проект ${id}`;
  const description = project?.description || "Детали дизайн-проекта и этапы реализации.";
  const image = project?.mainImages?.[0] || "/images/og-default.jpg";
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
  const project = await getProjectById(id);
  return <ProjectDetailView id={id} initialProject={project} />;
}
