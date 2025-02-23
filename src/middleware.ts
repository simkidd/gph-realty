// middleware.ts
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    console.log("token from middleware>>>>", token);

    // Redirect authenticated users from auth routes to homepage
    if (pathname.startsWith("/auth") && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Admin route protection
    if (pathname.startsWith("/admin")) {
      if (!["ADMIN", "SUPER_ADMIN"].includes(token?.role || "")) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // Bypass authentication check for auth routes
        if (pathname.startsWith("/auth")) {
          return true;
        }

        // Require authentication for all other routes
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/sign-in",
      error: "/auth/error",
    },
  }
);

export const config = {
  matcher: [
    "/profile/:path*", // Protected route for all authenticated users
    "/admin/:path*", // Admin-only routes
    "/auth/:path*", // Authentication routes
  ],
};
