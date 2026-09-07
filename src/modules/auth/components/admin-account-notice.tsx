"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { LayoutDashboard, LogOut, ShieldAlert, UserCheck } from "lucide-react";
import Link from "next/link";

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
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-b border-amber-100 p-8 text-center flex flex-col items-center">
          <div className="h-16 w-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 shadow-sm">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full mb-3">
            Admin Account Detected
          </span>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Customer Store Restricted
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-sm leading-relaxed">
            You are currently signed in with an <strong>Administrator</strong> account. This store is reserved for customer purchases.
          </p>
        </div>

        {/* Identity Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-4 flex items-center gap-3.5">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={displayName}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <div className="h-11 w-11 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
            <span className="shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-purple-100 text-purple-800 tracking-wider">
              ADMIN
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={adminDashboardUrl}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition shadow-sm cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to Admin Dashboard
            </a>

            <button
              type="button"
              onClick={handleSignOutAndSignInCustomer}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign in with a customer account
            </button>

            <button
              type="button"
              onClick={handleSignOutGuest}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <UserCheck className="h-3.5 w-3.5" />
              Sign out and browse store as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
