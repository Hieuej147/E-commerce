import { useQuery } from "@tanstack/react-query";
import { getOrder, listMyOrders } from "../api/orders.api";
import { queryKeys } from "@/lib/query/query-keys";
import { useApiClient } from "@/lib/api/use-api-client";
import { useAuth } from "@clerk/nextjs";

export function useMyOrders() {
  const api = useApiClient();
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.orders.mine(),
    queryFn: () => listMyOrders(api),
    enabled: isLoaded && Boolean(isSignedIn),
  });
}

export function useOrder(orderId?: string) {
  const api = useApiClient();
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.orders.detail(orderId ?? "unknown"),
    queryFn: () => getOrder(api, orderId as string),
    enabled: isLoaded && Boolean(isSignedIn) && Boolean(orderId),
    refetchInterval: (query) => {
      if (query.state.status === "error") return false;
      const paymentStatus = query.state.data?.paymentStatus;
      return paymentStatus === "PAID" || paymentStatus === "FAILED" ? false : 3000;
    },
  });
}
