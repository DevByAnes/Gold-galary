import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";

interface LogoProps {
  tone?: "dark" | "light";
  compact?: boolean;
  className?: string;
}

/** Typographic gallery mark: gold monogram ring + Persian wordmark + Latin subline. */
export function Logo({ tone = "dark", compact = false, className }: LogoProps) {
  return (
    <Link to="/" aria-label={site.nameFa} className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-full border border-gold font-latin font-semibold text-gold",
          compact ? "size-9 text-lg" : "size-11 text-[22px]",
        )}
      >
        R
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-bold tracking-tight",
            compact ? "text-[15px]" : "text-[19px]",
            tone === "dark" ? "text-foreground" : "text-ink-foreground",
          )}
        >
          {site.nameFa}
        </span>
        <span
          className={cn(
            "mt-1 font-latin uppercase text-gold",
            compact ? "text-[9px] tracking-[0.22em]" : "text-[10.5px] tracking-[0.26em]",
          )}
        >
          {site.nameEn}
        </span>
      </span>
    </Link>
  );
}
