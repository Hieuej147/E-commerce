import type { RootState } from "@/lib/store/store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartHydrated = (state: RootState) => state.cart.hasHydrated;
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price.amountMinor * item.quantity,
    0,
  );
