import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Warranty | LightMart Nepal" },
      { name: "description", content: "How to return or exchange LightMart products and claim manufacturer warranty in Nepal." },
      { property: "og:title", content: "Returns & Warranty | LightMart Nepal" },
      { property: "og:description", content: "How to return or exchange LightMart products and claim manufacturer warranty in Nepal." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Returns & Warranty</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <Section title="7-Day Return Window">
          Unused items in original packaging can be returned within 7 days of delivery. Delivery charges are non-refundable.
        </Section>
        <Section title="Damaged or Faulty Items">
          Report damage within 48 hours with photos on WhatsApp and we will replace the item at no cost.
        </Section>
        <Section title="Manufacturer Warranty">
          Warranty periods vary by brand and product — typically 1 to 5 years. Keep your invoice for any claim.
        </Section>
        <Section title="Non-Returnable">
          Cut wire, custom orders and installed fittings cannot be returned once used.
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
