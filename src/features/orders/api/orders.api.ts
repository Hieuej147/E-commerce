import type { CreateOrderBodyDto, OrderDto } from "@/lib/api/client";
import type { ApiClient } from "@/lib/api/client";

export type ListOrdersResponse = {
  orders: OrderDto[];
  pageInfo: {
    hasNextPage: boolean;
    nextPageToken: string;
  };
};

export async function listMyOrders(api: ApiClient): Promise<ListOrdersResponse> {
  const response = await api<ListOrdersResponse>("/orders");
  return {
    ...response,
    orders: response?.orders ?? [],
    pageInfo: response?.pageInfo ?? { hasNextPage: false, nextPageToken: "" },
  };
}

export function createOrder(api: ApiClient, payload: CreateOrderBodyDto) {
  return api<OrderDto>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getOrder(api: ApiClient, orderId: string) {
  return api<OrderDto>(`/orders/${orderId}`);
}

