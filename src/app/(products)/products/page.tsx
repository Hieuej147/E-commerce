import ProductsLits from "@/modules/products/components/ui";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const { category, search, sort } = await searchParams;
  return (
    <>
      <div >
        <ProductsLits
          category={category}
          search={search}
          sort={sort}
          showFilter
          enableInfiniteScroll
        />
      </div>
    </>
  );
}
