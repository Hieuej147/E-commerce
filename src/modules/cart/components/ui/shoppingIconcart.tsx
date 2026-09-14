"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import {
  selectCartHydrated,
  selectCartItemCount,
} from "@/modules/cart/store/cart-selectors";

const ShoppingCartIcon = () => {
  const [mounted, setMounted] = useState(false);
  const hasHydrated = useAppSelector(selectCartHydrated);
  const count = useAppSelector(selectCartItemCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReady = mounted && hasHydrated;
  const displayCount = isReady ? count : 0;
  const formattedCount = isReady ? (count < 10 ? `0${count}` : `${count}`) : "00";

  return (
    <Link
      href="/cart"
      className="flex items-center bg-primary text-on-primary px-2 py-1 sm:px-3 sm:py-1.5 border border-primary shadow-hard-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all font-label-mono-bold text-xs"
      aria-label={`Shopping cart, ${displayCount} items`}
    >
      <ShoppingBag className="w-4 h-4 sm:mr-1.5" />
      <span className="mr-1.5 tracking-wider hidden sm:inline">CART</span>
      <span className="bg-secondary-container text-on-secondary-container ml-1 sm:ml-0 px-1.5 font-code-comment font-bold text-[10px] sm:text-[11px]">
        {formattedCount}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
