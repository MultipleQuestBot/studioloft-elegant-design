"use client";

import { Button } from "@/components/ui/button";
import { ConsultationRequestDialog } from "@/components/ConsultationRequestDialog";

export function PortfolioFeedbackDialog() {
  return (
    <ConsultationRequestDialog
      title="Обсудить проект"
      trigger={
        <Button variant="default" size="lg" className="hover:scale-105 transition-transform duration-300">
          Обсудить проект
        </Button>
      }
    />
  );
}
