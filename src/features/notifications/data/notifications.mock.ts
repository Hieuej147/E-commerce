import type { Notification } from "../types/notification.types";

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

export const mockNotifications: Notification[] = [
  {
    id: "notification-payment-success",
    type: "PAYMENT_SUCCESS",
    title: "Payment successful",
    message: "Your payment for order #cmto2e6te0000nk510o1beook was completed.",
    createdAt: minutesAgo(12),
    read: false,
    href: "/orders/cmto2e6te0000nk510o1beook",
    orderId: "cmto2e6te0000nk510o1beook",
  },
  {
    id: "notification-order-processing",
    type: "ORDER_CREATED",
    title: "Order is being prepared",
    message: "We have received your order and are preparing it for shipment.",
    createdAt: minutesAgo(45),
    read: false,
    href: "/orders/cmto2e6te0000nk510o1beook",
    orderId: "cmto2e6te0000nk510o1beook",
  },
  {
    id: "notification-order-shipped",
    type: "ORDER_SHIPPED",
    title: "Your order is on the way",
    message: "Order #cmto2e6te0000nk510o1beook has been handed to the carrier.",
    createdAt: minutesAgo(180),
    read: true,
    href: "/orders/cmto2e6te0000nk510o1beook",
    orderId: "cmto2e6te0000nk510o1beook",
  },
  {
    id: "notification-payment-failed",
    type: "PAYMENT_FAILED",
    title: "Payment could not be completed",
    message: "Please try again or choose another payment method.",
    createdAt: minutesAgo(60 * 24),
    read: true,
    href: "/cart?step=3",
  },
  {
    id: "notification-system",
    type: "SYSTEM",
    title: "Welcome to Tendollama",
    message: "Your account is ready. Discover the latest collection anytime.",
    createdAt: minutesAgo(60 * 24 * 2),
    read: true,
    href: "/products",
  },
];
