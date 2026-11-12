import type { PriceBreakdown } from "@/lib/pricing";
import { pricingConfig } from "@/lib/site-config";
import { formatGrams, formatNumberFa, formatPercentBps, formatToman } from "@/lib/format";
import type { Product } from "@/data/catalog";

function Row({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]">
      <dt className="text-muted-foreground">
        {label}
        {hint && <span className="ms-1 text-[11.5px]">({hint})</span>}
      </dt>
      <dd className="num font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function PriceBreakdownCard({ product, price }: { product: Product; price: PriceBreakdown }) {
  const mc = product.makingCharge ?? pricingConfig.defaultMakingCharge;
  if (!price.available) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        نرخ طلا در دسترس نیست؛ برای استعلام قیمت این محصول با گالری تماس بگیرید.
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-1 text-[15px] font-semibold">جزئیات قیمت</h2>
      <dl className="divide-y divide-border">
        <Row label="وزن طلا" value={`${formatGrams(product.weightGrams)} گرم`} />
        <Row label="عیار" value={product.purity === 750 ? "۱۸ عیار" : formatNumberFa(product.purity)} />
        <Row label="نرخ هر گرم طلای ۱۸ عیار" hint={pricingConfig.rateStatus === "demo" ? "نمایشی" : undefined} value={formatToman(pricingConfig.goldRatePerGram)} />
        <Row label="ارزش طلا" value={formatToman(price.goldValue)} />
        <Row label="اجرت ساخت" hint={mc.type === "percent" ? formatPercentBps(mc.bps) : `${formatNumberFa(mc.toman)} تومان برای هر گرم`} value={formatToman(price.makingCharge)} />
        <Row label="سود فروشنده" hint={formatPercentBps(pricingConfig.sellerMarginBps)} value={formatToman(price.sellerMargin)} />
        {price.additionalCosts.map((c) => (
          <Row key={c.id} label={c.label} value={formatToman(c.toman)} />
        ))}
        {pricingConfig.tax.base !== "none" && (
          <Row
            label={pricingConfig.tax.label}
            hint={`${formatPercentBps(pricingConfig.tax.rateBps)} ${pricingConfig.tax.base === "makingAndMargin" ? "از اجرت و سود" : "از جمع کل"}`}
            value={formatToman(price.tax)}
          />
        )}
      </dl>
      <div className="mt-2 flex items-baseline justify-between border-t-2 border-gold/50 pt-3">
        <span className="text-[14px] font-semibold">مبلغ قابل پرداخت</span>
        <span className="num text-[18px] font-bold text-gold-deep">{formatToman(price.total)}</span>
      </div>
    </div>
  );
}
