export type NotificationType =
  | "ORDER_CREATED"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "ORDER_SHIPPED"
  | "ORDER_CANCELLED"
  | "PRODUCT_LOW_STOCK"
  | "NEW_CUSTOMER"
  | "SYSTEM_ALERT"
  | "SYSTEM";


export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href?: string;
  orderId?: string;
};

export type NotificationFilter = "all" | "unread" | "orders" | "payments";
