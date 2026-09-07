"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from "../mutations/notifications.mutations";
import { useNotifications } from "../queries/notifications.queries";
import type { NotificationFilter } from "../types/notification.types";
import { NotificationItem } from "./notification-item";

const filters: { value: NotificationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "orders", label: "Orders" },
  { value: "payments", label: "Payments" },
];

export function NotificationsList() {
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const router = useRouter();
  const query = useNotifications();
  const markRead = useMarkNotificationAsRead();
  const markAllRead = useMarkAllNotificationsAsRead();
  const notifications = useMemo(() => {
    const items = query.data ?? [];
    if (filter === "unread") return items.filter((item) => !item.read);
    if (filter === "orders") return items.filter((item) => item.type.startsWith("ORDER_"));
    if (filter === "payments") return items.filter((item) => item.type.startsWith("PAYMENT_"));
    return items;
  }, [filter, query.data]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`px-3 py-1.5 text-xs transition ${filter === item.value ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => markAllRead.mutate()} disabled={!query.data?.some((item) => !item.read) || markAllRead.isPending} className="text-xs font-medium text-gray-600 underline underline-offset-4 disabled:cursor-not-allowed disabled:text-gray-300">
          Mark all as read
        </button>
      </div>

      {query.isPending ? <Loading /> : query.isError ? <ErrorState onRetry={() => void query.refetch()} /> : notifications.length ? (
        <div className="border border-gray-200 bg-white">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onClick={() => { void markRead.mutateAsync(notification.id); if (notification.href) router.push(notification.href); }} />
          ))}
        </div>
      ) : <EmptyState filter={filter} />}
    </div>
  );
}

function Loading() { return <div className="space-y-2">{[1, 2, 3, 4].map((item) => <div key={item} className="h-24 animate-pulse bg-gray-100" />)}</div>; }
function ErrorState({ onRetry }: { onRetry: () => void }) { return <div className="border border-red-200 bg-red-50 px-6 py-12 text-center text-sm text-red-700"><p>Unable to load notifications.</p><button type="button" onClick={onRetry} className="mt-4 border border-red-300 px-4 py-2 text-xs hover:bg-white">Try again</button></div>; }
function EmptyState({ filter }: { filter: NotificationFilter }) { return <div className="border border-dashed border-gray-300 px-6 py-20 text-center text-sm text-gray-500"><p>{filter === "unread" ? "You have no unread notifications." : "No notifications in this view."}</p></div>; }
