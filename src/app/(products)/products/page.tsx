import Link from "next/link";
import { ProductsListClient } from "@/modules/products/components/ui/products/products-list-client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const { category, search, sort } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      {/* 1. Top Breadcrumb & Catalog Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-outline pb-6">
        <div className="space-y-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs uppercase text-outline">
            <Link href="/" className="hover:text-primary transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">CATALOG</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-primary">
            PRODUCT CATALOG
          </h1>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-2xl">
            Explore high-performance weather-resistant garments, packs, and modular accessories engineered for extreme resilience.
          </p>
        </div>

        {/* Quick Metrics Telemetry Box */}
        <div className="flex items-center gap-4 bg-surface-container border border-outline p-3 shadow-hard-sm self-start lg:self-end">
          <div className="border-r border-outline pr-4">
            <span className="block font-mono text-[10px] text-outline uppercase">PROTOCOL STATUS</span>
            <span className="font-mono text-xs text-primary font-bold">READY FOR DISPATCH</span>
          </div>
          <div>
            <span className="block font-mono text-[10px] text-outline uppercase">LOGISTICS SPEED</span>
            <span className="font-mono text-xs text-secondary font-bold">NEXT-DAY FULFILLMENT</span>
          </div>
        </div>
      </section>

      {/* 2. Product Matrix & Filters */}
      <ProductsListClient
        category={category}
        search={search}
        sort={sort}
        showFilter
        enableInfiniteScroll
      />
    </div>
  );
}
