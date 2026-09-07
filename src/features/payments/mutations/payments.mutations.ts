import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCheckoutSession,
  type CheckoutPayload,
} from "../api/payments.api";
import { useApiClient } from "@/lib/api/use-api-client";

export function useCreateCheckoutSession() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["payments", "checkout"],
    mutationFn: (payload: CheckoutPayload) =>
      createCheckoutSession(api, payload),
    onSuccess: (payment) => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      if (payment.paymentId) {
        void queryClient.invalidateQueries({ queryKey: ["payments", "detail", payment.paymentId] });
      }
    },
  });
}
