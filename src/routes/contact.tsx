import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/format";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact LightMart | Kathmandu Showroom" },
      { name: "description", content: "Call +977 9845441995 or send an inquiry to LightMart's Kathmandu lighting and electrical showroom." },
      { property: "og:title", content: "Contact LightMart | Kathmandu Showroom" },
      { property: "og:description", content: "Call +977 9845441995 or send an inquiry to LightMart's Kathmandu showroom." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact Us</h1>
      <p className="mt-3 text-sm text-muted-foreground">We reply to inquiries within one business day.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> New Road, Kathmandu, Nepal</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> {PHONE_DISPLAY}</li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> hello@lightmart.com.np</li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0" /> Sun – Fri, 10:00 – 19:00</li>
          </ul>
          <div className="mt-6 flex h-64 items-center justify-center border border-dashed border-border bg-ecru-soft text-xs text-muted-foreground">
            Map placeholder — New Road, Kathmandu
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Field label="Your name" required />
          <Field label="Phone number" required />
          <Field label="Email" type="email" />
          <label className="block text-xs">
            <span className="text-muted-foreground">Message</span>
            <textarea
              required
              rows={5}
              className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink"
            />
          </label>
          <button type="submit" className="w-full bg-ink py-3.5 text-xs font-semibold uppercase tracking-wider text-white">
            Send Inquiry
          </button>
          {sent && <p className="text-xs text-whatsapp">Thanks — your inquiry has been noted. We will call you shortly.</p>}
        </form>
      </div>
    </div>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-xs">
      <span className="text-muted-foreground">{label}</span>
      <input type={type} required={required} className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink" />
    </label>
  );
}
