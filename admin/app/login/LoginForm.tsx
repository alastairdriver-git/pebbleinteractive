"use client";
import { useActionState } from "react";
import { sendLink } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(sendLink, null);
  return (
    <form action={action} className="login-form">
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@pebbleinteractive.com" />
      <button type="submit" disabled={pending}>{pending ? "Sending…" : "Email me a link"}</button>
      {state && <p className={state.sent ? "muted" : "studio-error"} role="status">{state.message}</p>}
    </form>
  );
}
