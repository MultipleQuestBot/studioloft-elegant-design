import { jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "studioloft_admin_session";

/** @deprecated Legacy static session value — JWT is used instead. */
export const getAdminCookieValue = () => process.env.ADMIN_COOKIE_VALUE || "authenticated";

export async function verifyAdminSessionToken(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 16) {
    return false;
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}
