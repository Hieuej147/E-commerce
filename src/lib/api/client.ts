import type { components } from "@/types/api";

export type ProductDto = components["schemas"]["ProductDto"];
export type OrderDto = components["schemas"]["OrderDto"];
export type UserDto = components["schemas"]["CurrentUserDto"];
export type CreateOrderBodyDto = components["schemas"]["CreateOrderBodyDto"];
export type ApiClient = <T>(path: string, init?: RequestInit) => Promise<T>;

// Browser requests go through the Next.js same-origin proxy so they do not
// depend on CORS or on a stale NEXT_PUBLIC_API_URL value in the client bundle.
export const API_BASE_URL = "/api/backend/v1";

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const isDev = process.env.NODE_ENV === "development";
  const response = await fetch(API_BASE_URL + path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(isDev ? { "ngrok-skip-browser-warning": "true" } : {}),
      ...init?.headers,
    },
  });

  const body = await response.text();

  if (!response.ok) {
    throw new Error(response.status + ": " + body.slice(0, 300));
  }

  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error(
      "API returned non-JSON data (" +
        response.headers.get("content-type") +
        "): " +
        body.slice(0, 300),
    );
  }
}
