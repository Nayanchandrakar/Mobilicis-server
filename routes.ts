/**
 * public routes are accesible to all authenticated and
 * non authenticated user
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * authRoutes that are accessible for authentication
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * adminRouts are only accessible to authenticated user
 * with admin role
 * @type {string[]}
 */

export const DEFAULT_REDIRECT_URL = "/analytics";
export const UNAUTHORIZED_REDIRECT = "/auth/login";
