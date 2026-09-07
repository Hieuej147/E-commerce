"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import {
  selectCartHydrated,
  selectCartItemCount,
} from "@/modules/cart/store/cart-selectors";

const ShoppingCartIcon = () => {
  const hasHydrated = useAppSelector(selectCartHydrated);
  const count = useAppSelector(selectCartItemCount);

  return (
    <Link
      href="/cart"
      className="relative"
      aria-label={`Shopping cart${count > 0 ? `, ${count} items` : ""}`}
    >
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      {hasHydrated && count > 0 && (
        <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};

export default ShoppingCartIcon;
