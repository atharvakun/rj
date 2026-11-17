"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { home } from "@/content/home";
import { getEventBySlug } from "@/content";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/** Optional hosted form endpoint; without it the form drafts an email instead. */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function EnquiryForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    organisation: "",
    type: "",
    date: "",
    message: "",
    website: "", // honeypot
  });

  // Prefill when arriving from an event's "Register interest" button.
  useEffect(() => {
    const slug = params.get("event");
    if (!slug) return;
    const ev = getEventBySlug(slug);
    if (!ev) return;
    // Prefill from the URL once; the message is deliberately not a dependency.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues((v) => (v.message ? v : { ...v, message: `I would like to register interest in ${ev.title} (${ev.venue.city}).\n\n` }));
  }, [params]);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "A sentence or two helps us reply well.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // Honeypot filled: a bot. Pretend it worked and send nothing.
    if (values.website) {
      setStatus("sent");
      return;
    }
    try {
      if (ENDPOINT) {
        // Hosted form endpoint (Formspree, Basin, a webhook…). Set NEXT_PUBLIC_ENQUIRY_ENDPOINT at build time.
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, eventSlug: params.get("event") ?? undefined, source: site.name }),
        });
        if (!res.ok) throw new Error("The form service did not accept the enquiry. Please email us directly.");
        setServerMessage("");
        setStatus("sent");
        return;
      }
      // Static hosting with no endpoint configured: hand the drafted enquiry to the visitor's email app.
      const subject = `Enquiry from ${values.name}${values.type ? ` — ${values.type}` : ""}`;
      const lines = [
        values.message.trim(),
        "",
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.organisation && `Organisation: ${values.organisation}`,
        values.type && `Type: ${values.type}`,
        values.date && `Date: ${values.date}`,
      ].filter((l): l is string => typeof l === "string");
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      setServerMessage(`Your email app should open with the enquiry drafted to ${site.contact.email}. If it does not, send it to that address directly.`);
      setStatus("sent");
    } catch (err) {
      setServerMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[24rem] flex-col justify-center"
            role="status"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember text-ink">
              <Check className="h-6 w-6" strokeWidth={2} />
            </span>
            <p className="mt-8 font-display text-display-sm">Thank you, {values.name.split(" ")[0]}.</p>
            <p className="mt-4 max-w-md text-bone/75">
              {serverMessage || "Your enquiry has been received. We will reply within two working days."}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setValues((v) => ({ ...v, message: "" }));
              }}
              className="link-line mt-8 self-start text-sm"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-x-8 gap-y-2 sm:grid-cols-2"
          >
            <Field label="Name" error={errors.name} htmlFor="f-name">
              <input id="f-name" className="field" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} required />
            </Field>
            <Field label="Email" error={errors.email} htmlFor="f-email">
              <input id="f-email" type="email" className="field" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} required />
            </Field>
            <Field label="Organisation (optional)" htmlFor="f-org">
              <input id="f-org" className="field" autoComplete="organization" value={values.organisation} onChange={set("organisation")} />
            </Field>
            <Field label="Type of event" htmlFor="f-type">
              <select id="f-type" className="field appearance-none bg-transparent" value={values.type} onChange={set("type")}>
                <option value="" className="bg-ink">
                  Select…
                </option>
                {home.contact.eventTypes.map((t) => (
                  <option key={t} value={t} className="bg-ink">
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Preferred month (optional)" htmlFor="f-date">
              <input id="f-date" type="month" className="field" value={values.date} onChange={set("date")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Tell us about it" error={errors.message} htmlFor="f-message">
                <textarea id="f-message" rows={4} className="field resize-none" value={values.message} onChange={set("message")} aria-invalid={!!errors.message} required />
              </Field>
            </div>
            {/* Honeypot */}
            <div className="hidden" aria-hidden>
              <label htmlFor="f-website">Website</label>
              <input id="f-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 sm:col-span-2">
              <Button type="submit" size="lg" variant="ember" disabled={status === "sending"} icon={status === "sending" ? "none" : "arrow"}>
                {status === "sending" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </span>
                ) : (
                  "Send enquiry"
                )}
              </Button>
              {status === "error" && (
                <p role="alert" className="text-sm text-ember">
                  {serverMessage}
                </p>
              )}
              <p className="text-xs text-ash">We reply to every message. No newsletters unless you ask.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, error, htmlFor, children }: { label: string; error?: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="group relative pt-5">
      <label htmlFor={htmlFor} className={cn("eyebrow block text-ash transition-colors group-focus-within:text-bone", error && "text-ember")}>
        {label}
      </label>
      {children}
      <div className="h-5 pt-1.5">
        {error && (
          <p className="text-xs text-ember" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
