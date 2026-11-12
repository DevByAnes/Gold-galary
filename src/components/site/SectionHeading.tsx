import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 md:mb-7">
      <div>
        <h2 className="flex items-center gap-3 text-[19px] font-bold text-foreground md:text-[24px]">
          <span aria-hidden className="h-6 w-1 rounded-full bg-gold md:h-7" />
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 ps-4 text-[13px] text-muted-foreground md:text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function ViewAllLink({ children = "مشاهده همه" }: { children?: ReactNode }) {
  return (
    <Link
      to="/products"
      search={{}}
      className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-gold-deep transition-colors hover:text-foreground md:text-sm"
    >
      {children}
      <ChevronLeft className="size-4" />
    </Link>
  );
}
