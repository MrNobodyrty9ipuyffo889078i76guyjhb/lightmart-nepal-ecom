import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, MessageCircle, Star, Truck, ShieldCheck } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";
import { ProductGrid } from "@/components/ProductCard";
import { PRODUCTS, categoryLabel, getProduct } from "@/data/products";
import { useCart } from "@/lib/cart";
import { productOrderMessage, rs, whatsappLink } from "@/lib/format";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | LightMart" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const desc = product.description.slice(0, 155);
    return {
      meta: [
        { title: `${product.name} | LightMart Nepal` },
        { name: "description", content: desc },
        { property: "og:title", content: `${product.name} | LightMart Nepal` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const views = ["Front view", "Detail view", "Scale view", "In-room view"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-ink">Home</Link> / {categoryLabel(product.category)} / {product.name}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <ImagePlaceholder label={`${product.name} — ${views[view]}`} />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {views.map((v, i) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(i)}
                aria-label={v}
                className={`border ${i === view ? "border-ink" : "border-border"}`}
              >
                <ImagePlaceholder label={v} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {product.brand} · {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-snug sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-ink text-ink" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
            </span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
            <span className={product.stock > 0 ? "text-whatsapp" : "text-destructive"}>
              · {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{rs(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">{rs(product.oldPrice)}</span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-border">
              <button type="button" aria-label="Decrease quantity" className="px-3 py-3" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button type="button" aria-label="Increase quantity" className="px-3 py-3" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              disabled={product.stock === 0}
              onClick={() => add(product.slug, qty)}
              className="inline-flex flex-1 items-center justify-center gap-2 bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-40"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
          </div>

          <a
            href={whatsappLink(productOrderMessage(product.name, rs(product.price), qty))}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-whatsapp px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>

          <div className="mt-6 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:grid-cols-2">
            <p className="inline-flex items-center gap-2"><Truck className="h-4 w-4" /> Free Kathmandu Valley delivery over Rs. 5,000</p>
            <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Genuine products with brand warranty</p>
          </div>

          <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em]">Specifications</h2>
          <dl className="mt-3 divide-y divide-border border-y border-border text-sm">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight">Related Products</h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
