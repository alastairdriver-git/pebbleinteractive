"use server";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase";

/** Sends a sign-in link, but only to the studio owner. The reply is the
    same either way, so the page doesn't reveal who can sign in. */
export async function sendLink(_prev: unknown, form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (email && email === process.env.STUDIO_EMAIL?.toLowerCase()) {
    const h = await headers();
    const origin = h.get("origin") ?? `https://${h.get("host")}`;
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/auth/callback` } });
    if (error) return { sent: false, message: "The link couldn't be sent. Try again in a minute." };
  }
  return { sent: true, message: "If that address can use Pebble Studio, a sign-in link is on its way." };
}
