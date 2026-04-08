export const ADMIN_COOKIE_NAME = "studioloft_admin_session";

export const getAdminCookieValue = () =>
  process.env.ADMIN_COOKIE_VALUE || "authenticated";

export const getAdminCredentials = () => ({
  login: process.env.ADMIN_LOGIN || "admin",
  password: process.env.ADMIN_PASSWORD || "change-me",
});
