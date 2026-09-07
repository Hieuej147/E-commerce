import type { ApiClient } from "@/lib/api/client";
import type { Notification } from "../types/notification.types";

export function getNotifications(api: ApiClient): Promise<Notification[]> {
  return api<Notification[]>("/notifications");
}

export function markNotificationAsRead(
  api: ApiClient,
  id: string,
): Promise<{ id: string }> {
  return api<{ id: string; success: boolean }>(`/notifications/${id}/read`, {
    method: "PATCH",
  });
}

export function markAllNotificationsAsRead(
  api: ApiClient,
): Promise<{ success: boolean }> {
  return api<{ success: boolean; count: number }>("/notifications/read-all", {
    method: "POST",
  });
}
