import type { Metadata } from "next";
import OrderView from "@/views/OrderView";

export const metadata: Metadata = {
  title: "Заказать проект",
  description: "Оставьте заявку на персональный интерьерный проект.",
};

export default function Page() {
  return <OrderView />;
}
