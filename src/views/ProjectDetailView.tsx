import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ContactFormDialog";
import type { Project } from "@/types/project";
import { FALLBACK_PROJECT_IMAGE, isValidImagePath } from "@/lib/api";
import { ProjectBackButton } from "@/components/portfolio/ProjectBackButton";
import { ProjectImageSlider } from "@/components/portfolio/ProjectImageSlider";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

type ProjectDetailProps = {
  id?: string;
  initialProject?: Project | null;
};

const ProjectDetail = ({ initialProject }: ProjectDetailProps) => {
  const mainImages =
    initialProject?.mainImages?.filter(isValidImagePath).length
      ? initialProject.mainImages.filter(isValidImagePath)
      : [FALLBACK_PROJECT_IMAGE];
  const galleryImages =
    initialProject?.images?.filter(isValidImagePath).length
      ? initialProject.images.filter(isValidImagePath)
      : mainImages;
  const title = initialProject?.name || "Проект";
  const description = initialProject?.description || "Описание проекта отсутствует.";
  const type = initialProject?.type || "—";
  const style = initialProject?.style || "—";
  const area = initialProject?.area ?? 0;
  const rooms = initialProject?.rooms ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <ProjectBackButton />
        </div>
      </nav>

      <div className="pt-16" />
      <ProjectImageSlider images={mainImages} title="Главные изображения" />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-6">
            <h1 className="text-3xl font-semibold text-foreground md:text-5xl">{title}</h1>
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground md:grid-cols-4 md:text-base">
              <span>{area} м²</span>
              <span>{style}</span>
              <span>{type}</span>
              <span>{rooms} комнаты</span>
            </div>
            <MarkdownRenderer content={description} />
          </div>
        </div>
      </section>

      <ProjectImageSlider images={galleryImages} title="Галерея проекта" />

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-6">
              Нужен дизайн такого же уровня?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 font-sans">
              Свяжитесь с нами, и мы создадим уникальный проект для вашего пространства
            </p>
            <ContactFormDialog>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-sans rounded-full"
              >
                Оставить заявку
              </Button>
            </ContactFormDialog>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <ProjectBackButton />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
