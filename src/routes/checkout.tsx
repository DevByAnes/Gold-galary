import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/store/shop";
import { cartDetails } from "@/lib/product-price";
import { sumToman } from "@/lib/pricing";
import { formatToman, toFaDigits } from "@/lib/format";
import { shippingMethods, site } from "@/lib/site-config";
import { checkoutSchema, type CheckoutData, type CheckoutInput } from "@/lib/checkout-schema";
import { PageHeader } from "@/components/site/PageHeader";
import { RateNotice } from "@/components/site/RateNotice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "تکمیل سفارش | گالری طلای رضایی" },
      { name: "description", content: "ثبت اطلاعات ارسال و مشاهده خلاصه سفارش." },
      { property: "og:title", content: "تکمیل سفارش | گالری طلای رضایی" },
      { property: "og:description", content: "تکمیل سفارش گالری طلای رضایی" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const inputCls =
  "h-11 w-full rounded-md border border-input bg-card px-3.5 text-[14px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold aria-[invalid=true]:border-destructive";

function Field({ label, error, children, className, htmlFor }: { label: string; error?: string; children: ReactNode; className?: string; htmlFor: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium">{label}</label>
      {children}
      {error && <p role="alert" className="mt-1 text-[12px] text-destructive">{error}</p>}
    </div>
  );
}

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const { rows, subtotal } = cartDetails(lines);
  const [submitted, setSubmitted] = useState<{ ref: string; data: CheckoutData } | null>(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CheckoutInput, unknown, CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shipping: "post", email: "", notes: "" },
  });
  const shippingId = watch("shipping");
  const shipping = shippingMethods.find((m) => m.id === shippingId) ?? shippingMethods[0];
  const total = sumToman([subtotal, shipping.cost]);

  const onSubmit = (data: CheckoutData) => {
    const ref = `RG-${Date.now().toString().slice(-6)}`;
    setSubmitted({ ref, data });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (rows.length === 0 && !submitted) {
    return (
      <>
        <PageHeader title="تکمیل سفارش" crumbs={[{ label: "سبد خرید", to: "/cart" }, { label: "تکمیل سفارش" }]} />
        <div className="container-page py-14 text-center">
          <p className="text-[16px] font-semibold">سبد خرید شما خالی است</p>
          <Button asChild variant="gold" size="xl" className="mt-6">
            <Link to="/products" search={{}}>مشاهده محصولات</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="تکمیل سفارش" crumbs={[{ label: "سبد خرید", to: "/cart" }, { label: "تکمیل سفارش" }]} />
      <div className="container-page py-6 md:py-10">
        {submitted ? (
          <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-6 text-center md:p-8">
            <CheckCircle2 className="mx-auto size-12 text-gold" strokeWidth={1.3} />
            <h2 className="mt-4 text-[18px] font-bold">پیش‌فاکتور شما آماده شد</h2>
            <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
              شماره پیگیری: <span dir="ltr" className="font-latin text-[16px] text-foreground">{submitted.ref}</span>
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-md border border-gold/40 bg-gold/10 p-3 text-start text-[13px] leading-6">
              <AlertTriangle className="mt-1 size-4 shrink-0 text-gold-deep" />
              <p>
                پرداخت آنلاین هنوز فعال نشده و هیچ مبلغی دریافت نشده است. این اطلاعات فقط در مرورگر شما نمایش داده می‌شود و برای گالری ارسال نشده است. برای نهایی کردن خرید با شماره <a href={site.phoneHref} dir="ltr" className="font-semibold">{site.phone}</a> تماس بگیرید.
              </p>
            </div>
            <dl className="mt-5 space-y-2 text-start text-[13.5px]">
              <div className="flex justify-between"><dt className="text-muted-foreground">گیرنده</dt><dd>{submitted.data.fullName}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">موبایل</dt><dd dir="ltr">{toFaDigits(submitted.data.mobile)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">روش ارسال</dt><dd>{shipping.label}</dd></div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold"><dt>مبلغ پیش‌فاکتور</dt><dd className="num text-gold-deep">{formatToman(total)}</dd></div>
            </dl>
            <Button asChild variant="ink" size="xl" className="mt-6">
              <Link to="/contact">تماس با گالری</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
            <div className="space-y-6">
              <section className="rounded-xl border border-border bg-card p-5 md:p-6">
                <h2 className="mb-4 text-[16px] font-semibold">اطلاعات خریدار</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="نام و نام خانوادگی" htmlFor="fullName" error={errors.fullName?.message}>
                    <input id="fullName" autoComplete="name" className={inputCls} aria-invalid={!!errors.fullName} {...register("fullName")} />
                  </Field>
                  <Field label="شماره موبایل" htmlFor="mobile" error={errors.mobile?.message}>
                    <input id="mobile" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="09xxxxxxxxx" className={cn(inputCls, "text-right")} aria-invalid={!!errors.mobile} {...register("mobile")} />
                  </Field>
                  <Field label="ایمیل (اختیاری)" htmlFor="email" error={errors.email?.message} className="sm:col-span-2">
                    <input id="email" type="email" autoComplete="email" dir="ltr" className={cn(inputCls, "text-right")} aria-invalid={!!errors.email} {...register("email")} />
                  </Field>
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card p-5 md:p-6">
                <h2 className="mb-4 text-[16px] font-semibold">نشانی ارسال</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="استان" htmlFor="province" error={errors.province?.message}>
                    <input id="province" autoComplete="address-level1" className={inputCls} aria-invalid={!!errors.province} {...register("province")} />
                  </Field>
                  <Field label="شهر" htmlFor="city" error={errors.city?.message}>
                    <input id="city" autoComplete="address-level2" className={inputCls} aria-invalid={!!errors.city} {...register("city")} />
                  </Field>
                  <Field label="نشانی کامل" htmlFor="address" error={errors.address?.message} className="sm:col-span-2">
                    <textarea id="address" rows={3} autoComplete="street-address" className={cn(inputCls, "h-auto py-3")} aria-invalid={!!errors.address} {...register("address")} />
                  </Field>
                  <Field label="کد پستی" htmlFor="postalCode" error={errors.postalCode?.message}>
                    <input id="postalCode" inputMode="numeric" autoComplete="postal-code" dir="ltr" className={cn(inputCls, "text-right")} aria-invalid={!!errors.postalCode} {...register("postalCode")} />
                  </Field>
                  <Field label="توضیحات (اختیاری)" htmlFor="notes" error={errors.notes?.message}>
                    <input id="notes" className={inputCls} {...register("notes")} />
                  </Field>
                </div>
              </section>

              <section className="rounded-xl border border-border bg-card p-5 md:p-6">
                <h2 className="mb-4 text-[16px] font-semibold">روش ارسال</h2>
                <div className="grid gap-3" role="radiogroup">
                  {shippingMethods.map((m) => (
                    <label
                      key={m.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 transition-colors",
                        shippingId === m.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/50",
                      )}
                    >
                      <input type="radio" value={m.id} className="size-4 accent-gold" {...register("shipping")} />
                      <span className="flex-1">
                        <span className="block text-[14px] font-medium">{m.label}</span>
                        <span className="text-[12.5px] text-muted-foreground">{m.eta}</span>
                      </span>
                      <span className="num text-[13.5px] font-semibold">{m.cost === 0 ? "رایگان" : formatToman(m.cost)}</span>
                    </label>
                  ))}
                </div>
                {errors.shipping && <p className="mt-2 text-[12px] text-destructive">{errors.shipping.message}</p>}
              </section>
            </div>

            <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-6">
              <h2 className="text-[16px] font-semibold">خلاصه سفارش</h2>
              <ul className="mt-4 space-y-3">
                {rows.map((r) => (
                  <li key={r.slug} className="flex items-center gap-3">
                    <img src={r.product.images[0]} alt="" className="size-14 rounded-md bg-cream object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-[13.5px] font-medium">{r.product.name}</p>
                      <p className="text-[12px] text-muted-foreground">{toFaDigits(r.qty)} عدد</p>
                    </div>
                    <span className="num text-[13px] font-semibold">{formatToman(r.lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-border pt-4 text-[13.5px]">
                <div className="flex justify-between"><dt className="text-muted-foreground">جمع کالاها</dt><dd className="num">{formatToman(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">هزینه ارسال</dt><dd className="num">{shipping.cost === 0 ? "رایگان" : formatToman(shipping.cost)}</dd></div>
                <div className="flex justify-between border-t border-border pt-3 text-[15px] font-bold"><dt>مبلغ کل</dt><dd className="num text-gold-deep">{formatToman(total)}</dd></div>
              </dl>
              <div className="mt-4 flex items-start gap-2 rounded-md bg-cream p-3 text-[12.5px] leading-6 text-muted-foreground">
                <AlertTriangle className="mt-1 size-4 shrink-0 text-gold-deep" />
                درگاه پرداخت هنوز متصل نشده است؛ با ثبت این فرم فقط پیش‌فاکتور نمایش داده می‌شود و پرداختی انجام نمی‌شود.
              </div>
              <Button type="submit" variant="gold" size="xl" disabled={isSubmitting} className="mt-4 w-full">
                ثبت پیش‌فاکتور
              </Button>
              <RateNotice className="mt-4" />
            </aside>
          </form>
        )}
      </div>
    </>
  );
}
