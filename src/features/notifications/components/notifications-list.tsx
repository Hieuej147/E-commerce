"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from "../mutations/notifications.mutations";
import { useNotifications } from "../queries/notifications.queries";
import type { NotificationFilter } from "../types/notification.types";
import { NotificationItem } from "./notification-item";

const filters: { value: NotificationFilter; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "unread", label: "UNREAD" },
  { value: "orders", label: "ORDERS" },
  { value: "payments", label: "PAYMENTS" },
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
      <div className="mb-6 flex flex-col gap-4 border-b border-outline pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all clip-chamfer-sm border ${
                filter === item.value
                  ? "bg-secondary-container text-on-secondary-container border-primary shadow-hard-sm"
                  : "bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high border-outline"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => markAllRead.mutate()}
          disabled={!query.data?.some((item) => !item.read) || markAllRead.isPending}
          className="font-mono text-xs font-bold text-primary underline underline-offset-4 disabled:cursor-not-allowed disabled:text-outline uppercase"
        >
          Mark all as read
        </button>
      </div>

      {query.isPending ? (
        <Loading />
      ) : query.isError ? (
        <ErrorState onRetry={() => void query.refetch()} />
      ) : notifications.length ? (
        <div className="border border-outline bg-surface-container-lowest shadow-hard-md divide-y divide-surface-container">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={() => {
                void markRead.mutateAsync(notification.id);
                if (notification.href) router.push(notification.href);
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState filter={filter} />
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-20 animate-pulse bg-surface-container border border-outline" />
      ))}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="border border-error bg-error-container/20 p-8 text-center shadow-hard-sm">
      <p className="font-mono text-xs font-bold uppercase text-error">
        Unable to load notifications
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 border border-primary bg-primary text-on-primary font-mono text-xs uppercase px-4 py-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyState({ filter }: { filter: NotificationFilter }) {
  return (
    <div className="border border-outline bg-surface-container-low p-12 text-center shadow-hard-md">
      <p className="font-mono text-xs text-outline uppercase">
        No notifications found
      </p>
      <p className="font-sans text-xs text-on-surface-variant mt-1">
        {filter === "unread"
          ? "You have no unread notifications."
          : "No notifications matching this filter."}
      </p>
    </div>
  );
}
