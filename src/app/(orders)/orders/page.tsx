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

  if (!isLoaded || !isSignedIn) return <PageMessage>Checking your session...</PageMessage>;
  if (ordersQuery.isPending) return <OrdersLoading />;
  if (ordersQuery.isError) {
    return <PageMessage tone="error">
      <p>Unable to load your orders.</p>
      <button type="button" onClick={() => void ordersQuery.refetch()} className="mt-4 inline-flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
        <RefreshCw className="h-4 w-4" /> Try again
      </button>
    </PageMessage>;
  }

  const orders = ordersQuery.data?.orders ?? [];

  return (
    <main className="mx-auto mt-12 w-full max-w-5xl pb-16">
      <header className="mb-10 flex flex-col gap-3 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gray-400">Your account</p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight">Orders</h1>
          <p className="mt-3 text-sm text-gray-500">A quiet record of everything on its way to you.</p>
        </div>
        <Link href="/products" className="text-sm font-medium underline underline-offset-4">Continue shopping</Link>
      </header>

      {orders.length === 0 ? <EmptyOrders /> : <div className="flex flex-col gap-4">{orders.map((order) => <OrderRow key={order.id} order={order} />)}</div>}
    </main>
  );
}

function OrderRow({ order }: { order: OrderDto }) {
  const items = order.items ?? [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <article className="border border-gray-200 bg-white p-5 transition hover:border-gray-400 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="shrink-0 bg-gray-100 p-3"><PackageCheck className="h-5 w-5 text-gray-700" /></div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-mono text-sm font-medium">#{order.id}</h2>
              <StatusBadge value={order.status} />
            </div>
            <p className="mt-2 text-xs text-gray-500">{formatDate(order.createdAt)} · {itemCount} item{itemCount === 1 ? "" : "s"}</p>
            <p className="mt-3 truncate text-sm text-gray-600">{items.map((item) => `${item.productName} × ${item.quantity}`).join(" · ")}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-8 border-t border-gray-100 pt-4 lg:border-0 lg:pt-0">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Total</p>
            <p className="mt-1 text-lg font-semibold">{formatVnd(order.total?.amountMinor ?? 0)}</p>
            <StatusBadge value={order.paymentStatus} subtle />
          </div>
          <Link href={`/orders/${order.id}`} className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">Details <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ value, subtle = false }: { value?: string; subtle?: boolean }) {
  if (!value) return null;
  const normalized = value.toUpperCase();
  const tone = normalized === "PAID" ? "bg-green-50 text-green-700" : normalized === "FAILED" || normalized === "PAYMENT_FAILED" || normalized === "CANCELLED" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700";
  return <span className={`mt-2 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${tone} ${subtle ? "" : ""}`}>{formatStatus(value)}</span>;
}

function formatStatus(value?: string) {
  if (!value) return "";
  return value.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}
function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleString("vi-VN", { dateStyle: "medium", timeStyle: "short" });
}

function EmptyOrders() { return <div className="border border-dashed border-gray-300 px-6 py-20 text-center"><PackageCheck className="mx-auto h-8 w-8 text-gray-300" /><h2 className="mt-5 text-lg font-medium">No orders yet</h2><p className="mt-2 text-sm text-gray-500">Your next favorite piece is waiting to be found.</p><Link href="/products" className="mt-6 inline-flex bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700">Browse products</Link></div>; }
function PageMessage({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "error" }) { return <main className={`flex min-h-[50vh] items-center justify-center text-center text-sm ${tone === "error" ? "text-red-600" : "text-gray-500"}`}><div>{children}</div></main>; }
function OrdersLoading() { return <main className="mx-auto mt-12 w-full max-w-5xl"><div className="mb-10 h-28 animate-pulse bg-gray-100" /><div className="flex flex-col gap-4">{[1, 2, 3].map((item) => <div key={item} className="h-32 animate-pulse bg-gray-100" />)}</div></main>; }
