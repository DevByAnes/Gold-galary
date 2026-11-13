import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import type { Product } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({ products, label }: { products: Product[]; label: string }) {
  const ref = useRef<SwiperType | null>(null);
  const arrow =
    "absolute top-[38%] z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:border-gold hover:text-gold-deep md:grid";
  return (
    <div className="relative min-w-0 overflow-hidden" aria-roledescription="carousel" aria-label={label}>
      <Swiper
        modules={[A11y, Keyboard]}
        onSwiper={(s) => (ref.current = s)}
        keyboard={{ enabled: true }}
        spaceBetween={12}
        slidesPerView={2.15}
        breakpoints={{
          480: { slidesPerView: 2.5, spaceBetween: 14 },
          768: { slidesPerView: 3.4, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="!w-full !overflow-hidden"
      >
        {products.map((p) => (
          <SwiperSlide key={p.slug} className="!h-auto">
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button type="button" aria-label="محصولات قبلی" onClick={() => ref.current?.slidePrev()} className={`${arrow} -start-4`}>
        <ChevronRight className="size-5" strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="محصولات بعدی" onClick={() => ref.current?.slideNext()} className={`${arrow} -end-4`}>
        <ChevronLeft className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
