import ProductsLits from "@/modules/products/components/ui";
import Image from "next/image";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      <div className="">
        <div className="relative aspect-3/1 mb-12">
          <Image src={"/featured.png"} alt="Featured Product" fill />
        </div>
        <ProductsLits category={category} />
      </div>
    </>
  );
}
