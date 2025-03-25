import { NextResponse } from "next/server";

export async function POST() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Set-Cookie": `accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    },
  });
}