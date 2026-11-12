import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";
import { SectionHeading } from "./SectionHeading";

export function CategoryCards() {
  return (
    <section aria-labelledby="cat-title" className="container-page mt-10 md:mt-14">
      <div id="cat-title">
        <SectionHeading title="دسته‌بندی محصولات" subtitle="انتخاب بر اساس نوع زیورآلات" />
      </div>
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0">
        {categories.map((c) => (
          <li key={c.slug} className="w-[38%] shrink-0 snap-start sm:w-[28%] md:w-auto">
            <Link
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group block overflow-hidden rounded-xl bg-sand transition-colors hover:bg-secondary/80"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <p className="py-3 text-center text-[13.5px] font-semibold text-foreground md:py-4 md:text-[15px]">
                {c.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
