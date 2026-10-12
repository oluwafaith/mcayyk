"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { ArrowRightIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";

const eventOptions = [...site.services.map((s) => s.name), "Other"];

/**
 * Works out of the box:
 *  - If NEXT_PUBLIC_FORM_ENDPOINT is set (e.g. Formspree), submissions are POSTed there.
 *  - Otherwise it opens the visitor's email app with the enquiry pre-filled.
 * Without JavaScript, the native form `action` still posts to the endpoint (if set).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [usedMailto, setUsedMailto] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot: bots fill hidden fields

    setStatus("submitting");

    const isWeb3Forms = Boolean(site.web3formsKey);
    const targetEndpoint = site.web3formsKey
      ? "https://api.web3forms.com/submit"
      : (site.formEndpoint || "/api/contact");

    try {
      if (isWeb3Forms) {
        data.set("access_key", site.web3formsKey);
        data.set("from_name", "MC AYYK Website");
      }
      data.set("_subject", `New booking enquiry from ${data.get("name")}`);

      const res = await fetch(targetEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || (isWeb3Forms && !result.success)) {
        // If server indicates configuration is missing, fall back to opening mail client
        if (result?.fallbackMailto) {
          triggerMailtoFallback(data);
          return;
        }
        throw new Error(result?.message || result?.error || `Request failed with status ${res.status}`);
      }

      form.reset();
      setUsedMailto(false);
      setStatus("success");
    } catch (err) {
      console.warn("Delivery failed, falling back to mail client:", err);
      triggerMailtoFallback(data);
    }
  }

  function triggerMailtoFallback(data: FormData) {
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `Booking enquiry: ${get("eventType")} (${get("name")})`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone") || "-"}`,
      `Event type: ${get("eventType")}`,
      `Event date: ${get("eventDate") || "-"}`,
      `Venue / location: ${get("venue") || "-"}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setUsedMailto(true);
    setStatus("success");
  }

  return (
    <form
      onSubmit={onSubmit}
      action={site.formEndpoint || undefined}
      method="POST"
      noValidate
      className="card relative p-6 sm:p-9"
      aria-describedby="form-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="cf-name" className="field-label">
            Full name <span className="text-gold-700" aria-hidden="true">*</span>
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className="field" placeholder="Your name" />
        </div>

        <div>
          <label htmlFor="cf-email" className="field-label">
            Email <span className="text-gold-700" aria-hidden="true">*</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@example.com" />
        </div>

        <div>
          <label htmlFor="cf-phone" className="field-label">
            Phone
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className="field" placeholder="+234…" />
        </div>

        <div>
          <label htmlFor="cf-event" className="field-label">
            Event type <span className="text-gold-700" aria-hidden="true">*</span>
          </label>
          <select id="cf-event" name="eventType" required defaultValue="" className="field field-select">
            <option value="" disabled>
              Select an event
            </option>
            {eventOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-date" className="field-label">
            Event date
          </label>
          <input id="cf-date" name="eventDate" type="date" className="field" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-venue" className="field-label">
            Venue / location
          </label>
          <input id="cf-venue" name="venue" type="text" className="field" placeholder="Where is the event?" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="field-label">
            Message <span className="text-gold-700" aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            className="field resize-y"
            placeholder="Tell us about your event: guest count, schedule, anything special…"
          />
        </div>

        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-gotcha">Leave this field empty</label>
          <input id="cf-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn btn-gold mt-7 w-full text-base disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-9">
        {status === "submitting" ? "Sending…" : "Send Booking Enquiry"}
        <ArrowRightIcon className="icon-nudge" />
      </button>

      <p className="mt-3 text-xs text-ink-muted">Fields marked * are required.</p>

      <div id="form-status" role="status" aria-live="polite" className="mt-4 empty:hidden">
        {status === "success" && (
          <p className="rounded-xl border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
            {usedMailto ? (
              <>
                Your email app should now open with your enquiry ready to send. If it didn&apos;t, email{" "}
                <a className="underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </>
            ) : (
              <>Thank you! Your enquiry has been sent. MC AYYK will be in touch soon.</>
            )}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl border border-red-600/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-900">
            Sorry, something went wrong. Please call {site.phones[0].display} or email{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
