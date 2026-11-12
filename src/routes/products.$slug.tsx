import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Info, RotateCcw, ShieldCheck, ShoppingBag, Store, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getCategory, getProduct, productsByCategory } from "@/data/catalog";
import { priceOf } from "@/lib/product-price";
import { formatGrams, formatToman } from "@/lib/format";
import { useCart } from "@/store/shop";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductGallery } from "@/components/site/ProductGallery";
import { PriceBreakdownCard } from "@/components/site/PriceBreakdownCard";
import { QuantityStepper } from "@/components/site/QuantityStepper";
import { WishlistButton } from "@/components/site/ProductCard";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { shippingMethods } from "@/lib/site-config";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return { meta: [{ title: p ? `${p.name} | گالری طلای رضایی` : "محصول | گالری طلای رضایی" }, { name: "description", content: p ? `${p.summary} طلای ۱۸ عیار، وزن ${formatGrams(p.weightGrams)} گرم.` : "جزئیات محصول" }] };
  },
  component: ProductPage,
});

function ProductTabs({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  return (
    <Tabs defaultValue="desc" dir="rtl" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-4 gap-0 rounded-none border-b border-border bg-transparent p-0">
        {[["desc", "توضیحات"], ["specs", "مشخصات فنی"], ["shipping", "نحوه ارسال"], ["returns", "شرایط بازگشت"]].map(([value, label]) => (
          <TabsTrigger key={value} value={value} className="min-w-0 rounded-none border-b-2 border-transparent px-1 py-3 text-[12px] text-muted-foreground data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none sm:text-[13px]">{label}</TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="desc" className="pt-5 text-[13.5px] leading-7 text-foreground/85">{product.description}</TabsContent>
      <TabsContent value="specs" className="pt-4">
        <dl className="divide-y divide-border rounded-lg border border-border bg-card text-[13px]">
          {[...product.specs, { label: "وزن", value: `${formatGrams(product.weightGrams)} گرم` }].map((spec) => <div key={spec.label} className="flex justify-between gap-3 px-3 py-2.5"><dt className="text-muted-foreground">{spec.label}</dt><dd className="font-medium">{spec.value}</dd></div>)}
        </dl>
      </TabsContent>
      <TabsContent value="shipping" className="space-y-2 pt-4">
        {shippingMethods.map((method) => <div key={method.id} className="rounded-lg border border-border bg-card px-3 py-2.5 text-[12.5px]"><span>{method.label}</span><span className="mr-1 text-muted-foreground">— {method.eta}</span></div>)}
      </TabsContent>
      <TabsContent value="returns" className="pt-4 text-[13px] leading-7 text-muted-foreground">امکان بازگشت کالا مطابق شرایط فروشگاه و پس از بررسی اصالت و سلامت محصول فراهم است. پیش از ارسال، با گالری هماهنگ کنید.</TabsContent>
    </Tabs>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category)!;
  const price = priceOf(product);
  const add = useCart((state) => state.add);
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const related = productsByCategory(product.category).filter((item) => item.slug !== product.slug).slice(0, 3);
  const onAdd = () => {
    add(product.slug, qty);
    toast.success("به سبد خرید اضافه شد", { description: product.name, action: { label: "مشاهده سبد", onClick: () => void navigate({ to: "/cart" }) } });
  };

  return <>
    <PageHeader title={product.name} showTitle={false} crumbs={[{ label: "محصولات", to: "/products" }, { label: category.title, categorySlug: category.slug }, { label: product.name }]} />
    <main className="container-page py-5 md:py-7 lg:py-9">
      <div className="grid gap-6 lg:grid-cols-[minmax(230px,1fr)_minmax(0,1.9fr)_minmax(230px,1fr)] lg:gap-7">
        <aside className="order-1 lg:col-start-3 lg:row-start-1">
          <div className="mb-4 lg:hidden"><p className="text-xs text-muted-foreground">کد محصول: {product.code}</p><h1 className="mt-1 text-xl font-bold">{product.name}</h1></div>
          <div className="hidden lg:block"><ProductTabs product={product} /></div>
        </aside>

        <section className="order-2 lg:col-start-2 lg:row-start-1" aria-label="تصاویر محصول"><ProductGallery images={product.images} name={product.name} /></section>

        <aside className="order-3 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <h1 className="hidden text-[20px] font-bold lg:block">{product.name}</h1>
          <div className="mt-3 rounded-xl border border-gold/35 bg-[linear-gradient(135deg,#fffaf0,#f6ecdc)] p-4 lg:mt-4">
            <div className="flex items-start gap-2"><Info className="mt-0.5 size-4 shrink-0 text-gold-deep" /><div><h2 className="text-[14px] font-semibold">توضیحات</h2><p className="mt-1.5 text-[12.5px] leading-6 text-foreground/85">{product.summary}</p></div></div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3"><QuantityStepper value={qty} onChange={setQty} label="تعداد" /><span className="text-[12px] text-muted-foreground">تعداد</span></div>
          <Button variant="gold" size="lg" onClick={onAdd} disabled={!price.available} className="mt-3 h-12 w-full text-[14px]"><ShoppingBag className="!size-[18px]" />افزودن به سبد خرید</Button>
          <WishlistButton slug={product.slug} name={product.name} showLabel className="mt-2 h-11 w-full rounded-lg border border-border bg-card text-[13px]" />
          <div className="mt-3"><PriceBreakdownCard product={product} price={price} /></div>
          <ul className="mt-5 grid grid-cols-3 divide-x divide-x-reverse divide-border text-center text-[10.5px] leading-5 text-muted-foreground">
            <li className="px-2"><ShieldCheck className="mx-auto mb-1 size-6 text-gold" strokeWidth={1.35} />ضمانت اصالت کالا</li>
            <li className="px-2"><Truck className="mx-auto mb-1 size-6 text-gold" strokeWidth={1.35} />ارسال سریع و امن</li>
            <li className="px-2"><RotateCcw className="mx-auto mb-1 size-6 text-gold" strokeWidth={1.35} />۷ روز ضمانت بازگشت</li>
          </ul>
        </aside>

        <section className="order-4 lg:col-span-2 lg:col-start-2 lg:row-start-2" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-4 flex items-center gap-2 text-[18px] font-bold lg:mb-5"><span className="h-6 w-1 rounded-full bg-gold" />محصولات مرتبط</h2>
          {related.length > 0 ? <ProductCarousel products={related} label="محصولات مرتبط" /> : <p className="text-sm text-muted-foreground">محصول مرتبطی وجود ندارد.</p>}
        </section>
      </div>
      <section className="mt-8 lg:hidden"><ProductTabs product={product} /></section>
    </main>
  </>;
}
