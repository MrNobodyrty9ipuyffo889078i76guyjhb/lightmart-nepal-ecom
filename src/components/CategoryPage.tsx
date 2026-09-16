import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/ProductCard";
import {
  BRANDS,
  PRICE_BRACKETS,
  byCategory,
  categoryLabel,
  type CategorySlug,
} from "@/data/products";
import { rs } from "@/lib/format";

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export function CategoryPage({ category }: { category: CategorySlug }) {
  const all = useMemo(() => byCategory(category), [category]);
  const maxPrice = useMemo(() => Math.max(...all.map((p) => p.price)), [all]);

  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState(maxPrice);
  const [bracket, setBracket] = useState<string | null>(null);
  const [inStock, setInStock] = useState(false);
  const [wattage, setWattage] = useState<string | null>(null);
  const [temp, setTemp] = useState<string | null>(null);
  const [gang, setGang] = useState<number | null>(null);
  const [speeds, setSpeeds] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const results = useMemo(() => {
    let list = all.filter((p) => p.price <= price);
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    if (inStock) list = list.filter((p) => p.stock > 0);
    if (bracket) {
      const br = PRICE_BRACKETS.find((b) => b.label === bracket)!;
      list = list.filter((p) => p.price >= br.min && p.price < br.max);
    }
    if (wattage) {
      const [min = 0, max = 0] = wattage.split("-").map(Number);
      list = list.filter((p) => (p.wattage ?? 0) >= min && (p.wattage ?? 0) <= max);
    }
    if (temp) list = list.filter((p) => p.colorTemp === temp);
    if (gang) list = list.filter((p) => p.gangs === gang);
    if (speeds) list = list.filter((p) => (p.speeds ?? 0) >= speeds);

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") sorted.sort((a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")));
    if (sort === "featured") sorted.sort((a, b) => Number(b.tags.includes("featured")) - Number(a.tags.includes("featured")));
    return sorted;
  }, [all, brands, price, bracket, inStock, wattage, temp, gang, speeds, sort]);

  const availableBrands = BRANDS.filter((b) => all.some((p) => p.brand === b));
  const isLight = category === "light";
  const isSwitch = category === "switch";
  const isFan = category === "fan";
  const isStove = category === "electric-stove";

  const reset = () => {
    setBrands([]); setPrice(maxPrice); setBracket(null); setInStock(false);
    setWattage(null); setTemp(null); setGang(null); setSpeeds(null);
  };

  const filters = (
    <div className="space-y-7 text-sm">
      <FilterBlock title="Price Range">
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={50}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-[var(--brand)]"
          aria-label="Maximum price"
        />
        <p className="mt-2 text-xs text-muted-foreground">Up to {rs(price)}</p>
      </FilterBlock>

      <FilterBlock title="Price Brackets">
        <ul className="space-y-2">
          {PRICE_BRACKETS.map((b) => (
            <li key={b.label}>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="bracket"
                  checked={bracket === b.label}
                  onChange={() => setBracket(bracket === b.label ? null : b.label)}
                  className="accent-[var(--brand)]"
                />
                {b.label}
              </label>
            </li>
          ))}
        </ul>
      </FilterBlock>

      {(isLight || isStove) && (
        <FilterBlock title="Wattage">
          <ul className="space-y-2">
            {((isStove
              ? [["0-1500", "Up to 1500W"], ["1501-2200", "1501 – 2200W"], ["2201-99999", "Above 2200W"]]
              : [["0-12", "Up to 12W"], ["13-36", "13 – 36W"], ["37-99999", "Above 36W"]]) as [string, string][]
            ).map(([val, label]) => (
              <li key={val}>
                <label className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="wattage"
                    checked={wattage === val}
                    onChange={() => setWattage(wattage === val ? null : val)}
                    className="accent-[var(--brand)]"
                  />
                  {label}
                </label>
              </li>
            ))}
          </ul>
        </FilterBlock>
      )}

      {isLight && (
        <FilterBlock title="Colour Temperature">
          <ul className="space-y-2">
            {["Warm White", "Cool White", "Daylight"].map((t) => (
              <li key={t}>
                <label className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="temp"
                    checked={temp === t}
                    onChange={() => setTemp(temp === t ? null : t)}
                    className="accent-[var(--brand)]"
                  />
                  {t}
                </label>
              </li>
            ))}
          </ul>
        </FilterBlock>
      )}

      {isSwitch && (
        <FilterBlock title="Gang Count">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 4, 6].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGang(gang === g ? null : g)}
                className={`border px-3 py-1.5 text-xs ${gang === g ? "border-ink bg-ink text-white" : "border-border"}`}
              >
                {g} Gang
              </button>
            ))}
          </div>
        </FilterBlock>
      )}

      {isFan && (
        <FilterBlock title="Speed Settings">
          <div className="flex flex-wrap gap-2">
            {[1, 3, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeeds(speeds === s ? null : s)}
                className={`border px-3 py-1.5 text-xs ${speeds === s ? "border-ink bg-ink text-white" : "border-border"}`}
              >
                {s}+ speeds
              </button>
            ))}
          </div>
        </FilterBlock>
      )}

      <FilterBlock title="Brand">
        <ul className="space-y-2">
          {availableBrands.map((b) => (
            <li key={b}>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="accent-[var(--brand)]"
                />
                {b}
              </label>
            </li>
          ))}
        </ul>
      </FilterBlock>

      <label className="flex cursor-pointer items-center gap-2 text-xs">
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-[var(--brand)]" />
        In stock only
      </label>

      <button type="button" onClick={reset} className="text-xs font-medium uppercase tracking-wider text-brand underline underline-offset-4">
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs text-muted-foreground">Home / {categoryLabel(category)}</nav>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{categoryLabel(category)}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {all.length} products available with nationwide delivery from our Kathmandu warehouse.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-40 lg:self-start">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex w-full items-center justify-between border border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider lg:hidden"
          >
            Filters <SlidersHorizontal className="h-4 w-4" />
          </button>
          <div className={`${showFilters ? "block" : "hidden"} mt-4 lg:mt-0 lg:block`}>{filters}</div>
        </aside>

        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-4">
            <p className="text-xs text-muted-foreground">Showing {results.length} products</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort products"
              className="border border-border bg-white px-3 py-2 text-xs"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="mt-6">
            {results.length ? (
              <ProductGrid products={results} />
            ) : (
              <p className="py-20 text-center text-sm text-muted-foreground">
                No products match these filters. Try widening your price range.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]">{title}</h2>
      {children}
    </div>
  );
}
