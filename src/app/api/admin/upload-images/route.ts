import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { getBackendBaseUrl } from "@/lib/backend";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const incoming = await request.formData();
  const files = incoming.getAll("files").filter((item): item is File => item instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ detail: "No files provided" }, { status: 400 });
  }

  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const backend = getBackendBaseUrl();
  const res = await fetch(`${backend}/upload-images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: `${ADMIN_COOKIE_NAME}=${token}`,
    },
    body: formData,
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}
