import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery Information | LightMart Nepal" },
      { name: "description", content: "LightMart delivery charges, timelines and coverage across Kathmandu Valley and all provinces of Nepal." },
      { property: "og:title", content: "Delivery Information | LightMart Nepal" },
      { property: "og:description", content: "Delivery charges, timelines and coverage across Kathmandu Valley and all provinces of Nepal." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Delivery Information</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <Section title="Kathmandu Valley">
          Rs. 150 flat delivery, free on orders above Rs. 5,000. Orders placed before 2 PM are usually delivered the same or next day.
        </Section>
        <Section title="Outside the Valley">
          Rs. 350 flat delivery to all seven provinces via trusted courier partners. Typical transit time is 2–5 business days.
        </Section>
        <Section title="Bulk & Project Orders">
          For contractors and commercial projects we arrange dedicated transport. Call us to plan scheduling and pricing.
        </Section>
        <Section title="Order Tracking">
          Our team calls to confirm every order before dispatch and shares courier details by phone or WhatsApp.
        </Section>
      </div>
    </div>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
