import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/site/HeroSlider";
import { ServiceStrip } from "@/components/site/ServiceStrip";
import { CategoryCards } from "@/components/site/CategoryCards";
import { SectionHeading, ViewAllLink } from "@/components/site/SectionHeading";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { RateNotice } from "@/components/site/RateNotice";
import { bestsellers } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "گالری طلای رضایی | خرید آنلاین طلا و جواهر" },
      { name: "description", content: "گالری طلای رضایی؛ گردنبند، دستبند، گوشواره، انگشتر و نیم‌ست طلای ۱۸ عیار با قیمت‌گذاری شفاف." },
      { property: "og:title", content: "گالری طلای رضایی | خرید آنلاین طلا و جواهر" },
      { property: "og:description", content: "مجموعه‌ای از زیباترین جواهرات طلا با طراحی مدرن و کیفیت اصیل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <h1 className="sr-only">گالری طلای رضایی — فروشگاه آنلاین طلا و جواهر</h1>
      <HeroSlider />
      <ServiceStrip />
      <CategoryCards />

      <section aria-labelledby="best-title" className="container-page mt-10 md:mt-14">
        <div id="best-title">
          <SectionHeading title="پرفروش‌ترین محصولات" subtitle="انتخاب محبوب مشتریان گالری" action={<ViewAllLink />} />
        </div>
        <ProductCarousel products={bestsellers} label="پرفروش‌ترین محصولات" />
        <RateNotice className="mt-6" />
      </section>

    </>
  );
}
