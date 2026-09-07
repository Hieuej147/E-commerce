import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

import { useApiClient } from "@/lib/api/use-api-client";
import { queryKeys } from "@/lib/query/query-keys";

import { getPayment } from "../api/payments.api";

export function usePayment(paymentId?: string) {
  const api = useApiClient();
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.payments.detail(paymentId ?? "unknown"),
    queryFn: () => getPayment(api, paymentId as string),
    enabled: isLoaded && Boolean(isSignedIn) && Boolean(paymentId),
  });
}
