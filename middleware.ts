import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from "@/constants/route";
import { cookies } from "next/headers";
import { verify } from "@/actions/sessions";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const cookie = (await cookies()).get("session")?.value;

  // 로그아웃 시점에 쿠키가 존재하지 않을 경우
  if (!cookie) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
    }
    return NextResponse.next();
  }

  const session = await verify(cookie);

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
