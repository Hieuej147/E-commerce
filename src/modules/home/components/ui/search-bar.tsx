"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasTyped) return;

    const timer = window.setTimeout(() => {
      const search = keyword.trim();

      if (!search) {
        router.replace("/products", { scroll: false });
        return;
      }

      const params = new URLSearchParams();
      params.set("search", search);
      router.replace(`/products?${params.toString()}`, { scroll: false });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [hasTyped, keyword, router]);

  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 py-1 shadow-md px-2">
      <Search className="w-4 h-4 text-gray-500" />
      <input
        type="search"
        name="search"
        value={keyword}
        placeholder="Search..."
        className="text-sm outline-0"
        onChange={(event) => {
          setKeyword(event.target.value);
          setHasTyped(true);
        }}
      />
    </div>
  );
};
