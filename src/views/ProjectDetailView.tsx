"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ContactFormDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/types/project";
import { FALLBACK_PROJECT_IMAGE, isValidImagePath } from "@/lib/api";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

type ProjectDetailProps = {
  id?: string;
  initialProject?: Project | null;
};

type ProjectSliderProps = {
  images: string[];
  title: string;
};

function ProjectSlider({ images, title }: ProjectSliderProps) {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-0">
          {images.map((image, index) => (
            <CarouselItem key={`${image}-${index}`} className="pl-0">
              <div className="relative h-[50vh] w-full md:h-[65vh]">
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 ? (
          <>
            <CarouselPrevious className="left-4 top-1/2 h-10 w-10 -translate-y-1/2 border-white/70 bg-black/40 text-white hover:bg-black/60 disabled:opacity-30" />
            <CarouselNext className="right-4 top-1/2 h-10 w-10 -translate-y-1/2 border-white/70 bg-black/40 text-white hover:bg-black/60 disabled:opacity-30" />
          </>
        ) : null}
      </Carousel>
    </section>
  );
}

const ProjectDetail = ({ initialProject }: ProjectDetailProps) => {
  const router = useRouter();
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
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.push("/portfolio");
              }
            }}
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться назад</span>
          </button>
        </div>
      </nav>

      <div className="pt-16" />
      <ProjectSlider images={mainImages} title="Главные изображения" />

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
            <MarkdownRenderer content={description} className="md:prose-lg" />
          </div>
        </div>
      </section>

      <ProjectSlider images={galleryImages} title="Галерея проекта" />

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
            <button
              type="button"
              onClick={() => router.push("/portfolio")}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Вернуться назад</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
