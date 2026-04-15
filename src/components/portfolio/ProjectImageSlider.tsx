"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ProjectImageSliderProps = {
  images: string[];
  title: string;
  showTitle?: boolean;
};

export function ProjectImageSlider({ images, title, showTitle = true }: ProjectImageSliderProps) {
  return (
    <section>
      {showTitle ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
        </div>
      ) : null}
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

