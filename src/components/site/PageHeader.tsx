import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  to?: "/products" | "/cart";
  categorySlug?: string;
}

export function PageHeader({ title, crumbs, intro, showTitle = true }: { title: string; crumbs: Crumb[]; intro?: string; showTitle?: boolean }) {
  return (
    <div className="border-b border-border bg-cream">
      <div className={showTitle ? "container-page py-6 md:py-9" : "container-page py-3.5 md:py-4"}>
        <nav aria-label="مسیر صفحه">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">صفحه اصلی</Link></li>
            {crumbs.map((c) => (
              <Fragment key={c.label}>
                <li aria-hidden><ChevronLeft className="size-3.5" /></li>
                <li>
                  {c.categorySlug ? (
                    <Link to="/categories/$slug" params={{ slug: c.categorySlug }} className="hover:text-foreground">{c.label}</Link>
                  ) : c.to ? (
                    <Link to={c.to} className="hover:text-foreground">{c.label}</Link>
                  ) : (
                    <span aria-current="page" className="text-foreground">{c.label}</span>
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
        {showTitle && <h1 className="mt-3 text-[22px] font-bold text-foreground md:text-[30px]">{title}</h1>}
        {showTitle && intro && <p className="mt-2 max-w-2xl text-[13.5px] leading-7 text-muted-foreground md:text-[15px]">{intro}</p>}
      </div>
    </div>
  );
}
