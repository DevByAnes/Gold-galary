import { Link } from "@tanstack/react-router";
import { Headset, Menu, Phone, Truck } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { nav, site } from "@/lib/site-config";
import { categories } from "@/data/catalog";
import { formatNumberFa } from "@/lib/format";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { HeaderIcons } from "./HeaderIcons";

function AnnouncementBar() {
  return (
    <div className="hidden bg-ink text-ink-muted md:block">
      <div className="container-page flex h-10 items-center justify-between text-[12.5px]">
        <p className="flex items-center gap-2">
          <Truck className="size-4 text-gold" strokeWidth={1.5} />
          <span>
            ارسال رایگان برای خریدهای بالای {formatNumberFa(site.freeShippingThreshold / 1_000_000)} میلیون تومان
          </span>
        </p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Headset className="size-4 text-gold" strokeWidth={1.5} />
            پشتیبانی: {site.hours}
          </span>
          <a href={site.phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold">
            <Phone className="size-4 text-gold" strokeWidth={1.5} />
            <span dir="ltr" className="num">{site.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const navLink =
  "relative py-2 text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100 data-[status=active]:text-foreground data-[status=active]:after:scale-x-100";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-40">
      <AnnouncementBar />

      {/* Desktop main navigation */}
      <div className="hidden border-b border-border bg-card lg:block">
        <div className="container-page flex h-[84px] items-center gap-10">
          <Logo />
          <nav aria-label="منوی اصلی" className="flex items-center gap-8">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={navLink} activeOptions={{ exact: n.to === "/" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-4">
            <SearchBox className="w-[260px] xl:w-[300px]" />
            <HeaderIcons />
          </div>
        </div>
      </div>

      {/* Tablet + mobile header */}
      <div className="bg-ink lg:hidden">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="باز کردن منو"
              className="grid size-11 place-items-center rounded-full text-ink-foreground transition-colors hover:text-gold"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
          <Logo tone="light" compact />
          <div className="flex flex-1 justify-end">
            <HeaderIcons tone="dark" className="-me-2" />
          </div>
        </div>
        <div className="container-page pb-3">
          <SearchBox tone="dark" />
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[86%] max-w-sm border-ink-line bg-ink p-0 text-ink-foreground">
          <SheetTitle className="sr-only">منو</SheetTitle>
          <div className="border-b border-ink-line px-5 py-5">
            <Logo tone="light" compact />
          </div>
          <nav aria-label="منوی موبایل" className="flex flex-col px-3 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-md px-3 py-3.5 text-[15px] font-medium text-ink-foreground transition-colors hover:bg-ink-soft data-[status=active]:text-gold"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mx-5 border-t border-ink-line pt-4">
            <p className="mb-2 text-xs text-ink-muted">دسته‌بندی‌ها</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-ink-line px-3.5 py-2 text-[13px] text-ink-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
          <a href={site.phoneHref} className="mx-5 mt-6 flex items-center gap-2 text-sm text-ink-muted">
            <Phone className="size-4 text-gold" strokeWidth={1.5} />
            <span dir="ltr">{site.phone}</span>
          </a>
        </SheetContent>
      </Sheet>
    </header>
  );
}
