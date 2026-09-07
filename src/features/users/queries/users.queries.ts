import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api/use-api-client";
import { queryKeys } from "@/lib/query/query-keys";
import { getCurrentUser } from "../api/users.api";

export function useCurrentUser() {
  const api = useApiClient();
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: () => getCurrentUser(api),
    enabled: isLoaded && Boolean(isSignedIn),
  });
}
