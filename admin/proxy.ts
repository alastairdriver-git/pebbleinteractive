/* Every request: refresh the Supabase session and keep the studio private.
   Only STUDIO_EMAIL may use it; everyone else goes to the sign-in page.
   (Row-level security in the database enforces the same rule on the data.) */
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const OPEN = ["/login", "/auth/"];
const demo = process.env.NODE_ENV !== "production" && process.env.STUDIO_DEMO === "1";

export async function proxy(request: NextRequest) {
  if (demo) return NextResponse.next();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  const allowed = !!email && email === process.env.STUDIO_EMAIL?.toLowerCase();
  const path = request.nextUrl.pathname;
  if (!allowed && !OPEN.some((p) => path.startsWith(p))) {
    if (path.startsWith("/api/")) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = email ? "?e=not-allowed" : "";
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)"],
};
