"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

import { NotificationsList } from "@/features/notifications/components/notifications-list";

export default function NotificationsPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();

  useEffect(() => {
    if (isLoaded && !isSignedIn) void redirectToSignIn({ redirectUrl: "/notifications" });
  }, [isLoaded, isSignedIn, redirectToSignIn]);

  if (!isLoaded || !isSignedIn) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center font-mono text-xs text-outline">
        Checking login session...
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 lg:px-8 py-10 pb-16 space-y-8">
      <header className="flex flex-col gap-3 border-b border-outline pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-outline uppercase mb-1">
            <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
            <span>Notifications</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-primary">
            NOTIFICATIONS
          </h1>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant mt-1">
            Updates regarding your orders, payments, and account activity.
          </p>
        </div>
      </header>
      <NotificationsList />
    </main>
  );
}
