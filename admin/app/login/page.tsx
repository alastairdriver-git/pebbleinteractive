import LoginForm from "./LoginForm";
import { PebbleMark } from "@/components/PebbleMark";

export const metadata = { title: "Sign in · Pebble Studio" };

export default async function Login({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;
  return (
    <main className="login">
      <div className="login-card">
        <div className="brand"><PebbleMark /><span>Pebble Studio</span></div>
        <h1>Sign in</h1>
        <p className="muted">We'll email you a sign-in link.</p>
        {e === "not-allowed" && <p className="studio-error">That account can't use Pebble Studio.</p>}
        {e === "link" && <p className="studio-error">That link has expired. Ask for a new one.</p>}
        <LoginForm />
      </div>
    </main>
  );
}
