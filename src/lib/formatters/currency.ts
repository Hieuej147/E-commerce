export type SerializedLong = {
  low: number;
  high?: number;
  unsigned?: boolean;
};

export function toAmountMinor(value: number | SerializedLong) {
  if (typeof value === "number") return value;

  return value.low + (value.high ?? 0) * 2 ** 32;
}

export function formatVnd(amountMinor: number | SerializedLong) {
  return toAmountMinor(amountMinor).toLocaleString("vi-VN") + " VND";
}
