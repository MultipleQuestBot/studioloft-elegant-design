import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/backend";

export async function GET() {
  const backend = getBackendBaseUrl();
  const res = await fetch(`${backend}/portfolio?page=1&limit=100`, {
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}

