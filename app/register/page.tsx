"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { BusinessType, OwnerRole } from "@/src/types";
import { categories } from "@/src/data/categories";
import { locations } from "@/src/data/locations";
import { businessTypeLabels, businessTypeDescriptions } from "@/src/data/site";
import { siteConfig } from "@/src/data/site";
import { cn } from "@/src/utils/cn";
import { Icon, type IconName } from "@/src/components/ui/icon";
import {
  Select,
  TextArea,
  TextField,
} from "@/src/components/ui/fields";
import { Button } from "@/src/components/ui/button";
import { Container, PageHeader } from "@/src/components/ui/section";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

const TYPE_OPTIONS = (Object.keys(businessTypeLabels) as BusinessType[]).map(
  (type) => ({
    value: type,
    label: businessTypeLabels[type],
    description: businessTypeDescriptions[type],
  })
);

const ROLE_OPTIONS: { value: OwnerRole; label: string }[] = [
  { value: "student", label: "Current student" },
  { value: "alumni", label: "GGDSD alumnus/a" },
  { value: "faculty", label: "Faculty / staff" },
  { value: "external", label: "External vendor" },
];

interface FormState {
  businessName: string;
  type: BusinessType | "";
  category: string;
  location: string;
  tagline: string;
  description: string;
  ownerName: string;
  ownerRole: OwnerRole | "";
  email: string;
  phone: string;
  instagram: string;
  website: string;
  consent: boolean;
}

const INITIAL_STATE: FormState = {
  businessName: "",
  type: "",
  category: "",
  location: "",
  tagline: "",
  description: "",
  ownerName: "",
  ownerRole: "",
  email: "",
  phone: "",
  instagram: "",
  website: "",
  consent: false,
};

interface FormErrors {
  [key: string]: string | undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,17}$/;

function isValidWebsite(value: string): boolean {
  const input = value.trim();
  if (!input || /\s/.test(input)) return false;

  const normalized = /^[a-z][a-z\d+.-]*:\/\//i.test(input)
    ? input
    : `https://${input}`;

  try {
    const url = new URL(normalized);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.includes(".") &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (state.businessName.trim().length < 3) {
    errors.businessName = "Business name needs at least 3 characters.";
  }
  if (!state.type) errors.type = "Choose a listing type.";
  if (!state.category) errors.category = "Choose a category.";
  if (!state.location) errors.location = "Choose a stall location.";
  if (state.tagline.trim().length > 0 && state.tagline.trim().length < 10) {
    errors.tagline = "Tagline needs at least 10 characters — or leave it blank.";
  }
  if (state.description.trim().length < 30) {
    errors.description = "Tell us a little more (at least 30 characters).";
  }
  if (state.ownerName.trim().length < 3) {
    errors.ownerName = "Owner name needs at least 3 characters.";
  }
  if (!state.ownerRole) errors.ownerRole = "Choose your role.";
  if (!EMAIL_RE.test(state.email)) errors.email = "Enter a valid email address.";
  if (!PHONE_RE.test(state.phone)) {
    errors.phone = "Enter a valid phone number (digits, +, spaces).";
  }
  if (
    state.instagram.trim() &&
    !/^@?[\w.]{2,30}$/.test(state.instagram.replace(/^https?:\/\/|instagram\.com\//g, ""))
  ) {
    errors.instagram = "Enter a valid handle, e.g. @yourstudio.";
  }
  if (
    state.website.trim() &&
    !isValidWebsite(state.website)
  ) {
    errors.website = "Enter a valid URL, e.g. https://yourstudio.com.";
  }
  if (!state.consent) {
    errors.consent = "Please confirm the listing declaration.";
  }
  return errors;
}

export default function RegisterPage() {
  const router = useRouter();
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const completeness = useMemo(() => {
    const filled = [
      state.businessName.trim().length >= 3,
      Boolean(state.type),
      Boolean(state.category),
      Boolean(state.location),
      state.description.trim().length >= 30,
      state.ownerName.trim().length >= 3,
      Boolean(state.ownerRole),
      EMAIL_RE.test(state.email),
      PHONE_RE.test(state.phone),
    ];
    return Math.round((filled.filter(Boolean).length / filled.length) * 100);
  }, [state]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Focus the first field with an error
      const firstKey = Object.keys(nextErrors)[0];
      const field = document.querySelector<HTMLElement>(
        `[name="${firstKey}"]`
      );
      field?.focus();
      return;
    }
    setSubmitting(true);
    // Simulate a submission round-trip — nothing is stored anywhere.
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(
        `OB-${new Date().getFullYear()}-${String(
          Math.floor(1000 + Math.random() * 9000)
        )}`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  if (submitted) {
    return (
      <>
        <PageHeader
          eyebrow="Registration"
          title="Demo preview complete"
          description="Your details passed local validation. No listing request was stored or sent."
          className="border-b border-paper-200 bg-paper-100/60"
        />
        <Container className="py-16">
          <div className="mx-auto max-w-xl">
            <Card className="p-8 text-center sm:p-10">
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-700">
                <Icon name="check" size={30} strokeWidth={2.5} />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold text-ink-950">
                Thank you, {state.ownerName.split(" ")[0]}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                <strong className="text-ink-900">{state.businessName}</strong>{" "}
                was not submitted for IIC review. Demo reference:{" "}
                <span className="rounded bg-paper-100 px-2 py-0.5 font-mono text-xs font-semibold text-pine-800">
                  {submitted}
                </span>
                .
              </p>
              <div className="mt-6 space-y-2 rounded-xl bg-paper-100/70 p-4 text-left text-xs text-ink-500">
                <p className="flex items-center gap-2">
                  <Icon name="clock" size={14} className="text-pine-600" />
                  A live platform would typically review listings within 1–2 working days.
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="mail" size={14} className="text-pine-600" />
                  Status updates would go to {state.email} after a real submission.
                </p>
              </div>
              <p className="mt-5 text-xs text-ink-400">
                This frontend demo did not store or send any data.
              </p>
              <div className="mt-7 flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={() => { setSubmitted(null); setState(INITIAL_STATE); }}>
                  Register another
                </Button>
                <Button variant="primary" size="sm" onClick={() => router.push("/explore-shops")}>
                  Back to directory
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Register your business"
        title="Join the bazar floor"
        description="The live service would send listings for IIC review. This demo validates details locally; nothing is submitted or stored."
        className="border-b border-paper-200 bg-paper-100/60"
      />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <form onSubmit={handleSubmit} noValidate aria-label="Business registration form">
            {/* Step 1 — the business */}
            <Section title="The business" step={1} icon="store">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Business name"
                  name="businessName"
                  required
                  value={state.businessName}
                  onChange={(event) => update("businessName", event.target.value)}
                  placeholder="e.g. Crimson Loom"
                  error={errors.businessName}
                  autoComplete="organization"
                />
                <Select
                  label="Listing type"
                  name="type"
                  required
                  value={state.type}
                  onChange={(event) => update("type", event.target.value as BusinessType)}
                  placeholder="Select a type"
                  options={TYPE_OPTIONS.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  error={errors.type}
                />
              </div>

              {state.type && (
                <p className="mt-2 flex items-center gap-1.5 px-1 text-xs text-ink-500">
                  <Icon name="info" size={13} className="text-pine-600" />
                  {businessTypeDescriptions[state.type]}
                </p>
              )}

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Select
                  label="Primary category"
                  name="category"
                  required
                  value={state.category}
                  onChange={(event) => update("category", event.target.value)}
                  placeholder="Select a category"
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  error={errors.category}
                />
                <Select
                  label="Stall location"
                  name="location"
                  required
                  value={state.location}
                  onChange={(event) => update("location", event.target.value)}
                  placeholder="Select a campus location"
                  options={locations.map((location) => ({
                    value: location.id,
                    label: location.name,
                  }))}
                  error={errors.location}
                />
              </div>

              <TextField
                label="Tagline"
                name="tagline"
                value={state.tagline}
                onChange={(event) => update("tagline", event.target.value)}
                placeholder="One line that captures what you do"
                hint="Optional — shown under your business name."
                error={errors.tagline}
                className="mt-5"
              />
              <TextArea
                label="Description"
                name="description"
                required
                rows={4}
                value={state.description}
                onChange={(event) => update("description", event.target.value)}
                placeholder="What do you make, sell or service? What makes it special?"
                error={errors.description}
                className="mt-5"
              />
            </Section>

            {/* Step 2 — the owner */}
            <Section title="The owner" step={2} icon="users">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  name="ownerName"
                  required
                  value={state.ownerName}
                  onChange={(event) => update("ownerName", event.target.value)}
                  placeholder="e.g. Anaya Krishnan"
                  error={errors.ownerName}
                  autoComplete="name"
                />
                <Select
                  label="Your role"
                  name="ownerRole"
                  required
                  value={state.ownerRole}
                  onChange={(event) => update("ownerRole", event.target.value as OwnerRole)}
                  placeholder="Select your role"
                  options={ROLE_OPTIONS}
                  error={errors.ownerRole}
                />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={state.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@example.com"
                  error={errors.email}
                  autoComplete="email"
                />
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  value={state.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="+91 90000 00000"
                  error={errors.phone}
                  autoComplete="tel"
                />
              </div>
            </Section>

            {/* Step 3 — presence */}
            <Section title="Online presence" step={3} icon="globe">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Instagram handle"
                  name="instagram"
                  value={state.instagram}
                  onChange={(event) => update("instagram", event.target.value)}
                  placeholder="@yourstudio"
                  icon="instagram"
                  error={errors.instagram}
                />
                <TextField
                  label="Website"
                  name="website"
                  value={state.website}
                  onChange={(event) => update("website", event.target.value)}
                  placeholder="https://yourstudio.com"
                  icon="globe"
                  error={errors.website}
                />
              </div>
            </Section>

            {/* Declaration */}
            <Section title="Declaration" step={4} icon="shield-check">
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                  errors.consent
                    ? "border-error-500 bg-error-50"
                    : state.consent
                      ? "border-pine-400 bg-pine-50"
                      : "border-ink-200 bg-white hover:border-ink-300"
                )}
              >
                <input
                  type="checkbox"
                  name="consent"
                  checked={state.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 accent-pine-700"
                />
                <span className="text-sm leading-relaxed text-ink-700">
                  I confirm that {siteConfig.institution} is not responsible
                  for transactions, and that this demo registration is a
                  frontend simulation with fictional data.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1.5 text-xs text-error-600" role="alert">
                  {errors.consent}
                </p>
              )}
            </Section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-400">
                Demo form — no data leaves your browser.
              </p>
              <Button type="submit" size="lg" loading={submitting} icon="send" iconPosition="right">
                Validate details
              </Button>
            </div>
          </form>

          {/* Progress rail */}
          <aside className="lg:sticky lg:top-40 lg:self-start">
            <Card className="p-6">
              <h2 className="font-display text-lg font-semibold text-ink-950">
                Application progress
              </h2>
              <div className="mt-4">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium text-ink-700">
                    {completeness}% complete
                  </span>
                  <span className="text-xs tabular-nums text-ink-400">
                    {completeness}/100
                  </span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-ink-100"
                  role="progressbar"
                  aria-valuenow={completeness}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Form completion"
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      completeness === 100 ? "bg-success-500" : "bg-pine-600"
                    )}
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                <ProgressItem
                  done={state.businessName.trim().length >= 3 && Boolean(state.type)}
                  label="Business details"
                />
                <ProgressItem
                  done={Boolean(state.category) && Boolean(state.location)}
                  label="Category & location"
                />
                <ProgressItem
                  done={state.description.trim().length >= 30}
                  label="Description"
                />
                <ProgressItem
                  done={state.ownerName.trim().length >= 3 && Boolean(state.ownerRole)}
                  label="Owner profile"
                />
                <ProgressItem
                  done={EMAIL_RE.test(state.email) && PHONE_RE.test(state.phone)}
                  label="Contact details"
                />
              </ul>

              <div className="mt-6 border-t border-paper-200 pt-5">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                  What happens next
                </h3>
                <ol className="space-y-2.5 text-sm text-ink-600">
                  {[
                    "A live platform would send submitted listings to IIC review.",
                    "Verification would follow an approval workflow.",
                    "Seller profile updates would require an authenticated backend.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-2.5">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine-100 text-[11px] font-bold text-pine-700">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </Card>

            <div className="mt-5 rounded-card bg-pine-950 p-5 text-paper-100">
              <p className="flex items-start gap-2.5 text-sm leading-relaxed">
                <Icon name="sparkles" size={17} className="mt-0.5 shrink-0 text-brass-300" />
                <span>
                  Student ventures listed on Open Bazar report{" "}
                  <strong className="text-white">3× more first-week enquiries</strong>{" "}
                  than word-of-mouth alone — at least in our imagination. This is a demo.
                </span>
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

function Section({
  title,
  step,
  icon,
  children,
}: {
  title: string;
  step: number;
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} className="mb-10">
      <div className="mb-5 flex items-center gap-3 border-b border-paper-200 pb-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
          <Icon name={icon} size={18} />
        </span>
        <div className="flex-1">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            {title}
          </h2>
        </div>
        <Badge variant="outline" size="md">
          Step {step}
        </Badge>
      </div>
      {children}
    </section>
  );
}

function ProgressItem({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm">
      <span
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors",
          done ? "bg-pine-600 text-white" : "bg-paper-200 text-ink-400"
        )}
      >
        <Icon name={done ? "check" : "dot"} size={11} />
      </span>
      <span className={done ? "font-medium text-ink-800" : "text-ink-500"}>
        {label}
      </span>
    </li>
  );
}
