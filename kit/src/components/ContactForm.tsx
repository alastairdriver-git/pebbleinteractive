import { useState } from "react";
import { Input, Textarea, Label, Button, Callout } from "@gradeui/ui";

/* Grade-styled contact form — a single client:load island. Static build: no
   server adapter, so validation runs client-side and submit is stubbed. Wire to
   a form service / endpoint when the hosting target is decided. */

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name) errors.name = "Please add your name.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "That email doesn't look right.";
  if (message.length < 10) errors.message = "A little more detail please (10+ chars).";
  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fieldErrors = validate(new FormData(form));
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    setStatus("sending");
    setTimeout(() => {
      form.reset();
      setStatus("sent");
    }, 400);
  }

  if (status === "sent") {
    return (
      <Callout variant="success" className="max-w-md">
        Thanks, your message is on its way. We'll be in touch shortly.
      </Callout>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cf-name">Name</Label>
        <Input id="cf-name" name="name" placeholder="Your name" autoComplete="name" />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cf-email">Email</Label>
        <Input id="cf-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cf-message">Message</Label>
        <Textarea id="cf-message" name="message" rows={4} placeholder="How can we help?" />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
