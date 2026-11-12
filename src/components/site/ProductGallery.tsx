import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState, type MouseEvent, type TouchEvent } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const go = (direction: -1 | 1) => setIndex((current) => (current + direction + images.length) % images.length);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const onTouchEnd = (event: TouchEvent<HTMLButtonElement>) => {
    if (touchStart === null) return;
    const delta = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 35 && images.length > 1) go(delta > 0 ? -1 : 1);
    setTouchStart(null);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="بزرگ‌نمایی تصویر"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        className="group relative aspect-[1.08/1] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-cream md:aspect-[1.34/1]"
      >
        <img
          src={images[index]}
          alt={`${name} — تصویر ${toFaDigits(index + 1)}`}
          style={{ transformOrigin: origin }}
          className={cn("h-full w-full object-cover transition-transform duration-200", hover && "md:scale-[1.45]")}
        />
        <span className="absolute bottom-4 end-4 grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card">
          <ZoomIn className="size-[18px]" strokeWidth={1.6} />
        </span>
      </button>
      {images.length > 1 && <>
        <button type="button" aria-label="تصویر قبل" onClick={() => go(-1)} className="absolute start-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-foreground shadow-card"><ChevronRight className="size-4" /></button>
        <button type="button" aria-label="تصویر بعد" onClick={() => go(1)} className="absolute end-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-foreground shadow-card"><ChevronLeft className="size-4" /></button>
      </>}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2" aria-label="تصاویر محصول">
        {images.map((src, i) => <button key={src} type="button" onClick={() => setIndex(i)} aria-label={`نمایش تصویر ${toFaDigits(i + 1)}`} aria-current={i === index} className={cn("size-2 rounded-full bg-card/90 transition-transform", i === index && "scale-125 bg-gold")} />)}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(92vw,820px)] border-none bg-card p-2">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <img src={images[index]} alt={name} className="max-h-[82vh] w-full rounded-lg object-contain" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
