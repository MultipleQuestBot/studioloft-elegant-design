"use client";

import { ConsultationTriggerButton } from "@/components/ConsultationTriggerButton";
import { ConsultationRequestDialog } from "@/components/ConsultationRequestDialog";

export function PortfolioFeedbackDialog() {
  return (
    <ConsultationRequestDialog
      title="Обсудить проект"
      trigger={
        <ConsultationTriggerButton>Обсудить проект</ConsultationTriggerButton>
      }
    />
  );
}
