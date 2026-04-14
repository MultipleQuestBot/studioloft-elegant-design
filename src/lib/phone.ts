const PHONE_MASK_PREFIX = "+7 ";

export function formatPhoneValue(value: string): string {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("7") ? digits.slice(1, 11) : digits.slice(0, 10);

  if (normalized.length === 0) return PHONE_MASK_PREFIX;

  let result = `${PHONE_MASK_PREFIX}(`;
  result += normalized.slice(0, 3);
  if (normalized.length >= 3) result += ") ";
  if (normalized.length > 3) result += normalized.slice(3, 6);
  if (normalized.length >= 6) result += "-";
  if (normalized.length > 6) result += normalized.slice(6, 8);
  if (normalized.length >= 8) result += "-";
  if (normalized.length > 8) result += normalized.slice(8, 10);

  return result;
}

export function normalizePhoneToApi(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `+${digits.startsWith("7") ? digits : `7${digits}`}`;
}

export function getPhoneMaskPrefix(): string {
  return PHONE_MASK_PREFIX;
}
