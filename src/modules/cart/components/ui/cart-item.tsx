"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/modules/cart/types/cart.types";
import { useAppDispatch } from "@/lib/store/hooks";
import { removeItem, updateQuantity } from "@/modules/cart/store/cart-slice";
import { formatVnd } from "@/lib/formatters/currency";

export function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();
  const imagesMap = (item.images as Record<string, string>) || {};
  const image =
    imagesMap[item.selectedColor] ??
    imagesMap.main ??
    Object.values(imagesMap)[0] ??
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=400";

  return (
    <article className="bg-surface-container-lowest border border-outline p-4 flex gap-4 items-start shadow-hard-sm">
      {/* Thumbnail Frame */}
      <div className="w-20 h-24 bg-surface-container shrink-0 border border-outline relative overflow-hidden">
        <Image
          src={image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover object-center"
        />
        <span className="absolute bottom-0 right-0 bg-primary text-on-primary font-mono text-[9px] px-1 select-none">
          SKU
        </span>
      </div>

      {/* Item Meta & Controls */}
      <div className="flex-1 flex flex-col justify-between min-h-24">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-sans font-bold text-xs md:text-sm uppercase text-primary line-clamp-1">
              {item.name}
            </h4>
            <button
              type="button"
              aria-label={`Remove ${item.name}`}
              onClick={() => dispatch(removeItem(item))}
              className="font-mono text-[10px] text-outline hover:text-error transition-colors uppercase ml-2 shrink-0 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>[ RMV ]</span>
            </button>
          </div>
          <p className="font-mono text-xs text-on-surface-variant mt-1">
            Size: {item.selectedSize} &bull; Color: {item.selectedColor}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-surface-container-high pt-2 mt-2">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-outline bg-surface-container-low">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="px-2 py-0.5 font-mono text-xs hover:bg-surface-container text-primary"
              onClick={() =>
                dispatch(updateQuantity({ ...item, quantity: Math.max(1, item.quantity - 1) }))
              }
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 font-mono font-bold text-xs text-primary min-w-6 text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="px-2 py-0.5 font-mono text-xs hover:bg-surface-container text-primary"
              onClick={() =>
                dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }))
              }
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Line Total */}
          <span className="font-sans font-bold text-xs md:text-sm text-primary tracking-tight">
            {formatVnd(item.price.amountMinor * item.quantity)}
          </span>
        </div>
      </div>
    </article>
  );
}
