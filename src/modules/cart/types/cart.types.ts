import type { ProductDto } from "@/lib/api/client";

export type CartItem = ProductDto & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};
