import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/backend";

type LegacyBody = {
  name?: string;
  contact?: string;
  description?: string;
};

function splitContact(contact: string): { email: string | null; phone_number: string | null } {
  const t = contact.trim();
  if (!t) return { email: null, phone_number: null };
  if (t.includes("@")) return { email: t, phone_number: null };
  return { email: null, phone_number: t };
}

/** Backward-compatible alias: maps legacy consultation payload to FastAPI `/requests`. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LegacyBody;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact : "";
  const { email, phone_number } = splitContact(contact);

  if (!name || !description || (!email && !phone_number)) {
    return NextResponse.json({ ok: false, message: "Некорректные данные" }, { status: 400 });
  }

  const backend = getBackendBaseUrl();
  const res = await fetch(`${backend}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone_number,
      description,
      square_footage: null,
      object_type: null,
      number_of_rooms: null,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ ok: false, message: text || "Ошибка сервера" }, { status: res.status });
  }

  return NextResponse.json({ ok: true });
}
