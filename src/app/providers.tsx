"use client";

import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CART_STORAGE_KEY, store } from "@/lib/store/store";
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { hydrateCart } from "@/modules/cart/store/cart-slice";
import type { CartItem } from "@/modules/cart/types/cart.types";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      const items = savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
      store.dispatch(hydrateCart(Array.isArray(items) ? items : []));
    } catch {
      store.dispatch(hydrateCart([]));
    }

    return store.subscribe(() => {
      const { items, hasHydrated } = store.getState().cart;
      if (hasHydrated) {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
    </Provider>
  );
}
