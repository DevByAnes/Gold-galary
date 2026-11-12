import { Info } from "lucide-react";
import { pricingConfig } from "@/lib/site-config";
import { formatToman } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Always-visible disclosure of the price basis. Never implies live market data unless status is "live". */
export function RateNotice({ className }: { className?: string }) {
  const { rateStatus } = pricingConfig;
  return (
    <div className={cn("flex items-start gap-2 rounded-md border border-gold/40 bg-gold/10 px-3 py-2.5 text-[12.5px] leading-6 text-foreground", className)}>
      <Info className="mt-1 size-4 shrink-0 text-gold-deep" strokeWidth={1.6} />
      {rateStatus === "live" ? (
        <p>قیمت‌ها بر اساس نرخ لحظه‌ای طلا محاسبه شده‌اند.</p>
      ) : rateStatus === "demo" ? (
        <p>
          قیمت‌ها <strong>نمایشی</strong> و بر اساس {pricingConfig.rateLabel} ({formatToman(pricingConfig.goldRatePerGram)} برای هر گرم) محاسبه شده‌اند و نرخ روز بازار نیستند. قیمت نهایی هنگام خرید استعلام می‌شود.
        </p>
      ) : (
        <p>نرخ طلا در حال حاضر در دسترس نیست. برای استعلام قیمت با گالری تماس بگیرید.</p>
      )}
    </div>
  );
}
