import { Suspense } from "react";

import { PaymentResult } from "@/features/payments/components/payment-result";

export default function PaymentSuccessPage() {
  return <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Loading payment...</div>}><PaymentResult mode="success" /></Suspense>;
}
