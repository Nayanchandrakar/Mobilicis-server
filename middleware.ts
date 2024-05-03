import type { NextRequest } from "next/server";
import { authRoutes, publicRoutes, DEFAULT_REDIRECT_URL } from "@/routes";
import { getUser } from "@/app/action/user";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const token = request?.cookies?.get("token")?.value as string;

  const isPublicRoute = publicRoutes?.includes(pathname);
  const isAuthRoutes = authRoutes?.includes(pathname);

  if (!token && isPublicRoute) {
    return null;
  }

  if (!token && isAuthRoutes) {
    return null;
  }

  const user = await getUser(token);
  const isVerified = user?.emailVerified;

  if (!isVerified) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if (isAuthRoutes && isVerified) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
