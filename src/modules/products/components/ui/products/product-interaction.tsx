"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItem } from "@/modules/cart/store/cart-slice";
import type { ProductDto } from "@/lib/api/client";
import { ShoppingBag, Zap, Truck, RotateCcw, ShieldCheck, Check } from "lucide-react";

export function ProductInteraction({
  product,
  selectedColor,
  onColorChange,
}: {
  product: ProductDto;
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const sizes = product.sizes?.length ? product.sizes : ["STD"];
  const colors = product.colors?.length ? product.colors : ["#000000"];

  const [size, setSize] = useState(sizes[0] ?? "STD");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stockQuantity === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(
      addItem({
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: selectedColor || colors[0] || "",
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    dispatch(
      addItem({
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: selectedColor || colors[0] || "",
      }),
    );
    router.push("/cart?step=2");
  };

  return (
    <div className="space-y-6">
      {/* Selection Matrix: Color Swatches */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-bold uppercase text-primary">
            SELECT COLOR:
          </span>
          <span className="font-mono text-xs text-secondary font-bold uppercase">
            {selectedColor || colors[0]}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {colors.map((c) => {
            const isHex = c.startsWith("#");
            const isSelected = selectedColor === c || (!selectedColor && colors[0] === c);
            return (
              <button
                key={c}
                type="button"
                aria-label={`Select color ${c}`}
                onClick={() => onColorChange(c)}
                className={`relative w-9 h-9 border flex items-center justify-center transition-all ${
                  isSelected
                    ? "border-primary ring-2 ring-secondary-container"
                    : "border-outline hover:border-primary"
                }`}
                style={{ backgroundColor: isHex ? c : undefined }}
              >
                {isSelected && (
                  <Check
                    className={`w-4 h-4 ${
                      c.toLowerCase() === "#ffffff" || c.toLowerCase() === "white"
                        ? "text-black"
                        : "text-secondary-container"
                    }`}
                  />
                )}
                {!isHex && !isSelected && (
                  <span className="font-mono text-xs uppercase text-on-surface">
                    {c.slice(0, 2)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selection Matrix: Size Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-bold uppercase text-primary">
            SELECT SIZE:
          </span>
          <span className="font-mono text-xs text-outline">Standard Fit</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={`py-2 border text-center font-mono font-bold text-xs uppercase transition-all ${
                size === option
                  ? "bg-primary text-on-primary border-primary shadow-hard-sm"
                  : "border-outline text-on-surface hover:bg-surface-container"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Stepper & Cart Actions */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-bold uppercase text-primary">QTY:</span>
          <div className="flex items-center border border-primary bg-surface-container-lowest shadow-hard-sm">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center font-mono font-bold text-primary hover:bg-surface-container border-r border-primary"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-12 text-center font-mono font-bold text-xs text-primary">
              {String(quantity).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center font-mono font-bold text-primary hover:bg-surface-container border-l border-primary"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            >
              +
            </button>
          </div>
          <span className="font-mono text-[10px] text-outline uppercase">
            Max 10 units per order
          </span>
        </div>

        {/* Primary Action Buttons (Chamfered Geometry) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Add to Cart */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`py-3 px-4 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-hard-md clip-chamfer-sm ${
              isOutOfStock
                ? "bg-surface-container text-outline cursor-not-allowed"
                : added
                  ? "bg-secondary-container text-on-secondary-container"
                  : "bg-primary text-on-primary hover:bg-secondary-container hover:text-on-secondary-container"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {isOutOfStock
              ? "[ OUT OF STOCK ]"
              : added
                ? "[ ADDED TO DEPOT ]"
                : "ADD TO CART"}
          </button>

          {/* Buy Now */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleBuyNow}
            className={`py-3 px-4 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-primary transition-all shadow-hard-md clip-chamfer-sm ${
              isOutOfStock
                ? "bg-surface-container text-outline cursor-not-allowed border-outline"
                : "bg-secondary-container text-on-secondary-container hover:bg-primary hover:text-on-primary"
            }`}
          >
            <Zap className="w-4 h-4" />
            BUY NOW
          </button>
        </div>
      </div>

      {/* Fast Logistics Perks */}
      <div className="pt-4 border-t border-surface-container-highest space-y-2 font-mono text-xs text-on-surface-variant">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-secondary shrink-0" />
          <span>Standard Delivery Nationwide (2-3 business days)</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-secondary shrink-0" />
          <span>30-Day Protocol Returns &amp; Size Exchange</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
          <span>Lifetime Seam &amp; Hardware Integrity Warranty</span>
        </div>
      </div>

      {/* Rapid Inventory & Technical Status Plate */}
      <div className="bg-surface-container-low border border-outline p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase text-primary font-bold">
          <span>DEPOT: SECTOR_07 CENTRAL LOGISTICS</span>
          <span className="text-secondary">READY TO DISPATCH</span>
        </div>
        <div className="w-full bg-surface-container-highest h-1.5 relative overflow-hidden">
          <div
            className="bg-primary h-full"
            style={{
              width: `${Math.min(100, Math.max(15, (product.stockQuantity / 20) * 100))}%`,
            }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-outline">
          <span>STATUS: ALL SENSORS NOMINAL</span>
          <span>STOCK: {product.stockQuantity} UNITS AVAILABLE</span>
        </div>
      </div>
    </div>
  );
}
