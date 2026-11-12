import type { CategorySlug, Product } from "@/data/catalog";
import { priceOf } from "./product-price";

export type SortKey = "featured" | "price-asc" | "price-desc" | "weight-asc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "پیشنهاد گالری" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "weight-asc", label: "سبک‌ترین" },
];

export function isSortKey(v: unknown): v is SortKey {
  return typeof v === "string" && sortOptions.some((o) => o.value === v);
}

/** Normalise Persian/Arabic letter variants so searches like "انگشتر" match regardless of keyboard. */
function norm(s: string) {
  return s.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, " ").trim().toLowerCase();
}

export function filterProducts(list: Product[], opts: { q?: string; category?: CategorySlug; sort?: SortKey }) {
  let out = list;
  if (opts.category) out = out.filter((p) => p.category === opts.category);
  if (opts.q) {
    const q = norm(opts.q);
    out = out.filter((p) => norm(`${p.name} ${p.summary} ${p.code}`).includes(q));
  }
  const sort = opts.sort ?? "featured";
  if (sort !== "featured") {
    out = [...out].sort((a, b) => {
      if (sort === "weight-asc") return Number(a.weightGrams) - Number(b.weightGrams);
      const d = priceOf(a).total - priceOf(b).total;
      return sort === "price-asc" ? d : -d;
    });
  }
  return out;
}
