"use client";

import Link from "next/link";
import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import { useOrder } from "@/features/orders/queries/orders.queries";

export function PaymentResult({ mode }: { mode: "success" | "cancel" }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? undefined;
  const { isLoaded, isSignedIn } = useAuth();
  const orderQuery = useOrder(mode === "success" ? orderId : undefined);

  if (!isLoaded) {
    return (
      <ResultMessage
        icon={<LoaderCircle className="h-10 w-10 animate-spin text-primary" />}
        title="VERIFYING PAYMENT STATUS..."
        description="Checking status with the payment provider."
      />
    );
  }

  if (!isSignedIn) {
    return (
      <ResultMessage
        icon={<CircleAlert className="h-10 w-10 text-secondary" />}
        title="SIGN IN REQUIRED"
        description="Please sign in to view this order transaction."
        action={
          <Link
            href="/sign-in"
            className="border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
          >
            Sign In
          </Link>
        }
      />
    );
  }

  if (mode === "cancel") {
    return (
      <ResultMessage
        icon={<CircleAlert className="h-10 w-10 text-secondary" />}
        title="PAYMENT CANCELLED"
        description="The checkout was cancelled. Your cart items are still saved."
        action={
          <Link
            href="/cart"
            className="border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
          >
            Return to Cart
          </Link>
        }
      />
    );
  }

  if (!orderId) {
    return (
      <ResultMessage
        icon={<CircleAlert className="h-10 w-10 text-error" />}
        title="ORDER NOT FOUND"
        description="We could not find the requested order ID."
        action={
          <Link
            href="/orders"
            className="border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
          >
            View Orders
          </Link>
        }
      />
    );
  }

  if (orderQuery.isPending) {
    return (
      <ResultMessage
        icon={<LoaderCircle className="h-10 w-10 animate-spin text-primary" />}
        title="CONFIRMING PAYMENT..."
        description="Payment completed. Waiting for order confirmation."
      />
    );
  }

  if (orderQuery.isError) {
    return (
      <ResultMessage
        icon={<CircleAlert className="h-10 w-10 text-error" />}
        title="ORDER STATUS DELAYED"
        description="Unable to verify order status immediately. You can check your order history in a moment."
        action={
          <Link
            href="/orders"
            className="border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
          >
            Review Orders
          </Link>
        }
      />
    );
  }

  const order = orderQuery.data;
  const isPaid = order?.paymentStatus === "PAID";
  const isFailed = order?.paymentStatus === "FAILED";

  return (
    <ResultMessage
      icon={
        isPaid ? (
          <CheckCircle2 className="h-10 w-10 text-secondary" />
        ) : (
          <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
        )
      }
      title={
        isPaid
          ? "PAYMENT CONFIRMED"
          : isFailed
            ? "PAYMENT FAILED"
            : "PROCESSING PAYMENT..."
      }
      description={
        isPaid
          ? "Your order has been placed successfully. Thank you for shopping with us!"
          : isFailed
            ? "The payment was not completed. Please try again or choose another method."
            : "This page will update automatically once payment is confirmed."
      }
      action={
        <Link
          href="/orders"
          className="border border-primary bg-primary text-on-primary font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-hard-sm"
        >
          View Order Status
        </Link>
      }
    />
  );
}

function ResultMessage({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <section className="flex max-w-lg flex-col items-center gap-5 border border-outline bg-surface-container-lowest p-8 md:p-12 text-center shadow-hard-md clip-chamfer-md">
        {icon}
        <h1 className="font-display text-2xl uppercase tracking-tight text-primary">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-xs md:text-sm leading-relaxed text-on-surface-variant">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </section>
    </main>
  );
}
