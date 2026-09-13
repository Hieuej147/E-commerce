"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { ArrowRight, PackageCheck, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { useMyOrders } from "@/features/orders/queries/orders.queries";
import { formatVnd } from "@/lib/formatters/currency";
import type { OrderDto } from "@/lib/api/client";

export default function OrdersPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const ordersQuery = useMyOrders();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      void redirectToSignIn({ redirectUrl: "/orders" });
    }
  }, [isLoaded, isSignedIn, redirectToSignIn]);

  if (!isLoaded || !isSignedIn) {
    return <PageMessage>Checking login session...</PageMessage>;
  }
  if (ordersQuery.isPending) return <OrdersLoading />;
  if (ordersQuery.isError) {
    return (
      <PageMessage tone="error">
        <p className="font-mono text-xs font-bold uppercase text-error">
          Unable to load orders
        </p>
        <button
          type="button"
          onClick={() => void ordersQuery.refetch()}
          className="mt-4 inline-flex items-center gap-2 border border-primary bg-primary text-on-primary font-mono text-xs uppercase px-4 py-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry
        </button>
      </PageMessage>
    );
  }

  const orders = ordersQuery.data?.orders ?? [];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 lg:px-8 py-10 pb-16 space-y-8">
      <header className="flex flex-col gap-3 border-b border-outline pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-outline uppercase mb-1">
            <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
            <span>Order History</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-primary">
            MY ORDERS
          </h1>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant mt-1">
            Track and manage all your past and current store orders.
          </p>
        </div>
        <Link
          href="/products"
          className="border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-4 py-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm clip-chamfer-sm"
        >
          Browse Products
        </Link>
      </header>

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}

function OrderRow({ order }: { order: OrderDto }) {
  const items = order.items ?? [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <article className="border border-outline bg-surface-container-lowest p-5 transition-all hover:shadow-hard-md clip-chamfer-sm sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="shrink-0 bg-surface-container border border-outline p-3">
            <PackageCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-mono text-xs md:text-sm font-bold text-primary">
                Order #{order.id}
              </h2>
              <StatusBadge value={order.status} />
            </div>
            <p className="mt-1 font-mono text-[11px] text-outline">
              Placed on {formatDate(order.createdAt)} · {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
            <p className="mt-2 truncate font-sans text-xs text-on-surface-variant">
              {items.map((item) => `${item.productName} × ${item.quantity}`).join(" · ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8 border-t border-surface-container-high pt-4 lg:border-0 lg:pt-0">
          <div>
            <p className="font-mono text-[10px] uppercase text-outline">Total</p>
            <p className="font-sans font-bold text-base md:text-lg text-primary">
              {formatVnd(order.total?.amountMinor ?? 0)}
            </p>
            <StatusBadge value={order.paymentStatus} subtle />
          </div>
          <Link
            href={`/orders/${order.id}`}
            className="border border-primary bg-surface-container-low text-primary font-mono text-xs uppercase px-4 py-2 hover:bg-primary hover:text-on-primary transition-all shadow-hard-sm inline-flex items-center gap-1.5"
          >
            <span>View Order</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ value, subtle = false }: { value?: string; subtle?: boolean }) {
  if (!value) return null;
  const normalized = value.toUpperCase();
  const isPaid = normalized === "PAID" || normalized === "CONFIRMED" || normalized === "COMPLETED";
  const isFailed =
    normalized === "FAILED" || normalized === "PAYMENT_FAILED" || normalized === "CANCELLED";

  const tone = isPaid
    ? "bg-secondary-container text-on-secondary-container border-primary"
    : isFailed
      ? "bg-error-container text-on-error-container border-error"
      : "bg-surface-container text-primary border-outline";

  return (
    <span
      className={`inline-flex font-mono text-[10px] font-bold uppercase px-2 py-0.5 border ${tone} ${
        subtle ? "mt-1" : ""
      }`}
    >
      {formatStatus(value)}
    </span>
  );
}

function formatStatus(value?: string) {
  if (!value) return "";
  return value.replaceAll("_", " ").toUpperCase();
}

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleString("vi-VN", { dateStyle: "medium", timeStyle: "short" });
}

function EmptyOrders() {
  return (
    <div className="border border-outline bg-surface-container-low p-12 text-center shadow-hard-md">
      <PackageCheck className="mx-auto h-8 w-8 text-outline" />
      <h2 className="mt-4 font-display text-xl uppercase text-primary">NO ORDERS FOUND</h2>
      <p className="mt-1 font-sans text-xs text-on-surface-variant">
        You haven&apos;t placed any orders yet.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-5 py-2.5 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
      >
        Start Shopping
      </Link>
    </div>
  );
}

function PageMessage({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "error";
}) {
  return (
    <main
      className={`flex min-h-[50vh] items-center justify-center text-center font-mono text-xs ${
        tone === "error" ? "text-error" : "text-outline"
      }`}
    >
      <div>{children}</div>
    </main>
  );
}

function OrdersLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 lg:px-8 py-10 space-y-6">
      <div className="h-24 animate-pulse bg-surface-container border border-outline" />
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-28 animate-pulse bg-surface-container border border-outline" />
        ))}
      </div>
    </main>
  );
}
