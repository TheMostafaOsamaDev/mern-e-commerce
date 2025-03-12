import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import axios from "axios";

export async function middleware(request: NextRequest) {
  // Protecting routes:
  const { pathname, origin } = request.nextUrl;

  if (pathname === "/dashboard") {
    const session = await axios("/api/auth/get-session", {
      baseURL: origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const user: UserType = session.data.user;

    if (!user.isAdmin) {
      const url = new URL("/", request.url);

      return NextResponse.redirect(url.toString());
    }
  } else if (pathname === "/cart") {
    const session = await axios("/api/auth/get-session", {
      baseURL: origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const user: UserType = session.data.user;

    if (user.isAdmin) {
      const url = new URL("/", request.url);

      return NextResponse.redirect(url.toString());
    }
  }

  // Get the session cookie
  const sessionCookie = getSessionCookie(request); // Optionally pass config as the second argument if cookie name or prefix is customized.

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/cart"], // Specify the routes the middleware applies to
};
