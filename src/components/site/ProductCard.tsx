import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/catalog";
import { priceOf } from "@/lib/product-price";
import { formatNumberFa } from "@/lib/format";
import { useWishlist } from "@/store/shop";
import { cn } from "@/lib/utils";

export function WishlistButton({ slug, name, className, showLabel = false }: { slug: string; name: string; className?: string; showLabel?: boolean }) {
  const active = useWishlist((s) => s.slugs.includes(slug));
  const toggle = useWishlist((s) => s.toggle);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `حذف ${name} از علاقه‌مندی‌ها` : `افزودن ${name} به علاقه‌مندی‌ها`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        toast(active ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد", { description: name });
      }}
      className={cn(
        showLabel ? "inline-flex items-center justify-center gap-2" : "grid size-9 place-items-center rounded-full",
        "bg-card/90 transition-colors hover:text-gold-deep",
        active ? "text-gold-deep" : "text-foreground/70",
        className,
      )}
    >
      <Heart className="size-[18px]" strokeWidth={1.6} fill={active ? "currentColor" : "none"} />
      {showLabel && <span>{active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}</span>}
    </button>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const price = priceOf(product);
  return (
    <article className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-card">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {product.isNew && (
            <span className="absolute top-3 start-3 rounded-sm bg-ink px-2 py-0.5 text-[11px] font-medium text-ink-foreground">
              جدید
            </span>
          )}
        </div>
        <div className="px-3 pb-4 pt-3 text-center md:px-4">
          <h3 className="line-clamp-1 text-[13.5px] font-semibold text-foreground md:text-[15px]">{product.name}</h3>
          <p className="mt-2 text-[13.5px] font-bold text-gold-deep md:text-[15px]">
            {price.available ? (
              <>
                <span className="num">{formatNumberFa(price.total)}</span>{" "}
                <span className="text-[11px] font-medium text-muted-foreground md:text-xs">تومان</span>
              </>
            ) : (
              <span className="text-xs font-medium text-muted-foreground">استعلام قیمت</span>
            )}
          </p>
        </div>
      </Link>
      <WishlistButton slug={product.slug} name={product.name} className="absolute top-2.5 end-2.5" />
    </article>
  );
}
