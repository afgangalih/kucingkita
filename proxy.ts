// proxy.ts (Next.js 16 Proxy Convention)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const token = req.cookies.get("sb-access-token")?.value;

  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  const isLoginPage = req.nextUrl.pathname === "/login";
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPage && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoginPage && user) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
