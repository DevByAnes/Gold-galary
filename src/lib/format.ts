const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert ASCII digits in a string to Persian digits. Deterministic on server and client. */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Group an integer with Persian thousands separators, e.g. 12500000 -> ۱۲٬۵۰۰٬۰۰۰ */
export function formatNumberFa(value: number | bigint): string {
  const negative = value < 0;
  const abs = (negative ? -value : value).toString();
  const grouped = abs.replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  return (negative ? "-" : "") + toFaDigits(grouped);
}

export function formatToman(value: number | bigint): string {
  return `${formatNumberFa(value)} تومان`;
}

/** Format a decimal string such as "3.450" as "۳٫۴۵" (trailing zeros trimmed). */
export function formatGrams(value: string): string {
  const [int, frac = ""] = value.split(".");
  const trimmed = frac.replace(/0+$/, "");
  return toFaDigits(trimmed ? `${int}٫${trimmed}` : int);
}

export function formatPercentBps(bps: number): string {
  const whole = Math.floor(bps / 100);
  const rest = bps % 100;
  const text = rest === 0 ? `${whole}` : `${whole}٫${String(rest).padStart(2, "0").replace(/0$/, "")}`;
  return `${toFaDigits(text)}٪`;
}
