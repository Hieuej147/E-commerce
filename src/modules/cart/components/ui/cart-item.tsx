"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/modules/cart/types/cart.types";
import { useAppDispatch } from "@/lib/store/hooks";
import { removeItem, updateQuantity } from "@/modules/cart/store/cart-slice";
import { formatVnd } from "@/lib/formatters/currency";

export function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();
  const image = item.images[item.selectedColor] ?? Object.values(item.images)[0];

  return (
    <article className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
      <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-gray-50">
        {image && <Image src={image} alt={item.name} fill className="object-contain p-2" />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex justify-between gap-3">
          <div>
            <h2 className="truncate text-sm font-medium">{item.name}</h2>
            <p className="mt-1 text-xs text-gray-400">
              Size {item.selectedSize} · {item.selectedColor}
            </p>
          </div>
          <button
            type="button"
            aria-label={"Remove " + item.name}
            onClick={() => dispatch(removeItem(item))}
            className="text-gray-400 transition hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-gray-200">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="p-1.5"
              onClick={() => dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }))}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-7 text-center text-xs">{item.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="p-1.5"
              onClick={() => dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }))}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <p className="text-sm font-medium">
            {formatVnd(item.price.amountMinor * item.quantity)}
          </p>
        </div>
      </div>
    </article>
  );
}
