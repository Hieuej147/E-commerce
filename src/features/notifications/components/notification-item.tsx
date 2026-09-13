import {
  Bell,
  CheckCircle2,
  CircleAlert,
  PackageCheck,
  Truck,
} from "lucide-react";

import type { Notification, NotificationType } from "../types/notification.types";

const iconByType: Record<NotificationType, typeof Bell> = {
  ORDER_CREATED: PackageCheck,
  PAYMENT_SUCCESS: CheckCircle2,
  PAYMENT_FAILED: CircleAlert,
  ORDER_SHIPPED: Truck,
  ORDER_CANCELLED: CircleAlert,
  PRODUCT_LOW_STOCK: CircleAlert,
  NEW_CUSTOMER: Bell,
  SYSTEM_ALERT: Bell,
  SYSTEM: Bell,
};

export function NotificationItem({
  notification,
  compact = false,
  onClick,
}: {
  notification: Notification;
  compact?: boolean;
  onClick?: () => void;
}) {
  const Icon = iconByType[notification.type] || Bell;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-4 border-b border-surface-container text-left transition-colors last:border-0 hover:bg-surface-container-low ${
        compact ? "px-3 py-2.5" : "px-5 py-4"
      } ${notification.read ? "bg-surface-container-lowest" : "bg-secondary-container/10"}`}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-outline bg-surface-container text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span className="font-mono text-xs font-bold uppercase text-primary">
            {notification.title}
          </span>
          {!notification.read && (
            <span className="font-mono text-[9px] font-bold bg-secondary-container text-on-secondary-container px-1 py-0.5 border border-primary shrink-0">
              NEW
            </span>
          )}
        </span>
        <span className="mt-1 block font-sans text-xs text-on-surface-variant leading-relaxed">
          {notification.message}
        </span>
        <span className="mt-1.5 block font-mono text-[10px] text-outline">
          {formatRelativeTime(notification.createdAt)}
        </span>
      </span>
    </button>
  );
}

function formatRelativeTime(value: string) {
  const difference = Math.max(0, Date.now() - new Date(value).getTime());
  const minutes = Math.floor(difference / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
