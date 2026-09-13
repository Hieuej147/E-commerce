import { Suspense } from "react";

import { PaymentResult } from "@/features/payments/components/payment-result";

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono text-xs text-outline">Loading payment status...</div>}>
      <PaymentResult mode="success" />
    </Suspense>
  );
}
