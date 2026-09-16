import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ProductGrid } from "@/components/ProductCard";
import { searchProducts } from "@/data/products";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Search Products | LightMart Nepal" },
      { name: "description", content: "Search LightMart for lights, switches, fans, stoves, clocks and electrical supplies." },
      { property: "og:title", content: "Search Products | LightMart Nepal" },
      { property: "og:description", content: "Search LightMart for lights, switches, fans, stoves, clocks and electrical supplies." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Search results {q && <span className="text-muted-foreground">for “{q}”</span>}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{results.length} products found.</p>

      <div className="mt-8">
        {results.length ? (
          <ProductGrid products={results} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">No products matched your search.</p>
            <Link to="/shop" className="mt-4 inline-block bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
