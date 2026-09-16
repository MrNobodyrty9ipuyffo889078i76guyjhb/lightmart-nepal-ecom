import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, MapPin, Phone, Menu, X, ChevronDown, User } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CATEGORIES, BRANDS, PRICE_BRACKETS, searchProducts } from "@/data/products";
import { useCart } from "@/lib/cart";
import { PHONE_DISPLAY, rs } from "@/lib/format";

const NAV = [
  { to: "/light", label: "Light" },
  { to: "/switch", label: "Switch" },
  { to: "/main", label: "Main" },
  { to: "/fan", label: "Fan" },
  { to: "/electric-stove", label: "Electric Stove" },
  { to: "/clock", label: "Clock" },
] as const;

export function Header() {
  const navigate = useNavigate();
  const { count, subtotal } = useCart();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const suggestions = focused && q.trim().length > 1 ? searchProducts(q, 6) : [];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setFocused(false);
    navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Utility bar */}
      <div className="bg-ecru text-ink">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-1 px-4 py-2 text-xs sm:px-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Kathmandu, Nepal
            </span>
            <a href="tel:+9779845441995" className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="/login" className="inline-flex items-center gap-1.5 hover:underline">
              <User className="h-3.5 w-3.5" /> Login
            </Link>
            <Link to="/signup" className="hidden hover:underline sm:inline">Signup</Link>
          </nav>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="p-1 lg:hidden"
              aria-label="Open menu"
              onClick={() => setDrawer(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Logo />
          </div>

          <div ref={boxRef} className="relative hidden md:block">
            <form onSubmit={submit} className="flex border border-ink">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                placeholder="Search lights, switches, fans, clocks…"
                aria-label="Search products"
                className="w-full bg-white px-4 py-2.5 text-sm outline-none"
              />
              <button type="submit" aria-label="Search" className="bg-ink px-5 text-white">
                <Search className="h-4 w-4" />
              </button>
            </form>
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-50 max-h-80 overflow-auto border border-t-0 border-border bg-white shadow-xl">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setFocused(false)}
                      className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm hover:bg-ecru-soft"
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="shrink-0 text-xs font-medium">{rs(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/cart" className="flex shrink-0 items-center gap-3">
            <span className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.6rem] font-semibold text-white">
                {count}
              </span>
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">Cart</span>
              <span className="block text-sm font-semibold">{rs(subtotal)}</span>
            </span>
          </Link>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <form onSubmit={submit} className="flex border border-ink">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full bg-white px-3 py-2 text-sm outline-none"
            />
            <button type="submit" aria-label="Search" className="bg-ink px-4 text-white">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Category navbar */}
      <div className="relative hidden border-b border-border bg-white lg:block" onMouseLeave={() => setMega(false)}>
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6">
          <button
            type="button"
            onMouseEnter={() => setMega(true)}
            onClick={() => setMega((v) => !v)}
            className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white"
          >
            Explore <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onMouseEnter={() => setMega(false)}
              className="px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-brand"
              activeProps={{ className: "text-brand" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/shop"
            className="ml-auto px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground hover:text-ink"
          >
            All Products
          </Link>
        </div>

        {mega && (
          <div className="absolute inset-x-0 top-full z-50 border-b border-border bg-white shadow-xl">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[2fr_1fr_1fr]">
              <div className="grid grid-cols-3 gap-6">
                {CATEGORIES.map((c) => (
                  <div key={c.slug}>
                    <Link
                      to={c.slug === "light" ? "/light" : c.slug === "switch" ? "/switch" : c.slug === "fan" ? "/fan" : c.slug === "clock" ? "/clock" : c.slug === "main" ? "/main" : "/electric-stove"}
                      onClick={() => setMega(false)}
                      className="text-sm font-semibold hover:text-brand"
                    >
                      {c.label}
                    </Link>
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      {c.subcategories.map((s) => (
                        <li key={s}>
                          <Link
                            to={c.slug === "light" ? "/light" : c.slug === "switch" ? "/switch" : c.slug === "fan" ? "/fan" : c.slug === "clock" ? "/clock" : c.slug === "main" ? "/main" : "/electric-stove"}
                            onClick={() => setMega(false)}
                            className="hover:text-ink"
                          >
                            {s}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold">Brands</p>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {BRANDS.map((b) => (
                    <li key={b}>
                      <Link to="/search" search={{ q: b }} onClick={() => setMega(false)} className="hover:text-ink">
                        {b}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold">Shop by Price</p>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {PRICE_BRACKETS.map((b) => (
                    <li key={b.label}>
                      <Link to="/shop" onClick={() => setMega(false)} className="hover:text-ink">
                        {b.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 bg-ink/50 lg:hidden" onClick={() => setDrawer(false)}>
          <nav
            className="h-full w-72 max-w-[85%] overflow-y-auto bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Logo compact />
              <button type="button" aria-label="Close menu" onClick={() => setDrawer(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-6 space-y-1 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} onClick={() => setDrawer(false)} className="block border-b border-border py-3">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" onClick={() => setDrawer(false)} className="block border-b border-border py-3">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setDrawer(false)} className="block border-b border-border py-3">About Us</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setDrawer(false)} className="block border-b border-border py-3">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setDrawer(false)} className="block border-b border-border py-3">Login / Signup</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
