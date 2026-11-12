import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { selectCartCount, useCart, useWishlist } from "@/store/shop";
import { toFaDigits } from "@/lib/format";

function Count({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <span className="absolute -top-1 -end-1 grid min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold leading-[18px] text-ink">
      {toFaDigits(n)}
    </span>
  );
}

export function HeaderIcons({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const cartCount = useCart(selectCartCount);
  const wishCount = useWishlist((s) => s.slugs.length);
  const item = cn(
    "relative grid size-10 place-items-center rounded-full transition-colors",
    tone === "light" ? "text-foreground hover:text-gold-deep" : "text-ink-foreground hover:text-gold",
  );
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <Link to="/contact" className={item} aria-label="حساب کاربری و پشتیبانی">
        <User className="size-[22px]" strokeWidth={1.5} />
      </Link>
      <Link to="/wishlist" className={item} aria-label="علاقه‌مندی‌ها">
        <Heart className="size-[22px]" strokeWidth={1.5} />
        <Count n={wishCount} />
      </Link>
      <Link to="/cart" className={item} aria-label="سبد خرید">
        <ShoppingBag className="size-[22px]" strokeWidth={1.5} />
        <Count n={cartCount} />
      </Link>
    </div>
  );
}
