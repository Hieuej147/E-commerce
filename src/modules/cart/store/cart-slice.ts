import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cart.types";

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
};

const initialState: CartState = {
  items: [],
  hasHydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.hasHydrated = true;
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existing = state.items.find(
        (current) =>
          current.id === item.id &&
          current.selectedSize === item.selectedSize &&
          current.selectedColor === item.selectedColor,
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeItem(
      state,
      action: PayloadAction<
        Pick<CartItem, "id" | "selectedSize" | "selectedColor">
      >,
    ) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
          ),
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        id: string;
        selectedSize: string;
        selectedColor: string;
        quantity: number;
      }>,
    ) {
      const item = state.items.find(
        (current) =>
          current.id === action.payload.id &&
          current.selectedSize === action.payload.selectedSize &&
          current.selectedColor === action.payload.selectedColor,
      );

      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { hydrateCart, addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
