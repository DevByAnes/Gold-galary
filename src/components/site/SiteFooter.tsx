import { Link } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { categories } from "@/data/catalog";
import { nav, site } from "@/lib/site-config";
import { Logo } from "./Logo";

const heading = "mb-4 text-[15px] font-semibold text-ink-foreground";
const link = "text-[13.5px] text-ink-muted transition-colors hover:text-gold";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-ink text-ink-muted md:mt-20">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 md:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-12">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[13.5px] leading-7">
            گالری طلای رضایی؛ عرضه زیورآلات طلای ۱۸ عیار با طراحی ماندگار، شفافیت در قیمت‌گذاری و همراهی در انتخاب هدیه.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="اینستاگرام گالری" className="grid size-10 place-items-center rounded-full border border-ink-line text-ink-foreground transition-colors hover:border-gold hover:text-gold">
              <Instagram className="size-[18px]" strokeWidth={1.5} />
            </a>
            <a href={site.telegram} target="_blank" rel="noreferrer" aria-label="تلگرام گالری" className="grid size-10 place-items-center rounded-full border border-ink-line text-ink-foreground transition-colors hover:border-gold hover:text-gold">
              <Send className="size-[18px]" strokeWidth={1.5} />
            </a>
            <a href={site.phoneHref} aria-label="تماس تلفنی" className="grid size-10 place-items-center rounded-full border border-ink-line text-ink-foreground transition-colors hover:border-gold hover:text-gold">
              <Phone className="size-[18px]" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <h3 className={heading}>دسترسی سریع</h3>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={link}>{n.label}</Link>
              </li>
            ))}
            <li><Link to="/wishlist" className={link}>علاقه‌مندی‌ها</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={heading}>دسته‌بندی‌ها</h3>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/categories/$slug" params={{ slug: c.slug }} className={link}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={heading}>اطلاعات تماس</h3>
          <ul className="space-y-3.5 text-[13.5px]">
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />{site.address}</li>
            <li className="flex items-center gap-2.5"><Phone className="size-4 shrink-0 text-gold" strokeWidth={1.5} /><a href={site.phoneHref} dir="ltr" className="hover:text-gold">{site.phone}</a></li>
            <li className="flex items-center gap-2.5"><Mail className="size-4 shrink-0 text-gold" strokeWidth={1.5} /><a href={`mailto:${site.email}`} className="font-latin hover:text-gold">{site.email}</a></li>
            <li className="flex items-center gap-2.5"><Clock className="size-4 shrink-0 text-gold" strokeWidth={1.5} />{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-[12.5px] md:flex-row">
          <p>© ۱۴۰۵ {site.nameFa}. تمامی حقوق محفوظ است.</p>
          <p dir="ltr" className="font-latin text-[14px] tracking-wide text-ink-muted">
            Dev by{" "}
            <a href={site.developerCredit.href} target="_blank" rel="noreferrer" className="text-gold transition-colors hover:text-gold-soft">
              {site.developerCredit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
