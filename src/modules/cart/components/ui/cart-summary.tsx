import { formatVnd } from "@/lib/formatters/currency";

export function CartSummary({
  subtotal,
  total,
}: {
  subtotal: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>
        <span>{formatVnd(subtotal)}</span>
      </div>
      <hr className="border-gray-200" />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{formatVnd(total)}</span>
      </div>
    </div>
  );
}
