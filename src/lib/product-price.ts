import type { Product } from "@/data/catalog";
import { getProduct } from "@/data/catalog";
import { calculatePrice, multiplyToman, sumToman } from "./pricing";
import { pricingConfig } from "./site-config";
import type { CartLine } from "@/store/shop";

export function priceOf(product: Product) {
  return calculatePrice(
    { weightGrams: product.weightGrams, purity: product.purity, makingCharge: product.makingCharge },
    pricingConfig,
  );
}

export function cartDetails(lines: CartLine[]) {
  const rows = lines.flatMap((l) => {
    const product = getProduct(l.slug);
    if (!product) return [];
    const price = priceOf(product);
    return [{ ...l, product, unit: price.total, lineTotal: multiplyToman(price.total, l.qty), available: price.available }];
  });
  return { rows, subtotal: sumToman(rows.map((r) => r.lineTotal)) };
}
