import type { Metadata } from "next";
import AdminView from "@/views/AdminView";

export const metadata: Metadata = {
  title: "Админ",
  description: "Панель добавления проекта в портфолио.",
};

export default function Page() {
  return <AdminView />;
}
