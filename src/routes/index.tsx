import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, Sparkles, Headphones } from "lucide-react";
import { ProductGrid } from "@/components/ProductCard";
import { ImagePlaceholder, LogoPlaceholder } from "@/components/Placeholder";
import { SocialBar } from "@/components/SocialBar";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LightMart | Premium Lighting & Electricals in Nepal" },
      { name: "description", content: "Shop lights, switches, fans, electric stoves, clocks and electrical supplies with fast delivery across Nepal." },
      { property: "og:title", content: "LightMart | Premium Lighting & Electricals in Nepal" },
      { property: "og:description", content: "Shop lights, switches, fans, electric stoves, clocks and electrical supplies with fast delivery across Nepal." },
    ],
  }),
  component: Home,
});

const SLIDES = [
  { title: "Light Up Every Corner", sub: "Premium LED lighting for Nepali homes and offices", cta: "Shop Lighting", to: "/light" as const },
  { title: "Switches That Last", sub: "Modular switches and sockets with 3-year warranty", cta: "Shop Switches", to: "/switch" as const },
  { title: "Cooler Rooms, Lower Bills", sub: "Energy-saving BLDC and ceiling fans", cta: "Shop Fans", to: "/fan" as const },
];

function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 3000);
    return () => clearInterval(t);
  }, []);

  const byRating = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
  const featured = byRating.slice(0, 8);
  const newArrivals = [...PRODUCTS].slice(-8).reverse();
  const bestSellers = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const popularLighting = PRODUCTS.filter((p) => p.category === "light").slice(0, 8);

  const current = SLIDES[slide]!;

  return (
    <div>
      <SocialBar />

      <section className="relative bg-ecru">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">LightMart Nepal</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{current.title}</h1>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">{current.sub}</p>
            <Link to={current.to} className="mt-7 inline-block bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white">
              {current.cta}
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <button type="button" aria-label="Previous slide" onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)} className="border border-ink p-2">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" aria-label="Next slide" onClick={() => setSlide((s) => (s + 1) % SLIDES.length)} className="border border-ink p-2">
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="ml-2 flex gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 w-6 ${i === slide ? "bg-ink" : "bg-ink/25"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <ImagePlaceholder ratio="wide" label={`Promotional banner — ${current.title}`} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/${c.slug}`} className="group border border-border p-3 transition-colors hover:border-ink">
              <ImagePlaceholder label={c.label} />
              <p className="mt-3 text-center text-xs font-medium uppercase tracking-wider">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Featured Products" products={featured} />
      <Section title="New Arrivals" products={newArrivals} tone />
      <Section title="Best Sellers" products={bestSellers} />
      <Section title="Popular Lighting" products={popularLighting} tone />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Our Commercial Clients</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {["Hotel Client", "Housing Project", "Retail Chain", "Hospital", "School", "Restaurant"].map((n) => (
            <LogoPlaceholder key={n} name={n} />
          ))}
        </div>
      </section>

      <section className="bg-ecru-soft">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Why Shop With LightMart?</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Sparkles, "Quality Products", "Genuine, warranty-backed brands only."],
              [Truck, "Fast Nepal Delivery", "Valley same-day, nationwide in 2–5 days."],
              [ShieldCheck, "Secure Shopping", "Cash on delivery and verified bank transfer."],
              [Headphones, "Friendly Support", "Call or WhatsApp us any working day."],
            ].map(([Icon, title, desc]) => {
              const I = Icon as typeof Sparkles;
              return (
                <div key={title as string}>
                  <I className="h-6 w-6" />
                  <h3 className="mt-3 text-sm font-semibold">{title as string}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, products, tone }: { title: string; products: typeof PRODUCTS; tone?: boolean }) {
  return (
    <section className={tone ? "bg-ecru-soft" : ""}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          <Link to="/shop" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-ink">View all</Link>
        </div>
        <div className="mt-6">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
