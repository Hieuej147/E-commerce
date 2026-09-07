"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "../search-bar";
import { Home, PackageCheck } from "lucide-react";
import ShoppingCartIcon from "@/modules/cart/components/ui/shoppingIconcart";
import { UserButton, useAuth } from "@clerk/nextjs";
import { NotificationBell } from "@/features/notifications/components/notification-bell";

export const NavbarHome = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <div className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      {/**LEFT */}
      <Link href={"/"} className="flex items-center">
        <Image
          src="/logo.png"
          alt="TendOllama"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">
          TENDOLLAMA.
        </p>
      </Link>
      {/**RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href={"/"}>
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        {isLoaded && isSignedIn && <NotificationBell />}
        <ShoppingCartIcon />
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
          <Link href="/sign-in">Sign in</Link>
        )}
      </div>
    </div>
  );
};
