import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { getBackendBaseUrl } from "@/lib/backend";
import AdminView from "@/views/AdminView";

export const metadata: Metadata = {
  title: "Админ",
  description: "Панель добавления проекта в портфолио.",
};

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    redirect("/admin/login");
  }

  const backend = getBackendBaseUrl();
  const authCheck = await fetch(`${backend}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!authCheck.ok) {
    redirect("/admin/login");
  }

  return <AdminView />;
}
