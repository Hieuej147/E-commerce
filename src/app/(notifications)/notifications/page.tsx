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

  if (!isLoaded || !isSignedIn) return <main className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">Checking your session...</main>;

  return (
    <main className="mx-auto mt-12 w-full max-w-5xl pb-16">
      <header className="mb-10 flex flex-col gap-3 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gray-400">Your account</p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight">Notifications</h1>
          <p className="mt-3 text-sm text-gray-500">Updates about your orders, payments, and account.</p>
        </div>
      </header>
      <NotificationsList />
    </main>
  );
}
