"use client";

import { useState } from "react";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";
import { Card } from "@/src/components/ui/card";
import { Select, TextArea, TextField } from "@/src/components/ui/fields";
import { Button } from "@/src/components/ui/button";

const ENQUIRY_TYPES = [
  { value: "general", label: "General enquiry" },
  { value: "listing", label: "Listing support" },
  { value: "registration", label: "Registration question" },
  { value: "report", label: "Report a listing" },
  { value: "media", label: "Media & partnerships" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-2 text-sm font-semibold text-ink-800",
        className
      )}
    >
      <span className="h-4 w-1 rounded-full bg-pine-700" aria-hidden="true" />
      {children}
    </p>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 3) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email.";
    if (form.message.trim().length < 10)
      next.message = "Message needs at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  };

  if (sent) {
    return (
      <Card className="p-10 text-center">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-700">
          <Icon name="check" size={30} strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold text-ink-950">
          Enquiry sent
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-600">
          Thanks, {form.name.split(" ")[0]} — your{" "}
          {ENQUIRY_TYPES.find((type) => type.value === form.type)?.label.toLowerCase()}{" "}
          has been noted. This is a demo, so nothing was actually
          transmitted.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-7"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", type: "general", message: "" });
          }}
        >
          Send another enquiry
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Contact enquiry form">
      <SectionLabel>Your details</SectionLabel>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          name="name"
          required
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="e.g. Jordan D'Souza"
          error={errors.name}
          autoComplete="name"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@example.com"
          error={errors.email}
          autoComplete="email"
        />
      </div>
      <div className="mt-5">
        <Select
          label="Enquiry type"
          name="type"
          value={form.type}
          onChange={(event) => update("type", event.target.value)}
          options={ENQUIRY_TYPES}
        />
      </div>

      <SectionLabel className="mt-8">Message</SectionLabel>
      <TextArea
        label="How can we help?"
        name="message"
        required
        rows={6}
        value={form.message}
        onChange={(event) => update("message", event.target.value)}
        placeholder="Tell us what you need — a listing fix, a registration question, a report…"
        error={errors.message}
      />

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-400">
          Demo form — enquiries are simulated locally.
        </p>
        <Button type="submit" size="lg" loading={sending} icon="send" iconPosition="right">
          Send enquiry
        </Button>
      </div>
    </form>
  );
}
