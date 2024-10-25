import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const is_logged_in = false;

  if (request.nextUrl.pathname === "/") {
    if (is_logged_in) {
      return NextResponse.redirect(new URL("/transcriptions", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/transcriptions")) {
    if (!is_logged_in) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
