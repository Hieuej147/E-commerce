import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useApiClient } from "@/lib/api/use-api-client";
import { queryKeys } from "@/lib/query/query-keys";
import { getNotifications } from "../api/notifications.api";

export const notificationsQueryKey = queryKeys.notifications.all;

export function useNotifications() {
  const api = useApiClient();
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: () => getNotifications(api),
    enabled: isLoaded && Boolean(isSignedIn),
    staleTime: 30_000,
    gcTime: 30 * 60_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
