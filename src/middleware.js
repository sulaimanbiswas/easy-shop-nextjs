import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const middleware = async (request) => {
  const { pathname } = request.nextUrl;
  const isPath = (path) => pathname.startsWith(path);
  try {
    let cookie = request.cookies.get("jwt-token")?.value;

    if (!cookie || !cookie.startsWith("Bearer")) {
      throw new Error("Invalid token");
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(cookie.split("Bearer ")[1], secret);

    if (isPath("/login") || isPath("/signup")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (isPath("/login") || isPath("/signup")) {
      return NextResponse.next();
    }
    console.log(error.message);
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${pathname}`, request.url)
    );
  }
};

export default middleware;

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/login/:path*",
    "/signup/:path*",
  ],
};
