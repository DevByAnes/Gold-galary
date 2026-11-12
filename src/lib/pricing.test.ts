import { describe, expect, it } from "vitest";
import { calculatePrice, parseDecimal, type PricingConfig } from "./pricing";

const base: PricingConfig = {
  goldRatePerGram: 6_000_000,
  referencePurity: 750,
  rateStatus: "demo",
  rateLabel: "demo",
  defaultMakingCharge: { type: "percent", bps: 1500 },
  sellerMarginBps: 700,
  tax: { rateBps: 1000, base: "makingAndMargin", label: "tax" },
  additionalCosts: [],
};

describe("gold pricing", () => {
  it("computes gold value, making, margin and tax on making+margin", () => {
    const r = calculatePrice({ weightGrams: "2.5", purity: 750 }, base);
    expect(r.goldValue).toBe(15_000_000);
    expect(r.makingCharge).toBe(2_250_000);
    expect(r.sellerMargin).toBe(1_207_500);
    expect(r.tax).toBe(345_750);
    expect(r.total).toBe(18_803_250);
  });

  it("scales gold value by purity relative to the reference purity", () => {
    const r = calculatePrice({ weightGrams: "1", purity: 585 }, { ...base, sellerMarginBps: 0 });
    expect(r.goldValue).toBe(4_680_000);
  });

  it("supports a fixed per-gram making charge", () => {
    const r = calculatePrice(
      { weightGrams: "3.2", purity: 750, makingCharge: { type: "perGram", toman: 450_000 } },
      base,
    );
    expect(r.makingCharge).toBe(1_440_000);
  });

  it("adds configurable extra costs and can tax the whole subtotal", () => {
    const r = calculatePrice(
      { weightGrams: "1", purity: 750 },
      {
        ...base,
        defaultMakingCharge: { type: "percent", bps: 0 },
        sellerMarginBps: 0,
        tax: { rateBps: 1000, base: "subtotal", label: "tax" },
        additionalCosts: [{ id: "box", label: "box", toman: 200_000 }],
      },
    );
    expect(r.subtotal).toBe(6_200_000);
    expect(r.tax).toBe(620_000);
    expect(r.total).toBe(6_820_000);
  });

  it("charges no tax when the tax base is none", () => {
    const r = calculatePrice({ weightGrams: "2.5", purity: 750 }, { ...base, tax: { rateBps: 1000, base: "none", label: "" } });
    expect(r.tax).toBe(0);
  });

  it("avoids float drift on fractional weights (0.1 + 0.2 grams style values)", () => {
    const r = calculatePrice(
      { weightGrams: "0.3", purity: 750 },
      { ...base, goldRatePerGram: 1_000_001, defaultMakingCharge: { type: "percent", bps: 0 }, sellerMarginBps: 0 },
    );
    expect(r.goldValue).toBe(300_000); // 300000.3 rounded half-up
  });

  it("returns an unavailable price when no rate is available", () => {
    const r = calculatePrice({ weightGrams: "2", purity: 750 }, { ...base, rateStatus: "unavailable" });
    expect(r.available).toBe(false);
    expect(r.total).toBe(0);
  });

  it("parses decimals exactly", () => {
    expect(parseDecimal("3.456", 3)).toBe(3456n);
    expect(parseDecimal("4", 3)).toBe(4000n);
    expect(() => parseDecimal("1e3", 3)).toThrow();
  });
});
