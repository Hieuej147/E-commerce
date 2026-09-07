import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/modules/cart/store/cart-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export const CART_STORAGE_KEY = "tendollama-cart";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
