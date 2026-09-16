import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";
import { useCart, deliveryFee } from "@/lib/cart";
import { rs } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | LightMart Nepal" },
      { name: "description", content: "Review your LightMart cart, adjust quantities and see delivery costs in NPR." },
      { property: "og:title", content: "Your Cart | LightMart Nepal" },
      { property: "og:description", content: "Review your LightMart cart, adjust quantities and see delivery costs in NPR." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const delivery = deliveryFee("valley", subtotal);

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add lighting, fans or electricals to get started.</p>
        <Link to="/shop" className="mt-6 inline-block bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Shopping Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-border border-y border-border">
          {items.map(({ product, qty }) => (
            <div key={product.slug} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[110px_minmax(0,1fr)_auto]">
              <ImagePlaceholder label={product.brand} className="h-22 w-22" />
              <div className="min-w-0">
                <Link to="/product/$slug" params={{ slug: product.slug }} className="text-sm font-medium hover:text-brand">
                  {product.name}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">{product.brand}</p>
                <p className="mt-1 text-sm font-semibold">{rs(product.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center border border-border">
                    <button type="button" aria-label="Decrease quantity" className="px-2.5 py-1.5" onClick={() => setQty(product.slug, qty - 1)}>
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-medium">{qty}</span>
                    <button type="button" aria-label="Increase quantity" className="px-2.5 py-1.5" onClick={() => setQty(product.slug, qty + 1)}>
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button type="button" onClick={() => remove(product.slug)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <p className="self-start text-right text-sm font-semibold sm:self-center">{rs(product.price * qty)}</p>
            </div>
          ))}
        </div>

        <aside className="h-fit border border-border p-6 lg:sticky lg:top-40">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={rs(subtotal)} />
            <Row label="Delivery (Kathmandu Valley)" value={delivery === 0 ? "Free" : rs(delivery)} />
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Grand Total</dt>
              <dd>{rs(subtotal + delivery)}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="mt-6 block bg-ink py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
            Proceed to Checkout
          </Link>
          <button type="button" onClick={clear} className="mt-3 w-full text-xs text-muted-foreground hover:text-destructive">
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
