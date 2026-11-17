import SiteUrls from "@/utils/routs";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  const userLogined = Boolean(token);

  const isAuthPage = pathname.startsWith("/auth");
  const isLandingPage = pathname == "/";

  if (isLandingPage) {
    return NextResponse.next();
  }

  if (isAuthPage && userLogined) {
    const redirectUrl = new URL(SiteUrls.search, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAuthPage && !userLogined) {
    const redirectUrl = new URL(SiteUrls.logout, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAuthPage && userLogined) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|icons|images).*)",
  ],
};