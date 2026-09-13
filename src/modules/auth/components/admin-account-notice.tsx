"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { LayoutDashboard, LogOut, ShieldAlert, UserCheck } from "lucide-react";
import Image from "next/image";

export function AdminAccountNotice() {
  const { signOut } = useClerk();
  const { user } = useUser();

  const adminDashboardUrl =
    process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL || "http://localhost:5173";

  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "Administrator";
  const displayName = user?.fullName || user?.username || email;

  const handleSignOutAndSignInCustomer = () => {
    void signOut({ redirectUrl: "/sign-in" });
  };

  const handleSignOutGuest = () => {
    void signOut({ redirectUrl: "/" });
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-surface-container-lowest border border-outline shadow-hard-md clip-chamfer-md overflow-hidden">
        {/* Header Banner */}
        <div className="bg-surface-container-low border-b border-outline p-8 text-center flex flex-col items-center">
          <div className="h-14 w-14 bg-secondary-container text-on-secondary-container border border-primary flex items-center justify-center mb-4 shadow-hard-sm">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary bg-secondary-container px-2.5 py-0.5 border border-primary mb-3">
            Admin Account Detected
          </span>
          <h1 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-primary">
            Storefront Notice
          </h1>
          <p className="mt-2 font-sans text-xs text-on-surface-variant max-w-sm leading-relaxed">
            You are currently logged in with an <strong>Administrator</strong> account. The storefront is intended for customer ordering.
          </p>
        </div>

        {/* Identity Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-surface-container border border-outline p-4 flex items-center gap-3.5">
            {user?.imageUrl ? (
              <div className="relative h-11 w-11 shrink-0 border border-outline overflow-hidden">
                <Image
                  src={user.imageUrl}
                  alt={displayName}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-11 w-11 shrink-0 bg-primary text-on-primary border border-primary flex items-center justify-center font-mono font-bold text-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1 font-mono text-xs">
              <p className="font-bold text-primary truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-outline truncate">{email}</p>
            </div>
            <span className="shrink-0 px-2 py-0.5 text-[10px] font-mono font-bold bg-primary text-on-primary">
              ADMIN
            </span>
          </div>

          <div className="space-y-3 pt-2 font-mono text-xs font-bold uppercase">
            <a
              href={adminDashboardUrl}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-on-primary hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm cursor-pointer clip-chamfer-sm"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to Admin Dashboard
            </a>

            <button
              type="button"
              onClick={handleSignOutAndSignInCustomer}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-outline bg-surface-container-low text-primary hover:bg-surface-container transition-all cursor-pointer shadow-hard-sm"
            >
              <LogOut className="h-4 w-4" />
              Sign in as Customer
            </button>

            <button
              type="button"
              onClick={handleSignOutGuest}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-[11px] text-outline hover:text-primary transition-colors cursor-pointer"
            >
              <UserCheck className="h-3.5 w-3.5" />
              Sign out and browse as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
