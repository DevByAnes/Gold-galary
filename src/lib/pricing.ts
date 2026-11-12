/**
 * Gold pricing engine.
 *
 * All money is handled as integer Toman in BigInt; weights as integer milligrams; rates as
 * integer basis points (1% = 100 bps). Each line item is rounded half-up to the nearest Toman.
 * Nothing in this file is UI-aware and no tax rule is assumed: every rate, base and fee comes
 * from the PricingConfig passed in.
 */

export type RateStatus = "demo" | "live" | "unavailable";

export type MakingCharge =
  | { type: "percent"; bps: number } // % of gold value
  | { type: "perGram"; toman: number }; // fixed Toman per gram

export type TaxBase = "makingAndMargin" | "subtotal" | "none";

export interface AdditionalCost {
  id: string;
  label: string;
  toman: number;
}

export interface PricingConfig {
  /** Price per gram of gold at `referencePurity` (e.g. 18K = 750), in Toman. */
  goldRatePerGram: number;
  referencePurity: number;
  rateStatus: RateStatus;
  rateLabel: string;
  defaultMakingCharge: MakingCharge;
  /** Seller margin, applied on gold value + making charge. */
  sellerMarginBps: number;
  tax: { rateBps: number; base: TaxBase; label: string };
  additionalCosts: AdditionalCost[];
}

export interface PricingInput {
  /** Decimal grams as a string, e.g. "3.45". Strings avoid float drift. */
  weightGrams: string;
  /** Millesimal fineness, e.g. 750 for 18K. */
  purity: number;
  makingCharge?: MakingCharge;
}

export interface PriceBreakdown {
  available: boolean;
  status: RateStatus;
  weightMg: number;
  goldValue: number;
  makingCharge: number;
  sellerMargin: number;
  tax: number;
  additionalCosts: { id: string; label: string; toman: number }[];
  subtotal: number;
  total: number;
}

const MG_PER_GRAM = 1000n;
const BPS = 10000n;

/** Parse a non-negative decimal string into an integer scaled by 10^scale (truncating extra digits). */
export function parseDecimal(value: string, scale: number): bigint {
  const trimmed = value.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) throw new Error(`Invalid decimal: "${value}"`);
  const [int, frac = ""] = trimmed.split(".");
  const fracPadded = (frac + "0".repeat(scale)).slice(0, scale);
  return BigInt(int) * 10n ** BigInt(scale) + BigInt(fracPadded || "0");
}

/** Integer division rounded half-up (both operands non-negative). */
export function divRound(numerator: bigint, denominator: bigint): bigint {
  if (denominator === 0n) throw new Error("Division by zero");
  return (numerator * 2n + denominator) / (denominator * 2n);
}

function assertInt(n: number, name: string) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`${name} must be a non-negative integer`);
}

export function calculatePrice(input: PricingInput, config: PricingConfig): PriceBreakdown {
  const weightMg = parseDecimal(input.weightGrams, 3);
  const empty: PriceBreakdown = {
    available: false,
    status: config.rateStatus,
    weightMg: Number(weightMg),
    goldValue: 0,
    makingCharge: 0,
    sellerMargin: 0,
    tax: 0,
    additionalCosts: [],
    subtotal: 0,
    total: 0,
  };
  if (config.rateStatus === "unavailable" || config.goldRatePerGram <= 0) return empty;

  assertInt(config.goldRatePerGram, "goldRatePerGram");
  assertInt(input.purity, "purity");
  assertInt(config.referencePurity, "referencePurity");
  assertInt(config.sellerMarginBps, "sellerMarginBps");
  assertInt(config.tax.rateBps, "tax.rateBps");

  const rate = BigInt(config.goldRatePerGram);
  const purity = BigInt(input.purity);
  const refPurity = BigInt(config.referencePurity);

  // gold value = weight(g) × rate × purity / referencePurity
  const goldValue = divRound(weightMg * rate * purity, MG_PER_GRAM * refPurity);

  const mc = input.makingCharge ?? config.defaultMakingCharge;
  let making: bigint;
  if (mc.type === "percent") {
    assertInt(mc.bps, "makingCharge.bps");
    making = divRound(goldValue * BigInt(mc.bps), BPS);
  } else {
    assertInt(mc.toman, "makingCharge.toman");
    making = divRound(weightMg * BigInt(mc.toman), MG_PER_GRAM);
  }

  const margin = divRound((goldValue + making) * BigInt(config.sellerMarginBps), BPS);

  const extras = config.additionalCosts.map((c) => {
    assertInt(c.toman, `additionalCosts.${c.id}`);
    return { id: c.id, label: c.label, toman: c.toman };
  });
  const extrasSum = extras.reduce((s, c) => s + BigInt(c.toman), 0n);

  const subtotal = goldValue + making + margin + extrasSum;

  let taxBase = 0n;
  if (config.tax.base === "makingAndMargin") taxBase = making + margin;
  else if (config.tax.base === "subtotal") taxBase = subtotal;
  const tax = divRound(taxBase * BigInt(config.tax.rateBps), BPS);

  const total = subtotal + tax;

  return {
    available: true,
    status: config.rateStatus,
    weightMg: Number(weightMg),
    goldValue: Number(goldValue),
    makingCharge: Number(making),
    sellerMargin: Number(margin),
    tax: Number(tax),
    additionalCosts: extras,
    subtotal: Number(subtotal),
    total: Number(total),
  };
}

/** Sum integer Toman values using BigInt to avoid float accumulation. */
export function sumToman(values: number[]): number {
  return Number(values.reduce((s, v) => s + BigInt(v), 0n));
}

export function multiplyToman(value: number, qty: number): number {
  return Number(BigInt(value) * BigInt(qty));
}
