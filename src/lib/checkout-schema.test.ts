import { describe, expect, it } from "vitest";
import { checkoutSchema } from "./checkout-schema";

const valid = {
  fullName: "سارا رضایی",
  mobile: "۰۹۱۲۳۴۵۶۷۸۹",
  email: "",
  province: "تهران",
  city: "تهران",
  address: "خیابان ولیعصر، کوچه نمونه، پلاک ۱۲",
  postalCode: "1234567890",
  shipping: "post" as const,
};

describe("checkout validation", () => {
  it("accepts a mobile number typed with Persian digits", () => {
    const r = checkoutSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.mobile).toBe("09123456789");
  });
  it("rejects a mobile number that does not start with 09", () => {
    expect(checkoutSchema.safeParse({ ...valid, mobile: "08123456789" }).success).toBe(false);
  });
  it("requires a 10-digit postal code", () => {
    expect(checkoutSchema.safeParse({ ...valid, postalCode: "12345" }).success).toBe(false);
  });
});
