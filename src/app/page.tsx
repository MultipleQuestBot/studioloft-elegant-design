import type { Metadata } from "next";
import HomeView from "@/views/HomeView";

export const metadata: Metadata = {
  title: "Главная",
  description: "Создаем пространства для жизни: дизайн интерьера и реализация под ключ.",
};

export default function Page() {
  return <HomeView />;
}
