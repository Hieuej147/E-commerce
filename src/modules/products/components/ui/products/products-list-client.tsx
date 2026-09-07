"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import Categories from "./categories";
import Filter from "./filter";
import { ProductCard } from "./product-card";
import { useInfiniteProducts } from "@/features/products/queries/products.queries";

export function ProductsListClient({
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
  const productsQuery = useInfiniteProducts({
    pageSize: 10,
    search,
    status: "ACTIVE",
  });
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = productsQuery;
  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: "300px",
    skip: !enableInfiniteScroll,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  const products = useMemo(() => {
    const allProducts =
      productsQuery.data?.pages.flatMap((page) => page.products) ?? [];

    return allProducts
      .filter((product) => {
        if (!category || category === "all") {
          return true;
        }

        return product.categorySlug === category;
      })
      .sort((a, b) => {
        if (sort === "asc") {
          return a.price.amountMinor - b.price.amountMinor;
        }

        if (sort === "desc") {
          return b.price.amountMinor - a.price.amountMinor;
        }

        if (sort === "oldest") {
          return a.createdAt.localeCompare(b.createdAt);
        }

        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [category, productsQuery.data?.pages, sort]);
  return (
    <section className="w-full">
      <Categories />
      {showFilter && <Filter />}

      {productsQuery.isPending && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[520px] animate-pulse bg-gray-100" />
          ))}
        </div>
      )}

      {productsQuery.isError && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-sm font-medium text-gray-800">
            Products are unavailable.
          </p>
          <p className="text-sm text-gray-500">
            {productsQuery.error instanceof Error
              ? productsQuery.error.message
              : "The products request failed."}
          </p>
          <button
            type="button"
            onClick={() => productsQuery.refetch()}
            className="border border-gray-900 px-4 py-2 text-sm font-medium transition hover:bg-gray-900 hover:text-white"
          >
            Try again
          </button>
        </div>
      )}

      {productsQuery.isSuccess && products.length === 0 && (
        <p className="py-20 text-center text-sm text-gray-500">
          No products found.
        </p>
      )}

      {productsQuery.isSuccess && products.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {enableInfiniteScroll && (
        <div ref={loadMoreRef} className="h-10" aria-hidden="true" />
      )}

      {enableInfiniteScroll && productsQuery.isFetchingNextPage && (
        <p className="py-8 text-center text-sm text-gray-500">
          Loading more products...
        </p>
      )}

      {enableInfiniteScroll &&
        !productsQuery.hasNextPage &&
        products.length > 0 && (
          <p className="py-8 text-center text-sm text-gray-400">
            You have reached the end.
          </p>
        )}

      {!showFilter && (
        <Link
          href={category ? "/products/?category=" + category : "/products"}
          className="mt-6 flex justify-end text-sm text-gray-500 underline underline-offset-4"
        >
          View all products
        </Link>
      )}
    </section>
  );
}
