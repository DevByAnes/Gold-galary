import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/shop";
import { getProduct, type Product } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "علاقه‌مندی‌ها | گالری طلای رضایی" },
      { name: "description", content: "محصولات ذخیره‌شده شما در گالری طلای رضایی." },
      { property: "og:title", content: "علاقه‌مندی‌ها | گالری طلای رضایی" },
      { property: "og:description", content: "فهرست علاقه‌مندی‌های شما" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const slugs = useWishlist((s) => s.slugs);
  const items = slugs.map(getProduct).filter((p): p is Product => Boolean(p));
  return (
    <>
      <PageHeader title="علاقه‌مندی‌ها" crumbs={[{ label: "علاقه‌مندی‌ها" }]} />
      <div className="container-page py-6 md:py-10">
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border border-border bg-card px-6 py-14 text-center">
            <Heart className="mx-auto size-12 text-gold" strokeWidth={1.2} />
            <p className="mt-4 text-[16px] font-semibold">هنوز محصولی ذخیره نکرده‌اید</p>
            <p className="mt-1 text-sm text-muted-foreground">با زدن قلب روی هر محصول، آن را اینجا نگه دارید.</p>
            <Button asChild variant="gold" size="xl" className="mt-6">
              <Link to="/products" search={{}}>مشاهده محصولات</Link>
            </Button>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </>
  );
}
