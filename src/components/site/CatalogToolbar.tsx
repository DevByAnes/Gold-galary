import { sortOptions, type SortKey } from "@/lib/catalog-query";
import { toFaDigits } from "@/lib/format";

export function CatalogToolbar({ count, sort, onSort }: { count: number; sort: SortKey; onSort: (s: SortKey) => void }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <p className="text-[13px] text-muted-foreground">{toFaDigits(count)} محصول</p>
      <label className="flex items-center gap-2 text-[13px] text-muted-foreground">
        مرتب‌سازی:
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          className="h-10 rounded-md border border-input bg-card px-3 text-[13px] text-foreground outline-none focus:border-gold"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
