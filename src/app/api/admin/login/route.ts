import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { getBackendBaseUrl } from "@/lib/backend";

type LoginBody = {
  login?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginBody;
  const login = body.login ?? "";
  const password = body.password ?? "";

  const backend = getBackendBaseUrl();
  const res = await fetch(`${backend}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: login, password }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, message: "Неверный логин или пароль" }, { status: 401 });
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    return NextResponse.json({ ok: false, message: "Неверный ответ сервера" }, { status: 502 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: data.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
