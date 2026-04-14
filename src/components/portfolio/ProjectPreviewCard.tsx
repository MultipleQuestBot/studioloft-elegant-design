import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";
import { getProjectCardImageSrc } from "@/lib/api";

type ProjectPreviewCardProps = {
  project: Project;
  imageSizes: string;
};

export function ProjectPreviewCard({ project, imageSizes }: ProjectPreviewCardProps) {
  const imageSrc = getProjectCardImageSrc(project);

  return (
    <Link href={`/portfolio/${project.id}`} className="block">
      <Card className="group shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={project.name}
            fill
            sizes={imageSizes}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white text-lg font-medium transition-opacity duration-300">
              Подробнее
            </span>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <div className="text-sm text-muted-foreground flex items-center gap-4">
            <span>{project.area} м²</span>
            <span>{project.rooms} комнаты</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
