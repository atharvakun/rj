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

const purposeLabel = (value: string) => home.contact.purposes.find((p) => p.value === value)?.label ?? value;

export function EnquiryForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    purpose: "",
    message: "",
    website: "", // honeypot
  });

  // Prefill from the URL: `?purpose=nomination` from the awards links,
  // `?event=slug` from an event's "Register interest" button.
  const purposeParam = params.get("purpose");
  const eventParam = params.get("event");
  useEffect(() => {
    const ev = eventParam ? getEventBySlug(eventParam) : null;
    const purpose = ev ? "event" : purposeParam && home.contact.purposes.some((p) => p.value === purposeParam) ? purposeParam : "";
    if (!purpose) return;
    // Prefill once; a message the visitor has already typed is left alone.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues((v) => ({
      ...v,
      purpose: v.purpose || purpose,
      message: v.message
        ? v.message
        : ev
          ? `I would like to attend ${ev.title} (${ev.venue.city}). Please keep me posted.\n\n`
          : purpose === "nomination"
            ? home.contact.nominationTemplate
            : "",
    }));
  }, [purposeParam, eventParam]);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please enter a valid email address.";
    if (values.message.replace(/_/g, "").trim().length < 10) next.message = "A sentence or two helps us reply well.";
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
          body: JSON.stringify({ ...values, purposeLabel: purposeLabel(values.purpose), eventSlug: eventParam ?? undefined, source: site.name }),
        });
        if (!res.ok) throw new Error("The form service did not accept the message. Please email us directly.");
        setServerMessage("");
        setStatus("sent");
        return;
      }
      // Static hosting with no endpoint configured: hand the drafted message to the visitor's email app.
      const subject = `${values.purpose ? purposeLabel(values.purpose) : "Message"} — ${values.name}`;
      const lines = [
        values.message.trim(),
        "",
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone && `Phone: ${values.phone}`,
        values.city && `City: ${values.city}`,
        values.purpose && `Reason: ${purposeLabel(values.purpose)}`,
      ].filter((l): l is string => typeof l === "string");
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      setServerMessage(`Your email app should open with the message drafted to ${site.contact.email}. If it does not, send it to that address directly.`);
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
            <p className="mt-8 font-display text-display-sm">Dhanyavaad, {values.name.split(" ")[0]}.</p>
            <p className="mt-4 max-w-md text-bone/75">
              {serverMessage || "Your message has been received. We will reply within a few days."}
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
            <Field label="Phone (optional)" htmlFor="f-phone">
              <input id="f-phone" type="tel" className="field" autoComplete="tel" value={values.phone} onChange={set("phone")} />
            </Field>
            <Field label="City (optional)" htmlFor="f-city">
              <input id="f-city" className="field" autoComplete="address-level2" value={values.city} onChange={set("city")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Reason for writing" htmlFor="f-purpose">
                <select id="f-purpose" className="field appearance-none bg-transparent" value={values.purpose} onChange={set("purpose")}>
                  <option value="" className="bg-ink">
                    Select…
                  </option>
                  {home.contact.purposes.map((p) => (
                    <option key={p.value} value={p.value} className="bg-ink">
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Your message" error={errors.message} htmlFor="f-message">
                <textarea id="f-message" rows={6} className="field resize-none" value={values.message} onChange={set("message")} aria-invalid={!!errors.message} required />
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
                  "Send message"
                )}
              </Button>
              {status === "error" && (
                <p role="alert" className="text-sm text-ember">
                  {serverMessage}
                </p>
              )}
              <p className="text-xs text-ash">Nominations are kept confidential. No newsletters unless you ask.</p>
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
