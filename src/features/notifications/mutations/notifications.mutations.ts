import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api/use-api-client";
import { queryKeys } from "@/lib/query/query-keys";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../api/notifications.api";
import type { Notification } from "../types/notification.types";

export function useMarkNotificationAsRead() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead(api, id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Notification[]>(
        queryKeys.notifications.all,
        (notifications) =>
          notifications?.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
      );
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsAsRead(api),
    onSuccess: () => {
      queryClient.setQueryData<Notification[]>(
        queryKeys.notifications.all,
        (notifications) =>
          notifications?.map((notification) => ({ ...notification, read: true })),
      );
    },
  });
}
