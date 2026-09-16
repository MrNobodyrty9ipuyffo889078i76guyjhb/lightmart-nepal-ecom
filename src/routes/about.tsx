import { createFileRoute } from "@tanstack/react-router";
import { ImagePlaceholder } from "@/components/Placeholder";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LightMart | Lighting & Electricals, Kathmandu" },
      { name: "description", content: "LightMart is a Kathmandu-based supplier of premium lighting, switches, fans and electrical fittings for homes and businesses." },
      { property: "og:title", content: "About LightMart | Lighting & Electricals, Kathmandu" },
      { property: "og:description", content: "LightMart is a Kathmandu-based supplier of premium lighting, switches, fans and electrical fittings." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About LightMart</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        LightMart is a Kathmandu-based lighting and electrical showroom serving homes, offices, hotels and contractors
        across Nepal. We stock genuine, warranty-backed products and help customers choose the right fitting for every room.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <ImagePlaceholder ratio="wide" label="LightMart showroom" />
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            From LED panels and decorative pendants to modular switches, BLDC fans, induction cookers and distribution
            boards — our catalogue is curated for quality first, price second.
          </p>
          <p>
            Our team offers on-site consultation in the Kathmandu Valley and ships nationwide with trusted couriers.
            Bulk and project pricing is available for contractors and commercial clients.
          </p>
        </div>
      </div>

      <dl className="mt-12 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
        {[
          ["12+ years", "Serving Nepali homes and businesses"],
          ["40+ products", "Across six core categories"],
          ["Nationwide", "Delivery to all seven provinces"],
        ].map(([t, d]) => (
          <div key={t}>
            <dt className="text-2xl font-semibold">{t}</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
