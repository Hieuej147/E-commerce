"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { ArrowLeft, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useOrder } from "@/features/orders/queries/orders.queries";
import { useCancelOrder } from "@/features/orders/mutations/orders.mutations";
import { formatVnd } from "@/lib/formatters/currency";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;
  const { isLoaded, isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const orderQuery = useOrder(orderId);
  const cancelOrderMutation = useCancelOrder();

  useEffect(() => {
    if (isLoaded && !isSignedIn) void redirectToSignIn({ redirectUrl: `/orders/${orderId}` });
  }, [isLoaded, isSignedIn, orderId, redirectToSignIn]);

  if (!isLoaded || !isSignedIn) {
    return <DetailMessage>Checking login session...</DetailMessage>;
  }
  if (orderQuery.isPending) return <DetailMessage>Loading order details...</DetailMessage>;
  if (orderQuery.isError || !orderQuery.data) {
    return (
      <DetailMessage tone="error">
        <p className="font-mono text-xs font-bold uppercase text-error">
          Order not found
        </p>
        <Link
          href="/orders"
          className="mt-4 inline-block border border-primary bg-primary text-on-primary font-mono text-xs uppercase px-4 py-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
        >
          Back to Orders
        </Link>
      </DetailMessage>
    );
  }

  const order = orderQuery.data;
  const isPaid = order.paymentStatus === "PAID";
  const isFailed = order.paymentStatus === "FAILED";
  const items = order.items ?? [];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 lg:px-8 py-10 pb-16 space-y-8">
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 font-mono text-xs text-outline hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <header className="flex flex-col gap-4 border-b border-outline pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-outline uppercase mb-1">
            <span className="w-2 h-2 bg-secondary-container border border-primary inline-block" />
            <span>Order Details</span>
          </div>
          <h1 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight text-primary">
            ORDER #{order.id}
          </h1>
          <p className="mt-1 font-mono text-xs text-outline">
            Ordered on: {order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN", { dateStyle: "medium", timeStyle: "short" }) : "Recently"}
          </p>
        </div>
        <div className="sm:text-right flex sm:flex-col items-start sm:items-end gap-2">
          <StatusIcon paid={isPaid} failed={isFailed} />
          <div className="font-mono text-xs uppercase">
            <span className="font-bold text-primary">STATUS: {formatStatus(order.status)}</span>
            <span className="text-outline block text-[10px]">PAYMENT: {formatStatus(order.paymentStatus)}</span>
          </div>
        </div>
      </header>

      {!isPaid && !isFailed && order.status !== "CANCELLED" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-secondary-container bg-surface-container-low p-4 text-xs font-mono text-on-surface shadow-hard-sm">
          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <p>
              Awaiting payment confirmation from Stripe. This page will update automatically.
            </p>
          </div>
          {order.status === "PENDING_PAYMENT" && (
            <button
              type="button"
              disabled={cancelOrderMutation.isPending}
              onClick={() => {
                if (window.confirm("Are you sure you want to cancel this pending order?")) {
                  cancelOrderMutation.mutate(order.id);
                }
              }}
              className="self-start sm:self-auto border border-error text-error px-3 py-1.5 uppercase font-bold text-xs hover:bg-error/10 transition cursor-pointer disabled:opacity-50"
            >
              {cancelOrderMutation.isPending ? "Canceling..." : "Cancel Order"}
            </button>
          )}
        </div>
      )}

      {isFailed && (
        <div className="flex items-start gap-3 border border-error bg-error-container/20 p-4 text-xs font-mono text-error shadow-hard-sm">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Payment could not be completed. You can re-attempt checkout from your cart.
          </p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Items Section */}
        <section className="lg:col-span-8 border border-outline bg-surface-container-lowest p-6 shadow-hard-md clip-chamfer-sm">
          <div className="flex items-center justify-between pb-3 border-b border-outline mb-4 font-mono text-xs font-bold uppercase">
            <span>Ordered Items</span>
            <span className="text-outline">{items.length} {items.length === 1 ? "Item" : "Items"}</span>
          </div>
          <div className="divide-y divide-surface-container-high">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-sans font-bold text-sm uppercase text-primary">
                    {item.productName}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-outline">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-outline">
                    {formatVnd(item.unitPrice?.amountMinor ?? 0)} / unit
                  </p>
                  <p className="font-sans font-bold text-sm text-primary">
                    {formatVnd(item.lineTotal?.amountMinor ?? 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary & Destination */}
        <aside className="lg:col-span-4 border border-outline bg-surface-container-lowest p-6 shadow-hard-md space-y-6">
          <div>
            <h2 className="font-mono text-xs font-bold uppercase text-primary pb-2 border-b border-outline mb-3">
              Payment Summary
            </h2>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal:</span>
                <span className="text-primary font-bold">{formatVnd(order.subtotal?.amountMinor ?? 0)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping:</span>
                <span className="text-secondary font-bold uppercase">FREE</span>
              </div>
              <div className="flex justify-between border-t-2 border-primary pt-3 font-sans font-bold text-base text-primary">
                <span>Total Amount:</span>
                <span>{formatVnd(order.total?.amountMinor ?? 0)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-outline pt-4">
            <h3 className="font-mono text-xs font-bold uppercase text-primary mb-2">
              Delivery Address
            </h3>
            {order.shippingAddress ? (
              <address className="font-mono text-xs not-italic leading-relaxed text-on-surface-variant">
                <span className="font-bold text-primary block">{order.shippingAddress.recipientName}</span>
                <span>{order.shippingAddress.phone}</span>
                <br />
                <span>{order.shippingAddress.line1}</span>
                {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
                <br />
                <span>
                  {order.shippingAddress.city}
                  {order.shippingAddress.province ? `, ${order.shippingAddress.province}` : ""}
                </span>
                <br />
                <span>
                  {order.shippingAddress.postalCode} · {order.shippingAddress.countryCode}
                </span>
              </address>
            ) : (
              <p className="font-mono text-xs text-outline">No shipping address recorded</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

function StatusIcon({ paid, failed }: { paid: boolean; failed: boolean }) {
  return paid ? (
    <CheckCircle2 className="h-6 w-6 text-secondary" />
  ) : failed ? (
    <CircleAlert className="h-6 w-6 text-error" />
  ) : (
    <Clock3 className="h-6 w-6 text-outline animate-spin" />
  );
}

function formatStatus(value?: string) {
  if (!value) return "";
  return value.replaceAll("_", " ").toUpperCase();
}

function DetailMessage({
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
