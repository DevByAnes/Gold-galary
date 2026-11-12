import type { MakingCharge } from "@/lib/pricing";
import { img, productImages } from "./images";

export type CategorySlug = "necklace" | "bracelet" | "earring" | "ring" | "set";

export interface Category {
  slug: CategorySlug;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
}

export interface Product {
  slug: string;
  code: string;
  name: string;
  category: CategorySlug;
  weightGrams: string;
  purity: number;
  makingCharge?: MakingCharge;
  bestseller?: boolean;
  isNew?: boolean;
  summary: string;
  description: string;
  specs: { label: string; value: string }[];
  images: string[];
}

export const categories: Category[] = [
  { slug: "necklace", title: "گردنبند طلا", shortTitle: "گردنبند", description: "گردنبندها و پلاک‌های ظریف و روزمره تا طرح‌های خاص مجلسی.", image: img("heart-charm-necklace-1") },
  { slug: "bracelet", title: "دستبند طلا", shortTitle: "دستبند", description: "دستبندهای زنجیری، پلاک‌دار و النگوهای ظریف.", image: img("nail-bangle-set-1") },
  { slug: "earring", title: "گوشواره طلا", shortTitle: "گوشواره", description: "گوشواره‌های حلقه‌ای، قطره‌ای و نگین‌دار برای هر سلیقه.", image: img("chunky-hoop-earrings-1") },
  { slug: "ring", title: "انگشتر طلا", shortTitle: "انگشتر", description: "حلقه‌های ست، انگشترهای تک‌نگین و طرح‌های ظریف.", image: img("twin-bands-1") },
  { slug: "set", title: "نیم‌ست طلا", shortTitle: "نیم‌ست", description: "ست‌های هماهنگ گردنبند و گوشواره، مناسب هدیه.", image: img("rose-set-1") },
];

type Seed = Omit<Product, "images" | "specs"> & { extraSpecs?: { label: string; value: string }[] };

const seeds: Seed[] = [
  { slug: "heart-charm-necklace", code: "RG-N101", name: "گردنبند قلب و مهره", category: "necklace", weightGrams: "6.42", purity: 750, bestseller: true, summary: "قلب توخالی با مهره‌های حکاکی‌شده روی زنجیر رولو.", description: "گردنبندی با آویز قلب بزرگ و مهره‌های قابل جابه‌جایی که روی هر کدام می‌توان حروف یا نام دلخواه حک کرد. انتخابی شخصی و ماندگار برای هدیه." , extraSpecs: [{ label: "طول زنجیر", value: "۴۵ سانتی‌متر" }, { label: "نوع زنجیر", value: "رولو" }] },
  { slug: "rose-chain-pendant", code: "RG-N102", name: "گردنبند زنجیر و پلاک نگین‌دار", category: "necklace", weightGrams: "8.15", purity: 750, isNew: true, summary: "زنجیر بافت کارتیه با پلاک مستطیلی نگین‌دار.", description: "زنجیری با بافت محکم و پلاک مستطیلی که با ردیف‌های نگین زیرکونیا تزئین شده است. مناسب استفاده روزمره و مجلسی.", extraSpecs: [{ label: "طول زنجیر", value: "۵۰ سانتی‌متر" }, { label: "نگین", value: "زیرکونیا" }] },
  { slug: "delicate-layer-necklace", code: "RG-N103", name: "گردنبند ظریف دو ردیفه", category: "necklace", weightGrams: "3.10", purity: 750, bestseller: true, summary: "دو رشته زنجیر ظریف با آویز کوچک.", description: "گردنبندی سبک با دو رشته زنجیر در دو طول متفاوت که حالتی لایه‌لایه و امروزی ایجاد می‌کند.", extraSpecs: [{ label: "طول زنجیر", value: "۴۰ و ۴۵ سانتی‌متر" }] },
  { slug: "chunky-hoop-earrings", code: "RG-E201", name: "گوشواره حلقه‌ای", category: "earring", weightGrams: "5.80", purity: 750, bestseller: true, summary: "حلقه‌های پهن و براق با قفل میخی.", description: "گوشواره حلقه‌ای با بدنه پهن و پرداخت آینه‌ای؛ یک انتخاب کلاسیک که با هر استایلی هماهنگ است.", extraSpecs: [{ label: "قطر حلقه", value: "۲ سانتی‌متر" }, { label: "نوع قفل", value: "میخی" }] },
  { slug: "drop-earrings", code: "RG-E202", name: "گوشواره قطره‌ای", category: "earring", weightGrams: "4.95", purity: 750, isNew: true, summary: "فرم قطره‌ای حجیم با پرداخت براق.", description: "گوشواره‌ای با فرم قطره‌ای نرم و حجیم که نور را به زیبایی بازتاب می‌دهد.", extraSpecs: [{ label: "طول", value: "۲٫۳ سانتی‌متر" }] },
  { slug: "twisted-hoop-earrings", code: "RG-E203", name: "گوشواره حلقه‌ای بافت", category: "earring", weightGrams: "4.20", purity: 750, summary: "حلقه‌های تابیده با ظاهر طنابی.", description: "حلقه‌هایی با بافت تابیده که بازی نور و سایه زیبایی روی سطح طلا ایجاد می‌کنند.", extraSpecs: [{ label: "قطر حلقه", value: "۱٫۸ سانتی‌متر" }] },
  { slug: "pave-huggie-earrings", code: "RG-E204", name: "گوشواره نگین‌دار کوچک", category: "earring", weightGrams: "2.65", purity: 750, summary: "حلقه کوچک چسبیده به گوش با ردیف نگین.", description: "گوشواره‌ای ظریف که نزدیک لاله گوش قرار می‌گیرد و با نگین‌های ریز درخشش ملایمی دارد.", extraSpecs: [{ label: "نگین", value: "زیرکونیا" }] },
  { slug: "nail-bangle-set", code: "RG-B301", name: "دستبند طرح میخ", category: "bracelet", weightGrams: "14.30", purity: 750, bestseller: true, makingCharge: { type: "percent", bps: 2200 }, summary: "النگوی الهام‌گرفته از فرم میخ.", description: "دستبندی خشک با فرمی الهام‌گرفته از میخ که دو سر آن روی هم می‌نشیند. طراحی شاخص و امروزی.", extraSpecs: [{ label: "سایز داخلی", value: "۱۶ و ۱۷" }] },
  { slug: "chain-bracelet", code: "RG-B302", name: "دستبند زنجیری", category: "bracelet", weightGrams: "9.75", purity: 750, bestseller: true, summary: "حلقه‌های درشت بیضی با قفل طوطی.", description: "دستبندی با حلقه‌های درشت و براق که حضور پررنگی روی مچ دارد و با ساعت هم ست می‌شود.", extraSpecs: [{ label: "طول", value: "۱۸ سانتی‌متر" }, { label: "قفل", value: "طوطی" }] },
  { slug: "id-bracelet", code: "RG-B303", name: "دستبند پلاک", category: "bracelet", weightGrams: "3.40", purity: 750, summary: "پلاک ساده قابل حکاکی روی زنجیر ظریف.", description: "دستبندی ظریف با پلاک صاف که می‌توان نام یا تاریخ دلخواه را روی آن حک کرد.", extraSpecs: [{ label: "طول", value: "۱۷ تا ۱۹ سانتی‌متر" }] },
  { slug: "stone-bangle", code: "RG-B304", name: "النگو نگین‌دار", category: "bracelet", weightGrams: "7.60", purity: 750, isNew: true, summary: "النگوی ظریف با چهار نگین رنگی.", description: "النگوی باریک با چهار نگین در قاب‌های گرد؛ ترکیبی آرام از رنگ و درخشش طلا.", extraSpecs: [{ label: "نگین", value: "سیترین مصنوعی" }] },
  { slug: "bead-bangle", code: "RG-B305", name: "النگو ساچمه‌ای", category: "bracelet", weightGrams: "6.90", purity: 750, summary: "النگوی ظریف با ردیف ساچمه.", description: "النگویی سبک و درخشان با ردیف ساچمه‌های ریز که برای استفاده روزانه مناسب است.", extraSpecs: [{ label: "قطر داخلی", value: "۶ سانتی‌متر" }] },
  { slug: "twin-bands", code: "RG-R401", name: "حلقه‌های ست", category: "ring", weightGrams: "8.40", purity: 750, bestseller: true, summary: "جفت حلقه ساده با پرداخت براق.", description: "دو حلقه ساده و کلاسیک با لبه‌های گرد و پرداخت براق؛ مناسب نامزدی و ازدواج.", extraSpecs: [{ label: "تعداد", value: "دو عدد" }] },
  { slug: "solitaire-ring", code: "RG-R402", name: "انگشتر تک‌نگین", category: "ring", weightGrams: "3.25", purity: 750, makingCharge: { type: "percent", bps: 2500 }, summary: "نگین مستطیلی روی رکاب نگین‌کاری‌شده.", description: "انگشتری ظریف با نگین مرکزی مستطیلی و رکابی که با نگین‌های ریز تزئین شده است.", extraSpecs: [{ label: "نگین", value: "زیرکونیا" }] },
  { slug: "cluster-ring", code: "RG-R403", name: "انگشتر خوشه‌ای", category: "ring", weightGrams: "5.15", purity: 750, isNew: true, summary: "خوشه‌ای از نگین‌های گلبهی.", description: "انگشتری با خوشه‌ای از نگین‌های قطره‌ای در رنگ گلبهی گرم و رکابی ظریف.", extraSpecs: [{ label: "نگین", value: "مورگانیت مصنوعی" }] },
  { slug: "delicate-rings-trio", code: "RG-R404", name: "انگشترهای ظریف", category: "ring", weightGrams: "2.80", purity: 750, summary: "انگشترهای سبک با نقش قلب و گل.", description: "انگشترهای بسیار ظریف با جزئیات نگین‌کاری‌شده که به‌تنهایی یا کنار هم استفاده می‌شوند.", extraSpecs: [{ label: "فروش", value: "تکی" }] },
  { slug: "rose-set", code: "RG-S501", name: "نیم‌ست گل", category: "set", weightGrams: "9.20", purity: 750, isNew: true, summary: "گردنبند، دستبند و انگشتر با نقش گل.", description: "نیم‌ستی هماهنگ با نقش گل‌های ظریف شامل گردنبند، دستبند و انگشتر؛ انتخابی کامل برای هدیه.", extraSpecs: [{ label: "اجزا", value: "گردنبند، دستبند، انگشتر" }] },
  { slug: "mesh-collar-set", code: "RG-S502", name: "نیم‌ست توری", category: "set", weightGrams: "21.50", purity: 750, makingCharge: { type: "percent", bps: 2000 }, summary: "گردنبند توری و گوشواره آویز.", description: "نیم‌ستی مجلسی با گردنبند توری پهن و گوشواره‌های آویز بلند؛ مناسب مراسم خاص.", extraSpecs: [{ label: "اجزا", value: "گردنبند، گوشواره" }] },
];

export const products: Product[] = seeds.map(({ extraSpecs = [], ...p }) => ({
  ...p,
  images: productImages(p.slug),
  specs: [
    { label: "کد محصول", value: p.code },
    { label: "عیار", value: p.purity === 750 ? "۱۸ عیار (۷۵۰)" : String(p.purity) },
    { label: "دسته‌بندی", value: categories.find((c) => c.slug === p.category)!.title },
    ...extraSpecs,
  ],
}));

export const heroSlides = [
  { id: "s1", image: img("hero-1"), title: "مجموعه‌ای از زیباترین جواهرات طلا", text: "طراحی مدرن، کیفیت اصیل، مناسب برای هدیه و سرمایه‌گذاری", cta: "مشاهده مجموعه", to: "/products" as const, focus: "50% 30%" },
  { id: "s2", image: img("hero-2"), title: "درخشش ظریف برای هر روز", text: "گردنبندها و پلاک‌های سبک، هماهنگ با استایل روزمره شما", cta: "مشاهده گردنبندها", to: "/categories/$slug" as const, slug: "necklace", focus: "50% 35%" },
  { id: "s3", image: img("hero-3"), title: "نیم‌ست‌های مجلسی و ماندگار", text: "ست‌های هماهنگ گردنبند و گوشواره، انتخابی شایسته برای هدیه", cta: "مشاهده نیم‌ست‌ها", to: "/categories/$slug" as const, slug: "set", focus: "50% 40%" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function productsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}
export const bestsellers = products.filter((p) => p.bestseller);
