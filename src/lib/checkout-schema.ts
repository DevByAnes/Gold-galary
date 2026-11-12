import { z } from "zod";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";
/** Convert Persian/Arabic digits to ASCII so validation works with any keyboard. */
export function toAsciiDigits(s: string) {
  return s.replace(/[۰-۹٠-٩]/g, (d) => String(FA.indexOf(d) >= 0 ? FA.indexOf(d) : AR.indexOf(d)));
}

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(3, "نام و نام خانوادگی را کامل وارد کنید").max(80),
  mobile: z
    .string()
    .transform((v) => toAsciiDigits(v).replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود")),
  email: z.union([z.literal(""), z.string().trim().email("ایمیل معتبر نیست").max(120)]),
  province: z.string().trim().min(2, "استان را وارد کنید").max(40),
  city: z.string().trim().min(2, "شهر را وارد کنید").max(40),
  address: z.string().trim().min(10, "نشانی کامل را وارد کنید").max(300),
  postalCode: z
    .string()
    .transform((v) => toAsciiDigits(v).replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")),
  shipping: z.enum(["post", "courier", "pickup"], { message: "روش ارسال را انتخاب کنید" }),
  notes: z.string().trim().max(400).optional(),
});

export type CheckoutInput = z.input<typeof checkoutSchema>;
export type CheckoutData = z.output<typeof checkoutSchema>;
