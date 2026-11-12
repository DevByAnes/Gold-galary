import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, productsByCategory } from "@/data/catalog";
import { filterProducts, isSortKey, type SortKey } from "@/lib/catalog-query";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductGrid } from "@/components/site/ProductGrid";
import { CatalogToolbar } from "@/components/site/CatalogToolbar";
import { RateNotice } from "@/components/site/RateNotice";

export const Route = createFileRoute("/categories/$slug")({
  validateSearch: (s: Record<string, unknown>): { sort?: SortKey } => ({ sort: isSortKey(s.sort) ? s.sort : undefined }),
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.category.title} | گالری طلای رضایی` : "دسته‌بندی | گالری طلای رضایی";
    const description = loaderData?.category.description ?? "دسته‌بندی محصولات گالری طلای رضایی";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { sort = "featured" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = filterProducts(productsByCategory(category.slug), { sort });
  return (
    <>
      <PageHeader title={category.title} intro={category.description} crumbs={[{ label: "محصولات", to: "/products" }, { label: category.title }]} />
      <div className="container-page py-6 md:py-10">
        <CatalogToolbar count={list.length} sort={sort} onSort={(s) => navigate({ search: { sort: s === "featured" ? undefined : s } })} />
        <ProductGrid products={list} />
        <RateNotice className="mt-8" />
      </div>
    </>
  );
}
