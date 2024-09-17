// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  if (subdomain && subdomain !== "www" && pathname === "/") {
    return NextResponse.rewrite(new URL(`/${subdomain}`, req.url));
  }
}
