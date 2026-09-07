"use client";

import React from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useCurrentUser } from "@/features/users/queries/users.queries";
import { AdminAccountNotice } from "./admin-account-notice";

interface CustomerStoreGuardProps {
  children: React.ReactNode;
}

export function CustomerStoreGuard({ children }: CustomerStoreGuardProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { data: currentUser } = useCurrentUser();

  // 1. If auth is still loading, render children to avoid layout flash
  if (!isLoaded) {
    return <>{children}</>;
  }

  // 2. Guests (unauthenticated users) can freely view and explore the store
  if (!isSignedIn) {
    return <>{children}</>;
  }

  // 3. Fast-path check via Clerk public metadata
  const isClerkAdmin = user?.publicMetadata?.role === "admin";
  if (isClerkAdmin) {
    return <AdminAccountNotice />;
  }

  // 4. Backend database check via /v1/me
  const isBackendAdmin = currentUser?.role === "admin";
  if (isBackendAdmin) {
    return <AdminAccountNotice />;
  }

  // 5. User is a regular customer
  return <>{children}</>;
}
