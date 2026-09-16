import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { useCart, deliveryFee, type Region } from "@/lib/cart";
import { rs, whatsappLink } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | LightMart Nepal" },
      { name: "description", content: "Place your LightMart order with cash on delivery, bank transfer or WhatsApp." },
      { property: "og:title", content: "Checkout | LightMart Nepal" },
      { property: "og:description", content: "Place your LightMart order with cash on delivery, bank transfer or WhatsApp." },
    ],
  }),
  component: Checkout,
});

const PROVINCES = [
  "Kathmandu Valley",
  "Koshi Province",
  "Madhesh Province",
  "Bagmati (outside valley)",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [region, setRegion] = useState<Region>("valley");
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", province: PROVINCES[0]!, notes: "" });

  const delivery = deliveryFee(region, subtotal);
  const total = subtotal + delivery;

  const orderMessage = [
    "New order from LightMart website",
    "",
    ...items.map((i) => `• ${i.product.name} x${i.qty} — ${rs(i.product.price * i.qty)}`),
    "",
    `Subtotal: ${rs(subtotal)}`,
    `Delivery: ${delivery === 0 ? "Free" : rs(delivery)}`,
    `Total: ${rs(total)}`,
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Address: ${form.address}, ${form.city}, ${form.province}`,
    `Payment: ${payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}`,
  ].join("\n");

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Order received</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you, {form.name || "friend"}. Our team will call {form.phone || "you"} shortly to confirm delivery.
        </p>
        <Link to="/shop" className="mt-8 inline-block bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Nothing to check out</h1>
        <Link to="/shop" className="mt-6 inline-block bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>

      <form
        className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]"
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
        }}
      >
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Shipping Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} required />
              <Field label="Phone number" value={form.phone} onChange={(v) => set("phone", v)} required />
              <Field label="Email (optional)" type="email" value={form.email} onChange={(v) => set("email", v)} />
              <Field label="City / Town" value={form.city} onChange={(v) => set("city", v)} required />
              <label className="sm:col-span-2 block text-xs">
                <span className="text-muted-foreground">Street address</span>
                <input
                  required
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink"
                />
              </label>
              <label className="block text-xs">
                <span className="text-muted-foreground">Province</span>
                <select
                  value={form.province}
                  onChange={(e) => {
                    set("province", e.target.value);
                    setRegion(e.target.value === "Kathmandu Valley" ? "valley" : "outside");
                  }}
                  className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink"
                >
                  {PROVINCES.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs">
                <span className="text-muted-foreground">Delivery notes (optional)</span>
                <input
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Payment Method</h2>
            <div className="mt-4 space-y-3">
              <Radio checked={payment === "cod"} onChange={() => setPayment("cod")} title="Cash on Delivery" desc="Pay in cash when your order arrives." />
              <Radio checked={payment === "bank"} onChange={() => setPayment("bank")} title="Bank Transfer" desc="Transfer to our NIC Asia account; we confirm before dispatch." />
            </div>
          </section>
        </div>

        <aside className="h-fit border border-border p-6 lg:sticky lg:top-40">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Order Summary</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.product.slug} className="flex justify-between gap-3">
                <span className="min-w-0 text-muted-foreground">
                  {i.product.name} <span className="text-ink">×{i.qty}</span>
                </span>
                <span className="font-medium">{rs(i.product.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{rs(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{delivery === 0 ? "Free" : rs(delivery)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold"><dt>Total</dt><dd>{rs(total)}</dd></div>
          </dl>

          <button type="submit" className="mt-6 w-full bg-ink py-3.5 text-xs font-semibold uppercase tracking-wider text-white">
            Place Order
          </button>
          <a
            href={whatsappLink(orderMessage)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-whatsapp py-3.5 text-xs font-semibold uppercase tracking-wider text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
          >
            <MessageCircle className="h-4 w-4" /> Order via WhatsApp
          </a>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block text-xs">
      <span className="text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}

function Radio({ checked, onChange, title, desc }: { checked: boolean; onChange: () => void; title: string; desc: string }) {
  return (
    <label className={`flex cursor-pointer gap-3 border p-4 ${checked ? "border-ink" : "border-border"}`}>
      <input type="radio" checked={checked} onChange={onChange} className="mt-1 accent-black" />
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
    </label>
  );
}
