import type { ProductListParams } from "@/features/products/api/products.api";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (params: ProductListParams) => ["products", "list", params] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  infinite: (params: Omit<ProductListParams, "pageToken">) =>
    ["products", "infinite", params] as const,
  orders: {
    all: ["orders"] as const,
    mine: () => ["orders", "mine"] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
  },
  payments: {
    all: ["payments"] as const,
    detail: (id: string) => ["payments", "detail", id] as const,
  },
  users: {
    me: () => ["users", "me"] as const,
  },
  notifications: {
    all: ["notifications"] as const,
    unreadCount: () => ["notifications", "unread-count"] as const,
  },
};

