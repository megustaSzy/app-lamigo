import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const role = req.cookies.get("role")?.value || "";

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Jika masuk ke admin tapi bukan admin → tendang ke homepage
  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
    