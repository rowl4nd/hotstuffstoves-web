"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { stoves } from "@/lib/content/stoves";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedStove = searchParams.get("stove") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      stove: String(formData.get("stove") || ""),
      company: String(formData.get("company") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or call us.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-hairline p-8">
        <p className="font-display text-xl font-semibold text-ash-cream">
          Thanks — your message is on its way.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ash-cream/75">
          We&apos;ll get back to you as soon as we can. If it&apos;s urgent,
          give us a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot field, hidden from real visitors */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>

        <Field label="Which stove? (optional)" htmlFor="stove">
          <select
            id="stove"
            name="stove"
            defaultValue={preselectedStove}
            className={inputClass}
          >
            <option value="">Not sure / general enquiry</option>
            {stoves.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Message" htmlFor="message" required>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className={inputClass}
          />
        </Field>
      </div>

      {status === "error" && errorMessage ? (
        <p
          role="alert"
          className="mt-6 border border-ember-red/50 bg-ember-red/10 px-4 py-3 text-sm text-ash-cream"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 border border-ember-red bg-ember-red px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:bg-ember-red-bright hover:border-ember-red-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border border-hairline-strong bg-charcoal-ink px-4 py-3 text-sm text-ash-cream placeholder:text-ash-cream/40 focus:border-flame-gold";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-ash-cream/80">
        {label}
        {required ? <span className="text-ember-red-bright"> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
