"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItem } from "@/modules/cart/store/cart-slice";
import type { ProductDto } from "@/lib/api/client";

export function ProductInteraction({
  product,
  selectedColor,
  onColorChange,
}: {
  product: ProductDto;
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  const dispatch = useAppDispatch();
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={size === option ? "min-w-10 border border-gray-900 bg-gray-900 px-3 py-2 text-xs uppercase text-white" : "min-w-10 border border-gray-200 px-3 py-2 text-xs uppercase hover:border-gray-900"}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Color</p>
        <div className="flex gap-3">
          {product.colors.map((option) => (
            <button
              key={option}
              type="button"
              aria-label={"Select " + option}
              onClick={() => onColorChange(option)}
              className={selectedColor === option ? "rounded-full border border-gray-900 p-1" : "rounded-full border border-transparent p-1"}
            >
              <span className="block h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: option }} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-200">
          <button type="button" aria-label="Decrease quantity" className="p-2" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button type="button" aria-label="Increase quantity" className="p-2" onClick={() => setQuantity((current) => current + 1)}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => dispatch(addItem({ ...product, quantity, selectedSize: size, selectedColor: selectedColor || product.colors[0] || "" }))}
          className="flex flex-1 items-center justify-center gap-2 bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
