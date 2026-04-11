import { NextResponse } from "next/server";

type FeedbackBody = {
  name?: string;
  contact?: string;
  description?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as FeedbackBody;
  const valid = Boolean(body.name && body.contact && body.description);

  if (!valid) {
    return NextResponse.json({ ok: false, message: "Некорректные данные" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
