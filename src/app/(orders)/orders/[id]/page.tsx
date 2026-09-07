"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { ArrowLeft, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useOrder } from "@/features/orders/queries/orders.queries";
import { formatVnd } from "@/lib/formatters/currency";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const { isLoaded, isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const orderQuery = useOrder(orderId);

  useEffect(() => {
    if (isLoaded && !isSignedIn) void redirectToSignIn({ redirectUrl: `/orders/${orderId}` });
  }, [isLoaded, isSignedIn, orderId, redirectToSignIn]);

  if (!isLoaded || !isSignedIn) return <DetailMessage>Checking your session...</DetailMessage>;
  if (orderQuery.isPending) return <DetailMessage>Loading order...</DetailMessage>;
  if (orderQuery.isError || !orderQuery.data) return <DetailMessage tone="error"><p>We could not load this order.</p><Link href="/orders" className="mt-4 inline-block underline underline-offset-4">Back to orders</Link></DetailMessage>;

  const order = orderQuery.data;
  const isPaid = order.paymentStatus === "PAID";
  const isFailed = order.paymentStatus === "FAILED";
  const items = order.items ?? [];

  return (
    <main className="mx-auto mt-12 w-full max-w-5xl pb-16">
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"><ArrowLeft className="h-4 w-4" /> Back to orders</Link>
      <header className="mt-8 flex flex-col gap-5 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-medium uppercase tracking-[0.22em] text-gray-400">Order detail</p><h1 className="mt-2 font-mono text-2xl font-medium tracking-tight">#{order.id}</h1><p className="mt-3 text-sm text-gray-500">Placed {order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN", { dateStyle: "medium", timeStyle: "short" }) : "Recently"}</p></div>
        <div className="sm:text-right"><StatusIcon paid={isPaid} failed={isFailed} /><p className="mt-2 text-sm font-medium">{formatStatus(order.status)}</p><p className="mt-1 text-xs text-gray-500">Payment: {formatStatus(order.paymentStatus)}</p></div>
      </header>

      {!isPaid && !isFailed && <div className="mt-8 flex items-start gap-3 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"><Clock3 className="mt-0.5 h-5 w-5 shrink-0" /><p>We are waiting for payment confirmation from Stripe. This page updates automatically.</p></div>}
      {isFailed && <div className="mt-8 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0" /><p>This payment was not completed. You can return to your cart and try again.</p></div>}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="border border-gray-200 bg-white p-5 sm:p-8"><h2 className="text-lg font-semibold">Items</h2><div className="mt-6 divide-y divide-gray-100">{items.map((item) => <div key={item.productId} className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0"><div><p className="text-sm font-medium">{item.productName}</p><p className="mt-1 text-xs text-gray-500">Quantity: {item.quantity}</p></div><div className="text-right"><p className="text-sm">{formatVnd(item.unitPrice?.amountMinor ?? 0)}</p><p className="mt-1 text-xs text-gray-500">{formatVnd(item.lineTotal?.amountMinor ?? 0)}</p></div></div>)}</div></section>
        <aside className="h-fit border border-gray-200 bg-white p-5 sm:p-8"><h2 className="text-lg font-semibold">Summary</h2><div className="mt-6 space-y-4 text-sm"><div className="flex justify-between gap-4"><span className="text-gray-500">Subtotal</span><span>{formatVnd(order.subtotal?.amountMinor ?? 0)}</span></div><div className="flex justify-between gap-4 border-t border-gray-200 pt-4 font-semibold"><span>Total</span><span>{formatVnd(order.total?.amountMinor ?? 0)}</span></div></div><div className="mt-8 border-t border-gray-100 pt-6"><h3 className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">Shipping to</h3>{order.shippingAddress ? <address className="mt-3 text-sm not-italic leading-6 text-gray-600">{order.shippingAddress.recipientName}<br />{order.shippingAddress.phone}<br />{order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}<br />{order.shippingAddress.city}{order.shippingAddress.province ? `, ${order.shippingAddress.province}` : ""} {order.shippingAddress.postalCode}<br />{order.shippingAddress.countryCode}</address> : <p className="mt-3 text-sm text-gray-400">No shipping address</p>}</div></aside>
      </div>
    </main>
  );
}

function StatusIcon({ paid, failed }: { paid: boolean; failed: boolean }) { return paid ? <CheckCircle2 className="ml-auto h-6 w-6 text-green-600" /> : failed ? <CircleAlert className="ml-auto h-6 w-6 text-red-600" /> : <Clock3 className="ml-auto h-6 w-6 text-amber-600" />; }
function formatStatus(value?: string) { if (!value) return ""; return value.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()); }
function DetailMessage({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "error" }) { return <main className={`flex min-h-[50vh] items-center justify-center text-center text-sm ${tone === "error" ? "text-red-600" : "text-gray-500"}`}><div>{children}</div></main>; }
