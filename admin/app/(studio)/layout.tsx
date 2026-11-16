import { redirect } from "next/navigation";
import { currentUser, isDemo } from "@/lib/data";
import { PebbleMark } from "@/components/PebbleMark";
import Nav from "@/components/Nav";

export const dynamic = "force-dynamic";

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/login");
  return (
    <div className="studio">
      <aside className="studio-side">
        <a href="/" className="brand"><PebbleMark /><span>Pebble Studio</span></a>
        <Nav />
        <div className="studio-user">
          {isDemo() && <span className="demo-flag">Demo data</span>}
          <span className="muted">{user.email}</span>
          {!isDemo() && <form action="/auth/signout" method="post"><button type="submit">Sign out</button></form>}
        </div>
      </aside>
      <main className="studio-content">{children}</main>
    </div>
  );
}
