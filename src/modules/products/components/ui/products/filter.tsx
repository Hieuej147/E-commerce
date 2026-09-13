"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSort = searchParams.get("sort") || "newest";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-surface-container-low border border-outline p-3 shadow-hard-sm">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-outline uppercase">Filters:</span>
        <span className="bg-surface-container-lowest border border-outline px-2 py-0.5 font-mono text-[10px] text-primary">
          [ IN STOCK ]
        </span>
        <span className="bg-surface-container-lowest border border-outline px-2 py-0.5 font-mono text-[10px] text-on-surface-variant hidden md:inline">
          [ GENUINE AUTHENTIC ]
        </span>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <label htmlFor="sort" className="font-mono text-xs text-outline uppercase whitespace-nowrap">
          Sort by:
        </label>
        <select
          name="sort"
          id="sort"
          value={currentSort}
          onChange={(e) => handleFilter(e.target.value)}
          className="bg-surface-container-lowest border border-outline px-3 py-1 font-mono text-xs uppercase text-primary focus:outline-none focus:border-primary cursor-pointer shadow-hard-sm"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
