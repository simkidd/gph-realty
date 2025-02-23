// middleware.ts
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

// Configure allowed origins
const allowedOrigins = [
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://gph-realty.vercel.app",
  // Allow all Vercel preview deployments
  /\.vercel\.app$/,
];

const handleCors = (request: NextRequestWithAuth, response: NextResponse) => {
  const origin = request.headers.get("origin") || "";
  const isAllowedOrigin = allowedOrigins.some((allowedOrigin) => {
    return typeof allowedOrigin === "string"
      ? origin === allowedOrigin
      : allowedOrigin.test(origin);
  });

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    const preflightResponse = new NextResponse(null, { status: 204 });
    if (isAllowedOrigin) {
      preflightResponse.headers.set("Access-Control-Allow-Origin", origin);
      preflightResponse.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
      );
      preflightResponse.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
    }
    return preflightResponse;
  }

  // Add CORS headers to all responses
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set("Vary", "Origin");

  return response;
};

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Handle CORS first for API routes
    if (request.nextUrl.pathname.startsWith("/api")) {
      const response = NextResponse.next();
      return handleCors(request, response);
    }

    // Existing authentication logic for non-API routes
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    console.log("token from middleware>>>>", token);

    // Redirect authenticated users from auth routes to homepage
    if (pathname.startsWith("/auth") && token) {
      const response = NextResponse.redirect(new URL("/", request.url));
      return handleCors(request, response);
    }

    // Admin route protection
    if (pathname.startsWith("/admin")) {
      if (!["ADMIN", "SUPER_ADMIN"].includes(token?.role || "")) {
        const response = NextResponse.redirect(
          new URL("/unauthorized", request.url)
        );
        return handleCors(request, response);
      }
    }

    const response = NextResponse.next();
    return handleCors(request, response);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // Bypass auth for API routes and handle via CORS
        if (pathname.startsWith("/api")) return true;

        if (pathname.startsWith("/auth")) return true;
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
    "/api/:path*",
    "/profile/:path*", // Protected route for all authenticated users
    "/admin/:path*", // Admin-only routes
    "/auth/:path*", // Authentication routes
  ],
};
