"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type ProjectBackButtonProps = {
  fallbackHref?: string;
  label?: string;
};

export function ProjectBackButton({
  fallbackHref = "/portfolio",
  label = "Вернуться назад",
}: ProjectBackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-sans"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

