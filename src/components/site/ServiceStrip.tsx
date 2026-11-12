import { BadgeCheck, CreditCard, RotateCcw, Truck, type LucideIcon } from "lucide-react";
import { serviceClaims } from "@/lib/site-config";

const icons: Record<string, LucideIcon> = { badge: BadgeCheck, truck: Truck, card: CreditCard, return: RotateCcw };

export function ServiceStrip() {
  const items = serviceClaims.filter((s) => s.enabled);
  if (items.length === 0) return null;
  return (
    <section aria-label="خدمات گالری" className="container-page mt-4 md:mt-6">
      <ul className="grid grid-cols-2 rounded-xl border border-border bg-card md:grid-cols-4">
        {items.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <li
              key={s.id}
              className={[
                "flex flex-col items-center gap-2 px-3 py-4 text-center sm:flex-row sm:gap-3.5 sm:text-start md:justify-center md:py-6",
                i % 2 === 0 ? "border-e border-border" : "",
                i < 2 ? "border-b border-border md:border-b-0" : "",
                i === 1 ? "md:border-e" : "",
              ].join(" ")}
            >
              <Icon className="size-8 shrink-0 text-gold md:size-9" strokeWidth={1.2} />
              <div>
                <p className="text-[13.5px] font-semibold text-foreground md:text-[15px]">{s.title}</p>
                <p className="mt-0.5 text-[11.5px] text-muted-foreground md:text-[12.5px]">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
