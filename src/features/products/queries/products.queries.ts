import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getProduct,
  listProducts,
  type ProductListParams,
} from "../api/products.api";
import { queryKeys } from "@/lib/query/query-keys";


export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
}

export function useInfiniteProducts(
  params: Omit<ProductListParams, "pageToken"> = {},
) {
  return useInfiniteQuery({
    queryKey: queryKeys.infinite(params),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      listProducts({ ...params, pageToken: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) {
        return undefined;
      }
      return lastPage.pageInfo.nextPageToken;
    },
  });
}
