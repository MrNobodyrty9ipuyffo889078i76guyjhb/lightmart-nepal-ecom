import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, ShoppingBag, Star, MessageCircle } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";
import { QuickView } from "@/components/QuickView";
import { categoryLabel, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { productOrderMessage, rs, whatsappLink } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [open, setOpen] = useState(false);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <>
      <article className="group relative flex h-full flex-col border border-border bg-white transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(17,17,17,0.5)]">
        <div className="relative">
          <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
            <ImagePlaceholder label={product.name} />
          </Link>
          {discount > 0 && (
            <span className="absolute left-0 top-0 bg-ink px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute right-0 top-0 bg-destructive px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
              Out of stock
            </span>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 border border-ink bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <span className="inline-flex items-center gap-2">
              <Eye className="h-3.5 w-3.5" /> Quick View
            </span>
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            {product.brand} · {categoryLabel(product.category)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-brand">
              {product.name}
            </Link>
          </h3>

          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-ink text-ink" />
            <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
            <span>({product.reviews})</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base font-semibold">{rs(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">{rs(product.oldPrice)}</span>
            )}
          </div>

          <div className="mt-4 grid gap-2 pt-1">
            <button
              type="button"
              disabled={product.stock === 0}
              onClick={() => add(product.slug)}
              className="inline-flex items-center justify-center gap-2 bg-ink px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
            </button>
            <a
              href={whatsappLink(productOrderMessage(product.name, rs(product.price)))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-whatsapp px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </article>

      {open && <QuickView product={product} onClose={() => setOpen(false)} />}
    </>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
