import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/backend";

export async function POST(request: Request) {
  const body = await request.json();
  const backend = getBackendBaseUrl();
  const res = await fetch(`${backend}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}
