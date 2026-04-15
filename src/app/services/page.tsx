import type { Metadata } from "next";
import ServicesView from "@/views/ServicesView";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Услуги студии: дизайн интерьера, ремонт и авторский надзор.",
};

export default function Page() {
  return <ServicesView />;
}
