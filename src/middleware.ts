import { parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import { routes } from "./config/routes";

const authRoutes = ["/auth/sign-in"];

function isAuthenticated(req: NextRequest) {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.accessToken;
  return Boolean(token);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userIsAuthenticated = isAuthenticated(req);

  const isAuthRoute = authRoutes.includes(pathname);

  if (!isAuthRoute && !userIsAuthenticated) {
    return NextResponse.redirect(new URL(routes.auth.signIn, req.url));
  }

  if (isAuthRoute && userIsAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|api|favicon.ico).*)"],
};
