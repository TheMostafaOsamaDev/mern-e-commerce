import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard") {
    try {
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (pathname === "/cart") {
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/cart"], // Specify the routes the middleware applies to
};
