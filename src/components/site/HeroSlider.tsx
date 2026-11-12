import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { heroSlides } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section aria-roledescription="carousel" aria-label="مجموعه‌های ویژه" className="container-page pt-4 md:pt-6">
      <div className="relative overflow-hidden rounded-xl bg-ink md:rounded-2xl">
        <Swiper
          modules={[Autoplay, EffectFade, A11y, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={900}
          loop
          keyboard={{ enabled: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="h-[460px] sm:h-[480px] md:h-[440px] lg:h-[500px]"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={slide.id} className="bg-ink">
              <div className="relative h-full w-full">
                {/* Photo: left half on desktop (RTL text sits right), top on mobile */}
                <div className="absolute inset-y-0 start-auto end-0 w-full md:w-[62%]">
                  <img
                    src={slide.image}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    style={{ objectPosition: slide.focus }}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 hidden bg-hero-fade md:block" />
                <div className="absolute inset-0 bg-hero-fade-mobile md:hidden" />

                <div className="relative flex h-full items-end pb-16 md:items-center md:pb-0">
                  <div className="w-full px-6 text-center md:w-[48%] md:px-0 md:ps-14 md:text-start lg:ps-20">
                    <p className="mb-3 font-latin text-[13px] uppercase tracking-[0.3em] text-gold md:mb-4">
                      Rezaei Gold Gallery
                    </p>
                    <h2 className="text-[26px] font-bold leading-[1.45] text-ink-foreground sm:text-[30px] md:text-[34px] lg:text-[42px]">
                      {slide.title}
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-ink-muted md:mx-0 md:mt-4 md:text-[16px] md:leading-8">
                      {slide.text}
                    </p>
                    <Button asChild variant="gold" size="xl" className="mt-6 md:mt-8">
                      {slide.to === "/products" ? (
                        <Link to="/products" search={{}}>{slide.cta}</Link>
                      ) : (
                        <Link to="/categories/$slug" params={{ slug: slide.slug! }}>
                          {slide.cta}
                        </Link>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows */}
        <button
          type="button"
          aria-label="اسلاید قبلی"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute end-auto start-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-ink-foreground/25 text-ink-foreground transition-colors hover:border-gold hover:text-gold md:grid lg:start-5"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="اسلاید بعدی"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute end-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-ink-foreground/25 text-ink-foreground transition-colors hover:border-gold hover:text-gold md:grid lg:end-5"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>

        {/* Pagination */}
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2 md:bottom-6">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`رفتن به اسلاید ${i + 1}`}
              aria-current={active === i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                active === i ? "w-6 bg-gold" : "w-2 bg-ink-foreground/40 hover:bg-ink-foreground/70",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
