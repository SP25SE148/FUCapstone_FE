import { DecodedToken } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rolePaths: Record<string, string> = {
  SuperAdmin: "/superadmin",
  Admin: "/admin",
  Student: "/student",
  Supervisor: "/supervisor",
  Manager: "/manager",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const rolePath = rolePaths[role];

    if (!rolePath) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!pathname.startsWith(rolePath)) {
      return NextResponse.redirect(new URL(rolePath, request.url));
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/superadmin/:path*",
    "/admin/:path*",
    "/student/:path*",
    "/supervisor/:path*",
    "/manager/:path*",
  ],
};