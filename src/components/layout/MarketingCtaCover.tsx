"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarketingCtaCoverProps = {
  imageSrc: string;
  title: string;
  description: string;
  actions: ReactNode;
  className?: string;
};

export function MarketingCtaCover({
  imageSrc,
  title,
  description,
  actions,
  className,
}: MarketingCtaCoverProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg text-center p-12 md:p-14 bg-cover bg-center bg-no-repeat",
        className,
      )}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="relative z-10">
        <h2 className="text-3xl font-display font-semibold text-white mb-4">{title}</h2>
        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">{description}</p>
        <div className="flex justify-center [&_button]:hover:scale-105 [&_button]:transition-transform [&_button]:duration-300">
          {actions}
        </div>
      </div>
    </div>
  );
}
