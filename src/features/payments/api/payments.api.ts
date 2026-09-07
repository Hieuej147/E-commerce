import type { ApiClient } from "@/lib/api/client";

export type CheckoutPayload = {
  orderId: string;
  successUrl: string;
  cancelUrl: string;
  idempotencyKey: string;
};

export type CheckoutResponse = {
  paymentId: string;
  orderId: string;
  checkoutUrl: string;
  providerSessionId: string;
  status: string;
};

export type PaymentDto = {
  id: string;
  orderId: string;
  userId: string;
  amount: { amountMinor: number; currency: string };
  status: string;
  provider: string;
  providerPaymentId: string;
  createdAt: string;
};

export function createCheckoutSession(api: ApiClient, payload: CheckoutPayload) {
  return api<CheckoutResponse>("/payments/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getPayment(api: ApiClient, paymentId: string) {
  return api<PaymentDto>(`/payments/${paymentId}`);
}
