"use client";

import { Bell, CheckCheck, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from "../mutations/notifications.mutations";
import { useNotifications } from "../queries/notifications.queries";
import { NotificationItem } from "./notification-item";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const notificationsQuery = useNotifications();
  const markRead = useMarkNotificationAsRead();
  const markAllRead = useMarkAllNotificationsAsRead();
  const notifications = notificationsQuery.data ?? [];
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleNotificationClick = (id: string, href?: string) => {
    void markRead.mutateAsync(id);
    setOpen(false);
    if (href) router.push(href);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative rounded-full p-1.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-semibold text-gray-900">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
              <p className="mt-0.5 text-xs text-gray-500">{unreadCount ? `${unreadCount} unread` : "All caught up"}</p>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllRead.mutate()}
                disabled={markAllRead.isPending}
                className="inline-flex items-center gap-1 text-[11px] text-gray-500 underline underline-offset-2 hover:text-gray-900 disabled:opacity-50"
              >
                {markAllRead.isPending ? <LoaderCircle className="h-3 w-3 animate-spin" /> : <CheckCheck className="h-3 w-3" />}
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificationsQuery.isPending ? (
              <div className="space-y-2 p-4">{[1, 2, 3].map((item) => <div key={item} className="h-14 animate-pulse bg-gray-100" />)}</div>
            ) : notifications.length ? (
              notifications.slice(0, 4).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} compact onClick={() => handleNotificationClick(notification.id, notification.href)} />
              ))
            ) : (
              <p className="px-4 py-10 text-center text-sm text-gray-500">No notifications yet.</p>
            )}
          </div>
          <button type="button" onClick={() => { setOpen(false); router.push("/notifications"); }} className="w-full border-t border-gray-100 px-4 py-3 text-center text-xs font-medium text-gray-700 hover:bg-gray-50">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
