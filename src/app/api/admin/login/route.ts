import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminCookieValue,
  getAdminCredentials,
} from "@/lib/admin-auth";

type LoginBody = {
  login?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginBody;
  const { login, password } = body;
  const credentials = getAdminCredentials();

  if (login !== credentials.login || password !== credentials.password) {
    return NextResponse.json({ ok: false, message: "Неверный логин или пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminCookieValue(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
