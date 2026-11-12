import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { categories, products, type CategorySlug } from "@/data/catalog";
import { filterProducts, isSortKey, type SortKey } from "@/lib/catalog-query";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductGrid } from "@/components/site/ProductGrid";
import { CatalogToolbar } from "@/components/site/CatalogToolbar";
import { RateNotice } from "@/components/site/RateNotice";
import { cn } from "@/lib/utils";

interface ProductsSearch {
  q?: string;
  sort?: SortKey;
  category?: CategorySlug;
}

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): ProductsSearch => ({
    q: typeof s.q === "string" && s.q.trim() ? s.q.trim().slice(0, 80) : undefined,
    sort: isSortKey(s.sort) ? s.sort : undefined,
    category: categories.some((c) => c.slug === s.category) ? (s.category as CategorySlug) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "همه محصولات | گالری طلای رضایی" },
      { name: "description", content: "فهرست کامل گردنبند، دستبند، گوشواره، انگشتر و نیم‌ست طلای ۱۸ عیار گالری طلای رضایی." },
      { property: "og:title", content: "همه محصولات | گالری طلای رضایی" },
      { property: "og:description", content: "زیورآلات طلای ۱۸ عیار با قیمت‌گذاری شفاف." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const chip = "shrink-0 rounded-full border px-4 py-2 text-[13px] transition-colors";

function ProductsPage() {
  const { q, sort = "featured", category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = filterProducts(products, { q, sort, category });

  return (
    <>
      <PageHeader title={q ? `نتایج جستجو: «${q}»` : "همه محصولات"} crumbs={[{ label: "محصولات" }]} />
      <div className="container-page py-6 md:py-10">
        <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          <Link
            to="/products"
            search={(prev) => ({ ...prev, category: undefined })}
            className={cn(chip, !category ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card text-foreground hover:border-gold")}
          >
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products"
              search={(prev) => ({ ...prev, category: c.slug })}
              className={cn(chip, category === c.slug ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card text-foreground hover:border-gold")}
            >
              {c.title}
            </Link>
          ))}
          {q && (
            <Link to="/products" search={(prev) => ({ ...prev, q: undefined })} className={cn(chip, "flex items-center gap-1.5 border-gold/60 bg-gold/10 text-foreground")}>
              «{q}» <X className="size-3.5" />
              <span className="sr-only">حذف جستجو</span>
            </Link>
          )}
        </div>

        <CatalogToolbar count={list.length} sort={sort} onSort={(s) => navigate({ search: (prev) => ({ ...prev, sort: s === "featured" ? undefined : s }) })} />

        {list.length > 0 ? (
          <ProductGrid products={list} />
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <p className="text-[15px] font-semibold">محصولی پیدا نشد</p>
            <p className="mt-1 text-sm text-muted-foreground">عبارت دیگری را جستجو کنید یا فیلترها را بردارید.</p>
            <Link to="/products" search={{}} className="mt-4 inline-block text-sm font-medium text-gold-deep hover:underline">نمایش همه محصولات</Link>
          </div>
        )}
        <RateNotice className="mt-8" />
      </div>
    </>
  );
}
