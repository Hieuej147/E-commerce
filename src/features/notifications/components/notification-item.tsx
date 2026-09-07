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

const toneByType: Record<NotificationType, string> = {
  ORDER_CREATED: "bg-blue-50 text-blue-700",
  PAYMENT_SUCCESS: "bg-emerald-50 text-emerald-700",
  PAYMENT_FAILED: "bg-red-50 text-red-700",
  ORDER_SHIPPED: "bg-violet-50 text-violet-700",
  ORDER_CANCELLED: "bg-red-50 text-red-700",
  PRODUCT_LOW_STOCK: "bg-amber-50 text-amber-700",
  NEW_CUSTOMER: "bg-indigo-50 text-indigo-700",
  SYSTEM_ALERT: "bg-amber-50 text-amber-700",
  SYSTEM: "bg-gray-100 text-gray-600",
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
  const Icon = iconByType[notification.type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 border-b border-gray-100 text-left transition last:border-0 hover:bg-gray-50 ${
        compact ? "px-4 py-3" : "px-5 py-4"
      } ${notification.read ? "bg-white" : "bg-amber-50/40"}`}
    >
      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${toneByType[notification.type]}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="text-sm font-medium text-gray-900">{notification.title}</span>
          {!notification.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />}
        </span>
        <span className="mt-1 block text-xs leading-5 text-gray-500">{notification.message}</span>
        <span className="mt-2 block text-[11px] text-gray-400">{formatRelativeTime(notification.createdAt)}</span>
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
