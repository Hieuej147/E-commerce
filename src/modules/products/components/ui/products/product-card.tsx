"use client";

import { components } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItem } from "@/modules/cart/store/cart-slice";
import { formatVnd } from "@/lib/formatters/currency";

type ProductProps = components["schemas"]["ProductDto"];

export const ProductCard = ({ product }: { product: ProductProps }) => {
  const sizes = product.sizes?.length ? product.sizes : ["STD"];
  const colors = product.colors?.length ? product.colors : ["#000000"];

  const [productTypes, setProductTypes] = useState({
    size: sizes[0]!,
    color: colors[0]!,
  });
  const [addedAnimation, setAddedAnimation] = useState(false);

  const dispatch = useAppDispatch();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const imagesMap = (product.images as Record<string, string>) || {};
  const activeImage =
    imagesMap[productTypes.color] ||
    imagesMap.main ||
    Object.values(imagesMap)[0] ||
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800";

  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock =
    !isOutOfStock && product.stockQuantity <= (product.reorderPoint ?? 5);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(
      addItem({
        ...product,
        quantity: 1,
        selectedSize: productTypes.size,
        selectedColor: productTypes.color,
      }),
    );
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <article className="group bg-surface-container-lowest border border-outline hover:shadow-hard-md transition-all flex flex-col justify-between clip-chamfer-sm">
      <div>
        {/* Card Header Plate */}
        <div className="bg-surface-container-low border-b border-outline px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-primary" />
            <span className="font-mono text-[10px] text-outline uppercase font-bold tracking-wider">
              SKU: {product.sku || product.id.slice(0, 6).toUpperCase()}
            </span>
          </div>
          {isOutOfStock ? (
            <span className="bg-error-container text-on-error-container font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase">
              [ OUT OF STOCK ]
            </span>
          ) : isLowStock ? (
            <span className="bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase">
              [ LOW: {product.stockQuantity} UNITS ]
            </span>
          ) : (
            <span className="bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase">
              [ IN STOCK ]
            </span>
          )}
        </div>

        {/* Technical Image Container with Corner Marks & HUD Specs */}
        <div className="relative bg-surface-container w-full h-64 overflow-hidden border-b border-outline">
          {/* Registration Corner Marks */}
          <span className="absolute top-2 left-2 font-mono text-[10px] text-outline z-10 select-none pointer-events-none">
            +
          </span>
          <span className="absolute top-2 right-2 font-mono text-[10px] text-outline z-10 select-none pointer-events-none">
            +
          </span>
          <span className="absolute bottom-2 left-2 font-mono text-[10px] text-outline z-10 select-none pointer-events-none">
            +
          </span>
          <span className="absolute bottom-2 right-2 font-mono text-[10px] text-outline z-10 select-none pointer-events-none">
            +
          </span>

          {/* Spec Pill Badge */}
          <div className="absolute top-3 left-3 z-20 bg-primary text-on-primary font-mono text-[10px] px-2 py-0.5 shadow-hard-sm">
            SPEC: {product.categorySlug ? product.categorySlug.toUpperCase() : "MIL_GRADE"}
          </div>

          {/* Product Link Image */}
          <Link href={`/products/${product.id}`} className="block w-full h-full relative">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Telemetry Indicator Line */}
          <div className="absolute bottom-2 right-2 bg-surface-container-lowest/90 border border-outline px-1.5 py-0.5 font-mono text-[9px] text-primary select-none pointer-events-none">
            HCM DEPOT
          </div>
        </div>

        {/* Product Details Block */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
            <span className="text-outline uppercase">
              {product.categorySlug ? product.categorySlug.toUpperCase() : "EQUIPMENT"}
            </span>
            <span className="text-on-surface-variant uppercase">
              {sizes.length > 1 ? `SIZES: ${sizes.join(" / ")}` : `SIZE: ${sizes[0]}`}
            </span>
          </div>

          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-sans font-bold text-base uppercase text-primary leading-snug line-clamp-1 hover:text-secondary transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="font-sans text-xs text-on-surface-variant line-clamp-2 min-h-8">
            {product.description || "Field-tested apparel and tactical accessories engineered for extreme environments."}
          </p>

          {/* Color & Size Selectors Matrix */}
          <div className="flex items-center justify-between pt-1 border-t border-surface-container-high">
            {/* Color Swatches */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-outline uppercase mr-1">CLR:</span>
              {colors.map((c) => {
                const isHex = c.startsWith("#");
                return (
                  <button
                    key={c}
                    type="button"
                    title={c}
                    onClick={() => handleProductType({ type: "color", value: c })}
                    className={`w-4 h-4 rounded-none border transition-all ${
                      productTypes.color === c
                        ? "border-primary ring-2 ring-secondary-container"
                        : "border-outline opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      backgroundColor: isHex ? c : undefined,
                    }}
                  >
                    {!isHex && (
                      <span className="block text-[8px] font-mono leading-none text-center">
                        {c.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Size Selector */}
            {sizes.length > 1 && (
              <div className="flex items-center gap-1">
                <span className="font-mono text-[10px] text-outline uppercase mr-1">SZ:</span>
                <select
                  value={productTypes.size}
                  onChange={(e) => handleProductType({ type: "size", value: e.target.value })}
                  className="bg-surface-container-lowest border border-outline font-mono text-[10px] px-1 py-0.5 text-primary focus:outline-none focus:border-primary"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="pt-2 flex items-baseline justify-between border-t border-surface-container-high">
            <span className="font-sans font-bold text-base text-primary tracking-tight">
              {formatVnd(product.price.amountMinor)}
            </span>
            <span className="font-mono text-[10px] text-outline uppercase">[ TAX INCL ]</span>
          </div>
        </div>
      </div>

      {/* Action Module */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link
          href={`/products/${product.id}`}
          className="w-full border border-primary text-primary font-mono font-bold text-xs uppercase py-2 hover:bg-surface-container transition-colors text-center block"
        >
          [ VIEW DETAILS ]
        </Link>
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`w-full font-mono font-bold text-xs uppercase py-2 transition-all shadow-hard-sm text-center clip-chamfer-sm ${
            isOutOfStock
              ? "bg-surface-container text-outline cursor-not-allowed"
              : addedAnimation
                ? "bg-secondary-container text-on-secondary-container"
                : "bg-primary text-on-primary hover:bg-secondary-container hover:text-on-secondary-container"
          }`}
        >
          {addedAnimation ? "[ ADDED +1 ]" : "[ ADD TO CART ]"}
        </button>
      </div>
    </article>
  );
};
