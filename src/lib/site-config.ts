import type { PricingConfig } from "./pricing";

/**
 * Business-editable settings. Every value marked SAMPLE is placeholder content that the
 * gallery must confirm before launch.
 */
export const site = {
  nameFa: "گالری طلای رضایی",
  nameEn: "Rezaei Gold Gallery",
  taglineFa: "طلا و جواهر",
  phone: "09177790024",
  phoneHref: "tel:+989177790024",
  mobile: "09177790024",
  email: "info@example.com",
  address: "بوشهر، خیابان انقلاب، روبه‌روی بانک ملت، پاساژ طلای طاهری",
  hours: "شنبه تا پنج‌شنبه، ۱۰ تا ۲۰",
  instagram: "https://instagram.com/",
  telegram: "https://t.me/",
  freeShippingThreshold: 20_000_000,
  developerCredit: { label: "@DevByAnes", href: "https://instagram.com/DevByAnes" },
};

export const nav = [
  { to: "/", label: "صفحه اصلی" },
  { to: "/products", label: "محصولات" },
  { to: "/about", label: "درباره ما" },
  { to: "/guide", label: "راهنمای خرید" },
  { to: "/contact", label: "تماس با ما" },
] as const;

/** SAMPLE service claims. Set `enabled: false` to hide any claim the business has not confirmed. */
export const serviceClaims = [
  { id: "authentic", icon: "badge", title: "ضمانت اصالت کالا", text: "همراه با فاکتور و شناسنامه", enabled: true },
  { id: "shipping", icon: "truck", title: "ارسال امن و سریع", text: "بسته‌بندی بیمه‌شده", enabled: true },
  { id: "payment", icon: "card", title: "پرداخت امن", text: "از طریق درگاه معتبر", enabled: true },
  { id: "return", icon: "return", title: "۷ روز ضمانت بازگشت", text: "مطابق شرایط فروشگاه", enabled: true },
] as const;

/**
 * DEMO pricing. No live gold-price provider is connected, so `rateStatus` is "demo" and the
 * UI labels every price as indicative. Switch to "live" only when a verified feed sets the rate;
 * use "unavailable" to hide prices entirely. Tax base and rate must be confirmed by the business.
 */
export const pricingConfig: PricingConfig = {
  goldRatePerGram: 6_850_000,
  referencePurity: 750,
  rateStatus: "demo",
  rateLabel: "نرخ نمایشی طلای ۱۸ عیار (غیر واقعی)",
  defaultMakingCharge: { type: "percent", bps: 1800 },
  sellerMarginBps: 700,
  tax: { rateBps: 1000, base: "makingAndMargin", label: "مالیات (قابل تنظیم)" },
  additionalCosts: [],
};

/** SAMPLE shipping methods — costs in Toman. */
export const shippingMethods = [
  { id: "post", label: "پست پیشتاز بیمه‌شده", eta: "۲ تا ۴ روز کاری", cost: 180_000 },
  { id: "courier", label: "پیک ویژه (فقط تهران)", eta: "همان روز", cost: 250_000 },
  { id: "pickup", label: "تحویل حضوری از گالری", eta: "پس از هماهنگی", cost: 0 },
] as const;

export type ShippingMethodId = (typeof shippingMethods)[number]["id"];
