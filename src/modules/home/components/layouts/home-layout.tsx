"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Footer from "@/modules/home/components/ui/footer";
import { NavbarHome } from "@/modules/home/components/ui/navbar-home/navbar-home";
import { CustomerStoreGuard } from "@/modules/auth/components/customer-store-guard";
import { MarqueeTicker } from "@/modules/home/components/ui/marquee-ticker";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  const pathname = usePathname();
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) return <>{children}</>;

  return (
    <CustomerStoreGuard>
      <div className="flex flex-col min-h-screen w-full">
        <Suspense fallback={<header className="h-16 md:h-20 bg-surface-container-lowest border-b border-outline" />}>
          <NavbarHome />
        </Suspense>
        <MarqueeTicker />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </div>
    </CustomerStoreGuard>
  );
};
