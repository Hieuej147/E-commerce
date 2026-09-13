"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export const SearchBar = ({ className = "hidden md:flex" }: { className?: string }) => {
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
    <div className={`items-center bg-surface-container-lowest border border-outline px-2.5 py-1 focus-within:border-primary focus-within:border-l-4 focus-within:border-l-secondary-container transition-all ${className}`}>
      <Search className="w-4 h-4 text-outline mr-2 shrink-0" />
      <input
        type="search"
        name="search"
        value={keyword}
        placeholder="Search products..."
        className="bg-transparent font-code-comment text-[12px] text-on-surface placeholder:text-outline focus:outline-none w-full"
        onChange={(event) => {
          setKeyword(event.target.value);
          setHasTyped(true);
        }}
      />
    </div>
  );
};
