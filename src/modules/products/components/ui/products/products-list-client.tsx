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
    pageSize: 12,
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
      <div className="flex items-center justify-between border-b border-outline pb-2 mb-6 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
          <span className="font-bold text-primary">INVENTORY</span>
        </div>
        <span className="text-on-surface-variant">
          Showing {products.length} items
        </span>
      </div>

      <Categories />
      {showFilter && <Filter />}

      {/* Loading Skeletons */}
      {productsQuery.isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-96 border border-outline bg-surface-container p-4 flex flex-col justify-between animate-pulse"
            >
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-outline/20" />
                <div className="h-3 w-16 bg-outline/20" />
              </div>
              <div className="h-44 w-full bg-outline/20 my-3" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-outline/20" />
                <div className="h-3 w-1/2 bg-outline/20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Display */}
      {productsQuery.isError && (
        <div className="flex flex-col items-center gap-3 py-16 text-center border border-error bg-error-container/20 p-8 shadow-hard-sm">
          <p className="font-mono font-bold text-xs uppercase text-error">
            [ ALERT: PRODUCT_MANIFEST_FAILURE ]
          </p>
          <p className="font-sans text-xs text-on-surface-variant max-w-md">
            {productsQuery.error instanceof Error
              ? productsQuery.error.message
              : "Unable to communicate with the central inventory depot."}
          </p>
          <button
            type="button"
            onClick={() => productsQuery.refetch()}
            className="border border-primary bg-primary text-on-primary font-mono text-xs uppercase px-4 py-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
          >
            [ RE-INITIALIZE TELEMETRY ]
          </button>
        </div>
      )}

      {/* Empty State */}
      {productsQuery.isSuccess && products.length === 0 && (
        <div className="border border-outline bg-surface-container-low p-12 text-center shadow-hard-sm">
          <p className="font-mono text-xs text-outline uppercase">
            NO PRODUCTS FOUND
          </p>
          <p className="font-sans text-sm text-on-surface-variant mt-2">
            No equipment matching the current filter parameters is available in storage.
          </p>
        </div>
      )}

      {/* Success Grid */}
      {productsQuery.isSuccess && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Infinite Scroll Load Trigger */}
      {enableInfiniteScroll && (
        <div ref={loadMoreRef} className="h-10" aria-hidden="true" />
      )}

      {enableInfiniteScroll && productsQuery.isFetchingNextPage && (
        <div className="py-8 text-center font-mono text-xs text-primary animate-pulse">
          Loading more products...
        </div>
      )}

      {enableInfiniteScroll &&
        !productsQuery.hasNextPage &&
        products.length > 0 && (
          <div className="py-8 text-center font-mono text-xs text-outline">
            You have reached the end of the catalog.
          </div>
        )}

      {!showFilter && (
        <div className="mt-8 flex justify-end">
          <Link
            href={category ? `/products?category=${category}` : "/products"}
            className="inline-flex items-center gap-2 border border-primary bg-primary text-on-primary font-mono font-bold text-xs uppercase px-5 py-2.5 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm clip-chamfer-sm"
          >
            [ VIEW ALL PRODUCTS ] &rarr;
          </Link>
        </div>
      )}
    </section>
  );
}
