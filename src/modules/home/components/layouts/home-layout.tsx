"use client";

import { usePathname } from "next/navigation";
import Footer from "@/modules/home/components/ui/footer";
import { NavbarHome } from "@/modules/home/components/ui/navbar-home/navbar-home";
import { CustomerStoreGuard } from "@/modules/auth/components/customer-store-guard";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  const pathname = usePathname();
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) return <>{children}</>;

  return (
    <CustomerStoreGuard>
      <NavbarHome />
      {children}
      <Footer />
    </CustomerStoreGuard>
  );
};
