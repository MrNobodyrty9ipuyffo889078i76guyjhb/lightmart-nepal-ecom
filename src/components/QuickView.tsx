import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";
import { categoryLabel, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { productOrderMessage, rs, whatsappLink } from "@/lib/format";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const views = ["Front view", "Detail view", "In-room view"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick View</p>
          <button type="button" onClick={onClose} aria-label="Close quick view" className="p-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 p-5 md:grid-cols-2 md:p-6">
          <div>
            <ImagePlaceholder label={`${product.name} — ${views[view]}`} />
            <div className="mt-3 grid grid-cols-3 gap-3">
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
            <h2 className="mt-2 text-xl font-semibold leading-snug">{product.name}</h2>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-semibold">{rs(product.price)}</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{rs(product.oldPrice)}</span>
              )}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 py-2">
                <dt className="text-muted-foreground">Availability</dt>
                <dd className="font-medium">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center border border-border">
                <button type="button" aria-label="Decrease quantity" className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button type="button" aria-label="Increase quantity" className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                disabled={product.stock === 0}
                onClick={() => {
                  add(product.slug, qty);
                  onClose();
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-40"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
            </div>

            <a
              href={whatsappLink(productOrderMessage(product.name, rs(product.price), qty))}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-whatsapp px-4 py-3 text-xs font-semibold uppercase tracking-wider text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>

            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              onClick={onClose}
              className="mt-4 inline-block text-xs font-medium uppercase tracking-wider text-brand underline underline-offset-4"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
