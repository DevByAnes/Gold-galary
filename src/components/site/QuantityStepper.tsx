import { Minus, Plus } from "lucide-react";
import { toFaDigits } from "@/lib/format";
import { MAX_QTY } from "@/store/shop";

export function QuantityStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex h-11 items-center rounded-md border border-input bg-card" role="group" aria-label={label}>
      <button type="button" aria-label="افزایش تعداد" disabled={value >= MAX_QTY} onClick={() => onChange(value + 1)} className="grid h-full w-10 place-items-center text-foreground hover:text-gold-deep disabled:opacity-40">
        <Plus className="size-4" />
      </button>
      <span className="num w-8 text-center text-[15px] font-semibold" aria-live="polite">{toFaDigits(value)}</span>
      <button type="button" aria-label="کاهش تعداد" disabled={value <= 1} onClick={() => onChange(value - 1)} className="grid h-full w-10 place-items-center text-foreground hover:text-gold-deep disabled:opacity-40">
        <Minus className="size-4" />
      </button>
    </div>
  );
}
