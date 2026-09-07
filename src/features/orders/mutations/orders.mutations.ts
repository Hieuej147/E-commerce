import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiClient } from "@/lib/api/use-api-client";

import { createOrder } from "../api/orders.api";

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
