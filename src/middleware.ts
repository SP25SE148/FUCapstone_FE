import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DecodedToken } from "@/types/types";

const rolePaths: Record<string, string> = {
  SuperAdmin: "/superadmin",
  Admin: "/admin",
  Manager: "/manager",
  Supervisor: "/supervisor",
  Student: "/student",
};

const rolePathsRedirect: Record<string, string> = {
  SuperAdmin: "/superadmin",
  Admin: "/admin",
  Manager: "/manager",
  Supervisor: "/supervisor/home",
  Student: "/student/home",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(accessToken);

    // Kiểm tra quyền dựa vào role trong token
    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Lấy ra path của role đó
    const rolePath = rolePaths[role];
    const rolePathRedirect = rolePathsRedirect[role];

    // Nếu role không lệ thì đưa về login
    if (!rolePath) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Điều hướng người dùng theo role
    if (!pathname.startsWith(rolePath)) {
      return NextResponse.redirect(new URL(rolePathRedirect, request.url));
    }
  } catch (error) {
    // Token không hợp lệ => Xóa cookie và điều hướng đến login
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("accessToken");
    return res;
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