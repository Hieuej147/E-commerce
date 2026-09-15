"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PackageCheck, Sun, Moon, Menu, X, Search } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { SearchBar } from "../search-bar";
import ShoppingCartIcon from "@/modules/cart/components/ui/shoppingIconcart";
import { NotificationBell } from "@/features/notifications/components/notification-bell";

export const NavbarHome = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const raf = requestAnimationFrame(() => setIsDark(isDarkMode));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Close mobile drawer and search on navigation
  const currentPathKey = `${pathname}?${searchParams.toString()}`;
  const [prevPathKey, setPrevPathKey] = useState(currentPathKey);
  if (prevPathKey !== currentPathKey) {
    setPrevPathKey(currentPathKey);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { label: "Home", href: "/", isActive: pathname === "/" && !currentCategory },
    { label: "All Products", href: "/products", isActive: pathname.startsWith("/products") && !currentCategory },
    { label: "Outerwear", href: "/products?category=outerwear", isActive: currentCategory === "outerwear" },
    { label: "Pants", href: "/products?category=pants", isActive: currentCategory === "pants" },
    { label: "Accessories", href: "/products?category=accessories", isActive: currentCategory === "accessories" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface-container-lowest border-b border-outline">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* BRAND IDENTITY */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-primary flex items-center justify-center border border-primary shadow-hard-sm group-hover:bg-secondary-container transition-colors">
            <span className="font-display-hero text-on-primary group-hover:text-primary text-base md:text-lg font-bold">
              FP
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-xs sm:text-sm md:text-base uppercase tracking-tight text-primary leading-none">
              FIELD PROTOCOL
            </span>
            <span className="font-code-comment text-[10px] text-outline uppercase tracking-wider mt-0.5 hidden sm:inline">
              STORE DEPOT
            </span>
          </div>
        </Link>

        {/* CENTER NAVIGATION (DESKTOP) */}
        <nav className="hidden lg:flex items-center gap-1 font-label-mono-bold text-xs uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 transition-colors border ${
                link.isActive
                  ? "bg-primary text-on-primary shadow-hard-sm border-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-transparent hover:border-outline"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          <SearchBar className="hidden md:flex w-52 lg:w-72 xl:w-80" />

          {/* MOBILE SEARCH TOGGLE */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            className="md:hidden border border-outline h-8 w-8 flex items-center justify-center text-primary hover:bg-surface-container transition-colors shadow-hard-sm"
            aria-label="Toggle search"
            title="Search products"
          >
            {mobileSearchOpen ? <X className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            type="button"
            className="border border-outline h-8 w-8 sm:w-auto sm:px-2 sm:py-1 font-code-comment text-[11px] uppercase text-on-surface hover:bg-surface-container flex items-center justify-center gap-1 transition-colors"
            title="Toggle theme"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">[LIGHT]</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">[DARK]</span>
              </>
            )}
          </button>

          {/* NOTIFICATION BELL */}
          {isLoaded && isSignedIn && <NotificationBell />}

          {/* CART ICON */}
          <ShoppingCartIcon />

          {/* USER AUTH */}
          {isLoaded && isSignedIn ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Orders"
                  labelIcon={<PackageCheck className="h-4 w-4" />}
                  href="/orders"
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <Link
              href="/sign-in"
              className="border border-primary px-2 py-1 sm:px-3 sm:py-1.5 font-label-mono-bold text-[11px] sm:text-xs uppercase text-primary hover:bg-primary hover:text-on-primary shadow-hard-sm transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>
          )}

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if (mobileSearchOpen) setMobileSearchOpen(false);
            }}
            className="lg:hidden border border-outline h-8 w-8 flex items-center justify-center text-primary hover:bg-surface-container transition-colors shadow-hard-sm"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH EXPANDABLE BAR */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-outline bg-surface-container-lowest p-3 shadow-hard-md animate-fadeIn">
          <SearchBar
            className="w-full"
            autoFocus
            placeholder="SEARCH ALL PRODUCTS..."
          />
        </div>
      )}

      {/* MOBILE DRAWER / SLIDE-DOWN PANEL */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-outline bg-surface-container-lowest p-4 shadow-hard-md animate-fadeIn">
          {/* Mobile Search */}
          <div className="mb-4">
            <SearchBar className="w-full" placeholder="SEARCH ALL PRODUCTS..." />
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 border transition-all flex items-center justify-between ${
                  link.isActive
                    ? "bg-secondary-container text-on-secondary-container border-primary font-bold shadow-hard-sm"
                    : "bg-surface-container-low border-outline text-primary hover:bg-surface-container"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-outline">&rarr;</span>
              </Link>
            ))}

            {/* Quick link to Orders if signed in */}
            {isLoaded && isSignedIn && (
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-3 py-2.5 border border-primary bg-primary text-on-primary font-bold flex items-center justify-between shadow-hard-sm"
              >
                <span className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4" />
                  My Orders
                </span>
                <span className="text-[10px]">&rarr;</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
