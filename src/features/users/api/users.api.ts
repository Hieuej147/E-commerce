import type { ApiClient, UserDto } from "@/lib/api/client";

export function getCurrentUser(api: ApiClient) {
  return api<UserDto>("/me");
}
