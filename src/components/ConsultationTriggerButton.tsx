"use client";

import { Button, type ButtonProps } from "@/components/ui/button";

type ConsultationTriggerButtonProps = Omit<ButtonProps, "variant" | "size">;

export function ConsultationTriggerButton({
  className,
  children,
  ...props
}: ConsultationTriggerButtonProps) {
  return (
    <Button
      variant="default"
      size="lg"
      className={`text-lg px-8 py-3 hover:scale-105 transition-transform duration-300 ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </Button>
  );
}
