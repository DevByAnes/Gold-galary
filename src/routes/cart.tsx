import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/store/shop";
import { cartDetails } from "@/lib/product-price";
import { formatGrams, formatToman } from "@/lib/format";
import { PageHeader } from "@/components/site/PageHeader";
import { QuantityStepper } from "@/components/site/QuantityStepper";
import { RateNotice } from "@/components/site/RateNotice";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید | گالری طلای رضایی" },
      { name: "description", content: "مشاهده و ویرایش سبد خرید گالری طلای رضایی." },
      { property: "og:title", content: "سبد خرید | گالری طلای رضایی" },
      { property: "og:description", content: "سبد خرید گالری طلای رضایی" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const { rows, subtotal } = cartDetails(lines);

  return (
    <>
      <PageHeader title="سبد خرید" crumbs={[{ label: "سبد خرید" }]} />
      <div className="container-page py-6 md:py-10">
        {rows.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border border-border bg-card px-6 py-14 text-center">
            <ShoppingBag className="mx-auto size-12 text-gold" strokeWidth={1.2} />
            <p className="mt-4 text-[16px] font-semibold">سبد خرید شما خالی است</p>
            <p className="mt-1 text-sm text-muted-foreground">محصولات دلخواه خود را از فروشگاه انتخاب کنید.</p>
            <Button asChild variant="gold" size="xl" className="mt-6">
              <Link to="/products" search={{}}>مشاهده محصولات</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
            <ul className="divide-y divide-border rounded-xl border border-border bg-card">
              {rows.map((r) => (
                <li key={r.slug} className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                  <Link to="/products/$slug" params={{ slug: r.slug }} className="size-20 shrink-0 overflow-hidden rounded-lg bg-cream sm:size-24">
                    <img src={r.product.images[0]} alt={r.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link to="/products/$slug" params={{ slug: r.slug }} className="line-clamp-1 text-[14.5px] font-semibold hover:text-gold-deep">
                          {r.product.name}
                        </Link>
                        <p className="mt-0.5 text-[12px] text-muted-foreground">
                          ۱۸ عیار · {formatGrams(r.product.weightGrams)} گرم · قیمت واحد {formatToman(r.unit)}
                        </p>
                      </div>
                      <button type="button" onClick={() => remove(r.slug)} aria-label={`حذف ${r.product.name}`} className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-cream hover:text-destructive">
                        <Trash2 className="size-[18px]" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                      <QuantityStepper value={r.qty} onChange={(n) => setQty(r.slug, n)} label={`تعداد ${r.product.name}`} />
                      <span className="num text-[15px] font-bold text-gold-deep">{formatToman(r.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-6">
              <h2 className="text-[16px] font-semibold">خلاصه سفارش</h2>
              <div className="mt-4 flex justify-between text-[14px]">
                <span className="text-muted-foreground">جمع کالاها</span>
                <span className="num font-semibold">{formatToman(subtotal)}</span>
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground">هزینه ارسال در مرحله بعد محاسبه می‌شود.</p>
              <Button asChild variant="gold" size="xl" className="mt-5 w-full">
                <Link to="/checkout">ادامه و ثبت سفارش</Link>
              </Button>
              <RateNotice className="mt-4" />
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
