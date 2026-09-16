import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductCard";
import { CATEGORIES, PRICE_BRACKETS, PRODUCTS, type CategorySlug } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "All Products | LightMart Nepal" },
      { name: "description", content: "Browse every LightMart product — lighting, switches, fans, stoves, clocks and electrical supplies." },
      { property: "og:title", content: "All Products | LightMart Nepal" },
      { property: "og:description", content: "Browse every LightMart product — lighting, switches, fans, stoves, clocks and electrical supplies." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const [bracket, setBracket] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => cat === "all" || p.category === cat);
    if (bracket) {
      const br = PRICE_BRACKETS.find((b) => b.label === bracket)!;
      list = list.filter((p) => p.price >= br.min && p.price < br.max);
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [cat, bracket, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">All Products</h1>
      <p className="mt-2 text-sm text-muted-foreground">{PRODUCTS.length} products in the LightMart catalogue.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-4">
        <div className="flex flex-wrap gap-2">
          {PRICE_BRACKETS.map((b) => (
            <Chip key={b.label} active={bracket === b.label} onClick={() => setBracket(bracket === b.label ? null : b.label)}>
              {b.label}
            </Chip>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
          className="border border-border bg-white px-3 py-2 text-xs"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="mt-8">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1.5 text-xs ${active ? "border-ink bg-ink text-white" : "border-border text-ink"}`}
    >
      {children}
    </button>
  );
}
