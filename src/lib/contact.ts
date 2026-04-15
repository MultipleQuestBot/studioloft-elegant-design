import { normalizePhoneToApi } from "@/lib/phone";

export type ParsedContact = {
  email: string | null;
  phone_number: string | null;
};

export function parseContactInput(input: string): ParsedContact {
  const trimmed = input.trim();
  if (!trimmed) return { email: null, phone_number: null };
  if (trimmed.includes("@")) {
    return { email: trimmed, phone_number: null };
  }
  return { email: null, phone_number: normalizePhoneToApi(trimmed) };
}
