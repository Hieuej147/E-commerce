"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "All Equipment", slug: "all" },
  { name: "Jackets", slug: "jackets" },
  { name: "T-Shirts", slug: "t-shirts" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessories", slug: "accessories" },
  { name: "Bags", slug: "bags" },
  { name: "Gloves", slug: "gloves" },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-outline">
      <span className="font-mono text-xs text-outline uppercase mr-1">
        Category:
      </span>
      {categories.map((category) => {
        const isActive =
          selectedCategory === category.slug ||
          (selectedCategory === "all" && category.slug === "all");

        return (
          <button
            key={category.slug}
            type="button"
            onClick={() => handleChange(category.slug)}
            className={`font-mono font-bold text-xs uppercase px-3 py-1.5 border transition-all clip-chamfer-sm ${
              isActive
                ? "bg-secondary-container text-on-secondary-container border-primary shadow-hard-sm"
                : "bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high border-outline"
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
