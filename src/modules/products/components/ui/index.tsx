import { ProductsListClient } from "./products/products-list-client";

export default function ProductsList({
  category,
  search,
  sort,
  showFilter = false,
  enableInfiniteScroll = false,
}: {
  category?: string;
  search?: string;
  sort?: string;
  showFilter?: boolean;
  enableInfiniteScroll?: boolean;
}) {
  return (
    <ProductsListClient
      category={category}
      search={search}
      sort={sort}
      showFilter={showFilter}
      enableInfiniteScroll={enableInfiniteScroll}
    />
  );
}
