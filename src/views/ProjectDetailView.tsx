"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ContactFormDialog";
import ImageGallery from "@/components/ImageGallery";

import heroImage from "@/assets/hero-apartment.jpg";
import floorPlan1 from "@/assets/floor-plan-1.jpg";
import floorPlan2 from "@/assets/floor-plan-2.jpg";
import viz3d1 from "@/assets/3d-viz-1.jpg";
import viz3d2 from "@/assets/3d-viz-2.jpg";
import result1 from "@/assets/result-1.jpg";
import result2 from "@/assets/result-2.jpg";
import type { Project } from "@/types/project";


const toImageSrc = (image: unknown) =>
  typeof image === "string" ? image : ((image as { src?: string })?.src ?? "");

type ProjectDetailProps = {
  id?: string;
  initialProject?: Project | null;
};

const ProjectDetail = ({ initialProject }: ProjectDetailProps) => {
  const router = useRouter();
  const displayTitle = initialProject?.name || "Светлая квартира в скандинавском стиле";
  const displayDescription =
    initialProject?.description || "Минималистичный интерьер с акцентом на натуральные материалы и свет";
  const topGallery =
    initialProject?.mainImages?.length
      ? initialProject.mainImages
      : [toImageSrc(viz3d1), toImageSrc(viz3d2)];
  const allImages = initialProject?.images?.length
    ? initialProject.images
    : [toImageSrc(floorPlan1), toImageSrc(floorPlan2), toImageSrc(result1), toImageSrc(result2)];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/portfolio");
              }
            }}
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться в портфолио</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20">
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <Image
            src={toImageSrc(heroImage)}
            alt="Светлая квартира в скандинавском стиле"
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg max-w-3xl opacity-0 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary-foreground rounded-full text-sm font-sans mb-4">
              Квартира
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              {displayTitle}
            </h1>
            <p className="text-muted-foreground text-lg font-sans">
              {displayDescription}
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground font-sans">
              <span className="px-3 py-1 bg-secondary rounded-full">{initialProject?.area || 75} м²</span>
              <span className="px-3 py-1 bg-secondary rounded-full">{initialProject?.rooms || 3} комнаты</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Описание проекта
            </h2>
            <div className="prose prose-neutral max-w-none text-muted-foreground text-lg leading-relaxed font-sans opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <ReactMarkdown>{displayDescription}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      {/* Main Images */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center opacity-0 animate-fade-in">
              Главные изображения
            </h2>
            <ImageGallery
              images={topGallery}
              alt="Главные изображения проекта"
            />
          </div>
        </div>
      </section>

      {/* All Images */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center opacity-0 animate-fade-in">
              Галерея проекта
            </h2>
            <ImageGallery
              images={allImages}
              alt="Галерея проекта"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-6 opacity-0 animate-fade-in">
              Нужен дизайн такого же уровня?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 font-sans opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Свяжитесь с нами, и мы создадим уникальный проект для вашего пространства
            </p>
            <ContactFormDialog>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-sans rounded-full opacity-0 animate-scale-in"
                style={{ animationDelay: "200ms" }}
              >
                Оставить заявку
              </Button>
            </ContactFormDialog>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => router.push("/portfolio")}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Вернуться в портфолио</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
