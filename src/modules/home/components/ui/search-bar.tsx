"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar = ({
  className = "",
  placeholder = "SEARCH CATALOG...",
  autoFocus = false,
}: SearchBarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const initialSearch = searchParams.get("search") || "";
  const [keyword, setKeyword] = useState(initialSearch);
  const [isPending, startTransition] = useTransition();

  // Keep local input in sync if URL search param changes from outside (e.g. back/forward navigation)
  useEffect(() => {
    const current = searchParams.get("search") || "";
    setKeyword(current);
  }, [searchParams]);

  // Global keyboard shortcuts: press '/' or 'Cmd+K' / 'Ctrl+K' to focus search, 'Esc' to blur
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (
        (e.key === "/" && !isInput) ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }

      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerSearch = (term: string) => {
    const trimmed = term.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    // Reset cursor token when search changes
    params.delete("pageToken");

    const targetBase = pathname === "/" ? "/products" : pathname;
    const queryString = params.toString();
    const targetUrl = queryString ? `${targetBase}?${queryString}` : targetBase;

    startTransition(() => {
      router.push(targetUrl, { scroll: false });
    });
  };

  // Debounce search on typing
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentInUrl = searchParams.get("search") || "";
      if (keyword.trim() !== currentInUrl) {
        triggerSearch(keyword);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(keyword);
  };

  const handleClear = () => {
    setKeyword("");
    triggerSearch("");
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`group relative flex items-center bg-surface-container-lowest border border-outline hover:border-primary focus-within:border-primary focus-within:border-l-4 focus-within:border-l-secondary-container transition-all h-9 md:h-10 shadow-hard-sm ${className}`}
    >
      <div className="pl-3 pr-2 flex items-center justify-center text-outline group-focus-within:text-primary transition-colors shrink-0">
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin text-secondary" />
        ) : (
          <Search className="w-4 h-4" />
        )}
      </div>

      <input
        ref={inputRef}
        type="search"
        name="search"
        autoFocus={autoFocus}
        value={keyword}
        placeholder={placeholder}
        aria-label="Search catalog inventory"
        onChange={(e) => setKeyword(e.target.value)}
        className="bg-transparent font-mono text-xs text-on-surface placeholder:text-outline/70 focus:outline-none w-full tracking-wider py-2 pr-2 [&::-webkit-search-cancel-button]:hidden"
      />

      <div className="flex items-center pr-2 shrink-0 gap-1">
        {keyword ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-outline hover:text-primary hover:bg-surface-container transition-colors font-mono text-[10px] uppercase flex items-center justify-center border border-transparent hover:border-outline"
            aria-label="Clear search"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd
            className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono border border-outline/40 bg-surface-container text-outline group-focus-within:hidden select-none"
            title="Press / or Cmd+K to search"
          >
            /
          </kbd>
        )}
      </div>
    </form>
  );
};
