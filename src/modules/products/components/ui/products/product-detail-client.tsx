"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductInteraction } from "./product-interaction";
import { formatVnd } from "@/lib/formatters/currency";
import { useProduct } from "@/features/products/queries/products.queries";

export function ProductDetailClient({ id }: { id: string }) {
  const [selectedColor, setSelectedColor] = useState("");
  const productQuery = useProduct(id);

  if (productQuery.isPending) {
    return (
      <p className="mt-12 text-center text-sm text-gray-500">
        Loading product...
      </p>
    );
  }

  if (productQuery.isError) {
    return (
      <div className="mt-12 text-center">
        <p className="font-medium text-gray-800">Unable to load product.</p>
        <p className="mt-2 text-sm text-gray-500">
          {productQuery.error instanceof Error
            ? productQuery.error.message
            : "The product request failed."}
        </p>
      </div>
    );
  }

  const product = productQuery.data;
  const activeColor = selectedColor || product.colors[0] || "";
  const image = product.images[activeColor] ?? Object.values(product.images)[0];

  return (
    <main className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
      <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-contain p-8"
          />
        )}
      </div>
      <div className="flex flex-col justify-center gap-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
          {product.categorySlug}
        </p>
        <h1 className="text-3xl font-medium tracking-tight">{product.name}</h1>
        <p className="text-2xl font-semibold">
          {formatVnd(product.price.amountMinor)}
        </p>
        <p className="max-w-xl leading-7 text-gray-500">
          {product.description}
        </p>
        <ProductInteraction
          product={product}
          selectedColor={activeColor}
          onColorChange={setSelectedColor}
        />
        <p className="border-t border-gray-100 pt-4 text-xs text-gray-400">
          In stock · Ships free · Easy returns
        </p>
      </div>
    </main>
  );
}
