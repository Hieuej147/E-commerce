import { ProductDetailClient } from "@/modules/products/components/ui/products/product-detail-client";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailClient id={id} />;
}
