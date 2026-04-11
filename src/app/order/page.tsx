import type { Metadata } from "next";
import OrderView from "@/views/OrderView";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Заказать проект",
  description: "Оставьте заявку на персональный интерьерный проект.",
};

export default async function Page() {
  const { items } = await getProjects({ limit: 3 });
  return <OrderView projects={items.slice(0, 3)} />;
}
