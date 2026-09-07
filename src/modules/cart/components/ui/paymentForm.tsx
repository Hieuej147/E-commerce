import { CreditCard } from "lucide-react";
import { formatVnd } from "@/lib/formatters/currency";

const PaymentForm = ({ total, isPending, error, onPay }: { total: number; isPending: boolean; error?: string; onPay: () => void }) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">Step 03</p>
        <h2 className="mt-2 text-xl font-medium">Payment method</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          You will be redirected to Stripe to complete your payment securely.
        </p>
      </div>
      <div className="flex items-center gap-3 border border-gray-200 p-4">
        <CreditCard className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm font-medium">Card payment</p>
          <p className="text-xs text-gray-400">Secure checkout with Stripe</p>
        </div>
      </div>
      <button type="button" disabled={isPending} onClick={onPay} className="w-full bg-gray-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
        {isPending ? "Creating secure checkout..." : `Pay ${formatVnd(total)}`}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
export default PaymentForm;
