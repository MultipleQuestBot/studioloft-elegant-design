"use client";

import { cn } from "@/lib/utils";

type PageHeroCoverProps = {
  imageSrc: string;
  title: string;
  subtitle: string;
  className?: string;
};

export function PageHeroCover({ imageSrc, title, subtitle, className }: PageHeroCoverProps) {
  return (
    <section
      className={cn(
        "relative min-h-[280px] py-20 overflow-hidden bg-cover bg-center bg-no-repeat",
        className,
      )}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-display font-semibold text-white mb-6">{title}</h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}
