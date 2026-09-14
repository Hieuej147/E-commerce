import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiClient } from "@/lib/api/use-api-client";

import { createOrder, cancelOrder } from "../api/orders.api";

export function useCreateOrder() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["orders", "create"],
    mutationFn: (payload: Parameters<typeof createOrder>[1]) =>
      createOrder(api, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useCancelOrder() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["orders", "cancel"],
    mutationFn: (orderId: string) => cancelOrder(api, orderId),
    onSuccess: (_, orderId) => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
      void queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
    },
  });
}
